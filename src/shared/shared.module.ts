import { Global, Module, type Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { HawkApiConfigService } from './services/hawk-api.service'

const providers: Provider[] = [HawkApiConfigService]

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule]
})
export class SharedModule {}
