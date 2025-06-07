import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fatura } from '../../shared/models/fatura.model';
import { ApiService } from './api.service';

export interface DashboardFilters {
  periodo?: number; // em dias
  operadoraId?: number;
  status?: string;
}

export interface EvolucaoMensal {
  mes: string;
  emitidas: number;
  pagas: number;
  valor: number;
}

export interface DashboardData {
  totalFaturas: number;
  valorTotalFaturado: number;
  faturasStatus: {
    pagas: number;
    pendentes: number;
    atrasadas: number;
  };
  evolucaoMensal: EvolucaoMensal[];
}

@Injectable({
  providedIn: 'root'
})
export class FaturaService {

  constructor(private apiService: ApiService) {}

  /**
   * Busca todas as faturas
   */
  getAll(): Observable<Fatura[]> {
    return this.apiService.get<Fatura[]>('/fatura');
  }

  /**
   * Busca uma fatura por ID
   */
  getById(id: string): Observable<Fatura> {
    return this.apiService.get<Fatura>(`/fatura/${id}`);
  }

  /**
   * Busca faturas por contrato
   */
  getByContrato(contratoId: string): Observable<Fatura[]> {
    return this.apiService.get<Fatura[]>('/fatura', { contratoId });
  }

  /**
   * Cria uma nova fatura
   */
  create(fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.post<Fatura>('/fatura', fatura);
  }

  /**
   * Atualiza uma fatura existente
   */
  update(id: string, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.put<Fatura>(`/fatura/${id}`, fatura);
  }

  /**
   * Deleta uma fatura
   */
  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`/fatura/${id}`);
  }

  /**
   * Atualiza parcialmente uma fatura
   */
  patch(id: string, fatura: Partial<Fatura>): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}`, fatura);
  }

  /**
   * Busca dados do dashboard com filtros
   */
  getDashboardData(filters?: DashboardFilters): Observable<DashboardData> {
    return this.apiService.get<DashboardData>('/fatura/dashboard', filters);
  }

  /**
   * Busca evolução mensal das faturas
   */
  getEvolucaoMensal(filters?: DashboardFilters): Observable<EvolucaoMensal[]> {
    return this.apiService.get<EvolucaoMensal[]>('/fatura/evolucao-mensal', filters);
  }

  /**
   * Busca faturas com filtros personalizados
   */
  getFaturasFiltradas(filters?: DashboardFilters): Observable<Fatura[]> {
    return this.apiService.get<Fatura[]>('/fatura/filtradas', filters);
  }

  /**
   * Marca uma fatura como paga
   */
  marcarComoPaga(id: string, dataPagamento?: Date): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}/pagar`, { 
      status: 'PAGA', 
      dataPagamento: dataPagamento || new Date() 
    });
  }

  /**
   * Marca uma fatura como atrasada
   */
  marcarComoAtrasada(id: string): Observable<Fatura> {
    return this.apiService.patch<Fatura>(`/fatura/${id}/atraso`, { status: 'ATRASADA' });
  }
} 