import { ErrorDetail } from './response.type'

export interface ProblemDetails {
  type: string
  title: string
  status: number
  detail?: string | object
  instance?: string
  client_info: ErrorDetail
}
