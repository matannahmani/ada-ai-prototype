"use client"

import { cn } from "@lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

import {
  chatMessageLimit,
  chatMessagesCounterAtom,
  useIsChatDisabled,
} from "./chat-utils"
import { NewChatBTN } from "./NewChatBTN"

const CurrentConversationSection = () => {
  const messages = useAtomValue(chatMessagesCounterAtom)
  const isChatDisabeld = useIsChatDisabled()

  return (
    <div className="flex-col md:flex-row flex-wrap flex gap-2 md:gap-4 items-center justify-start mb-4">
      <span className=" text-xl font-semibold tracking-tight text-center ">
        Current Conversation
      </span>
      <div
        className={cn(
          "italic flex font-semibold text-[0.75rem] text-[#9C9C9C] -mt-1 md:mt-0",
          isChatDisabeld && "text-destructive"
        )}
      >
        {messages} / {chatMessageLimit} Messages Sent
      </div>
      <NewChatBTN className="md:px-10 hidden md:flex" />
    </div>
  )
}

export default CurrentConversationSection
