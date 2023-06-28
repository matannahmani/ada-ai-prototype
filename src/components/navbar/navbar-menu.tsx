/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client"

import React, { Suspense, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Disclosure } from "@headlessui/react"
import { Skeleton } from "@ui/skeleton"
import { Menu as MenuIcon, X } from "lucide-react"

import { ChatSidebarTrigger } from "@/app/chat/user/[userId]/candidate/[candidateId]/sidebar"

import Logo from "./Logo"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const navItemStyle = (isCurrent: boolean) =>
  classNames(
    isCurrent
      ? "text-primary dark:text-primary font-bold"
      : "text-gray-500 dark:text-gray-500 ",
    "rounded-md px-3 py-2 text-sm font-medium",
    // hover make effect
    "hover:text-primary dark:hover:text-primary transition-colors"
  )

type Navigations = {
  name: string
  href: string
  current?: boolean
}[]

function NavbarMenu({
  navigation,
  profileComponent,
}: {
  /**
   * @explaination NavbarProfileMenu is a rsc component which we stream down to NavbarMenu
   * @see NavbarProfileMenu
   */
  profileComponent: React.ReactNode
  navigation: Navigations
}) {
  const [menuIconRef] = useAutoAnimate()
  const [menuConRef] = useAutoAnimate()
  const pathname = usePathname()
  const currentPathIndex = useMemo(
    () => navigation.findIndex((nav) => nav.href === pathname),
    [navigation, pathname]
  )

  return (
    <nav className="z-40 h-fit basis-full top-0 sticky">
      <Disclosure
        as="div"
        className="supports-backdrop-blur:bg-background/60 relative border-b bg-background/80 backdrop-blur"
      >
        {({ open }) => (
          <>
            <div className=" px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                  {/* logo only on desktop */}
                  <Logo
                    //  width={40}
                    //  height={40}
                    className="hidden h-8 w-auto md:block"
                  />
                </div>
                <div className="inset-y-0 left-0 flex items-center ">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    ref={menuIconRef}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  {/* Trigger chat sidebar on mobile */}
                  <ChatSidebarTrigger />
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item, index) => {
                        const isCurrent = index === currentPathIndex
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={navItemStyle(isCurrent)}
                            aria-current={isCurrent ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div
                  id="mobile-logo"
                  className="fixed inset-x-1/2	inset-y-1/2	 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-8 rounded-full bg-background/80 backdrop-blur z-10 sm:hidden"
                >
                  {/* logo only on mobile */}
                  <Logo
                    //  width={40}
                    //  height={40}
                    className=" h-8 w-full justify-center flex md:hidden"
                  />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Suspense
                    fallback={<Skeleton className="h-8 w-8 rounded-full" />}
                  >
                    {profileComponent}
                  </Suspense>
                </div>
              </div>
            </div>
            <div
              className="absolute h-fit w-full bg-inherit sm:hidden"
              id="mobile-menu"
              ref={menuConRef}
            >
              {/* mobile toggled on navbar menu */}
              <Disclosure.Panel className="sm:hidden">
                <div
                  className="space-y-1 px-2 pb-3 pt-2
                  supports-backdrop-blur:bg-background/60 relative border-b bg-background/80 backdrop-blur
                "
                >
                  {navigation.map((item, index) => {
                    const isCurrent = index === currentPathIndex
                    return (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className={classNames(navItemStyle(isCurrent), "block")}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    )
                  })}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </nav>
  )
}

export default NavbarMenu
