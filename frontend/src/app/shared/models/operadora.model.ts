export enum ETipoServicoOperadora {
  Movel = 1,
  Fixo = 2,
  Internet = 3
}

export interface Operadora {
  id?: string;
  nome: string;
  eTipoServicoOperadora: ETipoServicoOperadora;
  contatoSuporte: string;
}

// Função utilitária para converter enum em texto
export function getTipoServicoTexto(tipo: ETipoServicoOperadora): string {
  switch (tipo) {
    case ETipoServicoOperadora.Movel:
      return 'Móvel';
    case ETipoServicoOperadora.Fixo:
      return 'Fixo';
    case ETipoServicoOperadora.Internet:
      return 'Internet';
    default:
      return 'Não definido';
  }
} 