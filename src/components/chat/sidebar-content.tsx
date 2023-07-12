import { cache, memo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { isTRPCServerError, withErrorHandler } from "@/server/lib/utils"
import { api } from "@/trpc/server"
import { AspectRatio } from "@ui/aspect-ratio"
import { Skeleton } from "@ui/skeleton"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

import { NewChatBTN } from "./NewChatBTN"
import SidebarCandidateBtn from "./sidebar-candidate-btn"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

async function ChatCandidateSidebar() {
  const chats = await withErrorHandler(api.chats.byUserId.query(), (err) => {
    if (isTRPCServerError(err)) {
      if (err.data?.code === "UNAUTHORIZED") return redirect("/sign-in")
    }
  })
  return chats?.chats?.map((chat, i) => (
    <SidebarCandidateBtn chatId={chat.id} key={`btn-${chat.id}`}>
      <div className="flex flex-col   gap-0 cursor-pointer">
        <Link prefetch={false} href={`./${chat.id}`} key={`link-${i}`}>
          {chat.mission.name}
        </Link>

        <span className="text-[10px]  text-sm text-muted-foreground">
          Started At - {chat.createdAt.toLocaleDateString()}{" "}
          {chat.createdAt.toLocaleTimeString()}
        </span>
      </div>
    </SidebarCandidateBtn>
  ))
}

async function SidebarChatCounter() {
  const chats = await withErrorHandler(api.chats.byUserId.query(), (err) => {
    if (isTRPCServerError(err)) {
      if (err.data?.code === "UNAUTHORIZED") return redirect("/sign-in")
    }
  })
  return (
    <span
      className={cn(
        "ml-1",
        chats?.chats?.length === 15 && !chats.isUser ? "text-destructive" : ""
      )}
    >
      {chats?.chats?.length}
      {!chats.isUser ? "/15" : ""}
    </span>
  )
}

function SidebarContent({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 px-6 py-2 flex flex-col", className)}>
      <div className="flex flex-wrap justify-start items-center gap-2 px-1.5">
        <h2 className="relative xs:text-sm text-lg font-semibold tracking-tight text-[#021444]">
          Previous Chats
        </h2>
        <NewChatBTN
          label="New Chat"
          className="xs:px-2 xs:py-2 xs:h-6 h-8 lg:hidden w-fit"
        />
      </div>
      {/* <div className="flex justify-start items-center px-2 text-sm text-muted-foreground">
        Total Chats:{"  "}
        <Suspense
          fallback={
            <Loader2 className="animate-spin w-6 h-6 text-accent-foreground ml-1" />
          }
        >
          <SidebarChatCounter />
        </Suspense>
      </div> */}
      <ScrollArea className="h-[540px]">
        <div className="space-y-1 p-2 px-0">
          <Suspense
            fallback={new Array(10).fill(0).map((_, i) => (
              <Skeleton className="h-[36px] w-full" key={`skeleton-${i}`} />
            ))}
          >
            <ChatCandidateSidebar />
          </Suspense>
        </div>
      </ScrollArea>
    </div>
  )
}
export default memo(SidebarContent)
