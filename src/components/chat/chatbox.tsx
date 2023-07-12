"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { streamApi } from "@/trpc/client"
import { parseStreamOutput } from "@/trpc/generateStreamOutput"
import { cn } from "@lib/utils"
import { type Chat } from "@prisma/client"
import { Button } from "@ui/button"
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/hover-card"
import { ScrollArea } from "@ui/scroll-area"
import { Textarea } from "@ui/textarea"
import { useAtom, useSetAtom } from "jotai"
import { Loader2, Send } from "lucide-react"

import {
  chatCompletionPromptAtom,
  chatCompletionResAtom,
  chatCompletionStatusAtom,
  chatMessagesCounterAtom,
  chatResponseIdAtom,
  useIsChatDisabled,
  useOnResponseComplete,
} from "./chat-utils"

const ChatBox = () => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setChatCompletionStatus = useSetAtom(chatCompletionStatusAtom)
  const setChatCompletionPrompt = useSetAtom(chatCompletionPromptAtom)
  const setChatMessagesCounter = useSetAtom(chatMessagesCounterAtom)
  const setChatResponseId = useSetAtom(chatResponseIdAtom)
  const setChatCompletionRes = useSetAtom(chatCompletionResAtom)
  const params = useParams()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const buttonDivRef = useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  const appendMessageHandler = useOnResponseComplete()
  const isChatDisabled = useIsChatDisabled()
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
            setChatResponseId(-1)
            setChatMessagesCounter((pre) => pre + 1)
          },
          onData: (data) => {
            const streamData = parseStreamOutput(data)
            if (!!streamData) {
              try {
                const parsedData = JSON.parse(streamData) as {
                  id: number
                }
                if (parsedData?.id) setChatResponseId(parsedData.id)
              } catch (err) {
                console.error(err)
              }
              return
            }
            setChatCompletionRes((pre) => pre + data)
          },
          onComplete: () => {
            setChatCompletionStatus("complete")
            appendMessageHandler()
            router.refresh()
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

  const onTextChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // set text
      setText(e.target.value)
      // calculate height of textarea based on content and set it
      if (textAreaRef.current) {
        if (e.target.value.length === 0) {
          // center textarea if empty and placeholder to center
          textAreaRef.current.style.height = "auto"
          textAreaRef.current.style.height = "2.5rem"
          buttonDivRef.current?.classList.remove("bottom-2")
          return
        }
        if (textAreaRef.current.scrollHeight > 48) {
          buttonDivRef.current?.classList.add("bottom-2")
          textAreaRef.current.style.height = "auto"
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
      }
    },
    [textAreaRef]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmitHandler(text)
      }}
      className="
      py-1
      border border-input
      overflow-hidden
      ring-offset-background
      focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
      sticky bottom-4 flex items-center shadow-xl  z-10 rounded-md bg-background mx-4 "
    >
      <Textarea
        disabled={isChatDisabled}
        value={text}
        ref={textAreaRef}
        className={cn(
          "h-10 min-h-fit leading-6 max-h-52 p-2 pr-20 w-full overflow-auto border-none resize-none !outline-none !ring-0",
          isChatDisabled && "!placeholder-destructive"
        )}
        onChange={onTextChangeHandler}
        placeholder={
          isChatDisabled
            ? "You have reached the maximum number of messages, please open a new chat."
            : "Type your message"
        }
      />

      <HoverCard openDelay={0}>
        <HoverCardTrigger ref={buttonDivRef} className="absolute right-2">
          <Button
            variant="default"
            size="sm"
            className="rounded-md"
            disabled={isLoading || isChatDisabled}
            onClick={() => onSubmitHandler(text)}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Send message</p>
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCard>
    </form>
  )
}
export default ChatBox
