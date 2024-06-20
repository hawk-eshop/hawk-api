import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import { InfraService } from '@shared/infrastructure/infra.service'
import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'
import { PinoModule } from '@shared/infrastructure/pino/pino.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PinoModule],
      useFactory: (configService: InfraService, logger: IPinoAdapter) => {
        logger.log(`#==> Loading Postgres connection...!`)

        return configService.postgresConfig
      },
      inject: [InfraService, IPinoAdapter],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed')
        }
        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options))
        )
      }
    })
  ]
})
export class PostgresDatabaseModule {}
