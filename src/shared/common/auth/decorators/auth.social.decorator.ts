import { UseGuards, applyDecorators } from '@nestjs/common'

import {
  AuthSocialAppleGuard,
  AuthSocialGoogleGuard
} from '@shared/common/auth/guards/social'

export function AuthSocialGoogleProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthSocialGoogleGuard))
}

export function AuthSocialAppleProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthSocialAppleGuard))
}
