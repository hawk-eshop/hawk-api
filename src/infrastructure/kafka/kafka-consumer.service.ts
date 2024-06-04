import { Injectable, OnModuleInit } from '@nestjs/common'
import { Kafka, EachMessagePayload } from 'kafkajs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private consumer

  constructor(private configService: ConfigService) {
    const kafka = new Kafka({
      brokers: [this.configService.get<string>('KAFKA_BROKER')]
    })
    this.consumer = kafka.consumer({ groupId: 'identity-consumer-group' })
  }

  async onModuleInit() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: 'user-events', fromBeginning: true })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const event = JSON.parse(message.value.toString())
        // Handle the event (e.g., user created, user updated)
      }
    })
  }
}
