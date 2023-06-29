import Link from "next/link"
import { cn } from "@lib/utils"
import { buttonVariants } from "@ui/button"
import { ScrollArea, ScrollBar } from "@ui/scroll-area"

import MobileCardsContainer from "./mobile-cards-container"

type CardsContainerProps = {
  children: React.ReactNode | React.ReactNode[]
  title: string
  link?: {
    href: string
    label: string
  }
}

const CardsContainer = ({ ...props }: CardsContainerProps) => {
  return (
    <div className="sm:container items-center sm:items-start  flex flex-col gap-6 py-4">
      <div id="candidate-container" className="px-1 flex items-center gap-4">
        <h2 className="text-2xl font-bold  tracking-tight">{props.title}</h2>
        {props.link && (
          <Link
            href={props.link.href}
            className={cn(
              buttonVariants({
                size: "xs",
                variant: "secondary",
              }),
              "rounded-full px-4"
            )}
          >
            {props.link.label}
          </Link>
        )}
      </div>
      {/* @ts-expect-error - can only be list */}
      <MobileCardsContainer>{props.children}</MobileCardsContainer>
      <div className="hidden sm:flex flex-wrap gap-4  ">{props.children}</div>
    </div>
  )
}

export default CardsContainer
