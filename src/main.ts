import { NestFactory } from '@nestjs/core'

import { KafkaConsumerService } from '@infrastructure/kafka'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const kafkaConsumerService = app.get(KafkaConsumerService)
  /* Initialize Kafka Consumer */
  kafkaConsumerService.onModuleInit()

  await app.listen(3000)
}
bootstrap()
