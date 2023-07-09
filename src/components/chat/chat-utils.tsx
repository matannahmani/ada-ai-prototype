"use client"

import { useCallback, useMemo } from "react"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useAtomCallback } from "jotai/utils"

/**
 * @description this is a atom will show the new message while it's beeing streamed
 */

export const newMessageAtom = atom<{
  text: string
  question: string
  reason?: string
  status: "error" | "streaming" | "complete" | "abort"
}>({
  text: "",
  question: "",
  status: "complete",
})

export const messageKeyTemplate = (id: string, type: "client" | "response") =>
  `new-message-${id}-${type}`

export const chatMessagesCounterAtom = atom<number>(0)

export const chatMessagesAtom = atom<
  {
    id: number
    question: string
    answer: string
  }[]
>([])

export const chatMessageLimit = 25

export const useIsChatDisabled = () => {
  const messageCounter = useAtomValue(chatMessagesCounterAtom)
  const isChatDisabled = useMemo(
    () => messageCounter >= chatMessageLimit,
    [messageCounter]
  )
  return isChatDisabled
}

export const chatIdAtom = atom<string>("")
export const chatResponseIdAtom = atom<number>(-1)
export const chatCompletionStatusAtom = atom<
  "error" | "streaming" | "complete" | "abort"
>("complete")
export const chatCompletionPromptAtom = atom<string>("")
export const chatCompletionResAtom = atom<string>("")
export const useOnResponseComplete = () => {
  const setClientMessages = useSetAtom(chatMessagesAtom)
  const readChatResponse = useAtomCallback(
    useCallback((get) => {
      const currCount = get(chatCompletionResAtom)
      return currCount
    }, [])
  )
  const readResponseId = useAtomCallback(
    useCallback((get) => {
      const currCount = get(chatResponseIdAtom)
      console.log("current id", currCount)
      return currCount
    }, [])
  )
  const readChatPrompt = useAtomCallback(
    useCallback((get) => {
      const currCount = get(chatCompletionPromptAtom)
      return currCount
    }, [])
  )
  const appendMessageHandler = useCallback(() => {
    const prompt = readChatPrompt()
    const response = readChatResponse()
    const id = readResponseId()
    console.log("append current id", id)

    setClientMessages((prev) => {
      return [
        ...prev,
        {
          id,
          question: prompt,
          answer: response,
        },
      ]
    })
  }, [readChatPrompt, readChatResponse, readResponseId, setClientMessages])
  return appendMessageHandler
}
