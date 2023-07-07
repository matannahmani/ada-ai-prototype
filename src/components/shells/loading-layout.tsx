"use client"

import { Loader2 } from "lucide-react"

const LoadingLayout = ({ description }: { description?: string }) => {
  return (
    <div className="my-auto h-full flex items-center justify-center">
      <Loader2 className="animate-spin w-12 h-12 text-accent-foreground" />
      <span className="sr-only">Loading...</span>
      {description && (
        <span className="ml-2 text-accent-foreground font-semibold">
          {description}
        </span>
      )}
    </div>
  )
}

export default LoadingLayout
