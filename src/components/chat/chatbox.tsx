"use client"

import { useCallback, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { streamApi } from "@/trpc/client"
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/hover-card"
import { Textarea } from "@ui/textarea"
import { useSetAtom } from "jotai"
import { Loader2, Send } from "lucide-react"

import {
  chatCompletionPromptAtom,
  chatCompletionResAtom,
  chatCompletionStatusAtom,
  chatMessagesCounterAtom,
  useOnResponseComplete,
} from "./chat-utils"

const ChatBox = () => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setChatCompletionStatus = useSetAtom(chatCompletionStatusAtom)
  const setChatCompletionPrompt = useSetAtom(chatCompletionPromptAtom)
  const setChatMessagesCounter = useSetAtom(chatMessagesCounterAtom)
  const setChatCompletionRes = useSetAtom(chatCompletionResAtom)
  const params = useParams()
  const router = useRouter()
  const appendMessageHandler = useOnResponseComplete()

  const onSubmitHandler = useCallback(
    (text: string) => {
      setText("")
      if (text.length < 3 || text.length > 512) {
        return
      }
      setIsLoading(true)
      streamApi.chats.complete.subscribe(
        {
          chatId: Number(params?.chatId as string),
          message: text,
        },
        {
          onStarted: () => {
            setChatCompletionStatus("streaming")
            setChatCompletionPrompt(text)
            setChatCompletionRes("")
            setChatMessagesCounter((pre) => pre + 1)
          },
          onData: (data) => {
            setChatCompletionRes((pre) => pre + data)
          },
          onComplete: () => {
            setChatCompletionStatus("complete")
            appendMessageHandler()
            setIsLoading(false)
          },
          onStopped() {
            setIsLoading(false)
          },
          onError: (err) => {
            console.error(err)
            setChatCompletionStatus("error")
            router.refresh()
            setIsLoading(false)
          },
        }
      )
    },
    [params?.chatId]
  )

  return (
    <div className="sticky bottom-4 flex items-center shadow-xl z-10 bg-background mx-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message here."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmitHandler(text)
        }}
        className="absolute right-4"
      >
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <button disabled={isLoading} onClick={() => onSubmitHandler(text)}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
            </button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Send message</p>
            <HoverCardArrow />
          </HoverCardContent>
        </HoverCard>
      </form>
    </div>
  )
}
export default ChatBox
