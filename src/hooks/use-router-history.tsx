"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"

const routeHistoryAtom = atom<string[]>([])

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [routeHistory, setRouteHistory] = useAtom(routeHistoryAtom)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `${pathname}?${searchParams}`
    if (
      routeHistory.length === 0 ||
      routeHistory[routeHistory.length - 1] !== url
    ) {
      setRouteHistory((prev) => [...prev, url])
    }
  }, [pathname, searchParams])

  return null
}

export const useRouterHistory = () => {
  const history = useAtomValue(routeHistoryAtom)
  return history
}

export const useLastRoute = () => {
  const history = useRouterHistory()
  const lastRoute = history[history.length]
  return lastRoute
}

export const findLastNonAuthRoute = (routes: string[]) => {
  const lastNonAuthRoute = routes
    .slice()
    .reverse()
    .find(
      (route) => !route.startsWith("/login") && !route.startsWith("/signup")
    )
  return lastNonAuthRoute
}
