"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import useCloseHelper from "./close-helper"

function AuthDialog({
  children,
  isOpen,
}: {
  isOpen: boolean
  children: React.ReactNode
}) {
  const { close } = useCloseHelper()
  const [ref] = useAutoAnimate((el, action, oldCoords, newCoords) => {
    let keyframes: Record<string, string | number>[] = []
    // supply a different set of keyframes for each action
    if (action === "add") {
      keyframes = [
        { opacity: 0, transform: "translateX(-200px)" },
        {
          transform: "translateX(0px)",
          opacity: 1,
        },
      ]
    }

    if (action === "remove") {
      keyframes = [
        {
          transform: "translateX(0px)",
          opacity: 1,
        },
        { opacity: 0, transform: "translateX(200px)" },
      ]
    }

    if (action === "remain") {
      // for items that remain, calculate the delta
      // from their old position to their new position

      keyframes = [{ opacity: 1 }, { opacity: 1 }]
    }
    // return our KeyframeEffect() and pass
    // it the chosen keyframes.
    return new KeyframeEffect(el, keyframes, {
      duration: 200,
      easing: "ease-in-out",
    })
  })
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e) {
          close()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px] h-screen sm:h-auto overflow-hidden">
        <div ref={ref}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
