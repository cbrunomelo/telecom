import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Operadora } from '../../shared/models/operadora.model';
import { OPERADORAS } from '../mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {
  private operadoras = OPERADORAS;

  getAll(): Observable<Operadora[]> {
    return of(this.operadoras);
  }

  getById(id: number): Observable<Operadora> {
    const operadora = this.operadoras.find(o => o.id === id);
    return of(operadora!);
  }

  create(operadora: Operadora): Observable<Operadora> {
    operadora.id = this.operadoras.length + 1;
    this.operadoras.push(operadora);
    return of(operadora);
  }

  update(id: number, operadora: Operadora): Observable<Operadora> {
    const index = this.operadoras.findIndex(o => o.id === id);
    if (index !== -1) {
      this.operadoras[index] = { ...operadora, id };
      return of(this.operadoras[index]);
    }
    return of(operadora);
  }

  delete(id: number): Observable<void> {
    const index = this.operadoras.findIndex(o => o.id === id);
    if (index !== -1) {
      this.operadoras.splice(index, 1);
    }
    return of(void 0);
  }
} 