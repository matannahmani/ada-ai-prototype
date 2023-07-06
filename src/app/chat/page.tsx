import Link from "next/link"
import { redirect } from "next/navigation"
import { api } from "@/trpc/server"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import { CircleOff } from "lucide-react"

const ChatPage = async () => {
  const lastChat = await api.chats.getLastChat.query()
  if (lastChat) {
    redirect(`/mission/${lastChat.missionId}/chat/${lastChat.id}`)
  }
  return (
    <div className="container w-full flex flex-col items-center justify-center gap-4 flex-1">
      <CircleOff className="w-12 h-12 mx-auto" />
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        No chats found
      </h1>
      <h3 className="text-lg">Please create a chat first.</h3>
      <Link
        href={"/#candidate-container"}
        rel="noreferrer"
        className={cn(
          buttonVariants({
            variant: "secondary",
          }),
          "w-fit"
        )}
      >
        View Missions
      </Link>
    </div>
  )
}

export default ChatPage
