import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../models/api-response.model';

/**
 * Verifica se a resposta da API foi bem sucedida
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.sucess === true;
}

/**
 * Verifica se a resposta da API teve erro
 */
export function isApiError(response: ApiResponse<any>): response is ApiErrorResponse {
  return response.sucess === false;
}

/**
 * Extrai dados de uma resposta da API ou lança erro
 */
export function extractApiData<T>(response: ApiResponse<T>): T {
  if (isApiSuccess(response)) {
    return response.data;
  }
  
  const errorMessage = response.message || 'Erro na requisição';
  const errors = response.errors?.join(', ') || '';
  throw new Error(`${errorMessage}${errors ? ': ' + errors : ''}`);
}

/**
 * Cria uma mensagem de erro formatada a partir da resposta da API
 */
export function formatApiError(response: ApiErrorResponse): string {
  const message = response.message || 'Erro na requisição';
  const errors = response.errors?.length ? response.errors.join(', ') : '';
  return errors ? `${message}: ${errors}` : message;
}

/**
 * Verifica se um erro é uma resposta de erro da API
 */
export function isApiErrorResponse(error: any): error is ApiErrorResponse {
  return error && 
         typeof error === 'object' && 
         'sucess' in error && 
         error.sucess === false && 
         'message' in error;
} 