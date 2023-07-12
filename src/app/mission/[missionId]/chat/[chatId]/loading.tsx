"use client"

import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className=" animate-spin w-12 h-12 text-accent-foreground" />
    </div>
  )
}

export default Loading
