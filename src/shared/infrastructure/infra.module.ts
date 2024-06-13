import { Global, Module, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { ThrottlerModule } from '@nestjs/throttler'
import { ClsModule } from 'nestjs-cls'

import { MongoDatabaseModule, PostgresDatabaseModule } from './database'
import { PinoModule } from './pino/pino.module'

import { InfraService } from './infra.service'

const providers: Provider[] = [InfraService]

@Global()
@Module({
  providers,
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: InfraService) => ({
        throttlers: [configService.throttlerConfigs]
      }),
      inject: [InfraService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      cache: true,
      expandVariables: true
    }),
    CqrsModule,
    PinoModule,
    MongoDatabaseModule,
    PostgresDatabaseModule
  ],
  exports: [...providers, CqrsModule]
})
export class InfraModule {}
