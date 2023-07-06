"use client"

import type React from "react"
import { useEffect, useMemo } from "react"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"

import AuthDialog from "./dialog"

export default function AuthModal(props: { children: React.ReactNode }) {
  // broken https://github.com/vercel/next.js/issues/49662 https://github.com/vercel/next.js/issues/51711
  const segment = useSelectedLayoutSegments("authModal")
  const isOpen = segment.includes("(.)signup") || segment.includes("(.)login")
  const pathname = usePathname()
  const isVisible = useMemo(
    () => pathname.includes("signup") || pathname.includes("login"),
    [pathname]
  )
  return <AuthDialog isOpen={isVisible && isOpen}>{props.children}</AuthDialog>
}
