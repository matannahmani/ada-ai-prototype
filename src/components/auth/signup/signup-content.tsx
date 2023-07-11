import { SiApple, SiFacebook, SiGoogle } from "react-icons/si"

import { Button } from "@/components/ui/button"
import { LogoFull } from "@/components/logo-full"

import SignupForm from "./signup-form"

export const SignupContent = () => (
  <div className="flex flex-col items-center gap-2">
    <LogoFull className="w-20 my-2 h-fit" />

    <div className="flex flex-row my-3 items-center justify-center w-full">
      {/* --- or --- */}
      <div className="flex-1 h-[1px] bg-muted-foreground/30" />
      <div className="flex-0 mx-2 text-sm text-muted-foreground font-bold">
        SIGN UP WITH EMAIL
      </div>
      <div className="flex-1 h-[1px] bg-muted-foreground/30" />
    </div>
    <SignupForm />
    <div className="flex flex-row my-3 items-center justify-center w-full">
      {/* --- or --- */}
      <div className="flex-1 h-[1px] bg-muted-foreground/30" />
      <div className="flex-0 mx-2 text-sm text-muted-foreground font-bold">
        OR
      </div>
      <div className="flex-1 h-[1px] bg-muted-foreground/30" />
    </div>
    <Button className="w-[240px]" variant="facebook">
      <SiFacebook className="mr-auto" />
      <span className="mr-auto">Continue with Facebook</span>
    </Button>
    <Button className="w-[240px]" variant="google">
      <SiGoogle className="mr-auto" />
      <span className="mr-auto">Continue with Google</span>
    </Button>
    <Button className="w-[240px]" variant="secondary">
      <SiApple className="mr-auto" />
      <span className="mr-auto">Continue with Apple</span>
    </Button>
  </div>
)
