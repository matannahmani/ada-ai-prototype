"use client"

import { memo } from "react"
import { useParams } from "next/navigation"
import { Button } from "@ui/button"

import { cn } from "@/lib/utils"

const SidebarCandidateBtn = memo(
  ({ children, chatId }: { children: React.ReactNode; chatId: number }) => {
    const { chatId: chatIdParam } = useParams() as {
      chatId: string
    }

    return (
      <Button
        variant="ghost"
        asChild
        size="sm"
        className={cn(
          "w-full justify-start font-normal h-auto text-[#021444] p-2 items-start rounded-none",
          `${chatIdParam}` === `${chatId}`
            ? "font-semibold opacity-100"
            : "opacity-90"
        )}
      >
        {children}
      </Button>
    )
  }
)
SidebarCandidateBtn.displayName = "SidebarCandidateBtn"
export default SidebarCandidateBtn
