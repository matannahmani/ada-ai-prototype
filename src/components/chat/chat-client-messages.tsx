"use client"

import { useEffect } from "react"
import { useAtomValue } from "jotai"

import { chatMessagesAtom, messageKeyTemplate } from "./chat-utils"
import { ChatMessage, TChat } from "./message-box"

export const ClientChatMessages = ({
  ...props
}: TChat & {
  ids: number[]
}) => {
  const messages = useAtomValue(chatMessagesAtom)
  const messagesToShow = messages.filter(
    (message) => !props.ids.includes(message.id)
  )

  return (
    <>
      {messagesToShow.map((message, index) => {
        return (
          <>
            <ChatMessage
              image={props.user?.image ?? undefined}
              id={messageKeyTemplate(index.toString(), "client")}
              name={props.user?.name ?? ""}
              message={message.question}
            />
            <ChatMessage
              image={props.mission.image}
              id={messageKeyTemplate(index.toString(), "response")}
              isResponse
              name={props.mission.name}
              message={message.answer}
            />
          </>
        )
      })}
    </>
  )
}
