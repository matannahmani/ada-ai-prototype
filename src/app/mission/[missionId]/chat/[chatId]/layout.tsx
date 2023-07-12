/* eslint-disable @typescript-eslint/require-await */
import { headers } from "next/headers"

import Sidebar from "@/components/chat/sidebar"
import SidebarContent from "@/components/chat/sidebar-content"
import VisitorProtectedLayout from "@/components/shells/visitor-protected-layout"

export const runtime = "nodejs"
export const fetchCache = "only-no-store"
export const preferredRegion = "auto"

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <VisitorProtectedLayout>
      <div className="flex flex-row space-y-4 py-4">
        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <div className="w-full lg:ml-2">{children}</div>
      </div>
    </VisitorProtectedLayout>
  )
}
export default ChatLayout
