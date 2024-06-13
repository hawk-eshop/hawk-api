import { ApiBadRequestException } from './exception'

export class CollectionUtil {
  static groupBy = <T>(collection: T[], key: keyof T): { [k: string]: T[] } => {
    if (!key) {
      throw new ApiBadRequestException('Key is required')
    }

    return collection.reduce(
      (prev, next) => {
        const keyValue = String(next[key])
        prev[keyValue] = prev[keyValue] ?? []
        prev[keyValue].push(next)
        return prev
      },
      {} as { [k: string]: T[] }
    )
  }

  static group = <T extends string | number>(collection: T[]): { [k: string]: T[] } => {
    return collection.reduce(
      (rv, x) => {
        const key = String(x)
        rv[key] = rv[key] || []
        rv[key].push(x)
        return rv
      },
      {} as { [k: string]: T[] }
    )
  }

  static maxBy = <T>(collection: T[], key: keyof T): T | undefined => {
    if (!key) {
      throw new ApiBadRequestException('Key is required')
    }

    return collection.reduce((prev, current) => {
      return prev[key] > current[key] ? prev : current
    })
  }

  static max = (collection: (string | number)[]): number => {
    return Math.max(...collection.map(Number))
  }

  static minBy = <T>(collection: T[], key: keyof T): T | undefined => {
    if (!key) {
      throw new ApiBadRequestException('Key is required')
    }

    return collection.reduce((prev, current) => {
      return prev[key] < current[key] ? prev : current
    })
  }

  static min = (collection: (string | number)[]): number => {
    return Math.min(...collection.map(Number))
  }

  static sum = (collection: (number | string)[]): number => {
    const newCollection = collection.map((item) => Number(item))

    return newCollection.reduce((prev, current) => {
      return Number(prev) + Number(current)
    }, 0)
  }

  static sumBy = <T>(collection: T[], key: keyof T): number => {
    if (!key) {
      throw new ApiBadRequestException('Key is required')
    }

    return collection.reduce((prev, current) => {
      const currentNumber = Number(current[key])
      return isNaN(currentNumber) ? prev : prev + currentNumber
    }, 0)
  }

  static hasDuplicates = (collection: unknown[]): boolean => {
    return new Set(collection).size !== collection.length
  }
}

export type LastType = {
  key: string
  length: number | null
}
