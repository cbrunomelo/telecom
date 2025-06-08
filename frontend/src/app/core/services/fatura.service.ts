import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fatura } from '../../shared/models/fatura.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FaturaService {

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Fatura[]> {
    return this.apiService.get<Fatura[]>('/fatura');
  }

  getById(id: string): Observable<Fatura> {
    return this.apiService.get<Fatura>(`/fatura/${id}`);
  }

  getByContrato(contratoId: string): Observable<Fatura[]> {
    return this.apiService.get<Fatura[]>('/fatura', { contratoId });
  }

  create(fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.post<Fatura>('/fatura', fatura);
  }

  update(id: string, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.put<Fatura>(`/fatura/${id}`, fatura);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/fatura/${id}`);
  }

  patch(id: string, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}`, fatura);
  }

  marcarComoPaga(id: string, dataPagamento?: Date): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}/pagar`, { 
      status: 'PAGA', 
      dataPagamento: dataPagamento || new Date() 
    });
  }

  marcarComoAtrasada(id: string): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}/atraso`, { status: 'ATRASADA' });
  }
} 