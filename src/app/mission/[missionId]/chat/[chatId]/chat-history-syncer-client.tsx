"use client"

import { useEffect, useRef } from "react"
import { useParams, usePathname } from "next/navigation"
import { useAtom, useSetAtom } from "jotai"

import {
  chatCompletionPromptAtom,
  chatCompletionResAtom,
  chatCompletionStatusAtom,
  chatIdAtom,
  chatMessagesAtom,
  chatMessagesCounterAtom,
} from "./chat-utils"

/**
 * @description this hook will sync the chat history with the server
 * after the user change the candidate id the chat history will be cleared and loaded from the server
 * @important this hook should be important at the layout level
 */
export const ChatHistorySyncerClient = ({ initalMessagesCount = 0 }) => {
  const params = useParams() // Get current route
  const [chatId, setChatId] = useAtom(chatIdAtom)

  const setChatMessagesCounter = useSetAtom(chatMessagesCounterAtom)
  const setChatMessages = useSetAtom(chatMessagesAtom)
  const setChatCompletionStatus = useSetAtom(chatCompletionStatusAtom)
  const setChatCompletionPrompt = useSetAtom(chatCompletionPromptAtom)
  const setChatCompletionRes = useSetAtom(chatCompletionResAtom)

  useEffect(() => {
    setChatMessagesCounter(initalMessagesCount)
  }, [initalMessagesCount])

  /**
   * @description compare the current candidate id with the route candidate id
   * if they are not the same we will clear the client messages as we load the new messages from the server
   */
  useEffect(() => {
    if (chatId !== params?.chatId?.toString()) {
      setChatId(params?.chatId?.toString() || "")
      setChatMessages([])
      setChatCompletionStatus("complete")
      setChatCompletionPrompt("")
      setChatCompletionRes("")
    }
  }, [chatId])
  /**
   * @description first time the component is mounted we will set the candidate id from the route
   */
  useEffect(() => {
    if (chatId === "") {
      setChatId(params?.candidateId?.toString() || "")
    }
  }, [])
  return <></>
}
