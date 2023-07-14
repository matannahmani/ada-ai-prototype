"use client"

import { memo, useRef } from "react"
import { usePathname } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { buttonVariants } from "@ui/button"
import { atom, useAtom } from "jotai"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"

type SidebarProps = {
  children: React.ReactNode
}

export const sidebarAtom = atom(false)
export const CHAT_SIDEBAR_SYMBOL = Symbol("CHAT_SIDEBAR")

export const ChatSidebarTrigger = () => {
  const path = usePathname()
  const [isOpen, setIsOpen] = useAtom(sidebarAtom)
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  useOnClickOutside<HTMLDivElement>(buttonContainerRef, (e) => {
    // check if the target is not the symbol of the sidebar if not close the sidebar
    const sidebar = document.getElementById(CHAT_SIDEBAR_SYMBOL.toString())
    if (!sidebar) return
    if (sidebar.contains(e.target as Node)) return
    setIsOpen(false)
  })
  if (!path.includes("chat")) return null
  return (
    <div ref={buttonContainerRef} className="ml-2 flex h-10 w-10 lg:hidden">
      <button
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "lg:hidden rounded-md"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
      </button>
    </div>
  )
}

function Sidebar(props: SidebarProps) {
  const [isOpen] = useAtom(sidebarAtom)
  return (
    <div id={CHAT_SIDEBAR_SYMBOL.toString()} className="relative">
      <div
        data-isopen={isOpen}
        className={cn(
          "fixed top-16 z-20 w-[100%] max-w-xs h-full bg-background",
          "data-[isopen=true]:translate-x-0 data-[isopen=true]:opacity-100 data-[isopen=true]:shadow-lg",
          "data-[isopen=false]:-translate-x-full data-[isopen=false]:opacity-0 data-[isopen=false]:shadow-none",
          "transition",
          "flex flex-row",
          "lg:!sticky lg:!mr-2 lg:!w-72 lg:!translate-x-0 lg:!border-r-2 lg:!bg-transparent lg:!shadow-none lg:!opacity-100"
        )}
      >
        <div>{props.children}</div>
      </div>
    </div>
  )
}

export default memo(Sidebar)
