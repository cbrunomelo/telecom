import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operadora } from '../../shared/models/operadora.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  constructor(private apiService: ApiService) {}

  /**
   * Busca todas as operadoras
   */
  getAll(): Observable<Operadora[]> {
    return this.apiService.get<Operadora[]>('/operadora');
  }

  /**
   * Busca uma operadora por ID
   */
  getById(id: number): Observable<Operadora> {
    return this.apiService.get<Operadora>(`/operadora/${id}`);
  }

  /**
   * Cria uma nova operadora
   */
  create(operadora: Operadora): Observable<Operadora> {
    return this.apiService.post<Operadora>('/operadora', operadora);
  }

  /**
   * Atualiza uma operadora existente
   */
  update(id: number, operadora: Operadora): Observable<Operadora> {
    return this.apiService.put<Operadora>(`/operadora/${id}`, operadora);
  }

  /**
   * Deleta uma operadora
   */
  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`/operadora/${id}`);
  }

  /**
   * Atualiza parcialmente uma operadora
   */
  patch(id: number, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.apiService.patch<Operadora>(`/operadora/${id}`, operadora);
  }
} 