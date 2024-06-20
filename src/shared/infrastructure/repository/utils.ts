import { ApiBadRequestException } from '@shared/utils/exception'
import { CollectionUtil } from '@shared/utils/collection'
import { DatabaseOperationCommand, DatabaseOperationEnum } from './types'

export const validateFindByCommandsFilter = <T>(
  filterList: DatabaseOperationCommand<T>[]
): void => {
  const groupList = CollectionUtil.groupBy(filterList, 'property')

  for (const key in groupList) {
    const commands = groupList[key].map(
      (g) => g.command as DatabaseOperationEnum
    )
    const isLikeAndNotAllowedOperation = commands.filter(
      (g) =>
        g === DatabaseOperationEnum.CONTAINS ||
        g === DatabaseOperationEnum.NOT_CONTAINS
    )

    const NOT_ALLOWED_COMBINATION = 2

    if (isLikeAndNotAllowedOperation.length === NOT_ALLOWED_COMBINATION) {
      throw new ApiBadRequestException(
        `It is not possible to filter: '${key}' with the commands '${commands.join(', ')}'`
      )
    }

    const isEqualNotAllowedOperation = commands.filter(
      (g) =>
        g === DatabaseOperationEnum.EQUAL ||
        g === DatabaseOperationEnum.NOT_EQUAL
    )

    if (isEqualNotAllowedOperation.length === NOT_ALLOWED_COMBINATION) {
      throw new ApiBadRequestException(
        `It is not possible to filter: '${key}' with the commands '${commands.join(', ')}'`
      )
    }
  }
}
