import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../../shared/models/contrato.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Contrato[]> {
    return this.apiService.get<Contrato[]>('/contrato');
  }


  getById(id: number): Observable<Contrato> {
    return this.apiService.get<Contrato>(`/contrato/${id}`);
  }


  getByOperadora(operadoraId: number): Observable<Contrato[]> {
    return this.apiService.get<Contrato[]>('/contrato', { operadoraId });
  }


  create(contrato: Partial<Contrato>): Observable<Contrato> {
    return this.apiService.post<Contrato>('/contrato', contrato);
  }


  update(id: number, contrato: Partial<Contrato>): Observable<Contrato> {
    return this.apiService.put<Contrato>(`/contrato/${id}`, contrato);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`/contrato/${id}`);
  }


  patch(id: number, contrato: Partial<Contrato>): Observable<Contrato> {
    return this.apiService.patch<Contrato>(`/contrato/${id}`, contrato);
  }
} 