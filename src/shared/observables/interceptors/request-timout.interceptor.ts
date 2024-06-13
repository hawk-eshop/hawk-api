import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'
import { ApiTimeoutException } from '@shared/utils/exception'

@Injectable()
export class RequestTimeoutInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: IPinoAdapter
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestTimeout = this.reflector.getAllAndOverride<number>('request-timeout', [
      context.getHandler(),
      context.getClass()
    ])

    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const ONE_MINUTE = 1 * 60 * 1000

    return next.handle().pipe(
      timeout(requestTimeout ?? ONE_MINUTE),
      catchError((err) => {
        this.logger.error(request, response)
        if (err instanceof TimeoutError) {
          return throwError(() => new ApiTimeoutException(err.message))
        }
        return throwError(() => err)
      })
    )
  }
}
