/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Suspense } from "react"
import { api } from "@/trpc/server"
import { type MissionUpdatesItem } from "@prisma/client"
import { ScrollArea } from "@ui/scroll-area"

function UpdateCard({ update }: { update: MissionUpdatesItem }) {
  return <div key={update.id}>{update.content}</div>
}

function UpdatesSection({ updates }: { updates: MissionUpdatesItem[] }) {
  if (updates.length === 0) {
    return (
      <span className="text-muted-foreground text-center text-lg">
        No updates yet...
      </span>
    )
  }
  return (
    <div>
      <ScrollArea oreintation="vertical" className="h-24 w-full">
        <div className="flex flex-row gap-4">
          {updates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function SectionTitle({ length }: { length: number }) {
  return (
    <span className="scroll-m-20 text-xl font-semibold tracking-tight text-center ">
      Learn more about our previous allocations ({length})
    </span>
  )
}

async function AsyncPreviousUpdatesSection({
  missionId,
}: {
  missionId: number
}) {
  const updates = await api.mission.updates.show.query({
    missionId,
  })
  if (updates.length === 0) return null

  return (
    <>
      <SectionTitle length={updates.length} />
      <UpdatesSection
        updates={updates.flatMap((update) => update.missionUpdatesItem)}
      />
    </>
  )
}

function PreviousUpdatesSectionFallback() {
  return (
    <>
      <SectionTitle length={0} />
      <ScrollArea oreintation="vertical" className="h-24 w-full">
        <div className="flex flex-row gap-4">
          <div className="animate-pulse bg-neutral-200 rounded-xl h-24 w-48" />
          <div className="animate-pulse bg-neutral-200 rounded-xl h-24 w-48" />
          <div className="animate-pulse bg-neutral-200 rounded-xl h-24 w-48" />
          <div className="animate-pulse bg-neutral-200 rounded-xl h-24 w-48" />
        </div>
      </ScrollArea>
    </>
  )
}

function PreviousUpdatesSection({ missionId }: { missionId: number }) {
  return (
    <Suspense fallback={<PreviousUpdatesSectionFallback />}>
      <AsyncPreviousUpdatesSection missionId={missionId} />
    </Suspense>
  )
}

export default PreviousUpdatesSection
