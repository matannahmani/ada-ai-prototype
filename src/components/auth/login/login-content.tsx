"use client"

import Link from "next/link"
import { SiApple, SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { LogoFull } from "@/components/logo-full"
import { LogoSymbol } from "@/components/logo-symbol"

import LoginForm from "./login-form"

export const LoginContent = ({
  linkAsReplace,
}: {
  linkAsReplace?: boolean
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <LogoFull className="w-20 my-2 h-fit" />
      <Button className="w-[240px]" variant="facebook">
        <SiFacebook className="mr-auto" />
        <span className="mr-auto">Continue with Facebook</span>
      </Button>
      <Button
        onClick={() => signIn("google")}
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

      <Link replace={linkAsReplace} href="/signup">
        <Button className="w-[240px]" variant="secondary">
          <LogoSymbol className="mr-3 w-4 h-4" /> SIGN UP FOR ADA
        </Button>
      </Link>
    </div>
  )
}
