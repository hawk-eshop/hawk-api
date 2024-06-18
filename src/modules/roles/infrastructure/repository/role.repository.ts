import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { TypeORMRepository } from '@shared/infrastructure/repository/postgres/postgres.repository'
import { RoleEntity } from '@modules/roles/domain/entities/role.entity'

@Injectable()
export class RoleRepository extends TypeORMRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    readonly repository: Repository<RoleEntity>
  ) {
    super(repository)
  }
}
