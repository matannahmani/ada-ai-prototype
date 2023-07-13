/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { forwardRef, memo, Suspense } from "react"
import { api } from "@/trpc/server"
import { type Mission } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Button } from "@ui/button"
import { Separator } from "@ui/separator"
import { Share2, ThumbsDown, ThumbsUp } from "lucide-react"

import { ClientChatMessages } from "./chat-client-messages"
import { ChatMessageMarkdown } from "./message-markdown"

export type TChat = {
  mission: Mission
  chatId: number
  user: {
    name?: string
    image?: string
  }
}

const ChatAvatar = memo(
  ({ image, name }: { name: string; image: string | undefined }) => {
    return (
      <Avatar className="mr-2 h-12 w-12 rounded-sm">
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
  }
)
ChatAvatar.displayName = "ChatAvatar"

const ChatMessageHeader = memo(({ name }: { name: string }) => {
  return (
    <div className="w-fit">
      <p className="w-fit text-sm font-medium leading-none capitalize">
        {name.toLowerCase()}
      </p>
      <Separator className="my-1" />
    </div>
  )
})
ChatMessageHeader.displayName = "ChatMessageHeader"

const ChatMessageBody = memo(({ message }: { message: string }) => {
  return <ChatMessageMarkdown>{message}</ChatMessageMarkdown>
})
ChatMessageBody.displayName = "ChatMessageBody"

type ChatMessageProps = {
  id: string
  image?: string
  name: string
  message: string
  isResponse?: boolean
}

const ChatMessageFooter = memo(() => {
  return (
    <div className="flex flex-row color-[#404040] flex-wrap gap-2 items-center justify-end mt-2 md:mt-4">
      <Button className="rounded-md" variant="ghost">
        <Share2 className="w-5 h-5 cursor-pointer" />
      </Button>
      <Button className="rounded-md" variant="ghost">
        <ThumbsUp className="w-5 h-5 cursor-pointer" />
      </Button>
      <Button className="rounded-md" variant="ghost">
        <ThumbsDown className="w-5 h-5 cursor-pointer" />
      </Button>
    </div>
  )
})
ChatMessageFooter.displayName = "ChatMessageFooter"

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ id, image, name, message, isResponse }, ref) => {
    return (
      <div ref={ref} id={id} className="flex gap-2 text-[#1C1C1C]">
        <ChatAvatar name={isResponse ? "AI" : name} image={image}></ChatAvatar>
        <div className="relative w-full">
          <ChatMessageHeader name={name} />
          <ChatMessageBody message={message} />
          {isResponse && <ChatMessageFooter />}
        </div>
      </div>
    )
  }
)

ChatMessage.displayName = "ChatMessage"
export { ChatMessage }

const MessagePlaceholder = () => {
  return (
    <div className="flex gap-2">
      <div className="mr-2 h-12 w-12 animate-pulse rounded-sm bg-muted/50"></div>
      <p className="h-6 w-full animate-pulse rounded-sm bg-muted/50"></p>
    </div>
  )
}

async function ChatHistory({ ...props }: TChat) {
  const chat = await api.chats.showOrCreate.query({
    missionId: props.mission.id,
    chatId: props.chatId,
  })
  return (
    <>
      {chat.messages.map((message) => (
        <>
          <ChatMessage
            key={`message-${message.id}-q`}
            message={message.questionText}
            name={props.user.name ?? "Anonymous"}
            image={props.user?.image ?? undefined}
            id={`message-${message.id}-q`}
          />
          <ChatMessage
            key={`message-${message.id}-a`}
            message={message.answerText}
            name={props.mission.name}
            isResponse={true}
            image={props.mission.image}
            id={`message-${message.id}-a`}
          />
        </>
      ))}
      <ClientChatMessages
        {...props}
        ids={chat.messages.map((message) => message.id)}
      />
    </>
  )
}

const MessageBox = ({
  mission: candidate,
  user,
  children,
  chatId,
}: TChat & {
  children: React.ReactNode
}) => {
  return (
    <div
      id="chat-container"
      className=" backdrop-blur [&>*:nth-child(even)]:bg-[#EFF5FF]  [&>*:nth-child(odd)]:bg-[#FAFAFF] [&>*]:p-4"
    >
      <ChatMessage
        name={candidate?.name}
        message={`Hello and welcome! I'm ${
          candidate?.name
        } personalized chatbot. As a chatbot, I'm here to
            assist you and provide information about our campaign and political
            agendas. Whether you have questions, concerns, or simply want to learn
            more about what we do, feel free to ask. I'm here to help! So,
            ${user?.name ?? ""}, how can I assist you today?`}
        image={candidate?.image ?? undefined}
        id={"opening-message"}
      />
      <Suspense
        fallback={new Array(3).fill(0).map((_, i) => (
          <MessagePlaceholder key={`placeholder-${i}`} />
        ))}
      >
        <ChatHistory chatId={chatId} mission={candidate} user={user} />
        {children}
      </Suspense>
    </div>
  )
}

export default MessageBox
