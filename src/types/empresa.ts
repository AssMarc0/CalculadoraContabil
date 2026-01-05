export type TipoEmpresa = 'MEI' | 'LTDA' | 'SA' | 'EIRELI' | 'SLU';

export type RegimeTributario = 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real';

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  tipoEmpresa: TipoEmpresa;
  regimeTributario: RegimeTributario;
  rendaMensal: number;
  endereco: string;
  telefone: string;
  email: string;
  dataAbertura: string;
}

export interface CalculoSimplesNacional {
  receita12Meses: number;
  receitaMes: number;
  folhaPagamento: number;
  anexo: string;
}

export interface CalculoLucroPresumido {
  receita1: number;
  receita2: number;
  receita3: number;
  tipoAtividade: string;
}

export interface CalculoLucroReal {
  receitaMes: number;
  despesaMes: number;
}
