import { DynamicModule, Module } from '@nestjs/common'

import { AuthService } from '@shared/common/auth/services/auth.service'
import { AuthJwtAccessStrategy } from '@shared/common/auth/guards/jwt/strategies/auth.jwt.access.strategy'
import { AuthJwtRefreshStrategy } from '@shared/common/auth/guards/jwt/strategies/auth.jwt.refresh.strategy'

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
  imports: []
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [AuthJwtAccessStrategy, AuthJwtRefreshStrategy],
      exports: [],
      controllers: [],
      imports: []
    }
  }
}
