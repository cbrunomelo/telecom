import { Contrato } from './contrato.model';

export enum StatusFatura {
  PAGA = 'PAGA',
  PENDENTE = 'PENDENTE',
  ATRASADA = 'ATRASADA'
}

export interface Fatura {
  id: number;
  numeroFatura: string;
  contratoId: number;
  operadoraId: number;
  dataEmissao: Date;
  dataVencimento: Date;
  valor: number;
  status: StatusFatura;
  dataPagamento?: Date;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
} 