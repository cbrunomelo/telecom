import { Operadora, TipoServico, StatusOperadora } from '../../shared/models/operadora.model';
import { Contrato, StatusContrato } from '../../shared/models/contrato.model';
import { Fatura, StatusFatura } from '../../shared/models/fatura.model';

export const OPERADORAS: Operadora[] = [
  {
    id: 1,
    nome: 'Vivo',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 123 4567',
    dataCadastro: new Date('2024-01-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    nome: 'Claro',
    tipoServico: TipoServico.FIXO,
    contatoSuporte: '0800 765 4321',
    dataCadastro: new Date('2024-01-15'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    nome: 'TIM',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 987 6543',
    dataCadastro: new Date('2024-02-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    nome: 'Oi',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 111 2222',
    dataCadastro: new Date('2024-02-15'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    nome: 'NET',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 333 4444',
    dataCadastro: new Date('2024-02-20'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    nome: 'Nextel',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 555 6666',
    dataCadastro: new Date('2024-03-01'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    nome: 'GVT',
    tipoServico: TipoServico.FIXO,
    contatoSuporte: '0800 777 8888',
    dataCadastro: new Date('2024-03-05'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    nome: 'Algar',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 999 0000',
    dataCadastro: new Date('2024-03-10'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    nome: 'Sky',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 121 3434',
    dataCadastro: new Date('2024-03-15'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    nome: 'Copel Telecom',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 565 7878',
    dataCadastro: new Date('2024-03-20'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    nome: 'Sercomtel',
    tipoServico: TipoServico.FIXO,
    contatoSuporte: '0800 898 9090',
    dataCadastro: new Date('2024-03-25'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    nome: 'Desktop',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 232 4545',
    dataCadastro: new Date('2024-04-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 13,
    nome: 'BrisaNet',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 676 8989',
    dataCadastro: new Date('2024-04-05'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 14,
    nome: 'Unifique',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 787 9999',
    dataCadastro: new Date('2024-04-10'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 15,
    nome: 'Vero',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 343 5656',
    dataCadastro: new Date('2024-04-15'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 16,
    nome: 'Telecall',
    tipoServico: TipoServico.FIXO,
    contatoSuporte: '0800 454 6767',
    dataCadastro: new Date('2024-04-20'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 17,
    nome: 'American Net',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 565 7878',
    dataCadastro: new Date('2024-04-25'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 18,
    nome: 'Linktel',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 676 8989',
    dataCadastro: new Date('2024-05-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 19,
    nome: 'Surf Telecom',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 787 9999',
    dataCadastro: new Date('2024-05-05'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 20,
    nome: 'Datora',
    tipoServico: TipoServico.MOVEL,
    contatoSuporte: '0800 898 0000',
    dataCadastro: new Date('2024-05-10'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 21,
    nome: 'WCS',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 909 1111',
    dataCadastro: new Date('2024-05-15'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 22,
    nome: 'Mob Telecom',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 121 2222',
    dataCadastro: new Date('2024-05-20'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 23,
    nome: 'Ligga',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 232 3333',
    dataCadastro: new Date('2024-05-25'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 24,
    nome: 'Multiplay',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 343 4444',
    dataCadastro: new Date('2024-06-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 25,
    nome: 'Cabo Telecom',
    tipoServico: TipoServico.FIXO,
    contatoSuporte: '0800 454 5555',
    dataCadastro: new Date('2024-06-05'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 26,
    nome: 'Vip BR',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 565 6666',
    dataCadastro: new Date('2024-06-10'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 27,
    nome: 'Master',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 676 7777',
    dataCadastro: new Date('2024-06-15'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 28,
    nome: 'Valenet',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 787 8888',
    dataCadastro: new Date('2024-06-20'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 29,
    nome: 'Webfoco',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 898 9999',
    dataCadastro: new Date('2024-06-25'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 30,
    nome: 'Gigalink',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 909 0000',
    dataCadastro: new Date('2024-07-01'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 31,
    nome: 'Conecta',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 111 1111',
    dataCadastro: new Date('2024-07-05'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 32,
    nome: 'Mega Net',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 222 2222',
    dataCadastro: new Date('2024-07-10'),
    status: StatusOperadora.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 33,
    nome: 'Net Turbo',
    tipoServico: TipoServico.INTERNET,
    contatoSuporte: '0800 333 3333',
    dataCadastro: new Date('2024-07-15'),
    status: StatusOperadora.INATIVO,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const CONTRATOS: Contrato[] = [
  {
    id: 1,
    nomeFilial: 'Filial São Paulo',
    numero: 'CONT-001',
    operadoraId: 1,
    planoContratado: 'Internet 500MB Empresarial',
    dataInicio: new Date('2024-01-01'),
    dataVencimento: new Date('2024-01-10'),
    valorMensal: 1500,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    nomeFilial: 'Filial Rio de Janeiro',
    numero: 'CONT-002',
    operadoraId: 2,
    planoContratado: 'Telefonia Digital Plus',
    dataInicio: new Date('2024-02-01'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 2000,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    nomeFilial: 'Filial Belo Horizonte',
    numero: 'CONT-003',
    operadoraId: 3,
    planoContratado: 'TV Empresarial Full HD',
    dataInicio: new Date('2024-01-15'),
    dataFim: new Date('2024-12-31'),
    dataVencimento: new Date('2024-01-20'),
    valorMensal: 1800,
    status: StatusContrato.INATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    nomeFilial: 'Filial Curitiba',
    numero: 'CONT-004',
    operadoraId: 4,
    planoContratado: 'Internet 1GB Empresarial',
    dataInicio: new Date('2024-02-01'),
    dataVencimento: new Date('2024-02-10'),
    valorMensal: 2500,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    nomeFilial: 'Filial Porto Alegre',
    numero: 'CONT-005',
    operadoraId: 5,
    planoContratado: 'Telefonia IP Empresarial',
    dataInicio: new Date('2024-02-15'),
    dataVencimento: new Date('2024-02-25'),
    valorMensal: 1800,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    nomeFilial: 'Filial Salvador',
    numero: 'CONT-006',
    operadoraId: 6,
    planoContratado: 'Internet 200MB + TV',
    dataInicio: new Date('2024-01-20'),
    dataVencimento: new Date('2024-01-30'),
    valorMensal: 2200,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    nomeFilial: 'Filial Recife',
    numero: 'CONT-007',
    operadoraId: 7,
    planoContratado: 'Internet 300MB Empresarial',
    dataInicio: new Date('2024-02-10'),
    dataVencimento: new Date('2024-02-20'),
    valorMensal: 1600,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    nomeFilial: 'Filial Fortaleza',
    numero: 'CONT-008',
    operadoraId: 8,
    planoContratado: 'TV Empresarial Básico',
    dataInicio: new Date('2024-01-25'),
    dataVencimento: new Date('2024-02-05'),
    valorMensal: 1200,
    status: StatusContrato.ATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    nomeFilial: 'Filial Brasília',
    numero: 'CONT-009',
    operadoraId: 9,
    planoContratado: 'Internet 750MB Empresarial',
    dataInicio: new Date('2024-02-05'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 2100,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    nomeFilial: 'Filial Manaus',
    numero: 'CONT-010',
    operadoraId: 10,
    planoContratado: 'Telefonia Digital Básico',
    dataInicio: new Date('2024-01-30'),
    dataVencimento: new Date('2024-02-10'),
    valorMensal: 1400,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    nomeFilial: 'Filial Belém',
    numero: 'CONT-011',
    operadoraId: 11,
    planoContratado: 'Internet 400MB + TV',
    dataInicio: new Date('2024-02-15'),
    dataVencimento: new Date('2024-02-25'),
    valorMensal: 2300,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    nomeFilial: 'Filial Goiânia',
    numero: 'CONT-012',
    operadoraId: 12,
    planoContratado: 'Internet 600MB Empresarial',
    dataInicio: new Date('2024-01-20'),
    dataVencimento: new Date('2024-01-30'),
    valorMensal: 1900,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 13,
    nomeFilial: 'Filial São Luís',
    numero: 'CONT-013',
    operadoraId: 13,
    planoContratado: 'TV Empresarial Premium',
    dataInicio: new Date('2024-02-10'),
    dataVencimento: new Date('2024-02-20'),
    valorMensal: 2800,
    status: StatusContrato.ATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 14,
    nomeFilial: 'Filial Natal',
    numero: 'CONT-014',
    operadoraId: 14,
    planoContratado: 'Internet 800MB Empresarial',
    dataInicio: new Date('2024-01-25'),
    dataVencimento: new Date('2024-02-05'),
    valorMensal: 2400,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 15,
    nomeFilial: 'Filial João Pessoa',
    numero: 'CONT-015',
    operadoraId: 15,
    planoContratado: 'Telefonia IP Premium',
    dataInicio: new Date('2024-02-05'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 2000,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 16,
    nomeFilial: 'Filial Teresina',
    numero: 'CONT-016',
    operadoraId: 16,
    planoContratado: 'Internet 350MB + TV',
    dataInicio: new Date('2024-01-30'),
    dataVencimento: new Date('2024-02-10'),
    valorMensal: 1700,
    status: StatusContrato.INATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 17,
    nomeFilial: 'Filial Campo Grande',
    numero: 'CONT-017',
    operadoraId: 17,
    planoContratado: 'Internet 900MB Empresarial',
    dataInicio: new Date('2024-02-15'),
    dataVencimento: new Date('2024-02-25'),
    valorMensal: 2600,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 18,
    nomeFilial: 'Filial Cuiabá',
    numero: 'CONT-018',
    operadoraId: 18,
    planoContratado: 'TV Empresarial Master',
    dataInicio: new Date('2024-01-20'),
    dataVencimento: new Date('2024-01-30'),
    valorMensal: 3000,
    status: StatusContrato.ATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 19,
    nomeFilial: 'Filial Aracaju',
    numero: 'CONT-019',
    operadoraId: 19,
    planoContratado: 'Internet 450MB Empresarial',
    dataInicio: new Date('2024-02-10'),
    dataVencimento: new Date('2024-02-20'),
    valorMensal: 1750,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 20,
    nomeFilial: 'Filial Vitória',
    numero: 'CONT-020',
    operadoraId: 20,
    planoContratado: 'Telefonia Digital Premium',
    dataInicio: new Date('2024-01-25'),
    dataVencimento: new Date('2024-02-05'),
    valorMensal: 2200,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 21,
    nomeFilial: 'Filial Florianópolis',
    numero: 'CONT-021',
    operadoraId: 21,
    planoContratado: 'Internet 550MB + TV',
    dataInicio: new Date('2024-02-05'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 2400,
    status: StatusContrato.INATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 22,
    nomeFilial: 'Filial Maceió',
    numero: 'CONT-022',
    operadoraId: 22,
    planoContratado: 'Internet 650MB Empresarial',
    dataInicio: new Date('2024-01-30'),
    dataVencimento: new Date('2024-02-10'),
    valorMensal: 2000,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 23,
    nomeFilial: 'Filial Porto Velho',
    numero: 'CONT-023',
    operadoraId: 23,
    planoContratado: 'TV Empresarial Plus',
    dataInicio: new Date('2024-02-15'),
    dataVencimento: new Date('2024-02-25'),
    valorMensal: 1600,
    status: StatusContrato.ATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 24,
    nomeFilial: 'Filial Boa Vista',
    numero: 'CONT-024',
    operadoraId: 24,
    planoContratado: 'Internet 700MB Empresarial',
    dataInicio: new Date('2024-01-20'),
    dataVencimento: new Date('2024-01-30'),
    valorMensal: 2100,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 25,
    nomeFilial: 'Filial Macapá',
    numero: 'CONT-025',
    operadoraId: 25,
    planoContratado: 'Telefonia IP Master',
    dataInicio: new Date('2024-02-10'),
    dataVencimento: new Date('2024-02-20'),
    valorMensal: 1900,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 26,
    nomeFilial: 'Filial Palmas',
    numero: 'CONT-026',
    operadoraId: 26,
    planoContratado: 'Internet 250MB + TV',
    dataInicio: new Date('2024-01-25'),
    dataVencimento: new Date('2024-02-05'),
    valorMensal: 1500,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 27,
    nomeFilial: 'Filial Rio Branco',
    numero: 'CONT-027',
    operadoraId: 27,
    planoContratado: 'Internet 850MB Empresarial',
    dataInicio: new Date('2024-02-05'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 2500,
    status: StatusContrato.INATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 28,
    nomeFilial: 'Filial Campinas',
    numero: 'CONT-028',
    operadoraId: 28,
    planoContratado: 'TV Empresarial Ultra',
    dataInicio: new Date('2024-01-30'),
    dataVencimento: new Date('2024-02-10'),
    valorMensal: 3500,
    status: StatusContrato.ATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 29,
    nomeFilial: 'Filial Santos',
    numero: 'CONT-029',
    operadoraId: 29,
    planoContratado: 'Internet 950MB Empresarial',
    dataInicio: new Date('2024-02-15'),
    dataVencimento: new Date('2024-02-25'),
    valorMensal: 2700,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 30,
    nomeFilial: 'Filial Ribeirão Preto',
    numero: 'CONT-030',
    operadoraId: 30,
    planoContratado: 'Telefonia Digital Ultra',
    dataInicio: new Date('2024-01-20'),
    dataVencimento: new Date('2024-01-30'),
    valorMensal: 2300,
    status: StatusContrato.ATIVO,
    tipo: 'TELEFONIA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 31,
    nomeFilial: 'Filial São José dos Campos',
    numero: 'CONT-031',
    operadoraId: 31,
    planoContratado: 'Internet 1GB + TV',
    dataInicio: new Date('2024-02-10'),
    dataVencimento: new Date('2024-02-20'),
    valorMensal: 3200,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 32,
    nomeFilial: 'Filial Sorocaba',
    numero: 'CONT-032',
    operadoraId: 32,
    planoContratado: 'Internet 1.2GB Empresarial',
    dataInicio: new Date('2024-01-25'),
    dataVencimento: new Date('2024-02-05'),
    valorMensal: 3800,
    status: StatusContrato.ATIVO,
    tipo: 'INTERNET',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 33,
    nomeFilial: 'Filial Londrina',
    numero: 'CONT-033',
    operadoraId: 33,
    planoContratado: 'TV Empresarial Premium Plus',
    dataInicio: new Date('2024-02-05'),
    dataVencimento: new Date('2024-02-15'),
    valorMensal: 4000,
    status: StatusContrato.INATIVO,
    tipo: 'TV',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const FATURAS: Fatura[] = Array.from({ length: 34 }, (_, index) => {
  const id = index + 1;
  const contratoId = Math.min(id, CONTRATOS.length);
  const contrato = CONTRATOS.find(c => c.id === contratoId)!;
  const operadoraId = contrato.operadoraId;
  
  // Gera datas aleatórias nos últimos 12 meses
  const hoje = new Date();
  const dataEmissao = new Date(hoje.getFullYear(), hoje.getMonth() - Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const dataVencimento = new Date(dataEmissao);
  dataVencimento.setDate(dataVencimento.getDate() + 15); // Vencimento 15 dias após emissão
  
  // Define status e data de pagamento
  let status = StatusFatura.PENDENTE;
  let dataPagamento: Date | undefined = undefined;
  
  if (Math.random() < 0.4) { // 40% chance de estar paga
    status = StatusFatura.PAGA;
    dataPagamento = new Date(dataVencimento);
    dataPagamento.setDate(dataPagamento.getDate() - Math.floor(Math.random() * 5)); // Pago até 5 dias antes do vencimento
  } else if (dataVencimento < hoje && Math.random() < 0.3) { // 30% chance de estar atrasada se vencida
    status = StatusFatura.ATRASADA;
  }

  return {
    id,
    numeroFatura: `FAT-${String(id).padStart(3, '0')}`,
    contratoId,
    operadoraId,
    dataEmissao,
    dataVencimento,
    valor: Math.floor(Math.random() * 1000) + 100, // Valor entre 100 e 1100
    status,
    dataPagamento,
    createdAt: new Date(dataEmissao),
    updatedAt: new Date(dataEmissao)
  };
});

export const DASHBOARD_DATA = {
  totalContratos: CONTRATOS.length,
  contratosAtivos: CONTRATOS.filter(c => c.status === StatusContrato.ATIVO).length,
  valorTotalContratos: CONTRATOS.reduce((total, contrato) => total + contrato.valorMensal, 0),
  totalFaturas: FATURAS.length,
  valorTotalFaturado: FATURAS.reduce((total, fatura) => total + fatura.valor, 0),
  faturasStatus: {
    pagas: FATURAS.filter(f => f.status === StatusFatura.PAGA).length,
    pendentes: FATURAS.filter(f => f.status === StatusFatura.PENDENTE).length,
    atrasadas: FATURAS.filter(f => f.status === StatusFatura.ATRASADA).length
  },
  evolucaoMensal: [
    { mes: 'Jan', valor: 4500 },
    { mes: 'Fev', valor: 5200 },
    { mes: 'Mar', valor: 4800 },
    { mes: 'Abr', valor: 5100 }
  ]
}; 