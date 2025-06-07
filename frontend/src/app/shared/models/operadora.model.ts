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
  id?: string;
  nome: string;
  tipoServico: TipoServico;
  contatoSuporte: string;
  status: StatusOperadora;
  // Propriedades para compatibilidade com dados mock/frontend
  dataCadastro?: Date;
  createdAt?: Date;
  updatedAt?: Date;
} 