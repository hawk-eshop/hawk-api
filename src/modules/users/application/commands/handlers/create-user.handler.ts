import { Inject } from '@nestjs/common'
import { CommandHandler, /* EventPublisher */ ICommandHandler } from '@nestjs/cqrs'

import { UserExistedException } from '@modules/users/domain/exceptions/user-existed.exception'
import { UserRepository } from '@modules/users/infrastructure/repository/user.repository'
// import { RoleRepository } from '@modules/roles/infrastructure/repository/role.repository'
import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'

import { CreateUserCommand } from '../impl/create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly loggerService: IPinoAdapter,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
    // @Inject(RoleRepository)
    // private readonly roleRepository: RoleRepository,
    // private publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    this.loggerService.log(
      `Executing CreateUserCommand with payload: ${JSON.stringify(command)}`,
      CreateUserHandler.name
    )
    const { payload } = command
    const existedUser = await this.userRepository.findOne({ email: payload.email })

    if (existedUser) {
      throw new UserExistedException()
    }

    // const { roles: roleIds } = payload
    // const roles = await this.roleRepository.findIn({ id: roleIds })

    // const user = await this.userRepository.create({ ...payload, roles })
    // const userContext = this.publisher.mergeObjectContext(user)

    // userContext.commit()
  }
}
