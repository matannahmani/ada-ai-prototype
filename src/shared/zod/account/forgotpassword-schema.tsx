import { z } from "zod"

export const ForgotpasswordSchema = z.object({
  email: z.string().email(),
})
