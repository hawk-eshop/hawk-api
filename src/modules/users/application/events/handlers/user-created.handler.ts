// import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'
// import { UserRepository } from '@modules/users/infrastructure/repository/user.repository'
// import { RoleRepository } from '@modules/roles/infrastructure/repository/role.repository'

import { UserCreatedEvent } from '../impl/user-created.event'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly loggerService: IPinoAdapter
    // @Inject(UserRepository)
    // private readonly userRepository: UserRepository,
    // @Inject(RoleRepository)
    // private readonly roleRepository: RoleRepository
  ) {}
  handle(event: UserCreatedEvent) {
    this.loggerService.log(
      `Receiving UserCreatedEvent: ${JSON.stringify(event)}`,
      UserCreatedHandler.name
    )
  }
}
