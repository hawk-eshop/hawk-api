import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

/* Modules */
import { I18nCustomModule } from '@infrastructure/i18n/i18n.module'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { KafkaModule } from '@infrastructure/kafka/kafka.module'

/* Strategies */
import { JwtStrategy } from '@infrastructure/auth/jwt.strategy'

/* Filters */
import { HttpExceptionFilter } from '@infrastructure/filters/http-exception.filter'

/* Interceptors */
import { KafkaProduceInterceptor } from '@infrastructure/interceptors/kafka-produce.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }
      }),
      inject: [ConfigService]
    }),
    CqrsModule,
    I18nCustomModule,
    KafkaModule
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: KafkaProduceInterceptor
    }
  ]
})
export class AppModule {}
