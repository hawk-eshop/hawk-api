import { KafkaOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

export const kafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'identity-server',
      brokers: [configService.get<string>('KAFKA_BROKER')]
    },
    consumer: {
      groupId: 'identity-consumer-group'
    }
  }
})
