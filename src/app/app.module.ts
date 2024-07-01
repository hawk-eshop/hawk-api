import { Module } from '@nestjs/common'

import { CommonModule } from '@shared/common/common.module'

import { AppMiddlewareModule } from './app.middleware.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    // Common
    AppMiddlewareModule,
    CommonModule
  ]
})
export class AppModule {}
