import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Fatura } from '../../../shared/models/fatura.model';

@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private endpoint = '/faturas';

  constructor(private api: ApiService) {}

  /**
   * Obtém todas as faturas
   * @param params Parâmetros opcionais de filtro
   */
  getAll(params?: any): Observable<Fatura[]> {
    return this.api.get<Fatura[]>(this.endpoint, params);
  }

  /**
   * Obtém uma fatura pelo ID
   * @param id ID da fatura
   */
  getById(id: number): Observable<Fatura> {
    return this.api.get<Fatura>(`${this.endpoint}/${id}`);
  }

  /**
   * Obtém faturas por contrato
   * @param contratoId ID do contrato
   */
  getByContrato(contratoId: number): Observable<Fatura[]> {
    return this.api.get<Fatura[]>(`${this.endpoint}?contratoId=${contratoId}`);
  }

  /**
   * Cria uma nova fatura
   * @param fatura Dados da fatura
   */
  create(fatura: Partial<Fatura>): Observable<Fatura> {
    return this.api.post<Fatura>(this.endpoint, fatura);
  }

  /**
   * Atualiza uma fatura existente
   * @param id ID da fatura
   * @param fatura Dados atualizados da fatura
   */
  update(id: number, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.api.put<Fatura>(`${this.endpoint}/${id}`, fatura);
  }

  /**
   * Remove uma fatura
   * @param id ID da fatura
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Atualiza parcialmente uma fatura
   * @param id ID da fatura
   * @param fatura Dados parciais da fatura
   */
  patch(id: number, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.api.patch<Fatura>(`${this.endpoint}/${id}`, fatura);
  }
} 