import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { hashPassword } from "@/server/lib/auth"
import { sendVerifyEmail } from "@/server/lib/email"
import { getVisitorId } from "@/server/lib/visitor"
import { ForgotpasswordSchema } from "@/shared/zod/account/forgotpassword-schema"
import { SignupSchema } from "@/shared/zod/account/signup-schema"
import { Vistor } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const accountRouter = createTRPCRouter({
  signup: publicProcedure
    .input(SignupSchema)
    .mutation(async ({ ctx, input }) => {
      const emailTaken = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      })
      if (emailTaken)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already taken",
        })
      const visitor = getVisitorId()
      let visitorEntity: Vistor | null = null
      if (visitor) {
        visitorEntity = await prisma.vistor.findUnique({
          where: {
            id: visitor,
          },
        })
      }
      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: await hashPassword(input.password),
          name: input.fullName,
          requiresEmailVerification: true,
          visitorId: visitorEntity?.id,
        },
      })
      // assign visitor chats to user
      if (visitorEntity) {
        await prisma.chat.updateMany({
          where: {
            vistorId: visitorEntity.id,
          },
          data: {
            userId: user.id,
          },
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const verifyToken = jwt.sign(
        {
          email: input.email,
        },
        env.NEXTAUTH_SECRET as string
      )

      void sendVerifyEmail({
        email: input.email,
        name: input.fullName,
        token: verifyToken,
      })
      return "ok"
    }),
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const decoded = jwt.verify(
        input.token,
        env.NEXTAUTH_SECRET as string
      ) as {
        email: string
      }
      const user = await prisma.user.findFirst({
        where: {
          email: decoded.email,
        },
      })
      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not found",
        })
      if (!!user.emailVerified) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already verified",
        })
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
      return "ok"
    }),
  forgotPassword: publicProcedure
    .input(ForgotpasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      })
      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not found",
        })

      /**
       * TODO: Send email with reset link with jwt
       */
      return "ok"
    }),
})
