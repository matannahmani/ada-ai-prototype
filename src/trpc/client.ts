"use client"

import { type AppRouter } from "@/server/api/root"
import { httpBatchLink, loggerLink, splitLink } from "@trpc/client"
import {
  experimental_createActionHook,
  experimental_createTRPCNextAppDirClient,
  experimental_serverActionLink,
} from "@trpc/next/app-dir/client"
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp"
import superjson from "superjson"

import { nextFetchLink } from "./next-fetch-link"
import { getUrl, transformer } from "./shared"
import { httpSseLink } from "./stream-link"

export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (op) => true,
        }),
        experimental_nextHttpLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              "x-trpc-source": "client",
            }
          },
        }),
      ],
    }
  },
})

export const streamApi = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        httpSseLink({
          baseUrl: getUrl(),
        }),
      ],
    }
  },
})
export const useAction = experimental_createActionHook({
  links: [loggerLink(), experimental_serverActionLink()],
  transformer,
})

/** Export type helpers */
export type * from "./shared"
