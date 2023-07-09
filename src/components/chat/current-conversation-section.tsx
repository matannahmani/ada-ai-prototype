"use client"

import { useCallback, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/trpc/client"
import { cn } from "@lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@ui/button"
import { useAtomValue } from "jotai"
import { Loader2 } from "lucide-react"

import {
  chatMessageLimit,
  chatMessagesCounterAtom,
  useIsChatDisabled,
} from "./chat-utils"

const NewChatBTN = () => {
  const params = useParams() // Get current route
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const newChatHandler = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await api.chats.createOne.mutate({
        missionId: Number(params?.missionId) ?? -1,
      })
      if (data) {
        router.refresh()
        router.push(`./${data.id}`)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [params])
  return (
    <Button
      disabled={isLoading}
      variant="outline"
      outlineColor="secondary"
      onClick={() => newChatHandler()}
      className="md:px-10 rounded-full"
      size="sm"
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Start a new Chat
    </Button>
  )
}

const CurrentConversationSection = () => {
  const messages = useAtomValue(chatMessagesCounterAtom)
  const isChatDisabeld = useIsChatDisabled()

  return (
    <div className="flex flex-wrap flex-row gap-4 items-center justify-start mb-4">
      <span className="text-xl font-semibold tracking-tight text-center ">
        Current Conversation
      </span>
      <div
        className={cn(
          "italic flex font-semibold text-[0.75rem] text-[#9C9C9C]",
          isChatDisabeld && "text-destructive"
        )}
      >
        {messages} / {chatMessageLimit} Messages Sent
      </div>
      <NewChatBTN />
    </div>
  )
}

export default CurrentConversationSection
