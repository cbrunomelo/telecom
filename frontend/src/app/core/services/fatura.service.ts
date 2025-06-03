import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fatura } from '../../shared/models/fatura.model';
import { FATURAS, DASHBOARD_DATA } from '../mock/mock-data';

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

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

@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private faturas = FATURAS;
  private meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  getAll(params: { page: number; pageSize: number }): Observable<PagedResult<Fatura>> {
    const { page, pageSize } = params;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = this.faturas.slice(start, end);
    
    return of({
      items,
      total: this.faturas.length,
      page,
      pageSize,
      totalPages: Math.ceil(this.faturas.length / pageSize)
    });
  }

  getById(id: number): Observable<Fatura> {
    const fatura = this.faturas.find(f => f.id === id);
    return of(fatura!);
  }

  getByContrato(contratoId: number): Observable<Fatura[]> {
    const faturas = this.faturas.filter(f => f.contratoId === contratoId);
    return of(faturas);
  }

  create(fatura: Partial<Fatura>): Observable<Fatura> {
    const newFatura = {
      ...fatura,
      id: this.faturas.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Fatura;
    this.faturas.push(newFatura);
    return of(newFatura);
  }

  update(id: number, fatura: Partial<Fatura>): Observable<Fatura> {
    const index = this.faturas.findIndex(f => f.id === id);
    if (index !== -1) {
      this.faturas[index] = {
        ...this.faturas[index],
        ...fatura,
        id,
        updatedAt: new Date()
      };
      return of(this.faturas[index]);
    }
    return of(fatura as Fatura);
  }

  delete(id: number): Observable<void> {
    const index = this.faturas.findIndex(f => f.id === id);
    if (index !== -1) {
      this.faturas.splice(index, 1);
    }
    return of(void 0);
  }

  getFaturasFiltradas(filters?: DashboardFilters): Fatura[] {
    let faturasFiltradas = [...this.faturas];

    if (filters) {
      if (filters.periodo) {
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - filters.periodo);
        faturasFiltradas = faturasFiltradas.filter(fatura => 
          new Date(fatura.dataEmissao) >= dataLimite
        );
      }

      if (filters.operadoraId) {
        faturasFiltradas = faturasFiltradas.filter(fatura => 
          fatura.operadoraId === filters.operadoraId
        );
      }

      if (filters.status) {
        faturasFiltradas = faturasFiltradas.filter(fatura => 
          fatura.status === filters.status
        );
      }
    }

    return faturasFiltradas;
  }

  getEvolucaoMensal(faturas: Fatura[]): EvolucaoMensal[] {
    const evolucaoMensal = new Map<string, EvolucaoMensal>();

    // Inicializa os últimos 12 meses
    const hoje = new Date();
    for (let i = 11; i >= 0; i--) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const mesAno = `${this.meses[data.getMonth()]}/${data.getFullYear().toString().substr(2)}`;
      evolucaoMensal.set(mesAno, { mes: mesAno, emitidas: 0, pagas: 0, valor: 0 });
    }

    // Agrupa as faturas por mês
    faturas.forEach(fatura => {
      const data = new Date(fatura.dataEmissao);
      const mesAno = `${this.meses[data.getMonth()]}/${data.getFullYear().toString().substr(2)}`;
      
      const dadosMes = evolucaoMensal.get(mesAno) || { mes: mesAno, emitidas: 0, pagas: 0, valor: 0 };
      dadosMes.emitidas++;
      if (fatura.status === 'PAGA') {
        dadosMes.pagas++;
      }
      dadosMes.valor += fatura.valor;
      
      evolucaoMensal.set(mesAno, dadosMes);
    });

    return Array.from(evolucaoMensal.values());
  }

  getDashboardData(filters?: DashboardFilters): Observable<any> {
    const faturasFiltradas = this.getFaturasFiltradas(filters);
    const evolucaoMensal = this.getEvolucaoMensal(faturasFiltradas);

    return of({
      totalFaturas: faturasFiltradas.length,
      valorTotalFaturado: faturasFiltradas.reduce((total, fatura) => total + fatura.valor, 0),
      faturasStatus: {
        pagas: faturasFiltradas.filter(f => f.status === 'PAGA').length,
        pendentes: faturasFiltradas.filter(f => f.status === 'PENDENTE').length,
        atrasadas: faturasFiltradas.filter(f => f.status === 'ATRASADA').length
      },
      evolucaoMensal
    });
  }
} 