import { createTRPCRouter } from "@/server/api/trpc"

import { chatRouter } from "./routes/chat"
import missionRouter from "./routes/mission"
import { vistorRouter } from "./routes/visitor"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chats: chatRouter,
  visitor: vistorRouter,
  mission: missionRouter,
  // add your API routers here
})

// export type definition of API
export type AppRouter = typeof appRouter
