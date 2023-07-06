"use client"

import { toast, type Toast } from "@ui/use-toast"

const ClientToast = (props: Toast) => {
  toast(props)
  return null
}

export default ClientToast
