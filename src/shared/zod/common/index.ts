import { z } from "zod"

export const tableBaseZod = z.object({
  take: z.coerce.number().default(10),
  skip: z.coerce.number().default(0),
})
