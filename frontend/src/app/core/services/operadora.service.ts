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

  getAll(): Observable<PagedResult<Operadora>> {
    return this.apiService.get<PagedResult<Operadora>>('/operadora');
  }

  getById(id: string): Observable<Operadora> {
    return this.apiService.get<Operadora>(`/operadora/${id}`);
  }

  create(operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.post<Operadora>('/operadora', operadora);
  }

  update(id: string, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.put<Operadora>(`/operadora/${id}`, operadora);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/operadora/${id}`);
  }

  patch(id: string, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.patch<Operadora>(`/operadora/${id}`, operadora);
  }
} 