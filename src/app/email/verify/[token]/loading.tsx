"use client"

import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className=" flex items-center justify-center">
      <Loader2 className="animate-spin w-12 h-12 text-accent-foreground" />
      <span className="sr-only">Loading...</span>
      <span className="ml-2 text-accent-foreground font-semibold">
        Verifying your email address...
      </span>
    </div>
  )
}

export default Loading
