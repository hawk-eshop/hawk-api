import { Module } from '@nestjs/common'

import { InfraModule } from '@shared/infrastructure/infra.module'

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: []
})
export class AppModule {}
