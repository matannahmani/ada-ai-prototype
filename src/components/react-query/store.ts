/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { cache } from "react"
import { QueryClient } from "@tanstack/query-core"

export const getQueryClient = cache(() => new QueryClient())
