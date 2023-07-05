import { cache } from "react"
import { revalidateTag } from "next/cache"
import {
  clientCallTypeToProcedureType,
  createTRPCUntypedClient,
} from "@trpc/client"
import { CreateTRPCNextAppRouterOptions } from "@trpc/next/dist/app-dir/shared"
import { NextAppDirDecoratedProcedureRecord } from "@trpc/next/dist/app-dir/types"
import { AnyRouter } from "@trpc/server"
import { createRecursiveProxy } from "@trpc/server/shared"

import { generateCacheTag } from "./shared"

// ts-prune-ignore-next
export function experimental_createTRPCNextAppDirServer<
  TRouter extends AnyRouter
>(opts: CreateTRPCNextAppRouterOptions<TRouter>) {
  const getClient = cache(() => {
    const config = opts.config()
    return createTRPCUntypedClient(config)
  })

  return createRecursiveProxy((callOpts) => {
    // lazily initialize client
    const client = getClient()

    const pathCopy = [...callOpts.path]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const action = pathCopy.pop()!
    const procedurePath = pathCopy.join(".")
    const procedureType = clientCallTypeToProcedureType(action)
    const cacheTag = generateCacheTag(procedurePath, callOpts.args[0])
    if (action === "revalidate") {
      revalidateTag(cacheTag)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return (client[procedureType] as any)(procedurePath, ...callOpts.args)
  }) as NextAppDirDecoratedProcedureRecord<TRouter["_def"]["record"]>
}
