/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createHash } from "crypto"
import { cookies } from "next/headers"
import { prisma } from "@/server/db"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const vistorRouter = createTRPCRouter({
  visitor: publicProcedure
    .input(
      z.object({
        fp: z.string().min(16),
      })
    )
    .mutation(async ({ input }) => {
      const cookie = cookies()
      const visitorCookie = cookie.get("visitorId")
      if (visitorCookie?.value) {
        return
      }
      const fingerprintHash = createHash("sha256")
        .update(input.fp)
        .digest("hex")
      const visitor = await prisma.vistor.create({
        data: {
          fingerprintHash,
        },
      })
      cookie.set("visitorId", visitor.id, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365 * 10,
      })
    }),
})
