import { api } from "@/trpc/server"

import LoadingLayout from "./loading-layout"

// @ts-expect-error - async jsx is not supported
async function VisitorProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isVisitorInitialized = await api.visitor.isVisitorInitialized.query()
  if (!isVisitorInitialized) {
    return <LoadingLayout description="Initializing visitor..." />
  }
  return children
}

export default VisitorProtectedLayout
