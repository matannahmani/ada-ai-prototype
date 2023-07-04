import "server-only"

import { headers } from "next/headers"

const getServerUrl = () => {
  const headersList = headers()
  const domain = headersList.get("host") || ""
  const fullUrl = headersList.get("referer") || ""

  return fullUrl
}

const getParams = (url: string) => {
  const urlParams = new URLSearchParams(url)
  const params = Object.fromEntries(urlParams.entries())
  return params
}

export { getServerUrl, getParams }
