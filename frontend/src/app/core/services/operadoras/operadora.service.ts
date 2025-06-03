import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Operadora } from '../../../shared/models/operadora.model';
import { OPERADORAS } from '../../mock/mock-data';

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
  private operadoras: Operadora[] = OPERADORAS;

  getAll(params?: { page?: number; pageSize?: number }): Observable<PagedResult<Operadora>> {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    const paginatedItems = this.operadoras.slice(start, end);
    const total = this.operadoras.length;
    const totalPages = Math.ceil(total / pageSize);

    return of({
      items: paginatedItems,
      total,
      page,
      pageSize,
      totalPages
    }).pipe(delay(500));
  }

  getById(id: number): Observable<Operadora> {
    const operadora = this.operadoras.find(o => o.id === id);
    if (!operadora) throw new Error('Operadora não encontrada');
    return of(operadora).pipe(delay(500));
  }

  create(operadora: Partial<Operadora>): Observable<Operadora> {
    const newOperadora: Operadora = {
      id: this.operadoras.length + 1,
      ...operadora,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Operadora;
    
    this.operadoras.push(newOperadora);
    return of(newOperadora).pipe(delay(500));
  }

  update(id: number, operadora: Partial<Operadora>): Observable<Operadora> {
    const index = this.operadoras.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Operadora não encontrada');

    const updatedOperadora: Operadora = {
      ...this.operadoras[index],
      ...operadora,
      updatedAt: new Date()
    };

    this.operadoras[index] = updatedOperadora;
    return of(updatedOperadora).pipe(delay(500));
  }

  delete(id: number): Observable<void> {
    const index = this.operadoras.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Operadora não encontrada');

    this.operadoras.splice(index, 1);
    return of(void 0).pipe(delay(500));
  }

  patch(id: number, operadora: Partial<Operadora>): Observable<Operadora> {
    return this.update(id, operadora);
  }
} 