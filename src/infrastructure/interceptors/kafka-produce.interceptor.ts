import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { KafkaProducerService } from '@infrastructure/kafka/kafka-producer.service'
import { KAFKA_TOPIC } from '@infrastructure/decorators/kafka-produce.decorator'

@Injectable()
export class KafkaProduceInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const topic = this.reflector.get<string>(KAFKA_TOPIC, context.getHandler())

    return next.handle().pipe(
      tap(async (data) => {
        if (topic) {
          await this.kafkaProducerService.produce(topic, data)
        }
      })
    )
  }
}
