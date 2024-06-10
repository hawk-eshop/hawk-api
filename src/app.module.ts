import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ClsModule } from 'nestjs-cls'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import { SharedModule } from '@shared/shared.module'
import { HawkApiConfigService } from '@shared/services/hawk-api.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: HawkApiConfigService) => ({
        throttlers: [configService.throttlerConfigs]
      }),
      inject: [HawkApiConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      cache: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: HawkApiConfigService) => configService.postgresConfig,
      inject: [HawkApiConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed')
        }
        return Promise.resolve(addTransactionalDataSource(new DataSource(options)))
      }
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: HawkApiConfigService) => configService.mongodbConfig,
      inject: [HawkApiConfigService]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
