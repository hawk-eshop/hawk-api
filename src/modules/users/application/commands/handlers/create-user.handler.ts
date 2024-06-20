import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserExistedException } from '@modules/users/domain/exceptions/user-existed.exception'
import { UserRepository } from '@modules/users/infrastructure/repository/user.repository'
// import { RoleRepository } from '@modules/roles/infrastructure/repository/role.repository'
import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'

import { CreateUserCommand } from '../impl/create-user.command'
// import { RoleEntity } from '@modules/roles/domain/entities/role.entity'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly loggerService: IPinoAdapter,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
    // @Inject(RoleRepository)
    // private readonly roleRepository: RoleRepository
    // private publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    this.loggerService.log(
      `Executing CreateUserCommand with payload: ${JSON.stringify(command)}`,
      CreateUserHandler.name
    )
    const { payload } = command
    const existedUser = await this.userRepository.findOne({
      email: payload.email
    })

    if (existedUser) {
      throw new UserExistedException()
    }

    // let roles: RoleEntity[] = []
    // const { roles: roleIds } = payload
    // if (roleIds && roleIds.length > 0) {
    //   roles = await this.roleRepository.findIn({ id: roleIds })
    // }
    // const roles = await this.roleRepository.findIn({ id: roleIds })

    // const userContext = this.publisher.mergeObjectContext(
    //   await this.userRepository.create({ ...payload, roles })
    // )

    // userContext.afterCreate(payload)
    // userContext.commit()
  }
}
