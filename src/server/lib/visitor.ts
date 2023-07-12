import "server-only"

import { cookies } from "next/headers"

/**
 *
 * @param id - id of the visitor
 * @returns void - sets the visitor cookie
 */
export const setVisitor = (id: string) => {
  const cookie = cookies()
  cookie.set("visitorId", id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365 * 10,
  })
}

/**
 *
 * @returns string - id of the visitor
 * @returns null - if no visitor cookie is set
 */
export const getVisitorId = () => {
  const cookie = cookies()
  const visitorCookie = cookie.get("visitorId")
  if (visitorCookie?.value) {
    return visitorCookie.value
  }
  return null
}
