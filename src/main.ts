import compression from 'compression'
import helmet from 'helmet'
import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express'
// import morgan from 'morgan'
import { initializeTransactionalContext } from 'typeorm-transactional'

import { SharedModule } from '@shared/shared.module'
import { HawkApiConfigService } from '@shared/services/hawk-api.service'

import { AppModule } from './app.module'

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext()

  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true })
  app.enable('trust proxy')
  app.use(helmet())
  // // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  app.use(compression())
  // app.use(morgan('combined'))
  app.enableVersioning()

  const reflector = app.get(Reflector)

  // app.useGlobalFilters(new HttpExceptionFilter(reflector), new QueryFailedFilter(reflector))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors)
    })
  )

  const configService = app.select(SharedModule).get(HawkApiConfigService)

  if (configService.documentationEnabled) {
    // setupSwagger(app)
  }

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks()
  }

  const port = configService.appConfig.port
  await app.listen(port)
  logger.log(`Application running on ${await app.getUrl()}`)

  return app
}

void bootstrap()
