/**
 * Interface que representa a resposta padrão da API (HandleResult)
 */
export interface ApiResponse<T = any> {
  sucess: boolean; // Note: mantendo "sucess" como no backend (typo original)
  message: string;
  data: T;
  errors: string[];
}

/**
 * Interface para respostas paginadas
 */
export interface PagedApiResponse<T> extends ApiResponse<PagedData<T>> {}

export interface PagedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Tipo para verificar se uma resposta foi bem sucedida
 */
export type ApiSuccessResponse<T> = ApiResponse<T> & { sucess: true };
export type ApiErrorResponse = ApiResponse<null> & { sucess: false }; 