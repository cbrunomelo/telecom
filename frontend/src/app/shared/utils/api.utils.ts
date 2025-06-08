import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../models/api-response.model';

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.sucess === true;
}

export function isApiError(response: ApiResponse<any>): response is ApiErrorResponse {
  return response.sucess === false;
}

export function extractApiData<T>(response: ApiResponse<T>): T {
  if (isApiSuccess(response)) {
    return response.data;
  }
  
  const errorMessage = response.message || 'Erro na requisição';
  const errors = response.errors?.join(', ') || '';
  throw new Error(`${errorMessage}${errors ? ': ' + errors : ''}`);
}

export function formatApiError(response: ApiErrorResponse): string {
  const message = response.message || 'Erro na requisição';
  const errors = response.errors?.length ? response.errors.join(', ') : '';
  return errors ? `${message}: ${errors}` : message;
}

export function isApiErrorResponse(error: any): error is ApiErrorResponse {
  return error && 
         typeof error === 'object' && 
         'sucess' in error && 
         error.sucess === false && 
         'message' in error;
} 