import { Role } from '../entities/role.entity'

export interface IRoleRepository {
  createRole(role: Partial<Role>): Promise<Role>
  findByIds(ids: Role['id'][]): Promise<Role[]>
  // Define other methods as needed
}
