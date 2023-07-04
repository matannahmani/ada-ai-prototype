import { Suspense } from "react"
import mission from "@/server/api/routes/mission"
import { api } from "@/trpc/server"

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
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        {mission?.name} Allocation Manager
      </h1>
      <h3 className="text-lg">{mission?.subtitle}</h3>
      <MissionGoal mission={mission} />
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
          <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
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