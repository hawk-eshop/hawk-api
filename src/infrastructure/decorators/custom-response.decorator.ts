import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'

import { ResponseInterceptor } from '@infrastructure/interceptors/response.interceptor'

export function ResponseMessage(messageKey: string, i18n: I18nService) {
  return applyDecorators(
    UseInterceptors(ResponseInterceptor),
    SetMetadata('responseMessageKey', messageKey),
    SetMetadata('i18nService', i18n)
  )
}
