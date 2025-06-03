import { Operadora } from './operadora.model';

export enum StatusContrato {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  CANCELADO = 'CANCELADO'
}

export interface Contrato {
  id: number;
  nomeFilial: string;
  numero: string;
  operadoraId: number;
  planoContratado: string;
  dataInicio: Date;
  dataFim?: Date;
  dataVencimento: Date;
  valorMensal: number;
  status: StatusContrato;
  tipo: 'INTERNET' | 'TELEFONIA' | 'TV';
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
} 