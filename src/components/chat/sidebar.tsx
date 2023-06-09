"use client"

import { memo, useRef } from "react"
import { usePathname } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"
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
  const [ref] = useAutoAnimate()
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
      <button ref={ref} onClick={() => setIsOpen(!isOpen)}>
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
        className={cn(
          "fixed top-16 z-20 w-[100%] max-w-xs h-full bg-background",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "transition",
          "flex flex-row",
          "lg:sticky lg:mr-2 lg:w-72 lg:translate-x-0 lg:border-r-2 lg:bg-transparent lg:shadow-none "
        )}
      >
        <div>{props.children}</div>
      </div>
    </div>
  )
}

export default memo(Sidebar)
