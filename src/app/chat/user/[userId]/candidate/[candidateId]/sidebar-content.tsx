import { cache, memo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { AspectRatio } from "@ui/aspect-ratio"
import { Skeleton } from "@ui/skeleton"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

import SidebarCandidateBtn from "./sidebar-candidate-btn"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

/**
 * @experimental trying to use rsc offical cache api
 */
export const getCandidates = api.candidates.list.query

const MemoedCandidateImage = memo(function CandidateImage({
  candidate,
}: {
  candidate: Awaited<ReturnType<typeof getCandidates>>[number]
}) {
  return (
    <div className="mr-2 h-8 w-8">
      <AspectRatio ratio={1 / 1}>
        <Image
          alt={`${candidate.name} profile picture`}
          src={candidate.image}
          sizes="32px,32px"
          fill
          className="rounded-sm object-cover"
        />
      </AspectRatio>
    </div>
  )
})

async function ChatCandidateSidebar() {
  const candidates = await api.candidates.list.query()
  const session = await getServerAuthSession()
  return candidates?.map((candidate, i) => (
    <SidebarCandidateBtn candidateId={candidate.id} key={`btn-${i}`}>
      <Link
        href={`/chat/user/${session?.user.id ?? -1}/candidate/${candidate.id}`}
        key={`link-${i}`}
      >
        {/* <MemoedCandidateImage candidate={candidate} /> */}
        {candidate.name}
      </Link>
    </SidebarCandidateBtn>
  ))
}

function SidebarContent({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="">
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Candidates
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
