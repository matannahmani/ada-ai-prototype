"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import { signIn } from "next-auth/react"

/**
 * @explaination - This component is a button that when clicked, will sign the user in with google
 * @returns - A button that when clicked, will sign the user in with google
 * @clientonly
 */
const ProfileMenuUnlogged = () => (
  <Link
    href="login"
    className={cn(
      buttonVariants({
        size: "sm",
      }),
      "font-semibold rounded-full px-8"
    )}
  >
    Login
  </Link>
  // <Button onClick={() => signIn("google")} className="font-semibold rounded-full px-8 " size="sm">
  //   Login
  // </Button>
)

export default ProfileMenuUnlogged
