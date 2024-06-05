import { SetMetadata } from '@nestjs/common'

export const KAFKA_TOPIC = 'KAFKA_TOPIC'

export const KafkaProduce = (topic: string) => SetMetadata(KAFKA_TOPIC, topic)
