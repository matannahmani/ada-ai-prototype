import { cache, memo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { getServerAuthSession, getVisitorSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { AspectRatio } from "@ui/aspect-ratio"
import { Skeleton } from "@ui/skeleton"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

import SidebarCandidateBtn from "./sidebar-candidate-btn"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

async function ChatCandidateSidebar() {
  const [session, vistor] = await Promise.all([
    getServerAuthSession(),
    getVisitorSession(),
  ])
  const userId = session?.user?.id || vistor?.id || "null"
  const chats = await api.chats.byUserId.query()
  return chats?.map((chat, i) => (
    <SidebarCandidateBtn chatId={chat.id} key={`btn-${i}`}>
      <Link prefetch={false} href={`./${chat.id}`} key={`link-${i}`}>
        {chat.mission.name}
      </Link>
    </SidebarCandidateBtn>
  ))
}

function SidebarContent({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="">
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight text-[#021444]">
            Previous Chats
          </h2>
          <ScrollArea className="h-[540px] px-2">
            <div className="space-y-1 p-2">
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
      </div>
    </div>
  )
}
export default memo(SidebarContent)
