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

import { ChatIcon } from "../icons"

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
        "relative w-[310px] lg:w[420px] xl:w-[534px] h-[200px] lg:h-[320px] xl:h-[406px]",
        props.isMobile && "!h-[200px] w-full"
      )}
    >
      <Badge variant="secondary" className="absolute top-4 left-4 z-10">
        Urgent cause
      </Badge>
      <Image
        src={props.data.image}
        fill
        alt="Image"
        className="object-fill	rounded-none"
      />
    </div>
    <div className={cn("flex-1 flex flex-wrap  justify-center ")}>
      <div
        className={cn(
          "text-secondary-950 p-2 lg:p-8",
          props.isMobile && "!p-4"
        )}
      >
        <span className="text-xl lg:text-2xl font-semibold w-full">
          {props.data.title}
        </span>
        <br />
        <p
          className={cn(
            "line-clamp-4  lg:line-clamp-6 mt-2 lg:mt-6 text-md lg:pr-10",
            props.isMobile && "line-clamp-4 !pr-0 lg:mt-4"
          )}
        >
          {props.data.description}
        </p>
      </div>
      <div
        className={cn(
          "gap-4 mb-4 px-2 md:px-0 flex flex-col items-stretch md:flex-row flex-wrap lg:items-center justify-center py-2 w-full lg:px-2",
          !props.isMobile && "lg:px-12"
        )}
      >
        <Link
          className={cn(
            buttonVariants({}),
            "rounded-full drop-shadow-md lg:flex-1"
            // !props.isMobile && "w-fit"
          )}
          href={`/mission/${props.data.id}/chat/-1`}
        >
          Chat with AI
          <ChatIcon className="ml-2 h-4 w-5" />
        </Link>

        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
            "rounded-full drop-shadow-md lg:flex-1"
          )}
          href={`/mission/${props.data.id}`}
        >
          Learn more
          <Info className="ml-2 h-4 w-4 fill-white stroke-secondary" />
        </Link>
      </div>
    </div>
  </div>
)

export default MissionCard
