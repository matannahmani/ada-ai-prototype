import { type Mission } from "@prisma/client"
import { Button } from "@ui/button"
import { ChevronDown, HelpingHand } from "lucide-react"

type MissionGoalProps =
  | {
      mission: Mission
      loading?: undefined
    }
  | {
      loading: boolean
      mission?: undefined
    }

const MissionGoal = (props: MissionGoalProps) => {
  return (
    <div className="p-4 mx-auto max-w-xl w-full flex gap-4 flex-col text-accent-foreground bg-accent rounded-xl border border-neutral-200">
      <div className="text-center w-[280px] mx-auto  text-lg font-bold leading-snug">
        THE GOAL OF OUR CAMPAIGN
      </div>
      <div className="text-[12px] font-normal leading-relaxed line-clamp-6">
        {props.loading ? (
          <div className="flex flex-col gap-2">
            <span className="animate-pulse bg-muted-foreground/50 w-full h-4" />
            <span className="animate-pulse bg-muted-foreground/50 w-full h-4" />
            <span className="animate-pulse bg-muted-foreground/50 w-full h-4" />
          </div>
        ) : (
          props.mission?.goalText
        )}
      </div>
      <div className="flex flex-wrap gap-2 flex-row justify-center items-center">
        <Button className="w-[160px] sm:w-[200px]">
          <span className="ml-auto">Donate</span>

          <HelpingHand className="ml-auto" />
        </Button>
        <Button variant="secondary" className="w-[160px] sm:w-[200px]">
          <span className="ml-auto">Read More</span>

          <ChevronDown className="ml-auto" />
        </Button>
      </div>
    </div>
  )
}

export default MissionGoal
