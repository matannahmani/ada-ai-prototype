"use client"

import { useState } from "react"
import { cn } from "@lib/utils"
import { Button } from "@ui/button"

import { ChevronJacob, DonateIcon } from "../icons"

const MissionGoalCard = ({
  description,
  donateEnabled,
}: {
  donateEnabled?: boolean
  description: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-[240px] max-w-3xl bg-[#F1F1F1] border border-[#E5E5E5] rounded-lg  p-2 flex gap-1 flex-col text-accent-foreground">
      <div className="text-center mx-auto  text-lg font-bold leading-snug">
        OUR AI CAMPAIGN FUND <br className="sm:hidden" />
        MANAGER’S GOAL
      </div>
      <div
        className={cn(
          "transition-all duration-300 max-h-[120px] overflow-hidden leading-7 px-2 font-normal line-clamp-4",
          isExpanded ? "line-clamp-none max-h-[1000px]" : "line-clamp-4"
        )}
      >
        {description}
      </div>
      <div className="flex flex-wrap m-auto gap-4 items-center justify-center">
        {donateEnabled && (
          <Button className=" w-fit">
            Donate
            <DonateIcon className="ml-2" />
          </Button>
        )}
        <Button
          onClick={() => setIsExpanded((pre) => !pre)}
          variant="secondary"
          className=" w-fit"
        >
          Read More{" "}
          <ChevronJacob
            className={cn(
              "ml-2 transition-all duration-300 transform rotate-0",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </Button>
      </div>
    </div>
  )
}
export default MissionGoalCard
