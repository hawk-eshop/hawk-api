import { CreateUserDto } from '@modules/users/application/dto/create-user.dto'

export class CreateUserCommand {
  constructor(public readonly payload: CreateUserDto) {}
}
