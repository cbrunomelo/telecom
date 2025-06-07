import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operadora } from '../../shared/models/operadora.model';
import { ApiService } from './api.service';
import { PagedData } from '../../shared/models/api-response.model';

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  constructor(private apiService: ApiService) {}

  /**
   * Busca todas as operadoras
   */
  getAll(): Observable<PagedResult<Operadora>> {
    return this.apiService.get<PagedResult<Operadora>>('/operadora');
  }

  /**
   * Busca uma operadora por ID
   */
  getById(id: string): Observable<Operadora> {
    return this.apiService.get<Operadora>(`/operadora/${id}`);
  }

  /**
   * Cria uma nova operadora
   */
  create(operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.post<Operadora>('/operadora', operadora);
  }

  /**
   * Atualiza uma operadora existente
   */
  update(id: string, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.put<Operadora>(`/operadora/${id}`, operadora);
  }

  /**
   * Deleta uma operadora
   */
  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/operadora/${id}`);
  }

  /**
   * Atualiza parcialmente uma operadora
   */
  patch(id: string, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.patch<Operadora>(`/operadora/${id}`, operadora);
  }
} 