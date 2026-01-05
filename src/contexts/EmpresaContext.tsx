import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Empresa } from '@/types/empresa';

interface EmpresaContextType {
  empresas: Empresa[];
  addEmpresa: (empresa: Empresa) => void;
  getEmpresaById: (id: string) => Empresa | undefined;
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

export const EmpresaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  const addEmpresa = (empresa: Empresa) => {
    setEmpresas((prev) => [...prev, empresa]);
  };

  const getEmpresaById = (id: string) => {
    return empresas.find((e) => e.id === id);
  };

  return (
    <EmpresaContext.Provider value={{ empresas, addEmpresa, getEmpresaById }}>
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresas = () => {
  const context = useContext(EmpresaContext);
  if (!context) {
    throw new Error('useEmpresas must be used within an EmpresaProvider');
  }
  return context;
};
