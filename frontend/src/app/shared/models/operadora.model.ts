export enum TipoServico {
  MOVEL = 'MOVEL',
  FIXO = 'FIXO',
  INTERNET = 'INTERNET'
}

export enum StatusOperadora {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO'
}

export interface Operadora {
  id: number;
  nome: string;
  tipoServico: TipoServico;
  contatoSuporte: string;
  dataCadastro: Date;
  status: StatusOperadora;
  createdAt: Date;
  updatedAt: Date;
}

export interface FiltrosPesquisaOperadora {
  nome?: string;
  tipoServico?: TipoServico;
  status?: StatusOperadora;
  pagina?: number;
  itensPorPagina?: number;
  ordenarPor?: 'nome' | 'tipoServico' | 'status' | 'dataCadastro';
  direcao?: 'asc' | 'desc';
} 