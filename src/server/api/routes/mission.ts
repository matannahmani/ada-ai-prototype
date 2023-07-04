import { prisma } from "@/server/db"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

const missionRouter = createTRPCRouter({
  updates: createTRPCRouter({
    show: publicProcedure
      .input(
        z.object({
          missionId: z.number(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { missionId } = input
        const updates = await prisma.missionUpdates.findMany({
          where: {
            missionId: missionId,
          },
          include: {
            missionUpdatesItem: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        })
        if (!updates) {
          return []
        }
        return updates
      }),
  }),
})

export default missionRouter
