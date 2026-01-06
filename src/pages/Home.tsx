import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Calculator, 
  LogOut, 
  Shield, 
  Clock, 
  TrendingUp, 
  FileText,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/PageContainer';
import { Card } from '@/components/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Segurança Garantida',
      description: 'Seus dados protegidos com as melhores práticas do mercado'
    },
    {
      icon: Clock,
      title: 'Economia de Tempo',
      description: 'Calcule impostos em segundos, não em horas'
    },
    {
      icon: TrendingUp,
      title: 'Gestão Inteligente',
      description: 'Acompanhe a evolução fiscal da sua empresa'
    },
    {
      icon: FileText,
      title: 'Relatórios Completos',
      description: 'Documentação detalhada para sua contabilidade'
    }
  ];

  const benefits = [
    'Suporte a Simples Nacional, Lucro Presumido e Lucro Real',
    'Cadastro ilimitado de empresas',
    'Cálculos precisos e atualizados',
    'Interface intuitiva e responsiva',
    'Totalmente gratuito para uso'
  ];

  return (
    <PageContainer>
      <div className="flex flex-col min-h-[90vh]">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16 space-y-8 animate-fade-in-up">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-elevated animate-scale-in">
              <Building2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Conta<span className="text-primary">Fácil</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              O sistema contábil mais simples e eficiente para gestão de empresas e cálculo de impostos
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              variant="hero"
              className="flex-1 group"
              onClick={() => navigate('/cadastro')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Cadastrar Empresa
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate('/calculo')}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Impostos
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 animate-fade-in stagger-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '3', label: 'Regimes Tributários' },
              { value: '100%', label: 'Gratuito' },
              { value: '24/7', label: 'Disponível' },
              { value: '∞', label: 'Empresas' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Por que escolher o ContaFácil?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Desenvolvido para simplificar sua gestão tributária
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Tudo o que você precisa em um só lugar
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <h3 className="text-2xl font-bold mb-3">
              Comece agora mesmo!
            </h3>
            <p className="mb-6 opacity-90">
              Cadastre sua primeira empresa e descubra como é fácil gerenciar seus impostos
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/cadastro')}
              className="bg-white text-primary hover:bg-white/90"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-8 mt-auto border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 ContaFácil - Todos os direitos reservados</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => window.close()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair do Sistema
            </Button>
          </div>
        </footer>
      </div>
    </PageContainer>
  );
};

export default Home;
