"use client"

import { useCallback } from "react"
import { cn } from "@lib/utils"

import { DonateIcon } from "../icons"
import { Button, ButtonProps } from "./button"

type DonateButtonProps = ButtonProps & {
  donateLink?: string
}

const DonateButton = ({
  donateLink = "https://donate.stripe.com/test_28oeV15Usd3g8nu144",
  ...props
}: DonateButtonProps) => {
  const donateClickHandler = useCallback(
    (anonymous: boolean) => {
      if (donateLink) {
        window.open(donateLink, "_blank")
      }
    },
    [donateLink]
  )

  return (
    <Button
      disabled={!donateLink}
      onClick={() => donateClickHandler(false)}
      {...props}
      className={cn("", props.className)}
    >
      Donate
      <DonateIcon className="ml-2" />
    </Button>
  )
}

// const PopOverVaraintion = () => (
//   <Popover>
//   <PopoverTrigger disabled={!donateLink} asChild>
//     <Button
//       disabled={!donateLink}
//       {...props}
//       className={cn("", props.className)}
//     >
//       Donate
//       <DonateIcon className="ml-2" />
//     </Button>
//   </PopoverTrigger>
//   <PopoverContent className="w-80">
//     <div className="flex flex-col gap-4 p-2">
//       <span className="text-lg font-semibold">
//         Choose your donation type:
//       </span>
//       {/* anonymous | registered */}
//       <Button
//         onClick={() => donateClickHandler(false)}
//         size="lg"
//         variant="outline"
//         outlineColor="success"
//         className="w-full"
//       >
//         Registered donation
//       </Button>
//       <Button
//         onClick={() => donateClickHandler(true)}
//         size="lg"
//         variant="outline"
//         outlineColor="secondary"
//         className="w-full"
//       >
//         Anonymous donation
//       </Button>
//       <caption className="text-xs text-muted-foreground italic font-medium leading-none">
//         Registered donations are visible on your profile page and mission
//         page.
//       </caption>
//     </div>
//   </PopoverContent>
// </Popover>
// )

export { DonateButton }
