import { TRPCClientError } from "@trpc/client"

import { AppRouter } from "../api/root"

export function withErrorHandler<P>(
  promise: Promise<P>,
  onError: (error: any) => void
): Promise<P> {
  return promise.catch((error) => {
    onError(error)
    throw error
  })
}

export function isTRPCServerError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError
}
