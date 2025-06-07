export interface Contrato {
  id?: string;
  nomeFilial: string;
  planoContratado: string;
  dataInicio: Date;
  dataVencimento: Date;
  valorMensal: number;
  operadoraId: string;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 