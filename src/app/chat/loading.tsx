import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="my-auto h-full flex flex-col items-center gap-4 justify-center">
      <Loader2 className="animate-spin w-12 h-12 text-accent-foreground" />
      <span className="sr-only">Loading...</span>
      <span className="ml-2 text-accent-foreground font-semibold">
        Loading your chat&apos;s...
      </span>
    </div>
  )
}

export default Loading
