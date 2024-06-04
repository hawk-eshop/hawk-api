import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from '@infrastructure/auth/jwt.strategy'
import { I18nCustomModule } from '@infrastructure/i18n/i18n.module'
import { MongooseDatabaseModule, PostgresModule } from '@infrastructure/database'
import { KafkaProducerService, KafkaConsumerService } from '@infrastructure/kafka'
import { HttpExceptionFilter } from '@infrastructure/filters/http-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseDatabaseModule,
    PostgresModule,
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
    I18nCustomModule
  ],
  controllers: [],
  providers: [
    KafkaProducerService,
    KafkaConsumerService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
