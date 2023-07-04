import { api } from "@/trpc/server"

import { ChatHistorySyncerClient } from "./chat-history-syncer-client"
import { type TChat } from "./message-box"

async function ChatHistorySyncerServer({ ...props }: TChat) {
  const chat = await api.chats.show.query({
    chatId: props.chatId,
  })
  return (
    <ChatHistorySyncerClient
      initalMessagesCount={chat.messages.length / 2 ?? 0}
    />
  )
}

export default ChatHistorySyncerServer
