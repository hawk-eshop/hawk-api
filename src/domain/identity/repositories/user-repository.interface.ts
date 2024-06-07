import { User } from '../entities/user.entity'

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>
  findById(id: User['id']): Promise<User | null>
  findByEmail(email: User['email']): Promise<User | null>
  // Define other methods as needed
}
