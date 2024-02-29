import { z } from 'zod'

// this method to make sure the user can only filter by fields that we allowed to prevent abuse of our API
export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>