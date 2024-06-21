import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import {
  HelperArrayService,
  HelperDateService,
  HelperNumberService
} from './services'

@Global()
@Module({})
export class HelpersModule {
  static forRoot(): DynamicModule {
    return {
      module: HelpersModule,
      providers: [HelperArrayService, HelperDateService, HelperNumberService],
      exports: [HelperArrayService, HelperDateService, HelperNumberService],
      controllers: [],
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('helper.jwt.defaultSecretKey'),
            signOptions: {
              expiresIn: configService.get<string>(
                'helper.jwt.defaultExpirationTime'
              )
            }
          })
        })
      ]
    }
  }
}
