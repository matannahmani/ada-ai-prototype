import { redirect } from "next/navigation"
import { isTRPCClientError } from "@/trpc/client"
import { api } from "@/trpc/server"
import { TRPCError } from "@trpc/server"
import { toast, type Toast } from "@ui/use-toast"
import { MailCheck, MailWarning } from "lucide-react"

import ClientToast from "./client-toast"

const VerifyEmailPage = async ({
  params,
}: {
  params: {
    token: string
  }
}) => {
  const { token } = params
  let isSuccessful = false
  let toastProps: Toast | undefined

  try {
    const res = await api.account.verifyEmail.mutate({
      token,
    })
    toastProps = {
      title: "Email verified",
      description: "Your email address has been verified.",
      variant: "success",
    }
    isSuccessful = true
  } catch (err) {
    console.error(err)
    let message = "Something went wrong."
    if (err instanceof TRPCError) message = err.message
    toastProps = {
      title: "Error",
      description: message,
      variant: "destructive",
    }
  }

  if (isSuccessful) {
    return (
      <div className=" flex flex-wrap gap-4 items-center justify-center ">
        <ClientToast {...toastProps} />
        <MailCheck className="w-12 h-12 flex-1 basis-full" />
        <span className="sr-only">Email verified</span>
        <span className="ml-2 text-2xl font-semibold">
          Email verification successful 🎉
        </span>
      </div>
    )
  }
  return (
    <div className=" flex flex-wrap gap-4 items-center justify-center  my-auto">
      <ClientToast {...toastProps} />
      <MailWarning className="w-12 h-12  flex-1 basis-full" />
      <span className="sr-only">Email not verified</span>
      <span className="ml-2 text-2xl font-semibold">
        Email verification failed 😢
      </span>
    </div>
  )
}

export default VerifyEmailPage
