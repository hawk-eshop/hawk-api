import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { I18nContext, I18nService } from 'nestjs-i18n'

import { CustomHttpException } from '@infrastructure/exception/custom-http-exception'
import { ProblemDetails } from '@infrastructure/typings/problem-details.type'
import { RFC_9110_BASE_URL, RFC_9110_LINKS } from '@infrastructure/utils/rfc9110-links'

@Catch(CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  constructor(private readonly i18n: I18nService) {}

  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const detail = exception.getResponse()

    const { code, message } = exception.client_info

    const problemDetails: ProblemDetails = {
      type: RFC_9110_LINKS[status] || `${RFC_9110_BASE_URL}general`,
      title: message,
      status: status,
      detail,
      instance: request.url,
      client_info: {
        code: code,
        message: this.i18n.translate(message, {
          lang: I18nContext.current().lang
        })
      }
    }

    this.logger.error(`[${status}] ${message}`, exception.stack)

    response.status(status).json(problemDetails)
  }
}
