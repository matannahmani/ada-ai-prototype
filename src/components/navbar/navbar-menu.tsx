/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client"

import React, { Suspense, useMemo, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Disclosure } from "@headlessui/react"
import { cn } from "@lib/utils"
import { Skeleton } from "@ui/skeleton"
import { Menu as MenuIcon, X } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import { ChatSidebarTrigger } from "../chat/sidebar"
// ChatSidebarTrigger

import { LogoFull } from "../logo-full"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const navItemStyle = (isCurrent: boolean) =>
  classNames(
    isCurrent ? "font-bold" : "text-gray-500 dark:text-gray-500 ",
    "rounded-md px-3 py-2 text-sm font-medium",
    // hover make effect
    "block hover:text-primary dark:hover:text-primary transition-colors"
  )

type Navigations = {
  name: string
  href: string
  mobileOnly?: boolean
  current?: boolean
}[]

function MobileMenu({
  navigation,
  currentPathIndex,
  menuIconRef,
}: {
  navigation: Navigations
  currentPathIndex: number
  menuIconRef: React.RefObject<HTMLButtonElement | undefined>
}) {
  const [menuContainerWrapperRef] = useAutoAnimate()
  const menuContainerRef = useRef<HTMLDivElement>(null)
  useOnClickOutside<HTMLDivElement>(menuContainerRef, () => {
    if (!menuIconRef.current) return
    if (menuIconRef.current.dataset["headlessuiState"] === "open") {
      menuIconRef.current.click()
    }
  })
  return (
    <div
      ref={menuContainerRef}
      className="
    absolute h-fit w-full bg-inherit sm:hidden"
      id="mobile-menu"
    >
      <div ref={menuContainerWrapperRef}>
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
                  prefetch={false}
                  className={cn(
                    navItemStyle(isCurrent),
                    item.mobileOnly && "block !sm:hidden"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              )
            })}
          </div>
        </Disclosure.Panel>
      </div>
    </div>
  )
}

export const NAVBAR_SYMBOL = Symbol("navbar")

function MobileMenuTriggers({
  menuIconRef,
  open,
}: {
  open: boolean
  menuIconRef: React.RefObject<HTMLButtonElement>
}) {
  const [menuIconContainerRef] = useAutoAnimate()

  return (
    <div
      id={NAVBAR_SYMBOL.toString()}
      className="inset-y-0 left-0 items-center flex "
    >
      {/* Mobile menu button*/}
      <div ref={menuIconContainerRef}>
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
      </div>

      {/* Trigger chat sidebar on mobile */}
      <ChatSidebarTrigger />
    </div>
  )
}

type NavbarMenuProps = {
  /**
   * @explaination NavbarProfileMenu is a rsc component which we stream down to NavbarMenu
   * @see NavbarProfileMenu
   */
  profileComponent: React.ReactNode
  navigation: Navigations
}

function NavbarMenu({ navigation, profileComponent }: NavbarMenuProps) {
  const menuIconRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()
  const isChatPage = useMemo(() => pathname.includes("chat"), [pathname])
  const currentPathIndex = useMemo(
    () =>
      navigation.findIndex(
        (nav) =>
          nav.href === pathname ||
          (nav.href !== "/" && pathname.includes(nav.href))
      ),
    [navigation, pathname]
  )

  return (
    <nav className="z-40 h-fit basis-full top-0 sticky">
      <Disclosure
        as="div"
        className="supports-backdrop-blur:bg-background/80 relative border-b bg-background backdrop-blur"
      >
        {({ open }) => (
          <>
            {/* logo only on desktop */}
            {/* <Link
              href="/"
              className="absolute inset-1/2	transform -translate-y-2/4 -translate-x-2/4 md:h-8 w-auto h-6"
            >
            </Link> */}
            {/* <Link href="/"> */}
            {/* <LogoFull className="hidden md:block absolute inset-1/2	transform -translate-y-2/4 -translate-x-2/4 md:h-8 w-auto h-6" /> */}
            <div className=" px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex">
                  <MobileMenuTriggers open={open} menuIconRef={menuIconRef} />
                  <div className="hidden sm:flex  items-center justify-center sm:items-stretch sm:justify-start">
                    <div className=" sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item, index) => {
                          const isCurrent = index === currentPathIndex

                          return (
                            <Link
                              prefetch={false}
                              key={item.name}
                              href={item.href}
                              className={cn(
                                navItemStyle(isCurrent),
                                item.mobileOnly && "hidden"
                              )}
                              aria-current={isCurrent ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/">
                  <LogoFull className="block md:h-8 w-auto h-6 mr-auto ml-auto" />
                </Link>
                <div className="flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link
                    prefetch={false}
                    className={cn(
                      navItemStyle(isChatPage),
                      "hidden sm:block mr-7"
                    )}
                    href="/chat"
                  >
                    Chat
                  </Link>

                  <Suspense
                    fallback={<Skeleton className="h-8 w-8 rounded-full" />}
                  >
                    {profileComponent}
                  </Suspense>
                </div>
              </div>
            </div>
            <MobileMenu
              navigation={navigation}
              currentPathIndex={currentPathIndex}
              menuIconRef={menuIconRef}
            />
          </>
        )}
      </Disclosure>
    </nav>
  )
}

export default NavbarMenu
