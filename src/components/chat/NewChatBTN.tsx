"use client"

import { useCallback, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/trpc/client"
import { cn } from "@lib/utils"
import { Button, type ButtonVaraintProps } from "@ui/button"
import { Loader2 } from "lucide-react"

export const NewChatBTN = ({
  className,
  size,
  label,
}: {
  label?: string
  size?: ButtonVaraintProps["size"]
  className?: string
}) => {
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
  }, [params?.missionId, router])
  return (
    <Button
      disabled={isLoading}
      variant="outline"
      outlineColor="secondary"
      onClick={() => newChatHandler()}
      className={cn(className)}
      size={size ?? "sm"}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label ?? "Start a new Chat"}
    </Button>
  )
}
