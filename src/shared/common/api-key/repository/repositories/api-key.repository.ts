import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { DatabaseMongoUUIDRepositoryAbstract } from '@shared/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'
import { DatabaseModel } from '@shared/common/database/decorators/database.decorator'
import {
  ApiKeyDoc,
  ApiKeyEntity
} from '@shared/common/api-key/repository/entities/api-key.entity'

@Injectable()
export class ApiKeyRepository extends DatabaseMongoUUIDRepositoryAbstract<
  ApiKeyEntity,
  ApiKeyDoc
> {
  constructor(
    @DatabaseModel(ApiKeyEntity.name)
    private readonly ApiKeyDoc: Model<ApiKeyEntity>
  ) {
    super(ApiKeyDoc)
  }
}
