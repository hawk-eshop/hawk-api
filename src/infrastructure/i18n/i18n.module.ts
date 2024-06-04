import { Module } from '@nestjs/common'
import { I18nModule, I18nJsonLoader, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n'
import * as path from 'path'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/infrastructure/i18n/locales/'),
        watch: true
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
    })
  ]
})
export class I18nCustomModule {}
