import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { VersioningType } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NextFunction, Request, Response } from 'express'
import {
  ExpressAdapter,
  type NestExpressApplication
} from '@nestjs/platform-express'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { bold } from 'colorette'

import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'
import { InfraService } from '@shared/infrastructure/infra.service'
import { InfraModule } from '@shared/infrastructure/infra.module'
import { ExceptionFilter } from '@shared/observables/filters/http-exception.filter'
import { RequestTimeoutInterceptor } from '@shared/observables/interceptors/request-timout.interceptor'

import { AppModule } from './app.module'

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext()

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
      bufferLogs: true
    }
  )

  const loggerService = app.get(IPinoAdapter)
  loggerService.setContext(bootstrap.name)
  app.useLogger(loggerService)

  app.useGlobalFilters(new ExceptionFilter(loggerService))

  app.useGlobalInterceptors(
    new RequestTimeoutInterceptor(new Reflector(), loggerService)
  )

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'blob:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
        }
      }
    })
  )

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
      return res.sendStatus(204)
    }
    next()
  })

  app.use(compression())

  app.use(bodyParser.urlencoded({ extended: true }))

  app.enableVersioning({ type: VersioningType.URI })

  process.on('uncaughtException', (error) => {
    loggerService.error(error)
  })

  process.on('unhandledRejection', (error) => {
    loggerService.error(error)
  })

  const configService = app.select(InfraModule).get(InfraService)
  const port = configService.appConfig.port

  await app.listen(port)
  loggerService.log(
    `#==> Application is running at ${bold(await app.getUrl())}`
  )

  return app
}

void bootstrap()
