import Link from "next/link"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import { DonateButton } from "@ui/donate-button"
import { HelpingHand, Share } from "lucide-react"

import { DonateIcon, ShareIcon } from "../icons"
import { type TChat } from "./message-box"

const MissionChatFooter = (props: TChat) => {
  return (
    <div
      id="chatbox-footer"
      className="flex relative flex-wrap flex-col md:flex-row gap-2 justify-center mb-2"
    >
      <div
        id="chatbox-footer-scroll-indicator"
        className="absolute -bottom-40"
      />
      <DonateButton />
      <Link
        href={`/mission/${props.mission.id}`}
        className={cn(
          buttonVariants({
            variant: "secondary",
          })
        )}
      >
        Learn about previous donations
      </Link>
      <Button variant="outline" outlineColor="default">
        <ShareIcon className="mr-2 h-4 w-4" />
        Share your chat
      </Button>
    </div>
  )
}

export default MissionChatFooter
