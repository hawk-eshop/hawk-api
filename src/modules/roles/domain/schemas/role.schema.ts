import { z } from 'zod'

export const RoleSchema = z.object({
  name: z.string(),
  permissions: z.array(z.string()).nullable(),
  isActive: z.boolean().default(true)
})

export type RoleType = z.infer<typeof RoleSchema>
