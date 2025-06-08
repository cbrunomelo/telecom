export interface DashboardFilters {
  periodo?: number; // em dias
  operadoraId?: string;
  status?: number;
}

export interface FaturasStatus {
  pagas: number;
  pendentes: number;
  atrasadas: number;
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
  faturasStatus: FaturasStatus;
  evolucaoMensal: EvolucaoMensal[];
} 