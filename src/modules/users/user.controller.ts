import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { ZodValidationPipe } from '@shared/pipes/zod.pipe'

import { type CreateUserDto, createUserDto } from '@modules/users/application/dto/create-user.dto'
import { CreateUserCommand } from '@modules/users/application/commands/impl/create-user.command'

@Controller('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus
    // private readonly _queryBus: QueryBus
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe<CreateUserDto>(createUserDto))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this._commandBus.execute(new CreateUserCommand(createUserDto))
  }

  // @Get(':id')
  // async get(@Param('id') id: string) {
  //   return await this._queryBus.execute()
  // }
}
