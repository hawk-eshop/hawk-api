import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@domain/identity/entities/user.entity'
import { IUserRepository } from '@domain/identity/repositories/user-repository.interface'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.save(user)
    return newUser
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email }
    })
    return user
  }

  // Implement other methods as needed (e.g., updateUser, deleteUser, etc.)
}
