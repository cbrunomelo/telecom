import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Contrato } from '../../../shared/models/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private endpoint = '/contratos';

  constructor(private api: ApiService) {}

  /**
   * Obtém todos os contratos
   * @param params Parâmetros opcionais de filtro
   */
  getAll(params?: any): Observable<Contrato[]> {
    return this.api.get<Contrato[]>(this.endpoint, params);
  }

  /**
   * Obtém um contrato pelo ID
   * @param id ID do contrato
   */
  getById(id: number): Observable<Contrato> {
    return this.api.get<Contrato>(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo contrato
   * @param contrato Dados do contrato
   */
  create(contrato: Partial<Contrato>): Observable<Contrato> {
    return this.api.post<Contrato>(this.endpoint, contrato);
  }

  /**
   * Atualiza um contrato existente
   * @param id ID do contrato
   * @param contrato Dados atualizados do contrato
   */
  update(id: number, contrato: Partial<Contrato>): Observable<Contrato> {
    return this.api.put<Contrato>(`${this.endpoint}/${id}`, contrato);
  }

  /**
   * Remove um contrato
   * @param id ID do contrato
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Atualiza parcialmente um contrato
   * @param id ID do contrato
   * @param contrato Dados parciais do contrato
   */
  patch(id: number, contrato: Partial<Contrato>): Observable<Contrato> {
    return this.api.patch<Contrato>(`${this.endpoint}/${id}`, contrato);
  }
} 