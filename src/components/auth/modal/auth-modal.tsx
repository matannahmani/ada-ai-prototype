"use client"

import { useEffect, useMemo, useState } from "react"
import { useAtomValue } from "jotai"

import { LoginContent } from "../login/login-content"
import { SignupContent } from "../signup/signup-content"
import AuthDialog from "./dialog"
import { authModalOpenAtom, useAuthModalPage } from "./utils"

// const LoginContent = dynamic(() =>
//   import("../login/login-content").then((mod) => mod.LoginContent)
// )
// const SignupContent = dynamic(() =>
//   import("../signup/signup-content").then((mod) => mod.SignupContent)
// )

const DelayedUnmount = ({
  children,
  isMounted,
}: {
  children: React.ReactNode
  isMounted: boolean
}) => {
  const [shouldRender, setShouldRender] = useState(isMounted)
  useEffect(() => {
    if (isMounted) {
      setShouldRender(true)
    } else {
      setTimeout(() => setShouldRender(false), 200)
    }
  }, [isMounted])
  return shouldRender ? children : null
}

export default function AuthModal() {
  const isOpen = useAtomValue(authModalOpenAtom)
  const modalPage = useAuthModalPage()
  const modalChild = useMemo(() => {
    if (modalPage === "sign-in") return <LoginContent />
    if (modalPage === "sign-up") return <SignupContent />
    return <LoginContent />
  }, [modalPage])

  return (
    <>
      <AuthDialog isOpen={isOpen}>
        <>{modalChild}</>
      </AuthDialog>
    </>
  )
}
