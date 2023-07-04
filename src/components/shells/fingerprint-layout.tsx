"use client"

import useFingerprint from "@/hooks/use-fingerprint"

const FingerPrintLayout = ({ children }: { children: React.ReactNode }) => {
  const fp = useFingerprint()
  return children
}

export default FingerPrintLayout
