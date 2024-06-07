import { Controller, Post, Body, Logger } from '@nestjs/common'

import { CreateUserDto } from '@interfaces/identity/dtos/create-user.dto'

import { UserService } from '@use-cases/identity/services/user.service'

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.log(`Request create() with DTO: ${JSON.stringify(createUserDto)}`)
    await this.userService.createUser(createUserDto)
  }
}
