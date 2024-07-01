import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

import { HelperDateService } from '@shared/common/helpers/services'
import { ENUM_API_KEY_STATUS_CODE_ERROR } from '@shared/common/api-key/constants/api-key.status-code.constant'
import { ApiKeyDoc } from '@shared/common/api-key/repository/entities/api-key.entity'

@Injectable()
export class ApiKeyNotExpiredPipe implements PipeTransform {
  constructor(private readonly helperDateService: HelperDateService) {}

  async transform(value: ApiKeyDoc): Promise<ApiKeyDoc> {
    const today: Date = this.helperDateService.create()

    if (value.startDate && value.endDate && today > value.endDate) {
      throw new BadRequestException({
        statusCode: ENUM_API_KEY_STATUS_CODE_ERROR.EXPIRED_ERROR,
        message: 'apiKey.error.expired'
      })
    }

    return value
  }
}
