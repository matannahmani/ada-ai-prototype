import { headers } from "next/headers"
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

export const runtime = "nodejs"
export const preferredRegion = "auto"
export const fetchCache = "only-no-store"

async function ChatPage({
  params,
}: {
  params: { missionId: string; chatId: string }
}) {
  headers()
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
      <div className="mr-auto  sm:container sm:px-2 ">
        <section className="px-2 sm:px-0">
          <ChatPageHero {...params} />
          <Separator className="my-4 md:my-6" />
          <CurrentConversationSection />
        </section>
        <section className="flex flex-col gap-2 relative">
          <MessageBox {...chatProps}>
            <>
              <MessageStream {...chatProps} />
            </>
          </MessageBox>
        </section>
        <div className="px-2 sm:px-0 gap-2 my-2">
          <MissionChatFooter {...chatProps} />
        </div>
        <ChatBox />
        <div className="px-2 sm:px-0 my-2">
          <span className="basis-full text-center my-2 mt-4 text-sm text-[#9C9C9C] italic">
            Ada’s AI’s are the first AI’s to have similar legal rights to a
            human. Our AI owns donated funds and each AI is an expert towards
            each cause.
          </span>
        </div>
      </div>
    </>
  )
}

export default ChatPage
