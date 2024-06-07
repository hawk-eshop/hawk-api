import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { CreateUserDto } from '@interfaces/identity/dtos/create-user.dto'
import { CreateUserCommand } from '@use-cases/identity/commands/create-user/command'

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password, roleIds } = createUserDto
    await this.commandBus.execute(new CreateUserCommand(name, email, password, roleIds))
  }
}
