import * as z from "zod"

export const SignupSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Please enter your full name.",
    }),
    email: z.string().email().min(2, {
      message: "Please enter a valid email address.",
    }),
    password: z.string().max(64).min(8, {
      message: "Please enter a password with 8-64 characters.",
    }),
    repassword: z.string().max(64).min(8, {
      message: "Please enter a password with 8-64 characters.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match.",
    path: ["repassword"],
  })
