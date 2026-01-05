import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/PageContainer';
import { Card } from '@/components/Card';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { useEmpresas } from '@/contexts/EmpresaContext';
import { RegimeTributario } from '@/types/empresa';
import {
  calcularSimplesNacional,
  calcularLucroPresumido,
  calcularLucroReal,
} from '@/utils/calculoImpostos';
import { toast } from 'sonner';

const anexosSimples = [
  { value: 'Anexo I', label: 'Anexo I - Comércio' },
  { value: 'Anexo II', label: 'Anexo II - Indústria' },
  { value: 'Anexo III', label: 'Anexo III - Serviços' },
  { value: 'Anexo IV', label: 'Anexo IV - Serviços' },
  { value: 'Anexo V', label: 'Anexo V - Serviços' },
];

const tiposAtividade = [
  { value: 'Comércio', label: 'Comércio (8%)' },
  { value: 'Serviços', label: 'Serviços (32%)' },
  { value: 'Indústria', label: 'Indústria (8%)' },
];

const CalculoImposto: React.FC = () => {
  const navigate = useNavigate();
  const { empresas, getEmpresaById } = useEmpresas();

  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [regime, setRegime] = useState<RegimeTributario | ''>('');
  const [resultado, setResultado] = useState('');

  // Simples Nacional
  const [receita12Meses, setReceita12Meses] = useState('');
  const [receitaMes, setReceitaMes] = useState('');
  const [folhaPagamento, setFolhaPagamento] = useState('');
  const [anexo, setAnexo] = useState('');

  // Lucro Presumido
  const [receita1, setReceita1] = useState('');
  const [receita2, setReceita2] = useState('');
  const [receita3, setReceita3] = useState('');
  const [tipoAtividade, setTipoAtividade] = useState('');

  // Lucro Real
  const [receitaReal, setReceitaReal] = useState('');
  const [despesaReal, setDespesaReal] = useState('');

  useEffect(() => {
    if (empresaSelecionada) {
      const empresa = getEmpresaById(empresaSelecionada);
      if (empresa) {
        setRegime(empresa.regimeTributario);
        setResultado('');
      }
    }
  }, [empresaSelecionada, getEmpresaById]);

  const handleCalcular = () => {
    if (!regime) {
      toast.error('Selecione uma empresa primeiro.');
      return;
    }

    let result = '';

    switch (regime) {
      case 'Simples Nacional':
        if (!receita12Meses || !receitaMes || !anexo) {
          toast.error('Preencha todos os campos obrigatórios.');
          return;
        }
        result = calcularSimplesNacional({
          receita12Meses: parseFloat(receita12Meses),
          receitaMes: parseFloat(receitaMes),
          folhaPagamento: parseFloat(folhaPagamento) || 0,
          anexo,
        });
        break;

      case 'Lucro Presumido':
        if (!receita1 || !receita2 || !receita3 || !tipoAtividade) {
          toast.error('Preencha todos os campos obrigatórios.');
          return;
        }
        result = calcularLucroPresumido({
          receita1: parseFloat(receita1),
          receita2: parseFloat(receita2),
          receita3: parseFloat(receita3),
          tipoAtividade,
        });
        break;

      case 'Lucro Real':
        if (!receitaReal || !despesaReal) {
          toast.error('Preencha todos os campos obrigatórios.');
          return;
        }
        result = calcularLucroReal({
          receitaMes: parseFloat(receitaReal),
          despesaMes: parseFloat(despesaReal),
        });
        break;
    }

    setResultado(result);
    toast.success('Cálculo realizado com sucesso!');
  };

  const empresasOptions = empresas.map((e) => ({
    value: e.id,
    label: `${e.nome} - ${e.cnpj}`,
  }));

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cálculo de Impostos</h1>
            <p className="text-muted-foreground">Simule os impostos da sua empresa</p>
          </div>
        </div>

        {/* Seleção de Empresa */}
        <Card>
          <div className="space-y-4">
            <SelectField
              label="Selecione a Empresa"
              id="empresa"
              value={empresaSelecionada}
              onChange={setEmpresaSelecionada}
              options={empresasOptions}
              placeholder={empresas.length === 0 ? 'Nenhuma empresa cadastrada' : 'Selecione...'}
              required
            />

            {regime && (
              <div className="p-3 bg-accent rounded-lg">
                <p className="text-sm text-accent-foreground">
                  <strong>Regime Tributário:</strong> {regime}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Campos do Simples Nacional */}
        {regime === 'Simples Nacional' && (
          <Card className="animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Dados do Simples Nacional
              </h2>

              <FormField
                label="Receita dos últimos 12 meses (R$)"
                id="receita12Meses"
                type="number"
                value={receita12Meses}
                onChange={setReceita12Meses}
                placeholder="0,00"
                required
              />

              <FormField
                label="Receita do mês atual (R$)"
                id="receitaMes"
                type="number"
                value={receitaMes}
                onChange={setReceitaMes}
                placeholder="0,00"
                required
              />

              <FormField
                label="Folha de pagamento (R$)"
                id="folhaPagamento"
                type="number"
                value={folhaPagamento}
                onChange={setFolhaPagamento}
                placeholder="0,00"
              />

              <SelectField
                label="Anexo"
                id="anexo"
                value={anexo}
                onChange={setAnexo}
                options={anexosSimples}
                placeholder="Selecione o anexo"
                required
              />
            </div>
          </Card>
        )}

        {/* Campos do Lucro Presumido */}
        {regime === 'Lucro Presumido' && (
          <Card className="animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Dados do Lucro Presumido
              </h2>

              <FormField
                label="Receita mês 1 (R$)"
                id="receita1"
                type="number"
                value={receita1}
                onChange={setReceita1}
                placeholder="0,00"
                required
              />

              <FormField
                label="Receita mês 2 (R$)"
                id="receita2"
                type="number"
                value={receita2}
                onChange={setReceita2}
                placeholder="0,00"
                required
              />

              <FormField
                label="Receita mês 3 (R$)"
                id="receita3"
                type="number"
                value={receita3}
                onChange={setReceita3}
                placeholder="0,00"
                required
              />

              <SelectField
                label="Tipo de Atividade"
                id="tipoAtividade"
                value={tipoAtividade}
                onChange={setTipoAtividade}
                options={tiposAtividade}
                placeholder="Selecione a atividade"
                required
              />
            </div>
          </Card>
        )}

        {/* Campos do Lucro Real */}
        {regime === 'Lucro Real' && (
          <Card className="animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Dados do Lucro Real
              </h2>

              <FormField
                label="Receita do mês (R$)"
                id="receitaReal"
                type="number"
                value={receitaReal}
                onChange={setReceitaReal}
                placeholder="0,00"
                required
              />

              <FormField
                label="Despesas do mês (R$)"
                id="despesaReal"
                type="number"
                value={despesaReal}
                onChange={setDespesaReal}
                placeholder="0,00"
                required
              />
            </div>
          </Card>
        )}

        {/* Botão Calcular */}
        {regime && (
          <Button
            onClick={handleCalcular}
            className="w-full animate-fade-in"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calcular Imposto
          </Button>
        )}

        {/* Resultado */}
        {resultado && (
          <Card className="animate-scale-in bg-accent/30 border-primary/20">
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resultado do Cálculo
              </h2>
              <div className="bg-card p-4 rounded-lg border border-border overflow-auto max-h-[400px]">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {resultado}
                </pre>
              </div>
            </div>
          </Card>
        )}

        {/* Mensagem se não há empresas */}
        {empresas.length === 0 && (
          <Card className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Nenhuma empresa cadastrada ainda.
            </p>
            <Button onClick={() => navigate('/cadastro')}>
              Cadastrar Primeira Empresa
            </Button>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default CalculoImposto;
