import { Injectable } from '@nestjs/common'
import { In, Repository } from 'typeorm'

import { Role } from '@domain/identity/entities/role.entity'
import { IRoleRepository } from '@domain/identity/repositories/role-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async createRole(role: Role): Promise<Role> {
    const newRole = await this.roleRepository.save(role)
    return newRole
  }

  async findByIds(ids: Role['id'][]): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: {
        id: In(ids)
      }
    })
    return roles
  }

  // Implement other methods as needed (e.g., updateRole, deleteRole, etc.)
}
