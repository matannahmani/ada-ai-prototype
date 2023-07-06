import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { Separator } from "@ui/separator"

import { ClientChatMessages } from "@/components/chat/chat-client-messages"
import ChatHistorySyncerServer from "@/components/chat/chat-history-syncer-server"
import ChatPageHero from "@/components/chat/chat-page-hero"
import ChatBox from "@/components/chat/chatbox"
import CurrentConversationSection from "@/components/chat/current-conversation-section"
import MessageBox, { type TChat } from "@/components/chat/message-box"
import MessageStream from "@/components/chat/message-stream"
import MissionChatFooter from "@/components/chat/mission-chat-footer"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const runtime = "nodejs"
export const preferredRegion = "auto"

async function ChatPage({
  params,
}: {
  params: { missionId: string; chatId: string }
}) {
  const chat = await api.chats.showOrCreate.query({
    missionId: Number(params.missionId),
    chatId: Number(params.chatId),
  })
  if (`${params.chatId}` !== `${chat.id}`) {
    redirect(`/mission/${params.missionId}/chat/${chat.id}`)
  }
  const session = await getServerAuthSession()
  const { mission } = chat
  const user: TChat["user"] = {
    name: session?.user.name ?? "Anonymous",
    image: session?.user.image ?? "",
  }
  const chatProps: TChat = {
    mission,
    user,
    chatId: chat.id,
  }

  //   if (!session && params.userId !== "-1") {
  //     redirect(`/chat/user/-1/candidate/${params.missionId}`)
  //   }
  // if (session && params.userId !== session.user.id) {
  //   redirect(`/mission/${params.missionId}/chat/${session.user.id}/candidate`)
  // }
  return (
    <>
      <ChatHistorySyncerServer {...chatProps} />
      <div className="mr-auto  container px-2 ">
        <ChatPageHero {...params} />
        <Separator className="my-4 md:my-6" />
        <CurrentConversationSection />
        <div className="flex flex-col gap-2 relative">
          {/* <ScrollArea className="h-[calc(100vh-240px)] py-2 "> */}
          <MessageBox {...chatProps}>
            <>
              <ClientChatMessages {...chatProps} />
              <MessageStream {...chatProps} />
            </>
          </MessageBox>
          <MissionChatFooter {...chatProps} />
          <ChatBox />
          {/* </ScrollArea> */}
        </div>
      </div>
    </>
  )
}

export default ChatPage
