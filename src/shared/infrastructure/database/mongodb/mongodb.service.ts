import { MongooseModuleOptions } from '@nestjs/mongoose'

import { IDataBaseAdapter } from '../database.adapter'
import { ConnectionType } from '../types'

export class MongoService implements Partial<IDataBaseAdapter<MongooseModuleOptions>> {
  getConnection<TConnection>({ URI }: ConnectionType): TConnection {
    return {
      uri: URI
    } as TConnection
  }
}
