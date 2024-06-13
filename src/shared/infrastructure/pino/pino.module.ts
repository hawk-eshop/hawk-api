import { Module } from '@nestjs/common'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'
import { stdTimeFunctions } from 'pino'
import * as uuid from 'uuid'

import { PinoLoggerService } from './pino.service'
import { IPinoAdapter } from './pino.adapter'

declare module 'http' {
  interface IncomingMessage {
    requestId: string
  }
}

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: 'hawk-api',
        level: 'trace',
        genReqId: (req) => req.requestId || uuid.v4(),
        formatters: { bindings: () => ({}) },
        timestamp: stdTimeFunctions.unixTime,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
      }
    })
  ],
  providers: [
    {
      provide: IPinoAdapter,
      useClass: PinoLoggerService
    }
  ],
  exports: [IPinoAdapter]
})
export class PinoModule {}
