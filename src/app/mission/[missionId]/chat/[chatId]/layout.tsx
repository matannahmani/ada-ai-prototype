import Sidebar from "@/components/chat/sidebar"
import SidebarContent from "@/components/chat/sidebar-content"

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row space-y-4 py-4">
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <div className="w-full lg:ml-2">{children}</div>
    </div>
  )
}
export default ChatLayout
