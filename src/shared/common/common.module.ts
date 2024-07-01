import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from '@zemd/nestjs-pino-logger'
import { LoggerOptions } from 'pino'

import configs from './configs'
import { DATABASE_CONNECTION_NAME } from '@shared/common/database/constants/database.constant'
import { DatabaseModule } from '@shared/common/database/database.module'
import { DatabaseService } from '@shared/common/database/services/database.service'
import { MessageModule } from '@shared/common/message/message.module'
import { HelpersModule } from '@shared/common/helpers/helpers.module'
import { RequestModule } from '@shared/common/request/request.module'
import { AuthModule } from '@shared/common/auth/auth.module'
import { ApiKeyModule } from '@shared/common/api-key/api-key.module'
import { PolicyModule } from '@shared/common/policy/policy.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    //Configs
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true
    }),
    //Mongoose
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createOptions()
    }),
    //Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<LoggerOptions>('pino')
    }),
    //Messages Module
    MessageModule.forRoot(),
    //Helpers Module
    HelpersModule.forRoot(),
    //Request Module
    RequestModule.forRoot(),
    //Policy Module
    PolicyModule.forRoot(),
    //Auth Module
    AuthModule.forRoot(),
    //ApiKey Module
    ApiKeyModule.forRoot()
  ]
})
export class CommonModule {}
