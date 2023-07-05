"use client"

import type React from "react"
import { useSelectedLayoutSegments } from "next/navigation"

import AuthDialog from "./dialog"

export default function AuthModal(props: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegments("authModal")
  const isOpen = segment.includes("(.)signup") || segment.includes("(.)login")
  return <AuthDialog isOpen={isOpen}>{props.children}</AuthDialog>
}
