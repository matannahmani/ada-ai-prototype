"use server"

import { cookies, headers } from "next/headers"
import { appRouter, type AppRouter } from "@/server/api/root"
import { getServerAuthSession } from "@/server/auth"
import { httpLink, loggerLink } from "@trpc/client"
import { experimental_nextCacheLink } from "@trpc/next/app-dir/links/nextCache"
import { AnyRouter } from "@trpc/server"
import SuperJSON from "superjson"

import { experimental_createTRPCNextAppDirServer } from "./experimental_createTRPCNextAppDirServer"
import { experimental_nextHttpLink } from "./experimental_nextHttpLink"
import { generateCacheTag, getUrl, transformer } from "./shared"

/**
 * This client invokes procedures directly on the server without fetching over HTTP.
 */
export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        // loggerLink({
        //   enabled: (op) => true,
        // }),
        experimental_nextHttpLink({
          batch: false,
          url: getUrl(),
          headers() {
            return {
              cookie: cookies().toString(),
              "x-trpc-source": "rsc-http",
            }
          },
        }),
      ],
    }
  },
})
