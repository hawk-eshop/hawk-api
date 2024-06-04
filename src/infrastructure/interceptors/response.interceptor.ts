import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { BaseResponse, ApiResponse, ApiPagingResponse, Pagination } from '@infrastructure/typings/response.type'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T> | ApiPagingResponse<T>> {
  constructor(
    private readonly i18n: I18nService,
    private readonly messageKey: string
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<ApiResponse<T> | ApiPagingResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const translatedMessage = this.i18n.translate(this.messageKey, { lang: I18nContext.current().lang })

        const response: BaseResponse = {
          status_code: 200,
          message: translatedMessage as string
        }

        if (Array.isArray(data.result)) {
          const pagination: Pagination = data.pagination || {
            total: data.total || 0,
            current_page: data.current_page || 1,
            total_page: data.total_page || 1,
            per_page: data.per_page || data.result.length
          }
          const apiPagingResponse: ApiPagingResponse<T> = {
            ...response,
            result: data.result,
            pagination
          }
          return apiPagingResponse
        }

        const apiResponse: ApiResponse<T> = {
          ...response,
          result: data
        }
        return apiResponse
      })
    )
  }
}
