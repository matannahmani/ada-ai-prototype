import { Button } from "@ui/button"
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
      <Button>
        Donate
        <DonateIcon className="ml-2" />
      </Button>
      <Button variant="secondary">Learn about previous donations</Button>
      <Button variant="outline" outlineColor="default">
        <ShareIcon className="mr-2 h-4 w-4" />
        Share your chat
      </Button>
    </div>
  )
}

export default MissionChatFooter
