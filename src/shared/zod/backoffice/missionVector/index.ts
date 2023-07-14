import { MissionVectorPriority, MissionVectorStatus } from "@prisma/client"
import { z } from "zod"

import { tableBaseZod } from "../../common"

export const missionVectorListZod = tableBaseZod.merge(
  z.object({
    filter: z
      .object({
        status: z.nativeEnum(MissionVectorStatus).optional(),
        priority: z.nativeEnum(MissionVectorPriority).optional(),
        title: z.string().optional(),
        missionId: z.coerce.number().positive().int().optional(),
        aiQualityScore: z
          .object({
            gte: z.coerce.number().positive().int(),
            lte: z.coerce.number().positive().int(),
          })
          .optional(),
      })
      .optional(),
  })
)
