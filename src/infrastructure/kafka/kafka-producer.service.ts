import { Injectable, OnModuleInit } from '@nestjs/common'
import { Kafka } from 'kafkajs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private producer

  constructor(private configService: ConfigService) {
    const kafka = new Kafka({
      brokers: [this.configService.get<string>('KAFKA_BROKER')]
    })
    this.producer = kafka.producer()
  }

  async onModuleInit() {
    await this.producer.connect()
  }

  async produce(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }]
    })
  }
}
