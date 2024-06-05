import { KafkaOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

export const createKafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: configService.get<string>('KAFKA_CLIENT_ID', 'default-client-id'),
      brokers: configService.get<string[]>('KAFKA_BROKERS', ['localhost:9092'])
    },
    consumer: {
      groupId: configService.get<string>('KAFKA_CONSUMER_GROUP_ID', 'default-consumer-group')
    }
  }
})
