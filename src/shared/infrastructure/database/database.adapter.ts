import { ConnectionType } from './types'

export abstract class IDataBaseAdapter<T> {
  abstract getConnection<TConnection extends T = T>(model: ConnectionType): TConnection
  abstract getDatabase<TInstance = unknown>(): TInstance
}
