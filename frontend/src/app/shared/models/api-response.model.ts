export interface ApiResponse<T = any> {
  sucess: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface PagedApiResponse<T> extends ApiResponse<PagedData<T>> {}

export interface PagedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type ApiSuccessResponse<T> = ApiResponse<T> & { sucess: true };
export type ApiErrorResponse = ApiResponse<null> & { sucess: false }; 