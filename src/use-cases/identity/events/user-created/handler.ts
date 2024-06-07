import { InjectModel } from '@nestjs/mongoose'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Model } from 'mongoose'

import { UserModel } from '@domain/identity/schemas/user.schema'

import { UserCreatedEvent } from './event'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  private readonly logger = new Logger(UserCreatedHandler.name)

  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async handle(event: UserCreatedEvent) {
    this.logger.log(`Handling event: ${JSON.stringify(event)}`)

    // Sync user data to MongoDB
    await this.userModel.create({
      _id: event.id,
      name: event.name,
      email: event.email,
      roles: event.roleIds
    })

    this.logger.log(`User data synced to MongoDB: ${JSON.stringify(event)}`)
  }
}
