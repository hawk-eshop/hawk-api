import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type ThrottlerOptions } from '@nestjs/throttler'
import { type TypeOrmModuleOptions } from '@nestjs/typeorm'
import { type MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { isNil } from 'lodash'
import { default as parse, type Units } from 'parse-duration'

import { SnakeNamingStrategy } from '@shared/strategies/snake-naming.strategy'

@Injectable()
export class InfraService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development'
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production'
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test'
  }

  private getNumber(key: string): number {
    const value = this.get(key)

    try {
      return Number(value)
    } catch {
      throw new Error(key + ' environment variable is not a number')
    }
  }

  private getDuration(key: string, format?: Units): number {
    const value = this.getString(key)
    const duration = parse(value, format)

    if (duration === undefined) {
      throw new Error(`${key} environment variable is not a valid duration`)
    }

    return duration
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key)

    try {
      return Boolean(JSON.parse(value))
    } catch {
      throw new Error(key + ' env var is not a boolean')
    }
  }

  private getString(key: string): string {
    const value = this.get(key)

    return value.replaceAll('\\n', '\n')
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV')
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE')
  }

  get throttlerConfigs(): ThrottlerOptions {
    return {
      ttl: this.getDuration('THROTTLER_TTL', 'second'),
      limit: this.getNumber('THROTTLER_LIMIT')
      // storage: new ThrottlerStorageRedisService(new Redis(this.redis)),
    }
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/**/entities/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/**/entities/*.view-entity{.ts,.js}'
    ]
    const migrations = [__dirname, '/database/migrations/*.{ts,js}']

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'postgres',
      entityPrefix: 'hawk_',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingStrategy()
    }
  }

  get mongodbConfig(): MongooseModuleFactoryOptions {
    return {
      uri: this.getString('MONGO_URI'),
      dbName: this.getString('MONGO_NAME')
    }
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION')
  }

  get appConfig() {
    return {
      port: this.getString('PORT')
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key)

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set') // probably we should call process.exit() too to avoid locking the service
    }

    return value
  }
}
