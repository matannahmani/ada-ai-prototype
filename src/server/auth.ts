/* eslint-disable @typescript-eslint/no-empty-interface */
import { GetServerSidePropsContext } from "next"
import { cookies } from "next/headers"
import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type User as PrismaUser } from "@prisma/client"
import {
  getServerSession,
  User,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { DefaultJWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { comparePassword } from "./lib/auth"
import { getVisitorId } from "./lib/visitor"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: Omit<PrismaUser, "password">
  }
  interface User extends Omit<PrismaUser, "password"> {}
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends PrismaUser {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
          ...token,
        },
      }
    },
    jwt: async ({ token, user, account, profile }) => {
      const userData = await prisma.user.findUnique({
        where: {
          id: token.id || user?.id || token.sub,
        },
      })
      if (!userData) throw new Error("User not found")
      if (userData?.password) {
        // @ts-expect-error - We don't want to store the password in the JWT
        delete userData?.password
      }
      return {
        ...token,
        ...userData,
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith@ada.com" },
        password: { label: "Password", type: "password" },
        // remember: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        })
        if (!user || typeof user.password !== "string" || !user.password)
          return null
        const passwordMatch = await comparePassword(
          credentials.password,
          user.password
        )
        if (passwordMatch) {
          return user
        }
        return null
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  events: {
    signIn: async ({ user, account, profile, isNewUser }) => {
      await importVisitorToAccount(user)
    },
    createUser: async ({ user }) => {
      await importVisitorToAccount(user)
    },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getPagesServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

const importVisitorToAccount = async (user: User) => {
  const visitorId = getVisitorId()
  if (!!visitorId) {
    const updateChatPromise = prisma.chat.updateMany({
      where: {
        vistorId: visitorId,
      },
      data: {
        userId: user.id,
        vistorId: null,
      },
    })
    const updateUserPromise = prisma.user.updateMany({
      where: {
        id: user.id,
        visitorId: null,
      },
      data: {
        visitorId: visitorId,
      },
    })
    await Promise.all([updateChatPromise, updateUserPromise])
  }
}

export const getVisitorSession = async () => {
  const visitorId = getVisitorId()
  if (!!visitorId) {
    const visitor = await prisma.vistor.findUnique({
      where: {
        id: visitorId,
      },
    })
    if (visitor) {
      return visitor
    }
  }
  return null
}
