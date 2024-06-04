export interface BaseResponse {
  status_code: number
  message: string
}
export interface Pagination {
  total: number
  current_page: number
  total_page: number
  per_page: number
}

export interface ErrorDetail {
  code: string
  message: string
}

export interface ApiResponse<T> extends BaseResponse {
  result: T
}

export interface ApiPagingResponse<T> extends BaseResponse {
  result: T[]
  pagination: Pagination
}
