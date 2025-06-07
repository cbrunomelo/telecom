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

  /**
   * Realiza uma requisição GET e extrai os dados da resposta
   * @param endpoint Endpoint da API
   * @param params Parâmetros opcionais da query
   * @returns Observable com os dados extraídos
   */
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

  /**
   * Realiza uma requisição GET e retorna a resposta completa da API
   * @param endpoint Endpoint da API
   * @param params Parâmetros opcionais da query
   * @returns Observable com a resposta completa
   */
  getFullResponse<T>(endpoint: string, params?: { [key: string]: any }): Observable<ApiResponse<T>> {
    const httpParams = this.buildHttpParams(params);
    const options = { ...this.httpOptions, params: httpParams };
    
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição POST
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable com os dados extraídos
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Realiza uma requisição POST e retorna a resposta completa
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable com a resposta completa
   */
  postFullResponse<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza uma requisição PUT
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable com os dados extraídos
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Realiza uma requisição DELETE
   * @param endpoint Endpoint da API
   * @returns Observable com os dados extraídos
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, this.httpOptions)
      .pipe(
        map(response => {
          // Para DELETE, muitas vezes a resposta pode ser vazia
          if (!response) {
            // Se não há resposta, assume sucesso para DELETE
            return null as unknown as T;
          }
          return this.extractData<T>(response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Realiza uma requisição PATCH
   * @param endpoint Endpoint da API
   * @param body Corpo da requisição
   * @returns Observable com os dados extraídos
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .patch<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Extrai os dados da resposta da API e verifica por erros
   * @param response Resposta da API
   * @returns Dados extraídos
   */
  private extractData<T>(response: ApiResponse<T>): T {
    // Verifica se a resposta é nula ou undefined
    if (!response) {
      console.error('Resposta da API é nula ou undefined');
      throw new Error('Resposta da API é nula ou undefined');
    }

    // Mantendo "sucess" como está na interface (typo do backend)
    if (!response.sucess) {
      const errorMessage = response.message || 'Erro na requisição';
      const errors = response.errors?.join(', ') || '';
      throw new Error(`${errorMessage}${errors ? ': ' + errors : ''}`);
    }
    return response.data;
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
      if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        // Se o erro contém a estrutura ApiResponse
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

    console.error('Erro na API:', error);
    console.error('Mensagem:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 