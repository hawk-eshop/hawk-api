import 'express'

import { Pagination } from '@app/common/interfaces/response.interface'

declare module 'express' {
  export interface Request {
    customMessage?: string
    pagination?: Pagination
  }
}
