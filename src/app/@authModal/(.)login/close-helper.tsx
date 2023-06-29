"use client"

import { useRouter } from "next/navigation"
import { DialogClose } from "@ui/dialog"

export default function useCloseHelper() {
  const router = useRouter()
  return {
    close: () => {
      router.back()
    },
  }
}
