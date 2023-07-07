import { api } from "@/trpc/server"

import { ChatHistorySyncerClient } from "./chat-history-syncer-client"
import { type TChat } from "./message-box"

async function ChatHistorySyncerServer({ ...props }: TChat) {
  const chat = await api.chats.showOrCreate.query({
    missionId: props.mission.id,
    chatId: props.chatId,
  })
  return (
    <ChatHistorySyncerClient initalMessagesCount={chat.messages?.length ?? 0} />
  )
}

export default ChatHistorySyncerServer
