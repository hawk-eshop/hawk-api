import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from '@zemd/nestjs-pino-logger'
import { LoggerOptions } from 'pino'

import configs from './configs'
import { MessageModule } from '@shared/common/message/message.module'
import { HelpersModule } from '@shared/common/helpers/helpers.module'

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
    HelpersModule.forRoot()
  ]
})
export class CommonModule {}
