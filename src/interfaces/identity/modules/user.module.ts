import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'

import { UserModel, UserSchema } from '@domain/identity/schemas/user.schema'

import { UserRepository } from '@infrastructure/repositories/user.repository'
import { RoleRepository } from '@infrastructure/repositories/role.repository'

import { CreateUserHandler } from '@use-cases/identity/commands/create-user/handler'
import { UserCreatedHandler } from '@use-cases/identity/events/user-created/handler'

import { UserController } from '../controllers/user.controller'
import { UserService } from '@use-cases/identity/services/user.service'

const CommandHandlers = [CreateUserHandler]
const EventHandlers = [UserCreatedHandler]

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]), CqrsModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
