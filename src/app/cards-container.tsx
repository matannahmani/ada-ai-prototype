import Link from "next/link"
import { cn } from "@lib/utils"
import { buttonVariants } from "@ui/button"
import { ScrollArea, ScrollBar } from "@ui/scroll-area"
import { Separator } from "@ui/separator"

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
    <>
      <div
        id="candidate-container"
        className="container mt-6 flex items-center gap-4"
      >
        <h2 className="text-2xl font-bold  tracking-tight">{props.title}</h2>
        {props.link && (
          <Link
            href={props.link.href}
            className={cn(
              buttonVariants({
                size: "xs",
              }),
              "rounded-full px-4"
            )}
          >
            {props.link.label}
          </Link>
        )}
      </div>
      <div className="container mt-6">{props.children}</div>
    </>
  )
}

export default CardsContainer
