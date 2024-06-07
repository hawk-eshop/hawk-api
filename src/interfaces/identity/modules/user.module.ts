import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { Module } from '@nestjs/common'

import { User } from '@domain/identity/entities/user.entity'
import { Role } from '@domain/identity/entities/role.entity'
import { UserModel, UserSchema } from '@domain/identity/schemas/user.schema'

import { UserRepository } from '@infrastructure/repositories/user.repository'
import { RoleRepository } from '@infrastructure/repositories/role.repository'

import { UserService } from '@use-cases/identity/services/user.service'
import { CreateUserHandler } from '@use-cases/identity/commands/create-user/handler'
import { UserCreatedHandler } from '@use-cases/identity/events/user-created/handler'

import { UserController } from '../controllers/user.controller'

const CommandHandlers = [CreateUserHandler]
const EventHandlers = [UserCreatedHandler]

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([User, Role]),
    CqrsModule
  ],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository
    },
    ...CommandHandlers,
    ...EventHandlers
  ]
})
export class UserModule {}
