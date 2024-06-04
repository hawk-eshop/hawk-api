import { applyDecorators, UseFilters } from '@nestjs/common'
import { HttpExceptionFilter } from '@infrastructure/filters/http-exception.filter'

export function ErrorHandling() {
  return applyDecorators(UseFilters(HttpExceptionFilter))
}
