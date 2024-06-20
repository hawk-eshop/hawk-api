import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@modules/users/domain/entities/user.entity'
import { UserDocument } from '@modules/users/domain/models/user.model'
import { MongoRepository } from '@shared/infrastructure/repository/mongo/mongo.repository'
import { TypeORMRepository } from '@shared/infrastructure/repository/postgres/postgres.repository'

@Injectable()
export class UserRepository extends TypeORMRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>
  ) {
    super(repository)
  }
}
export class UserModelRepository extends MongoRepository<UserDocument> {}
