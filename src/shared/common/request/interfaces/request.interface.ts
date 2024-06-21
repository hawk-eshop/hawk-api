import { Request } from 'express'

export interface IRequestApp<
  T = Record<string, any>,
  N = Record<string, any>,
  B = Record<string, any>
> extends Request {
  apiKey?: B
  user?: T
  __user?: N

  __language: string
  __version: string

  //  __paging: ResponsePagingMetadataPaginationDto
}
