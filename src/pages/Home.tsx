import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Calculator, 
  ArrowRight,
  Receipt,
  Percent,
  Scale,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/PageContainer';
import { Card } from '@/components/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const regimesTributarios = [
    {
      nome: 'Simples Nacional',
      faixa: 'Até R$ 4,8 milhões/ano',
      aliquota: '4% a 33%',
      descricao: 'Regime unificado de arrecadação para micro e pequenas empresas. O cálculo considera a receita bruta dos últimos 12 meses e o anexo correspondente à atividade.',
      calculo: 'Receita Mensal × Alíquota Efetiva (baseada no anexo e faturamento)'
    },
    {
      nome: 'Lucro Presumido',
      faixa: 'Até R$ 78 milhões/ano',
      aliquota: 'IRPJ 15% + CSLL 9%',
      descricao: 'A base de cálculo é presumida conforme a atividade: 8% para comércio, 32% para serviços. Ideal para empresas com margens superiores à presunção.',
      calculo: 'Receita × Presunção × (IRPJ 15% + CSLL 9%)'
    },
    {
      nome: 'Lucro Real',
      faixa: 'Obrigatório acima de R$ 78 mi',
      aliquota: 'IRPJ 15% + CSLL 9%',
      descricao: 'Tributa o lucro efetivo da empresa. Exige escrituração contábil completa. Recomendado para empresas com margens reduzidas ou prejuízo.',
      calculo: '(Receita - Despesas) × Alíquotas de IRPJ e CSLL'
    }
  ];

  return (
    <PageContainer>
      <div className="flex flex-col min-h-[90vh]">
        {/* Header */}
        <header className="py-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                ContaFácil
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestão Tributária Simplificada
              </p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 animate-fade-in-up">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Calcule os impostos da sua empresa com precisão e agilidade
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ferramenta profissional para simulação tributária nos regimes Simples Nacional, 
              Lucro Presumido e Lucro Real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                className="group"
                onClick={() => navigate('/cadastro')}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Cadastrar Empresa
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/calculo')}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Impostos
              </Button>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section className="py-10 border-t border-border">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cadastro de Empresas</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Registre os dados da empresa incluindo CNPJ, regime tributário, 
                    renda mensal e tipo societário. As informações ficam salvas para 
                    cálculos futuros.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cálculo de Impostos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Simule a carga tributária com base no regime escolhido. 
                    O sistema solicita apenas os dados necessários para cada modalidade 
                    e apresenta o resultado detalhado.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Regimes Tributários */}
        <section className="py-10 border-t border-border">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Entenda os Regimes Tributários
            </h3>
          </div>

          <div className="grid gap-4">
            {regimesTributarios.map((regime, index) => (
              <Card 
                key={index} 
                className="hover:shadow-card transition-shadow"
                animate={false}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{regime.nome}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {regime.faixa}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {regime.descricao}
                    </p>
                  </div>
                  
                  <div className="lg:w-72 flex-shrink-0 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Fórmula
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {regime.calculo}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Alíquota: {regime.aliquota}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Aviso Legal */}
        <section className="py-6 mt-auto">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border">
            <Scale className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <strong>Nota:</strong> Este sistema realiza simulações para fins de planejamento. 
              Os valores apresentados são estimativas e não substituem a orientação de um 
              contador habilitado. Consulte sempre um profissional para decisões tributárias.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 ContaFácil — Sistema de Simulação Tributária
          </p>
        </footer>
      </div>
    </PageContainer>
  );
};

export default Home;
