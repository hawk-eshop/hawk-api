import { CreatedOrUpdateModel, DatabaseOperationCommand, RemovedModel, UpdatedModel } from './types'

export interface IRepository<T, TOptions> {
  create(document: T, saveOptions?: TOptions): Promise<T>

  createOrUpdate(document: Partial<T>, options?: TOptions): Promise<CreatedOrUpdateModel>

  insertMany(document: Array<T>, saveOptions?: TOptions): Promise<void>

  findById(id: string, options?: TOptions): Promise<T | null>

  findAll(filter?: Partial<T>, opt?: TOptions): Promise<Array<T>>

  find(filter: Partial<T>, options?: TOptions | null): Promise<Array<T>>

  findIn(filter: { [key in keyof Partial<T>]: string[] }, options?: TOptions): Promise<Array<T>>

  findByCommands(filterList: DatabaseOperationCommand<T>[], options?: TOptions): Promise<T[]>

  remove(filter: Partial<T>, opt?: TOptions): Promise<RemovedModel>

  findOne(filter: Partial<T>, options?: TOptions): Promise<T | null>

  updateOne(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<UpdatedModel>

  findOneAndUpdate(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<T | null>

  updateMany(filter: Partial<T>, updated: Partial<T>, options?: TOptions): Promise<UpdatedModel>

  findOneWithExcludeFields(filter: Partial<T>, excludeProperties: Array<keyof T>, options?: TOptions): Promise<T | null>

  findAllWithExcludeFields(
    excludeProperties: Array<keyof T>,
    filter?: Partial<T>,
    options?: TOptions
  ): Promise<Array<T>>

  findOneWithSelectFields(filter: Partial<T>, includeProperties: Array<keyof T>, options?: TOptions): Promise<T | null>

  findAllWithSelectFields(includeProperties: Array<keyof T>, filter?: Partial<T>, options?: TOptions): Promise<T[]>
}
