import { Module } from '@nestjs/common'

import { MongooseDatabaseModule } from './mongoose.module'
import { PostgresDatabaseModule } from './postgres.module'

@Module({
  imports: [MongooseDatabaseModule, PostgresDatabaseModule]
})
export class DatabaseModule {}
