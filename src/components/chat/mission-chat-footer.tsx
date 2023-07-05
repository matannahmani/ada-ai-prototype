import { Button } from "@ui/button"
import { HelpingHand, Share } from "lucide-react"

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
        <HelpingHand className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="secondary">Learn about previous donations</Button>
      <Button variant="outline" outlineColor="default">
        <Share className="mr-2 h-4 w-4" />
        Share your chat
      </Button>
      <span className="basis-full text-center font-semibold text-sm text-muted-foreground">
        Ada’s AI’s are the first AI’s to have similar legal rights to a human.
        Our AI owns donated funds and each AI is an expert towards each cause.
      </span>
    </div>
  )
}

export default MissionChatFooter
