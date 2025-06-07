export enum StatusContrato {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  CANCELADO = 'CANCELADO'
}

export interface Contrato {
  id?: string;
  nomeFilial: string;
  planoContratado: string;
  dataInicio: Date;
  dataVencimento: Date;
  valorMensal: number;
  operadoraId: string;
  // Propriedades para compatibilidade com dados mock/frontend
  numero?: string;
  dataFim?: Date;
  status?: StatusContrato;
  tipo?: 'INTERNET' | 'TELEFONIA' | 'TV';
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 