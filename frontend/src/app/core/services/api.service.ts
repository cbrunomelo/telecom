import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    const options = { ...this.httpOptions, params: httpParams };
    
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, options)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  getFullResponse<T>(endpoint: string, params?: { [key: string]: any }): Observable<ApiResponse<T>> {
    const httpParams = this.buildHttpParams(params);
    const options = { ...this.httpOptions, params: httpParams };
    
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  postFullResponse<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, this.httpOptions)
      .pipe(
        map(response => {
          if (!response) {
            return null as unknown as T;
          }
          return this.extractData<T>(response);
        }),
        catchError(this.handleError)
      );
  }

  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .patch<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  private extractData<T>(response: ApiResponse<T>): T {
    if (!response) {
      throw new Error('Resposta da API é nula ou undefined');
    }

    if (!response.sucess) {
      const errorMessage = response.message || 'Erro na requisição';
      const errors = response.errors?.join(', ') || '';
      throw new Error(`${errorMessage}${errors ? ': ' + errors : ''}`);
    }
    return response.data;
  }

  private buildHttpParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return httpParams;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro na requisição';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        const apiError = error.error as ApiResponse<any>;
        errorMessage = apiError.message || errorMessage;
        if (apiError.errors && apiError.errors.length > 0) {
          errorMessage += ': ' + apiError.errors.join(', ');
        }
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Erro de conexão: Verifique se o servidor está rodando';
            break;
          case 400:
            errorMessage = 'Requisição inválida';
            break;
          case 401:
            errorMessage = 'Não autorizado';
            break;
          case 403:
            errorMessage = 'Acesso negado';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor';
            break;
          default:
            errorMessage = `Erro ${error.status}: ${error.error?.message || error.message}`;
        }
      }
    }

    return throwError(() => new Error(errorMessage));
  }
} 