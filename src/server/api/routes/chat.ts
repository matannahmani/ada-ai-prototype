/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { revalidatePath, revalidateTag } from "next/cache"
import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { api } from "@/trpc/server"
import { generateCacheTag } from "@trpc/next/dist/app-dir/shared"
import { TRPCError } from "@trpc/server"
import { observable } from "@trpc/server/observable"
import { OpenAI } from "openai-streams"
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
          vistorId: ctx?.visitor?.id ?? "",
        },
      })
      await api.chats.byUserId.revalidate({
        userId: ctx?.session?.user?.id || ctx?.visitor?.id,
      })
      return chat
    }),
  byUserId: protectedUserOrVistorProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (
        !(
          input.userId === ctx.session?.user?.id ||
          input.userId === ctx?.visitor?.id
        )
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized - userId does not match session or visitor",
        })
      }
      const chats = await prisma.chat.findMany({
        where: {
          AND: {
            OR: [
              {
                userId: ctx?.session?.user?.id,
              },
              {
                vistorId: ctx?.visitor?.id ?? "",
              },
            ],
          },
        },
        include: {
          mission: true,
        },
      })
      return chats
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
                vistorId: ctx?.visitor?.id ?? "",
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
                vistorId: ctx?.visitor?.id ?? "",
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
            vistorId: ctx?.visitor?.id ?? "",
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
                vistorId: ctx?.visitor?.id ?? "",
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
                vistorId: ctx?.visitor?.id ?? "",
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const data = await OpenAI(
        "chat",
        {
          messages: [
            {
              content: `You're acting as mission: ${mission.name} personalized chatbot,
              you're goal is to provide accuracte responses while taking in considiration the mission opinion and the user's opinion.
              A person is asking you: ${message}, what is your response?
              in case of missing information you can ask for more information by saying: "${moreInformationKeyword}"`,
              role: "user",
            },
          ],
          model: "gpt-3.5-turbo",
        },
        {
          apiKey: env.OPEN_AI_API_KEY,
          // mode: 'raw',
        }
      )
      const reader = data.getReader()
      const decoder = new TextDecoder("utf-8")

      let content = ""
      let whileDecoding = true

      return observable<string>((sub) => {
        void (async () => {
          while (whileDecoding) {
            const { value, done } = await reader.read()
            const decoded = decoder.decode(value)
            content += decoded
            sub.next(decoded)
            if (done) {
              await prisma.message.createMany({
                data: [
                  // user message first
                  {
                    chatId: chat.id,
                    content: message,
                  },
                  // bot message second
                  {
                    chatId: chat.id,
                    content,

                    isResponse: true,
                  },
                ],
              })
              revalidatePath(`mission/${mission.id}/chats/${chat.id}`)
              void api.chats.showOrCreate.revalidate({
                chatId: chat.id,
                missionId: mission.id,
              })
              //   // we revalidate the path on demand after every message.
              //   // this is bugged on nextjs 14.4.4
              //   // @see https://github.com/vercel/next.js/issues/50714
              //   // try {
              //   //   revalidateTag(
              //   //     generateCacheTag("candidates.chatHistory", {
              //   //       chatId,
              //   //     })
              //   //   );
              //   // } catch (err) {
              //   //   console.error(err);
              //   // }
              whileDecoding = false
              sub.complete()
            }
          }
        })()
      })
    }),
})

export { chatRouter }
