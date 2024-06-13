import { CreatedModel, CreatedOrUpdateModel, DatabaseOperationCommand, RemovedModel, UpdatedModel } from './types'

export abstract class IRepository<T, TOptions> {
  abstract create(document: T, saveOptions?: TOptions): Promise<CreatedModel>

  abstract createOrUpdate(document: Partial<T>, options?: TOptions): Promise<CreatedOrUpdateModel>

  abstract insertMany(document: Array<T>, saveOptions?: TOptions): Promise<void>

  abstract findById(id: string, options?: TOptions): Promise<T | null>

  abstract findAll(filter?: Partial<T>, opt?: TOptions): Promise<Array<T>>

  abstract find(filter: Partial<T>, options?: TOptions | null): Promise<Array<T>>

  abstract findIn(filter: { [key in keyof Partial<T>]: string[] }, options?: TOptions): Promise<Array<T>>

  abstract findByCommands(filterList: DatabaseOperationCommand<T>[], options?: TOptions): Promise<T[]>

  abstract remove(filter: Partial<T>, opt?: TOptions): Promise<RemovedModel>

  abstract findOne(filter: Partial<T>, options?: TOptions): Promise<T | null>

  abstract updateOne(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<UpdatedModel>

  abstract findOneAndUpdate(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<T | null>

  abstract updateMany(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<UpdatedModel>

  abstract findOneWithExcludeFields(
    filter: Partial<T>,
    excludeProperties: Array<keyof T>,
    options?: TOptions
  ): Promise<T | null>

  abstract findAllWithExcludeFields(
    excludeProperties: Array<keyof T>,
    filter?: Partial<T>,
    options?: TOptions
  ): Promise<Array<T>>

  abstract findOneWithSelectFields(
    filter: Partial<T>,
    includeProperties: Array<keyof T>,
    options?: TOptions
  ): Promise<T | null>

  abstract findAllWithSelectFields(
    includeProperties: Array<keyof T>,
    filter?: Partial<T>,
    options?: TOptions
  ): Promise<T[]>
}
