import { HttpStatus } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'

import { ErrorDetail } from '@infrastructure/typings/response.type'

export class CustomHttpException extends HttpException {
  constructor(
    status: HttpStatus,
    message: string, // Adjust the type as needed
    public readonly client_info: ErrorDetail
  ) {
    super(message, status)
  }
}
