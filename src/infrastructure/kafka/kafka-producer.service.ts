import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, Producer } from 'kafkajs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer

  constructor(private configService: ConfigService) {
    const kafka = new Kafka({
      clientId: this.configService.get<string>('KAFKA_CLIENT_ID', 'default-client-id'),
      brokers: this.configService.get<string[]>('KAFKA_BROKERS', ['localhost:9092'])
    })
    this.producer = kafka.producer()
  }

  async onModuleInit() {
    await this.producer.connect()
  }

  async produce(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    })
  }

  async onModuleDestroy() {
    await this.producer.disconnect()
  }
}
