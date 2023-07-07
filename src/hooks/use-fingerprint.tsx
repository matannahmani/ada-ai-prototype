/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/trpc/client"

export const useFingerprint = () => {
  const [fpHash, setFpHash] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const setFp = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const FingerprintJS = await import("@fingerprintjs/fingerprintjs")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const fp = await FingerprintJS.load()

      const { visitorId } = await fp.get()
      await api.visitor.visitor.mutate({
        fp: visitorId,
      })
      router.refresh()
      setFpHash(visitorId)
    }

    void setFp()
  }, [])

  return fpHash
}

export default useFingerprint
