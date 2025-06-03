import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contrato } from '../../shared/models/contrato.model';
import { CONTRATOS } from '../mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private contratos = CONTRATOS;

  getAll(): Observable<Contrato[]> {
    return of(this.contratos);
  }

  getById(id: number): Observable<Contrato> {
    const contrato = this.contratos.find(c => c.id === id);
    return of(contrato!);
  }

  getByOperadora(operadoraId: number): Observable<Contrato[]> {
    const contratos = this.contratos.filter(c => c.operadoraId === operadoraId);
    return of(contratos);
  }

  create(contrato: Partial<Contrato>): Observable<Contrato> {
    const newContrato = {
      ...contrato,
      id: this.contratos.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Contrato;
    this.contratos.push(newContrato);
    return of(newContrato);
  }

  update(id: number, contrato: Partial<Contrato>): Observable<Contrato> {
    const index = this.contratos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contratos[index] = {
        ...this.contratos[index],
        ...contrato,
        id,
        updatedAt: new Date()
      };
      return of(this.contratos[index]);
    }
    return of(contrato as Contrato);
  }

  delete(id: number): Observable<void> {
    const index = this.contratos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contratos.splice(index, 1);
    }
    return of(void 0);
  }
} 