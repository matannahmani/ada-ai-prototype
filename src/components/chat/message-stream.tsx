/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { useEffect, useMemo, useRef } from "react"
import { useAtomValue } from "jotai"

import {
  chatCompletionPromptAtom,
  chatCompletionResAtom,
  chatCompletionStatusAtom,
  chatMessagesAtom,
  messageKeyTemplate,
  newMessageAtom,
} from "./chat-utils"
import { ChatMessage, type TChat } from "./message-box"

// I split this component into two components to make it easier to understand
// and to optimize the rendering of the chatbox
// the first component only renders the prompt once
// the second component re-renders the message from SSE stream
// probably can be optimized further by using react.memo and more separation

function MessagePrompt({ ...props }: TChat) {
  const prompt = useAtomValue(chatCompletionPromptAtom)
  const clientMessagesAtom = useAtomValue(chatMessagesAtom)
  const index = useMemo(() => clientMessagesAtom.length, [clientMessagesAtom])
  return (
    <ChatMessage
      key={messageKeyTemplate(index.toString(), "client")}
      message={prompt}
      name={props.user.name ?? ""}
      image={props.user.image ?? undefined}
      id={messageKeyTemplate(index.toString(), "client")}
    />
  )
}

function MessageResponse({ ...props }: TChat) {
  const prompt = useAtomValue(chatCompletionResAtom)
  const clientMessagesAtom = useAtomValue(chatMessagesAtom)
  const index = useMemo(() => clientMessagesAtom.length, [clientMessagesAtom])
  const ref = useRef<HTMLDivElement>(null)
  /**
   * @description scroll to the bottom of the chatbox on new message
   * interval of 100ms until the ref is null
   */
  useEffect(() => {
    const footerElement = document.getElementById(
      "chatbox-footer-scroll-indicator"
    )

    let isFirstScroll = true
    const interval = setInterval(() => {
      if (footerElement) {
        if (isFirstScroll) {
          isFirstScroll = false
          footerElement.scrollIntoView({
            behavior: "instant",
            block: "end",
          })
          return
        }
        footerElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <ChatMessage
        key={messageKeyTemplate(index.toString(), "response")}
        message={prompt}
        name={props.mission.name}
        image={props.mission.image}
        id={messageKeyTemplate(index.toString(), "response")}
      />
    </div>
  )
}

function MessageStream({ ...props }: TChat) {
  const status = useAtomValue(chatCompletionStatusAtom)
  if (status !== "streaming") {
    return null
  }

  return (
    <>
      <MessagePrompt {...props} />
      <MessageResponse {...props} />
    </>
  )
}

export default MessageStream
