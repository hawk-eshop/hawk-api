import { OmitType } from '@nestjs/swagger'
import { AuthJwtAccessPayloadDto } from '@shared/common/auth/dtos/jwt/auth.jwt.access-payload.dto'

export class AuthJwtRefreshPayloadDto extends OmitType(
  AuthJwtAccessPayloadDto,
  ['role', 'permissions', 'type', 'email'] as const
) {}
