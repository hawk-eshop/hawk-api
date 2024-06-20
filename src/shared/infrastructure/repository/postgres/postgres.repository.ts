import {
  BaseEntity,
  DeepPartial,
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  Raw,
  Repository,
  SaveOptions
} from 'typeorm'

import {
  CreatedOrUpdateModel,
  DatabaseOperationCommand,
  RemovedModel,
  UpdatedModel
} from '../types'
import { IEntity } from '../entity'
import { IRepository } from '../repository.adapter'

export class TypeORMRepository<T extends BaseEntity & IEntity>
  implements IRepository<T, SaveOptions>
{
  constructor(readonly repository: Repository<T>) {}

  async create(
    document: DeepPartial<T>,
    saveOptions?: SaveOptions
  ): Promise<T> {
    const entity = this.repository.create(document)
    const model = await entity.save(saveOptions)
    return model as T
  }

  async findOr(propertyList: (keyof T)[], value: string): Promise<T[]> {
    const filter = propertyList.map((property) => ({
      [property]: value,
      deletedAt: null
    })) as unknown as FindOptionsWhere<T>[]

    return this.repository.find({ where: filter })
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } } as FindOneOptions<T>)
  }

  async insertMany(document: T[]): Promise<void> {
    await this.repository.insert(document as object[])
  }

  async createOrUpdate<TUpdate = Partial<T>>(
    updated: TUpdate
  ): Promise<CreatedOrUpdateModel> {
    const documentEntity: IEntity = updated as IEntity
    if (!documentEntity?.id) {
      throw new Error('id is required')
    }

    const exists = await this.findById(documentEntity.id)

    if (!exists) {
      const created = await this.create(updated as unknown as T)

      return { id: created.id, created: true, updated: false }
    }

    const row = await this.repository.update(
      { id: exists['id'] } as FindOptionsWhere<T>,
      { ...exists, ...updated } as object
    )

    return {
      id: exists['id'],
      created: false,
      updated: (row.affected || 0) > 0
    }
  }

  async findAll(): Promise<T[]> {
    return this.repository.find()
  }

  async find<TQuery = Partial<T>>(filter: TQuery): Promise<T[]> {
    return this.repository.find({
      where: { ...filter, deletedAt: null }
    } as FindOneOptions<T>)
  }

  async findIn(filter: { [key in keyof Partial<T>]: string[] }): Promise<T[]> {
    const key = Object.keys(filter)[0] as keyof Partial<T>
    return this.repository.find({
      where: { [key]: In(filter[key] as readonly string[]) }
    } as FindOneOptions<T>)
  }

  async findByCommands(
    filterList: DatabaseOperationCommand<T>[]
  ): Promise<T[]> {
    const searchList: { [key: string]: unknown } = {}

    const postgresSearch = {
      equal: {
        query: (value: unknown[]) =>
          Raw(
            (alias) =>
              `${alias} ILIKE ANY ('{${value.map((v) => `${`${v}`}`).join(', ')}}')`
          ),
        like: false
      },
      not_equal: {
        query: (value: unknown[]) =>
          Raw(
            (alias) =>
              `${alias} NOT ILIKE ALL (ARRAY[${value.map((v) => `'${v}'`).join(', ')}])`
          ),
        like: false
      },
      not_contains: {
        query: (value: unknown[]) =>
          Raw(
            (alias) =>
              `${alias} NOT ILIKE ALL (ARRAY[${value.map((v) => `'%${v}%'`).join(', ')}])`
          ),
        like: true
      },
      contains: {
        query: (value: unknown[]) =>
          Raw(
            (alias) =>
              `${alias} ILIKE ANY ('{${value.map((v) => `${`%${v}%`}`).join(', ')}}')`
          ),
        like: true
      }
    }

    for (const filter of filterList) {
      searchList[`${filter.property.toString()}`] = postgresSearch[
        filter.command
      ].query(filter.value)
    }

    return this.repository.find({
      where: searchList
    } as FindOneOptions<T>)
  }

  async remove<TQuery = Partial<T>>(filter: TQuery): Promise<RemovedModel> {
    const data = await this.repository.delete(filter as FindOptionsWhere<T>)
    return { deletedCount: data.affected || 0, deleted: !!data.affected }
  }

  async findOne<TQuery = Partial<T>>(filter: TQuery): Promise<T | null> {
    return this.repository.findOne({
      where: filter
    } as FindOneOptions<T>)
  }

  async updateOne<TQuery = Partial<T>, TUpdate = Partial<T>>(
    filter: TQuery,
    updated: TUpdate
  ): Promise<UpdatedModel> {
    const data = await this.repository.update(
      filter as FindOptionsWhere<T>,
      Object.assign({}, updated)
    )
    return {
      modifiedCount: data.affected || 0,
      upsertedCount: 0,
      upsertedId: 0,
      matchedCount: data.affected || 0,
      acknowledged: !!data.affected
    }
  }

  async findOneAndUpdate<TQuery = Partial<T>, TUpdate = Partial<T>>(
    filter: TQuery,
    updated: TUpdate
  ): Promise<T | null> {
    await this.repository.update(
      filter as FindOptionsWhere<T>,
      updated as object
    )

    return this.findOne(filter)
  }

  async updateMany<TQuery = Partial<T>, TUpdate = Partial<T>>(
    filter: TQuery,
    updated: TUpdate
  ): Promise<UpdatedModel> {
    const data = await this.repository.update(
      filter as FindOptionsWhere<T>,
      updated as object
    )
    return {
      modifiedCount: data.affected || 0,
      upsertedCount: 0,
      upsertedId: 0,
      matchedCount: data.affected || 0,
      acknowledged: !!data.affected
    }
  }

  async findOneWithSelectFields<TQuery = Partial<T>>(
    filter: TQuery,
    includeProperties: (keyof T)[]
  ): Promise<T | null> {
    const select = includeProperties.map((e) => `${e.toString()}`)
    return this.repository.findOne({
      where: filter as FindOptionsWhere<T>,
      select: select as unknown as FindOptionsSelect<T>
    })
  }

  async findAllWithSelectFields<TQuery = Partial<T>>(
    includeProperties: (keyof T)[],
    filter?: TQuery
  ): Promise<T[]> {
    const select = includeProperties.map((e) => `${e.toString()}`)
    return this.repository.find({
      where: filter as FindOptionsWhere<T>,
      select: select as unknown as FindOptionsSelect<T>
    })
  }

  async findOneWithExcludeFields(
    filter: unknown,
    excludeProperties: (keyof T)[]
  ): Promise<T | null> {
    const select = excludeProperties.map((e) => `${e.toString()}`)
    return this.repository.findOne({
      where: filter as FindOptionsWhere<T>,
      select: this.excludeColumns(select) as unknown as FindOptionsSelect<T>
    })
  }

  async findAllWithExcludeFields<TQuery = Partial<T>>(
    excludeProperties: (keyof T)[],
    filter?: TQuery
  ): Promise<T[]> {
    const select = excludeProperties.map((e) => `${e.toString()}`)
    return this.repository.find({
      where: filter as FindOptionsWhere<T>,
      select: this.excludeColumns(select) as unknown as FindOptionsSelect<T>
    })
  }

  private excludeColumns = (columnsToExclude: string[]): string[] =>
    this.repository.metadata.columns
      .map((column) => column.databaseName)
      .filter((columnName) => !columnsToExclude.includes(columnName))
}
