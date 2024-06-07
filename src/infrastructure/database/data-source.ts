import { DataSource } from 'typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { join } from 'path'

ConfigModule.forRoot()

const configService = new ConfigService()

const dataSource = new DataSource({
  type: 'postgres',
  entityPrefix: 'hawk_',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    join(__dirname, '../../domain/**/*.entity{.ts,.js}'),
    join(__dirname, '../../domain/shared/**/*.entity{.ts,.js}') // Include shared entities
  ],
  migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],

  synchronize: false
})

export default dataSource
