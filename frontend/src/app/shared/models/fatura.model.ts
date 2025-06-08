export enum EFaturaStatus {
  Pendente = 1,
  Paga = 2,
  Atrasada = 3,
  Cancelada = 4
}

export interface Fatura {
  id?: string;
  valor: number;
  dataVencimento: Date;
  contratoId: string;
  status: EFaturaStatus;
  dateEmissao?: Date;
}

export function getFaturaStatusTexto(status: EFaturaStatus): string {
  switch (status) {
    case EFaturaStatus.Pendente:
      return 'Pendente';
    case EFaturaStatus.Paga:
      return 'Paga';
    case EFaturaStatus.Atrasada:
      return 'Atrasada';
    case EFaturaStatus.Cancelada:
      return 'Cancelada';
    default:
      return 'Não definido';
  }
}

export function getFaturaStatusOptions() {
  return [
    { label: getFaturaStatusTexto(EFaturaStatus.Pendente), value: EFaturaStatus.Pendente },
    { label: getFaturaStatusTexto(EFaturaStatus.Paga), value: EFaturaStatus.Paga },
    { label: getFaturaStatusTexto(EFaturaStatus.Atrasada), value: EFaturaStatus.Atrasada },
    { label: getFaturaStatusTexto(EFaturaStatus.Cancelada), value: EFaturaStatus.Cancelada }
  ];
} 