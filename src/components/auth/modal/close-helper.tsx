"use client"

import { useRouter } from "next/navigation"

export default function useCloseHelper() {
  const router = useRouter()
  return {
    close: () => {
      setTimeout(() => {
        router.back()
      }, 300)
    },
  }
}
