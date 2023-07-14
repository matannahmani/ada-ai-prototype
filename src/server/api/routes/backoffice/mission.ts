/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from "@/server/db"
import { missionVectorListZod } from "@/shared/zod/backoffice/missionVector"
import { type Prisma } from "@prisma/client"

import { createTRPCRouter, protectedBackofficeProcedure } from "../../trpc"

const missionRouter = createTRPCRouter({
  missionVector: createTRPCRouter({
    list: protectedBackofficeProcedure
      .input(missionVectorListZod)
      .query(async ({ input, ctx }) => {
        const { take, skip, filter } = input
        const { status, priority, title, missionId, aiQualityScore } =
          filter ?? {}
        const where: Prisma.MissionVectorWhereInput = {
          ...(status && { status }),
          ...(priority && { priority }),
          ...(title && { title: { contains: title, mode: "insensitive" } }),
          ...(aiQualityScore && { aiQualityScore }),
          ...(missionId && { missionId }),
        }
        const missionVectorsP = prisma.missionVector.findMany({
          take,
          skip,
          where,
          orderBy: { createdAt: "desc" },
        })
        const countP = prisma.missionVector.count({ where })
        const [missionVectors, count] = await Promise.all([
          missionVectorsP,
          countP,
        ])
        return {
          data: missionVectors,
          count,
        }
      }),
  }),
})

export default missionRouter
