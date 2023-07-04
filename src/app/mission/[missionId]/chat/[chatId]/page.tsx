import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { Button } from "@ui/button"
import { ScrollArea } from "@ui/scroll-area"
import { Separator } from "@ui/separator"
import { ChevronDown, HelpingHand } from "lucide-react"

import AuthRequiredPage from "@/components/auth/auth-required"

import { ClientChatMessages } from "./chat-client-messages"
import ChatHistorySyncerServer from "./chat-history-syncer-server"
import ChatBox from "./chatbox"
import CurrentConversationSection from "./current-conversation-section"
import MessageBox, { TChat } from "./message-box"
import MessageStream from "./message-stream"
import MissionChatFooter from "./mission-chat-footer"
import MissionGoal from "./mission-goal"
import PreviousUpdatesSection from "./previous-updates-section"

export const dynamic = "auto"
// revaildate every 24 hours we will use next on demand revalidation endpoint on new messages
// export const revalidate = 86400;
export const fetchCache = "auto"
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
      <div className="mr-auto  max-w-full container px-2 ">
        <div className="w-fit flex flex-col gap-4">
          <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
            {mission?.name} Allocation Manager
          </h1>
          <h3 className="text-lg">{mission?.subtitle}</h3>
          <MissionGoal mission={mission} />
          <PreviousUpdatesSection missionId={mission.id} />
        </div>
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
