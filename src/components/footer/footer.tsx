import { ReactNode, Suspense } from "react"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"
import { Separator } from "@ui/separator"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { LogoFull } from "../logo-full"

const NonLoggedLinks = () => (
  <>
    <Link replace prefetch={false} href={"/sign-in"}>
      Login
    </Link>
    <Link replace prefetch={false} href={"/sign-up"}>
      Sign Up
    </Link>
  </>
)

async function FooterAccountLinks() {
  const session = await getServerAuthSession()
  if (session?.user) {
    return (
      <>
        <span>Account</span>
        <span>Logout</span>
      </>
    )
  } else {
    return <NonLoggedLinks />
  }
}

const FooterLinkIcon = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="
    bg-white text-black
    w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center"
  >
    {children}
  </a>
)

function Footer() {
  return (
    <div className="flex flex-wrap bg-black text-white pt-10 sm:pt-20 pb-10 px-8 sm:px-40">
      <div className="flex flex-1 flex-wrap justify-evenly">
        <div className="flex-1 mb-4 basis-full  flex sm:hidden justify-center items-center stroke-white fill-white">
          <LogoFull className="w-24" />
        </div>
        <div className="flex-1 my-4 sm:mb-0 gap-4 flex-col items-center basis-full sm:basis-auto  sm:justify-start sm:flex-row sm:pl-14 sm:gap-6 flex">
          <span>Home</span>
          <span>What is Ada</span>
        </div>
        <div className="hidden flex-1 sm:flex justify-center items-center stroke-white fill-white">
          <LogoFull className="w-24" />
        </div>
        <div className="flex-1 gap-4  flex-col items-center sm:pr-14 basis-full sm:basis-auto  sm:flex-row sm:gap-6 flex sm:justify-end">
          <Suspense fallback={<NonLoggedLinks />}>
            <FooterAccountLinks />
          </Suspense>
        </div>
      </div>
      <Separator className="flex-1 basis-full my-10" />
      <div className="flex-1 basis-full flex justify-center items-center gap-4 ">
        <FooterLinkIcon href="#">
          <Facebook />
        </FooterLinkIcon>

        <FooterLinkIcon href="#">
          <Instagram />
        </FooterLinkIcon>

        <FooterLinkIcon href="#">
          <Youtube />
        </FooterLinkIcon>

        <FooterLinkIcon href="#">
          <Twitter />
        </FooterLinkIcon>

        {/* <span className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-muted">
            <Master
        </span> */}
      </div>
      <div className="flex-1 text-sm font-medium leading-none flex gap-2 items-center justify-center mt-10">
        <span>© 2022 — 2023</span>
        <span>Privacy — Terms</span>
      </div>
    </div>
  )
}

export default Footer
