import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/PageContainer';
import { Card } from '@/components/Card';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { useEmpresas } from '@/contexts/EmpresaContext';
import { TipoEmpresa, RegimeTributario } from '@/types/empresa';
import { toast } from 'sonner';

const tiposEmpresa: { value: TipoEmpresa; label: string }[] = [
  { value: 'MEI', label: 'MEI - Microempreendedor Individual' },
  { value: 'LTDA', label: 'LTDA - Sociedade Limitada' },
  { value: 'SA', label: 'S.A. - Sociedade Anônima' },
  { value: 'EIRELI', label: 'EIRELI - Empresa Individual' },
  { value: 'SLU', label: 'SLU - Sociedade Limitada Unipessoal' },
];

const regimesTributarios: { value: RegimeTributario; label: string }[] = [
  { value: 'Simples Nacional', label: 'Simples Nacional' },
  { value: 'Lucro Presumido', label: 'Lucro Presumido' },
  { value: 'Lucro Real', label: 'Lucro Real' },
];

const CadastroEmpresa: React.FC = () => {
  const navigate = useNavigate();
  const { addEmpresa } = useEmpresas();

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    tipoEmpresa: '' as TipoEmpresa,
    regimeTributario: '' as RegimeTributario,
    rendaMensal: '',
    endereco: '',
    telefone: '',
    email: '',
    dataAbertura: '',
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return numbers
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.cnpj || !formData.tipoEmpresa || !formData.regimeTributario) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaEmpresa = {
      id: crypto.randomUUID(),
      nome: formData.nome,
      cnpj: formData.cnpj,
      tipoEmpresa: formData.tipoEmpresa,
      regimeTributario: formData.regimeTributario,
      rendaMensal: parseFloat(formData.rendaMensal) || 0,
      endereco: formData.endereco,
      telefone: formData.telefone,
      email: formData.email,
      dataAbertura: formData.dataAbertura,
    };

    addEmpresa(novaEmpresa);
    toast.success('Empresa cadastrada com sucesso!');
    navigate('/');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cadastro de Empresa</h1>
            <p className="text-muted-foreground">Preencha os dados da empresa</p>
          </div>
        </div>

        {/* Formulário */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Principais */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Building2 className="w-5 h-5" />
                <h2 className="font-semibold">Dados Principais</h2>
              </div>

              <FormField
                label="Nome da Empresa"
                id="nome"
                value={formData.nome}
                onChange={handleChange('nome')}
                placeholder="Digite o nome da empresa"
                required
              />

              <FormField
                label="CNPJ"
                id="cnpj"
                value={formData.cnpj}
                onChange={(v) => handleChange('cnpj')(formatCNPJ(v))}
                placeholder="00.000.000/0000-00"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Tipo de Empresa"
                  id="tipoEmpresa"
                  value={formData.tipoEmpresa}
                  onChange={handleChange('tipoEmpresa')}
                  options={tiposEmpresa}
                  placeholder="Selecione o tipo"
                  required
                />

                <SelectField
                  label="Regime Tributário"
                  id="regimeTributario"
                  value={formData.regimeTributario}
                  onChange={handleChange('regimeTributario')}
                  options={regimesTributarios}
                  placeholder="Selecione o regime"
                  required
                />
              </div>

              <FormField
                label="Renda Mensal (R$)"
                id="rendaMensal"
                type="number"
                value={formData.rendaMensal}
                onChange={handleChange('rendaMensal')}
                placeholder="0,00"
              />
            </div>

            {/* Contato */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h2 className="font-semibold text-foreground">Contato e Localização</h2>

              <FormField
                label="Endereço"
                id="endereco"
                value={formData.endereco}
                onChange={handleChange('endereco')}
                placeholder="Rua, número, bairro, cidade - UF"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Telefone"
                  id="telefone"
                  value={formData.telefone}
                  onChange={(v) => handleChange('telefone')(formatTelefone(v))}
                  placeholder="(00) 00000-0000"
                />

                <FormField
                  label="E-mail"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="contato@empresa.com"
                />
              </div>

              <FormField
                label="Data de Abertura"
                id="dataAbertura"
                type="date"
                value={formData.dataAbertura}
                onChange={handleChange('dataAbertura')}
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="flex-1" variant="success">
                <Save className="w-4 h-4 mr-2" />
                Salvar Cadastro
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CadastroEmpresa;
