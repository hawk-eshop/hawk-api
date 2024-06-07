import { HttpStatus, Inject, Logger } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'

import { User } from '@domain/identity/entities/user.entity'
import { IUserRepository } from '@domain/identity/repositories/user-repository.interface'
import { IRoleRepository } from '@domain/identity/repositories/role-repository.interface'

import { CustomHttpException } from '@infrastructure/exception/custom-http-exception'

import { UserCreatedEvent } from '@use-cases/identity/events/user-created/event'

import { CreateUserCommand } from './command'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name)

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    this.logger.log(`Start creating user with DTO: ${JSON.stringify(command)}`)
    const { name, email, password, roleIds } = command

    const existedUser = await this.userRepository.findByEmail(email)
    if (existedUser) {
      throw new CustomHttpException(HttpStatus.BAD_GATEWAY, 'User already exists', {
        code: 'USER_ALREADY_EXISTS',
        message: 'user.already_exists'
      })
    }

    const roles = roleIds.length > 0 ? await this.roleRepository.findByIds(roleIds) : []
    this.logger.log(`Roles will be added: ${JSON.stringify(roles)}`)

    const newUser = await this.userRepository.createUser({ name, email, password, roles })
    this.logger.log(`User created: ${JSON.stringify(newUser)}`)

    // Emit the event for local in-process handling
    const userCreatedEvent = new UserCreatedEvent(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.roles.map((role) => role.id)
    )
    this.eventBus.publish(userCreatedEvent)

    return newUser
  }
}
