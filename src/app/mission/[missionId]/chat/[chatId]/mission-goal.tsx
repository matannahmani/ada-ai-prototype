import { type Mission } from "@prisma/client"
import { Button } from "@ui/button"
import { ChevronDown, HelpingHand } from "lucide-react"

const MissionGoal = ({ mission }: { mission: Mission }) => {
  return (
    <div className="p-4 mx-auto max-w-xl w-full flex gap-4 flex-col text-accent-foreground bg-accent rounded-xl border border-neutral-200">
      <div className="text-center w-[280px] mx-auto  text-lg font-bold leading-snug">
        THE GOAL OF OUR CAMPAIGN
      </div>
      <div className="text-[12px] font-normal leading-relaxed line-clamp-6">
        {mission?.goalText}
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
