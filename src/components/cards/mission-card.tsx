import Image from "next/image"
import Link from "next/link"
import { cn } from "@lib/utils"
import { AspectRatio } from "@ui/aspect-ratio"
import { Button } from "@ui/button"
import {
  Info,
  MessageCircle,
  MessageSquare,
  MessageSquareIcon,
} from "lucide-react"

type MissionCardProps = {
  isMobile?: boolean
}

const MissionCard = (props: MissionCardProps) => (
  <div
    className={cn(
      "flex flex-wrap gap-0 flex-1 sm:basis-full bg-slate-50 rounded-md overflow-hidden shadow-md max-w-[310px] md:max-w-[calc(100vw-16px)] lg:w-[1086px]",
      props.isMobile && "!flex-[1_1_0]"
    )}
  >
    <div
      className={cn(
        "relative w-[310px] md:w[420px] lg:w-[534px] h-[160px] sm:h-[406px]",
        props.isMobile && "!h-[160px]"
      )}
    >
      <Image
        src="/card.jpg"
        fill
        alt="Image"
        className="object-fill	rounded-none"
      />
    </div>
    <div className="flex-1 flex gap-2 flex-wrap p-4 justify-center ">
      <div className="">
        <span className="text-lg font-semibold w-full">
          HELP HOMELESS IN LOS ANGELAS
        </span>
        <br />
        <span
          className={cn("hidden sm:line-clamp-6", props.isMobile && "!hidden")}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt hic
          doloribus dolore quasi, labore magni! Soluta doloremque omnis tempora,
          eaque perspiciatis quod amet illum vitae dicta neque, sunt nam ipsum!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
          minus sit aspernatur nihil a cumque deleniti saepe quia at autem
          error, animi consequatur, fuga, eum mollitia eius vitae sed in.
        </span>
      </div>
      <div className="gap-4 flex items-center justify-center py-2">
        <Button className="rounded-full drop-shadow-md">
          Chat with AI
          <MessageCircle className="ml-2 h-4 w-4" />
        </Button>
        <Link href="/mission/1">
          <Button variant="secondary" className="rounded-full drop-shadow-md">
            Learn more
            <Info className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
)

export default MissionCard
