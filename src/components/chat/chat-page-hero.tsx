import { Suspense } from "react"
import Link from "next/link"
import { api } from "@/trpc/server"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import { DonateButton } from "@ui/donate-button"

import MissionGoalCard from "../cards/mission-goal"
import { DonateIcon, ShareIcon } from "../icons"
import MissionGoal from "./mission-goal"
import PreviousUpdatesSection from "./previous-updates-section"

const ChatPageHeroAsync = async ({
  chatId,
  missionId,
}: {
  chatId: string
  missionId: string
}) => {
  const chat = await api.chats.showOrCreate.query({
    missionId: Number(missionId),
    chatId: Number(chatId),
  })
  const { mission } = chat
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#021444]">
        {mission?.name} Allocation Manager
      </h1>
      <h3 className="text-lg">{mission?.subtitle}</h3>
      <div className="flex flex-wrap mx-auto gap-4 items-center justify-center">
        <MissionGoalCard
          donate={{
            className: "hidden md:flex",
          }}
          description={mission.description}
        />
        <div className="flex-1 basis-full flex md:hidden">
          <DonateButton size="xl" className="w-full max-w-sm mx-auto " />
        </div>
        <Button
          variant="outline"
          outlineColor="default"
          className="md:hidden px-0 w-28"
        >
          <ShareIcon className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Link
          href={`/mission/${missionId}`}
          className={cn(
            buttonVariants({
              outlineColor: "secondary",
              variant: "outline",
            }),
            "md:hidden px-0 w-52"
          )}
        >
          How it works
        </Link>
      </div>
      <PreviousUpdatesSection missionId={mission.id} />
    </div>
  )
}

const ChatPageHero = ({
  chatId,
  missionId,
}: {
  chatId: string
  missionId: string
}) => (
  <Suspense
    fallback={
      <>
        <div className="w-full flex flex-col gap-4">
          <h1 className="font-semibold xs:text-xl text-2xl md:text-3xl lg:text-4xl">
            <span className="animate-pulse bg-muted-foreground/50 inline-block mr-2 w-32 h-6" />
          </h1>
          <h3 className="text-lg">
            <span className="animate-pulse bg-muted-foreground/50 inline-block w-[80%] h-5" />
          </h3>
          <MissionGoal loading={true} />
        </div>
      </>
    }
  >
    <ChatPageHeroAsync chatId={chatId} missionId={missionId} />
  </Suspense>
)

export default ChatPageHero
