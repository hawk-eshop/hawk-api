import { Module } from '@nestjs/common'

import { InfraModule } from '@shared/infrastructure/infra.module'
import { ModulesModule } from '@modules/modules.module'

@Module({
  imports: [InfraModule, ModulesModule]
})
export class AppModule {}
