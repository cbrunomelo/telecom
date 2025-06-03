import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza uma requisição GET
   * @param endpoint Endpoint da API
   * @param params Parâmetros opcionais da query
   * @returns Observable do tipo T
   */
  get<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição POST
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable do tipo T
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição PUT
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable do tipo T
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição DELETE
   * @param endpoint Endpoint da API
   * @returns Observable do tipo T
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição PATCH
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable do tipo T
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .patch<T>(`${this.apiUrl}${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * Constrói os parâmetros HTTP para a requisição
   * @param params Objeto com os parâmetros
   * @returns HttpParams
   */
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

  /**
   * Trata os erros das requisições HTTP
   * @param error Erro HTTP
   * @returns Observable com erro
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro na requisição';

    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `
        Código do erro: ${error.status},
        Mensagem: ${error.error?.message || error.message}
      `;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 