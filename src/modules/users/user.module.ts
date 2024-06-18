import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'
import { PinoLoggerService } from '@shared/infrastructure/pino/pino.service'

import { CommandHandlers } from './application/commands/handlers'
import { EventHandlers } from './application/events/handlers'
import { QueryHandlers } from './application/queries/handlers'
import { UserController } from './user.controller'

import { UserRepository } from './infrastructure/repository/user.repository'

import { UserEntity } from './domain/entities/user.entity'
// import { RoleRepository } from '@modules/roles/infrastructure/repository/role.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: IPinoAdapter, useClass: PinoLoggerService },
    UserRepository,
    // RoleRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UserModule {}
