import { CreateUserDto } from '@modules/users/application/dto/create-user.dto'

export class UserCreatedEvent {
  constructor(public readonly payload: CreateUserDto) {}
}
