import { Module } from '@nestjs/common'

import { AppMiddlewareModule } from './app.middleware.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    // Common
    AppMiddlewareModule
  ]
})
export class AppModule {}
