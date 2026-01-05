import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmpresaProvider } from "@/contexts/EmpresaContext";
import Index from "./pages/Index";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import CalculoImposto from "./pages/CalculoImposto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EmpresaProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cadastro" element={<CadastroEmpresa />} />
            <Route path="/calculo" element={<CalculoImposto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EmpresaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
