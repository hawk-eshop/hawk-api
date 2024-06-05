import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { KafkaProducerService } from './kafka-producer.service'
import { KafkaConsumerService } from './kafka-consumer.service'
import { createKafkaConfig } from './kafka.config'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KAFKA_CONFIG',
      useFactory: createKafkaConfig,
      inject: [ConfigService]
    },
    KafkaProducerService,
    KafkaConsumerService
  ],
  exports: [KafkaProducerService, KafkaConsumerService]
})
export class KafkaModule {}
