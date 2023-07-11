"use client"

import { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { atom, useAtom, useSetAtom } from "jotai"

const pageOpts = ["sign-in", "sign-up", "reset-password"] as const

type AuthModal = (typeof pageOpts)[number]

export const authModalPageAtom = atom<AuthModal>("sign-in")
export const authModalOpenAtom = atom(false)
export const usePathParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchParams = useSearchParams()!

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form
      if (value === null) params.delete(name)
      else params.set(name, value)
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )
  return createQueryString
}

export const useSetAuthModalState = () => {
  const setParams = usePathParams()

  const handleModalChange = useCallback(
    (modal: AuthModal | null) => {
      setParams("modal", modal)
    },
    [setParams]
  )

  return handleModalChange
}

export const useAuthModalPage = () => {
  const [modalState, setModal] = useAtom(authModalPageAtom)
  const setOpen = useSetAtom(authModalOpenAtom)
  const searchParams = useSearchParams()!

  useEffect(() => {
    const modal = searchParams.get("modal") as AuthModal
    if (!modal) {
      setOpen(false)
      return
    }
    if (modalState) {
      if (pageOpts.includes(modal)) {
        setModal(modal)
        setOpen(true)
      } else setOpen(false)
    }
  }, [modalState, searchParams, setModal, setOpen])
  return modalState
}
