import { Module } from '@nestjs/common'
import { Connection } from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose'
import { red } from 'colorette'

import { InfraService } from '@shared/infrastructure/infra.service'
import { PinoModule } from '@shared/infrastructure/pino/pino.module'
import { IPinoAdapter } from '@shared/infrastructure/pino/pino.adapter'

import { ApiInternalServerException } from '@shared/utils/exception'

import { MongoService } from './mongodb.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [PinoModule],
      useFactory: (configService: InfraService, logger: IPinoAdapter) => {
        const dbName = configService.mongodbConfig.dbName
        const connection = new MongoService().getConnection({
          URI: configService.mongodbConfig.uri
        }) as {
          uri?: string
        }
        logger.log(
          `#==> Loading Mongodb connection: ${connection.uri} with dbName: ${dbName}`
        )

        return {
          connectionFactory: (connection: Connection) => {
            if (connection.readyState === 1) {
              logger.log('#==> Mongodb connected successfully!')
            }
            connection.on('disconnected', () => {
              logger.error(
                new ApiInternalServerException('#==> Mongo disconnected!')
              )
            })
            connection.on('reconnected', () => {
              logger.log(red('#==> Mongo reconnected!\n'))
            })
            connection.on('error', (error) => {
              logger.error(
                new ApiInternalServerException(error.message || error)
              )
            })

            return connection
          },
          uri: connection.uri,
          dbName
        }
      },
      inject: [InfraService, IPinoAdapter]
    })
  ]
})
export class MongoDatabaseModule {}
