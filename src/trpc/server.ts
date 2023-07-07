"use server"

import { cookies } from "next/headers"
import { type AppRouter } from "@/server/api/root"
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp"
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server"
import SuperJSON from "superjson"

// import { experimental_nextHttpLink } from "./experimental_nextHttpLink"
import { getUrl } from "./shared"

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
              rng: Math.random().toString(),
              "x-trpc-source": "rsc-http",
            }
          },
        }),
      ],
    }
  },
})
