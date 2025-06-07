export enum StatusFatura {
  PAGA = 'PAGA',
  PENDENTE = 'PENDENTE',
  ATRASADA = 'ATRASADA'
}

export interface Fatura {
  id?: string;
  numeroFatura: string;
  contratoId: string;
  operadoraId: string;
  dataEmissao: Date;
  dataVencimento: Date;
  valor: number;
  status: StatusFatura;
  dataPagamento?: Date;
  // Propriedades para compatibilidade com dados mock/frontend
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 