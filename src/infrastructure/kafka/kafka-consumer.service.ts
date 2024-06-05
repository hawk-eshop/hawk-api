import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, EachMessagePayload } from 'kafkajs'

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private consumer

  constructor(private configService: ConfigService) {
    const kafka = new Kafka({
      clientId: this.configService.get<string>('KAFKA_CLIENT_ID', 'default-client-id'),
      brokers: this.configService.get<string[]>('KAFKA_BROKERS', ['localhost:9092'])
    })
    this.consumer = kafka.consumer({
      groupId: this.configService.get<string>('KAFKA_CONSUMER_GROUP_ID', 'default-consumer-group')
    })
  }

  async onModuleInit() {
    await this.consumer.connect()
  }

  async subscribe(topic: string, fromBeginning = true) {
    await this.consumer.subscribe({ topic, fromBeginning })
  }

  async run(eachMessageHandler: (payload: EachMessagePayload) => Promise<void>) {
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await eachMessageHandler(payload)
      }
    })
  }

  async onModuleDestroy() {
    await this.consumer.disconnect()
  }
}
