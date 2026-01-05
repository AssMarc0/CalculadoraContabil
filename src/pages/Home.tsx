import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calculator, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/PageContainer';
import { Card } from '@/components/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        {/* Logo e Título */}
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            ContaFácil
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Sistema contábil simplificado para gestão de empresas e cálculo de impostos
          </p>
        </div>

        {/* Cards de Ação */}
        <Card className="w-full max-w-md opacity-0 animate-fade-in-up stagger-2">
          <div className="space-y-4">
            <Button
              variant="hero"
              className="w-full"
              onClick={() => navigate('/cadastro')}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Cadastrar Nova Empresa
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate('/calculo')}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Impostos
            </Button>

            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-destructive"
                onClick={() => window.close()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair do Sistema
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-sm text-muted-foreground animate-fade-in stagger-4">
          © 2025 ContaFácil - Todos os direitos reservados
        </p>
      </div>
    </PageContainer>
  );
};

export default Home;
