import { z } from 'zod'
import { UserSchema } from '@modules/users/domain/schemas/user.schema'

export const createUserDto = UserSchema.pick({
  email: true,
  name: true,
  password: true,
  roles: true
})

export type CreateUserDto = z.infer<typeof createUserDto>
