import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          __dirname + '../../domain/**/*.entity{.ts,.js}',
          __dirname + '../../domain/shared/**/*.entity{.ts,.js}' // Include shared entities
        ],
        migrations: [__dirname + '../../migrations/*{.ts,.js}'],
        synchronize: false
      }),
      inject: [ConfigService]
    })
  ]
})
export class PostgresDatabaseModule {}
