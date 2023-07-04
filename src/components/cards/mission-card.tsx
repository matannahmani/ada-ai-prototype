import Image from "next/image"
import Link from "next/link"
import { cn } from "@lib/utils"
import { AspectRatio } from "@ui/aspect-ratio"
import { Badge } from "@ui/badge"
import { Button, buttonVariants } from "@ui/button"
import {
  Info,
  MessageCircle,
  MessageSquare,
  MessageSquareIcon,
} from "lucide-react"

type MissionCardData = {
  title: string
  description: string
  image: string
  id: string | number
  isUrgent?: boolean
}

type MissionCardProps = {
  isMobile?: boolean
  data: MissionCardData
}

const MissionCard = (props: MissionCardProps) => (
  <div
    className={cn(
      "flex flex-wrap gap-0 flex-1 sm:basis-full bg-slate-50 rounded-md overflow-hidden shadow-md max-w-[310px] sm:max-w-[calc(100vw-16px)] xl:w-[1086px]",
      props.isMobile && "!flex-[1_1_0]"
    )}
  >
    <div
      className={cn(
        "relative w-[310px] md:w[420px] xl:w-[534px] h-[200px] md:h-[320px] xl:h-[406px]",
        props.isMobile && "!h-[200px] w-full"
      )}
    >
      <Badge variant="secondary" className="absolute top-2 left-2 z-10">
        Urgent cause
      </Badge>
      <Image
        src={props.data.image}
        fill
        alt="Image"
        className="object-fill	rounded-none"
      />
    </div>
    <div className="flex-1 flex gap-2 flex-wrap p-2 md:p-4 justify-center ">
      <div className="text-secondary-950">
        <span className="text-lg  font-semibold w-full">
          {props.data.title}
        </span>
        <br />
        <p
          className={cn(
            "line-clamp-6 mt-4 lg:pr-10",
            props.isMobile && "line-clamp-4 !pr-0"
          )}
        >
          {props.data.description}
        </p>
      </div>
      <div className="gap-4 flex flex-wrap items-center justify-center py-2 w-full xl:w-fit">
        <Link
          className={cn(
            buttonVariants(),
            "rounded-full drop-shadow-md w-full xl:w-fit",
            !props.isMobile && "w-fit"
          )}
          href={`/mission/${props.data.id}/chat/-1`}
        >
          Chat with AI
          <MessageCircle className="ml-2 h-4 w-4" />
        </Link>

        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
            "rounded-full drop-shadow-md w-full xl:w-fit",
            !props.isMobile && "w-fit"
          )}
          href={`/mission/${props.data.id}`}
        >
          Learn more
          <Info className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
)

export default MissionCard
