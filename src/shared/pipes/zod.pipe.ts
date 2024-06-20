import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: T, _: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw error
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
