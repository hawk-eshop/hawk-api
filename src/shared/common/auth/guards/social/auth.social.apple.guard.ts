import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

import { IRequestApp } from '@shared/common/request/interfaces/request.interface'
import { ENUM_AUTH_STATUS_CODE_ERROR } from '@shared/common/auth/constants/auth.status-code.constant'
import { AuthSocialApplePayloadDto } from '@shared/common/auth/dtos/social/auth.social.apple-payload.dto'
import { AuthService } from '@shared/common/auth/services/auth.service'

@Injectable()
export class AuthSocialAppleGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequestApp<AuthSocialApplePayloadDto>>()
    const { authorization } = request.headers
    const acArr = authorization?.split('Bearer ') ?? []

    if (acArr.length !== 2) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.SOCIAL_GOOGLE_ERROR,
        message: 'auth.error.socialApple'
      })
    }

    const accessToken: string = acArr[1]

    try {
      const payload: AuthSocialApplePayloadDto =
        await this.authService.appleGetTokenInfo(accessToken)

      request.user = {
        email: payload.email
      }

      return true
    } catch (err: any) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.SOCIAL_GOOGLE_ERROR,
        message: 'auth.error.socialApple'
      })
    }
  }
}
