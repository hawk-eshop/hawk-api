import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string({
    message: 'Name can not be empty'
  }),
  email: z
    .string({
      message: 'Email can not be empty'
    })
    .email({
      message: 'Email must be a valid email address'
    }),
  password: z
    .string({
      message: 'Password can not be empty'
    })
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  securityStamp: z.string().optional().nullable(),
  roles: z.array(z.string()).optional(),
  isActive: z.boolean().default(true)
})

export type UserType = z.infer<typeof UserSchema>
