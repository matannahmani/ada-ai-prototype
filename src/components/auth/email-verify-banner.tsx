import { getServerAuthSession } from "@/server/auth"
import { AlertTriangle } from "lucide-react"

const EmailVerifyBanner = async () => {
  const user = await getServerAuthSession()
  if (
    !user ||
    !user.user.requiresEmailVerification ||
    (user.user.requiresEmailVerification && !!user.user.emailVerified)
  ) {
    return null
  }
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sticky top-16 z-20">
      <AlertTriangle className="inline-block mr-2 color-warning-400  stroke-yellow-500" />
      <span className="text-yellow-500 text-large font-semibold">
        Please verify your email address.
      </span>
    </div>
  )
}
export default EmailVerifyBanner
