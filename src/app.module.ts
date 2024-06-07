import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

/* Modules */
import { I18nCustomModule } from 'src/i18n/i18n.module'
import { DatabaseModule } from '@infrastructure/database/database.module'

/* Strategies */
import { JwtStrategy } from '@infrastructure/auth/jwt.strategy'

/* Filters */
import { HttpExceptionFilter } from '@infrastructure/filters/http-exception.filter'

/* Modules */
import { UserModule } from '@interfaces/identity/modules/user.module'
import { UserController } from '@interfaces/identity/controllers/user.controller'

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
    I18nCustomModule,
    UserModule
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
