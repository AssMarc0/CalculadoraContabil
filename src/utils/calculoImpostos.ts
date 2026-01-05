import { CalculoSimplesNacional, CalculoLucroPresumido, CalculoLucroReal } from '@/types/empresa';

export const calcularSimplesNacional = (dados: CalculoSimplesNacional): string => {
  const { receita12Meses, receitaMes, folhaPagamento, anexo } = dados;
  
  // Faixas simplificadas do Simples Nacional
  let aliquota = 0;
  let deducao = 0;
  
  if (receita12Meses <= 180000) {
    aliquota = 0.06;
    deducao = 0;
  } else if (receita12Meses <= 360000) {
    aliquota = 0.112;
    deducao = 9360;
  } else if (receita12Meses <= 720000) {
    aliquota = 0.135;
    deducao = 17640;
  } else if (receita12Meses <= 1800000) {
    aliquota = 0.16;
    deducao = 35640;
  } else {
    aliquota = 0.21;
    deducao = 125640;
  }
  
  const aliquotaEfetiva = ((receita12Meses * aliquota - deducao) / receita12Meses) * 100;
  const impostoMensal = receitaMes * (aliquotaEfetiva / 100);
  
  return `📊 CÁLCULO SIMPLES NACIONAL - ${anexo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Receita 12 meses: R$ ${receita12Meses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📅 Receita do mês: R$ ${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
👥 Folha de pagamento: R$ ${folhaPagamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Alíquota nominal: ${(aliquota * 100).toFixed(2)}%
📉 Alíquota efetiva: ${aliquotaEfetiva.toFixed(2)}%

💰 IMPOSTO A PAGAR: R$ ${impostoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};

export const calcularLucroPresumido = (dados: CalculoLucroPresumido): string => {
  const { receita1, receita2, receita3, tipoAtividade } = dados;
  
  const receitaTotal = receita1 + receita2 + receita3;
  const receitaMedia = receitaTotal / 3;
  
  // Base de cálculo presumida (8% para comércio, 32% para serviços)
  const percentualPresuncao = tipoAtividade === 'Serviços' ? 0.32 : 0.08;
  const baseCalculo = receitaMedia * percentualPresuncao;
  
  // IRPJ 15% + Adicional 10% se base > 20.000
  const irpj = baseCalculo * 0.15;
  const adicionalIR = baseCalculo > 20000 ? (baseCalculo - 20000) * 0.10 : 0;
  
  // CSLL 9%
  const csll = baseCalculo * 0.09;
  
  // PIS 0.65% e COFINS 3% sobre receita
  const pis = receitaMedia * 0.0065;
  const cofins = receitaMedia * 0.03;
  
  const totalImpostos = irpj + adicionalIR + csll + pis + cofins;
  
  return `📊 CÁLCULO LUCRO PRESUMIDO - ${tipoAtividade}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Receita mês 1: R$ ${receita1.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📈 Receita mês 2: R$ ${receita2.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📈 Receita mês 3: R$ ${receita3.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Receita média: R$ ${receitaMedia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📐 Presunção (${(percentualPresuncao * 100)}%): R$ ${baseCalculo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

📋 DETALHAMENTO:
  • IRPJ (15%): R$ ${irpj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • Adicional IR: R$ ${adicionalIR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • CSLL (9%): R$ ${csll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • PIS (0.65%): R$ ${pis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • COFINS (3%): R$ ${cofins.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

💰 TOTAL MENSAL: R$ ${totalImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};

export const calcularLucroReal = (dados: CalculoLucroReal): string => {
  const { receitaMes, despesaMes } = dados;
  
  const lucroLiquido = receitaMes - despesaMes;
  const prejuizo = lucroLiquido < 0;
  
  if (prejuizo) {
    return `📊 CÁLCULO LUCRO REAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Receita do mês: R$ ${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📉 Despesas do mês: R$ ${despesaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ PREJUÍZO NO PERÍODO: R$ ${Math.abs(lucroLiquido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

💰 IMPOSTO A PAGAR: R$ 0,00

ℹ️ O prejuízo pode ser compensado em períodos futuros.`;
  }
  
  // IRPJ 15% + Adicional 10% se lucro > 20.000
  const irpj = lucroLiquido * 0.15;
  const adicionalIR = lucroLiquido > 20000 ? (lucroLiquido - 20000) * 0.10 : 0;
  
  // CSLL 9%
  const csll = lucroLiquido * 0.09;
  
  // PIS 1.65% e COFINS 7.6% (não cumulativo)
  const pis = receitaMes * 0.0165;
  const cofins = receitaMes * 0.076;
  
  const totalImpostos = irpj + adicionalIR + csll + pis + cofins;
  
  return `📊 CÁLCULO LUCRO REAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Receita do mês: R$ ${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
📉 Despesas do mês: R$ ${despesaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💹 Lucro líquido: R$ ${lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

📋 DETALHAMENTO:
  • IRPJ (15%): R$ ${irpj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • Adicional IR: R$ ${adicionalIR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • CSLL (9%): R$ ${csll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • PIS (1.65%): R$ ${pis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  • COFINS (7.6%): R$ ${cofins.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

💰 TOTAL A PAGAR: R$ ${totalImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};
