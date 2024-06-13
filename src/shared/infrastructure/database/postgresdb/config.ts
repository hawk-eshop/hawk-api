import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { SnakeNamingStrategy } from '@shared/strategies/snake-naming.strategy'

dotenv.config()

export const dataSource = new DataSource({
  type: 'postgres',
  entityPrefix: 'hawk_',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*.entity{.ts,.js}', 'src/modules/**/*.view-entity{.ts,.js}'],
  migrations: ['src/shared/infrastructure/database/postgresdb/migrations/*{.ts,.js}']
})
