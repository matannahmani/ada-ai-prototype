import { Metadata } from "next"
import { missionVectorListZod } from "@/shared/zod/backoffice/missionVector"
import { api } from "@/trpc/server"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"

export const metadata: Metadata = {
  title: "Tasks",
  description: "Track our mission long-term memory tasks and their status.",
}

export default async function TaskPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const queryInput = missionVectorListZod.parse(searchParams)
  const tasks = await api.backoffice.mission.missionVector.list.query(
    queryInput
  )
  const pageCount = Math.ceil(tasks.count / queryInput.take)
  return (
    <section className="container relative">
      <div className="flex h-full flex-1 flex-col space-y-4 p-4 overflow-hidden relative">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of tasks you need to complete.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable pageCount={pageCount} data={tasks.data} columns={columns} />
      </div>
    </section>
  )
}
