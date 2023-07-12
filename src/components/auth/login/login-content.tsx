"use client"

import { useMemo } from "react"
import Link from "next/link"
import { cn } from "@lib/utils"
import { signIn } from "next-auth/react"
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si"

import { useRouterHistory } from "@/hooks/use-router-history"
import { Button, buttonVariants } from "@/components/ui/button"
import { LogoFull } from "@/components/logo-full"
import { LogoSymbol } from "@/components/logo-symbol"

import LoginForm from "./login-form"

export const LoginContent = () => {
  const history = useRouterHistory()
  const lastRoute = useMemo(() => {
    const lastRoute = history[history.length - 1]
    if (lastRoute?.includes("login")) {
      const lastRouteBeforeLogin = history[history.length - 2]
      if (lastRouteBeforeLogin) return lastRouteBeforeLogin
      else return "/"
    } else if (lastRoute) return lastRoute
    else return "/"
  }, [history])
  return (
    <div className="flex flex-col items-center gap-2">
      <LogoFull className="w-20 my-2 h-fit" />
      <Button className="w-[240px]" variant="facebook">
        <SiFacebook className="mr-auto" />
        <span className="mr-auto">Continue with Facebook</span>
      </Button>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: lastRoute,
          })
        }
        className="w-[240px]"
        variant="google"
      >
        <SiGoogle className="mr-auto" />
        <span className="mr-auto">Continue with Google</span>
      </Button>
      <Button className="w-[240px]" variant="secondary">
        <SiApple className="mr-auto" />
        <span className="mr-auto">Continue with Apple</span>
      </Button>
      <div className="flex flex-row my-3 items-center justify-center w-full">
        {/* --- or --- */}
        <div className="flex-1 h-[1px] bg-muted-foreground/30" />
        <div className="flex-0 mx-2 text-sm text-muted-foreground font-bold">
          OR
        </div>
        <div className="flex-1 h-[1px] bg-muted-foreground/30" />
      </div>
      <LoginForm />
      <div className="flex flex-row my-3 items-center justify-center w-full">
        {/* --- or --- */}
        <div className="flex-1 h-[1px] bg-muted-foreground/30" />
        <div className="flex-0 mx-2 text-sm text-muted-foreground font-bold">
          Don’t have an account?
        </div>
        <div className="flex-1 h-[1px] bg-muted-foreground/30" />
      </div>

      <Link
        className={cn(
          buttonVariants({
            variant: "secondary",
          }),
          "w-[240px]"
        )}
        href={{
          query: {
            modal: "sign-up",
          },
        }}
      >
        <LogoSymbol className="mr-3 w-4 h-4" /> SIGN UP FOR ADA
      </Link>
    </div>
  )
}
