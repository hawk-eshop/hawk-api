import { ConflictException } from '@nestjs/common'

export class UserExistedException extends ConflictException {
  constructor() {
    super('User already exists!')
  }
}
