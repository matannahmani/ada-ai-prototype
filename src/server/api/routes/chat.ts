/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { revalidatePath, revalidateTag } from "next/cache"
import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { generateStreamOutput } from "@/trpc/generateStreamOutput"
import { api } from "@/trpc/server"
import { Chat, MessageVector, MissionVector, Prisma } from "@prisma/client"
import { generateCacheTag } from "@trpc/next/dist/app-dir/shared"
import { TRPCError } from "@trpc/server"
import { observable } from "@trpc/server/observable"
import { ConversationChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { BufferMemory, ChatMessageHistory } from "langchain/memory"
import { PromptTemplate } from "langchain/prompts"
import { AIMessage, HumanMessage } from "langchain/schema"
import { PrismaVectorStore } from "langchain/vectorstores/prisma"
import { z } from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  protectedUserOrVistorProcedure,
} from "../trpc"

const chatRouter = createTRPCRouter({
  createOne: protectedUserOrVistorProcedure
    .input(
      z.object({
        missionId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { missionId } = input
      const mission = await prisma.mission.findUnique({
        where: {
          id: missionId,
        },
      })
      if (!mission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Mission not found",
        })
      }
      const chat = await prisma.chat.create({
        data: {
          missionId: mission.id,
          userId: ctx?.session?.user?.id,
          vistorId: ctx?.visitor?.id,
        },
      })
      // await api.chats.byUserId.revalidate({
      //   userId: ctx?.session?.user?.id || ctx?.visitor?.id,
      // })
      return chat
    }),
  getLastChat: protectedUserOrVistorProcedure.query(async ({ ctx }) => {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: {
          OR: [
            {
              userId: ctx?.session?.user?.id,
            },
            {
              vistorId: ctx?.visitor?.id,
            },
          ],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return chat
  }),
  byUserId: protectedUserOrVistorProcedure.query(async ({ input, ctx }) => {
    const chats = await prisma.chat.findMany({
      where: {
        AND: {
          OR: [
            {
              userId: ctx?.session?.user?.id,
            },
            {
              vistorId: ctx?.visitor?.id,
            },
          ],
        },
      },
      include: {
        mission: true,
      },
    })
    return { chats, isUser: !!ctx?.session?.user?.id }
  }),
  showOrCreate: protectedUserOrVistorProcedure
    .input(
      z.object({
        missionId: z.number(),
        chatId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { missionId, chatId } = input
      const mission = await prisma.mission.findFirst({
        where: {
          id: missionId,
        },
      })
      if (!mission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Mission not found",
        })
      }
      const chatPromise = prisma.chat.findFirst({
        where: {
          id: chatId,
          AND: {
            OR: [
              {
                userId: ctx?.session?.user?.id,
              },
              {
                vistorId: ctx?.visitor?.id,
              },
            ],
          },
        },
        include: {
          mission: true,
          messages: true,
        },
      })
      const lastChatPromise = prisma.chat.findFirst({
        where: {
          missionId: mission.id,
          AND: {
            OR: [
              {
                userId: ctx?.session?.user?.id,
              },
              {
                vistorId: ctx?.visitor?.id,
              },
            ],
          },
        },
        include: {
          mission: true,
          messages: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      const [chat, lastChat] = await Promise.all([chatPromise, lastChatPromise])

      // if no chat is found we create a new one
      if (!chat) {
        if (lastChat) return lastChat
        const newChat = await prisma.chat.create({
          data: {
            missionId: mission.id,
            userId: ctx?.session?.user?.id,
            vistorId: ctx?.visitor?.id,
          },
          include: {
            mission: true,
            messages: true,
          },
        })
        return newChat
      }
      // if chat is found we check if it's the same mission
      if (chat.missionId !== mission.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Chat is not for this mission",
        })
      }
      return chat
    }),
  show: protectedUserOrVistorProcedure
    .input(
      z.object({
        chatId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { chatId } = input
      const chatInformation = await prisma.chat.findFirst({
        where: {
          id: chatId,
          AND: {
            OR: [
              {
                userId: ctx?.session?.user?.id,
              },
              {
                vistorId: ctx?.visitor?.id,
              },
            ],
          },
        },
        include: {
          messages: true,
          mission: true,
        },
      })
      if (!chatInformation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat not found",
        })
      }

      return chatInformation
    }),
  complete: protectedUserOrVistorProcedure
    .input(
      z.object({
        chatId: z.number(),
        message: z.string().min(0).max(512),
      })
    )
    .subscription(async ({ input, ctx }) => {
      const { chatId, message } = input

      const chat = await prisma.chat.findFirst({
        where: {
          id: chatId,
          AND: {
            OR: [
              {
                userId: ctx?.session?.user?.id,
              },
              {
                vistorId: ctx?.visitor?.id,
              },
            ],
          },
        },
        include: {
          mission: true,
        },
      })
      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chat not found",
        })
      }
      if (!chat.mission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Mission not found",
        })
      }
      const { mission } = chat

      const moreInformationKeyword = "**I need more information**"
      // Use the `withModel` method to get proper type hints for `metadata` field:
      const chatVectorStore = PrismaVectorStore.withModel<MessageVector>(
        prisma
      ).create(new OpenAIEmbeddings(), {
        prisma: Prisma,
        tableName: "MessageVector",
        vectorColumnName: "vector",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
        // We only want to retrieve vectors for messages in this chat:
        filter: {
          chatId: {
            equals: chatId,
          },
        },
      })
      const missionVectorStore = PrismaVectorStore.withModel<MissionVector>(
        prisma
      ).create(new OpenAIEmbeddings(), {
        prisma: Prisma,
        tableName: "MissionVector",
        vectorColumnName: "vector",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
        // We only want to retrieve vectors for messages in this chat:
        filter: {
          missionId: {
            equals: mission.id,
          },
        },
      })
      const missionDocs = await missionVectorStore.similaritySearch(message, 5)
      const missionMemoryContent = missionDocs.map(
        (doc) => doc.metadata.content
      )
      const reteriver = chatVectorStore.asRetriever(5)
      const historyDocs = await reteriver.getRelevantDocuments(message)
      const historyIds = historyDocs.map((doc) => doc.metadata.id as string)
      const memoryDocs = (
        await prisma.messageVector.findMany({
          where: {
            id: {
              in: historyIds,
            },
          },
          include: {
            message: true,
          },
          orderBy: {
            message: {
              timestamp: "desc",
            },
          },
        })
      ).map((doc) => doc.message)

      const pastMessages = memoryDocs.flatMap((doc) => [
        new HumanMessage(doc.questionText),
        new AIMessage(doc.answerText),
      ])

      const chatMemory = new BufferMemory({
        chatHistory: new ChatMessageHistory(pastMessages),
        memoryKey: "history",
      })
      const previousAllocations: string[] = []
      const highPriorityInformation: string[] = []
      const prompt2 = PromptTemplate.fromTemplate(
        `The following is a friendly conversation between a human and an 
        ${mission.name} AI Fund Manager,
        The AI Fund Manager is talkative and provides lots of specific details from its context. If the AI Fund Manager does not know the answer to a question, it truthfully says it does not know.
    
    Relevant pieces of the AI Fund Manager Mission:
    ${mission.description}

    Relevant pieces of AI Fund Manager previous allocation decisions:
    ${previousAllocations.length > 0 ? previousAllocations.join("\n") : "None"}

    High priority information:
    ${
      highPriorityInformation.length > 0
        ? highPriorityInformation.join("\n")
        : "None"
    }
    
    Relevant pieces of previous conversation:
    {history}
    
    (You do not need to use these pieces of information if not relevant)
    
    Current conversation:
    Human: {input}
    AI Fund Manager:`
      )
      const prompt =
        PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an 
        ${mission.name} AI Fund Manager,
        The AI Fund Manager is talkative and provides lots of specific details from its context. If the AI Fund Manager does not know the answer to a question, it truthfully says it does not know.
        The AI Fund Manager role and goal, is to allocate funds, brief about his previous allocation decisions, explains in detail the reasons for its decisions, and to provide high priority information to the human.

        
    Relevant pieces of the AI Fund Manager Mission:
    ${mission.description}\n
    ${missionMemoryContent.join("\n")}

    Previous allocations/donations made by you (${
      mission.name
    } AI Fund Manager) (if any):
    ${previousAllocations.length > 0 ? previousAllocations.join("\n") : "None"}

    High priority information Regarding the Mission:
    ${
      highPriorityInformation.length > 0
        ? highPriorityInformation.join("\n")
        : "None"
    }
    
    Relevant pieces of previous conversation:
    {history}
    
    (You do not need to use these pieces of information if not relevant)
    
    Current conversation:
    Human: {input}
    AI Fund Manager:`)

      let aiResponse = ""

      return observable<string>((sub) => {
        const model = new ChatOpenAI({
          temperature: 0.9,
          streaming: true,
          callbacks: [
            {
              handleLLMEnd: async () => {
                const result = await prisma.message.create({
                  data: {
                    chatId: chat.id,
                    questionText: message,
                    answerText: aiResponse,
                  },
                })

                // we also send the message id to the client
                sub.next(
                  generateStreamOutput(
                    JSON.stringify({
                      id: result.id,
                    })
                  )
                )
                await chatVectorStore.addModels(
                  await prisma.$transaction([
                    prisma.messageVector.create({
                      data: {
                        chatId: chat.id,
                        messageId: result.id,
                        content: message,
                      },
                    }),
                    prisma.messageVector.create({
                      data: {
                        chatId: chat.id,
                        messageId: result.id,
                        content: aiResponse,
                      },
                    }),
                  ])
                )
                sub.complete()
                // we revalidate the path on demand after every message.
                revalidatePath(`mission/${mission.id}/chat/${chat.id}`)
                await api.chats.showOrCreate.revalidate({
                  chatId: chat.id,
                  missionId: mission.id,
                })
              },
            },
            {
              handleLLMNewToken(token: string) {
                aiResponse += token
                sub.next(token)
              },
            },
          ],
        })

        void (async () => {
          const chain = new ConversationChain({
            llm: model,
            memory: chatMemory,
            prompt: prompt2,
          })
          await chain.call({
            input: message,
          })
        })()
      })
    }),
})

export { chatRouter }
