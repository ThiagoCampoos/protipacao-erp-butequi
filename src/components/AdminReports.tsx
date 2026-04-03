import { useState } from "react";
import { Link } from "react-router";
import { 
  LayoutDashboard, 
  LayoutGrid, 
  ClipboardList, 
  BookOpen, 
  BarChart2, 
  Printer, 
  Settings, 
  Utensils,
  LogOut,
  Download,
  Banknote,
  Wallet,
  Users,
  Receipt,
  TrendingUp,
  TrendingDown,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminReports() {
  const waiters = [
    { id: 1, name: "Ricardo Silva", code: "#001", sales: 12400.00, commission: 496.00, rate: 4, avatar: "R" },
    { id: 2, name: "Ana Oliveira", code: "#002", sales: 10200.00, commission: 408.00, rate: 4, avatar: "A" },
    { id: 3, name: "Marcos Souza", code: "#003", sales: 11850.00, commission: 474.00, rate: 4, avatar: "M" },
    { id: 4, name: "Julia Costa", code: "#004", sales: 10830.00, commission: 433.20, rate: 4, avatar: "J" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Painel Administrativo</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Visão Geral</span>
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Gerenciamento de Mesas</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <ClipboardList className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Cardápio</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-3 py-2.5 bg-[#FFF5F0] text-[#F25D27] rounded-lg transition-colors">
            <BarChart2 className="w-5 h-5" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <Printer className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Impressoras</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-zinc-100">
            <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
              <Settings className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
              <span className="text-sm font-medium">Configurações</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 bg-zinc-50 m-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              R
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Ricardo Silva</p>
              <p className="text-[10px] text-zinc-500">Gerente de Turno</p>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight">Relatórios de Comissões</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/waiters/new" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-all">
              <Users className="w-4 h-4" />
              Novo Garçom
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F25D27] text-white rounded-lg text-sm font-bold hover:bg-[#E04D17] transition-all shadow-sm shadow-orange-500/20">
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-zinc-500">Total de Vendas</p>
                <div className="w-10 h-10 bg-[#FFF5F0] text-[#F25D27] rounded-lg flex items-center justify-center">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black">R$ 45.280,00</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600 font-medium text-sm">
                <TrendingUp className="w-4 h-4" />
                +12.5% vs mês anterior
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-zinc-500">Total de Comissões</p>
                <div className="w-10 h-10 bg-[#FFF5F0] text-[#F25D27] rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black">R$ 1.811,20</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600 font-medium text-sm">
                <TrendingUp className="w-4 h-4" />
                +10.2% vs mês anterior
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-zinc-500">Garçons Ativos</p>
                <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black">12</p>
              <p className="text-sm text-zinc-500 mt-2 font-medium">Equipe completa logada</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-zinc-500">Ticket Médio</p>
                <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black">R$ 142,30</p>
              <div className="flex items-center gap-1 mt-2 text-rose-600 font-medium text-sm">
                <TrendingDown className="w-4 h-4" />
                -2.4% vs ontem
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Performance por Colaborador</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar garçom..." 
                    className="pl-9 pr-4 py-2 border border-zinc-200 bg-zinc-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F25D27] transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Garçom</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Vendas Totais (R$)</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Comissão (R$)</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Taxa (%)</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {waiters.map((waiter) => (
                    <tr key={waiter.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                            {waiter.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-zinc-900">{waiter.name}</p>
                            <p className="text-xs text-zinc-500">ID: {waiter.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-sm text-zinc-900">
                        R$ {waiter.sales.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4 text-right text-[#F25D27] font-bold text-sm">
                        R$ {waiter.commission.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF5F0] text-[#F25D27]">
                          {waiter.rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-zinc-400 hover:text-[#F25D27] transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-6 border-t border-zinc-200 flex items-center justify-between">
              <p className="text-sm text-zinc-500 font-medium">Mostrando 1 a 4 de 12 garçons</p>
              <div className="flex gap-2">
                <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all disabled:opacity-50" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-[#F25D27] text-white rounded-lg font-bold text-sm shadow-sm shadow-orange-500/20">1</button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 rounded-lg font-medium text-sm text-zinc-600">2</button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 rounded-lg font-medium text-sm text-zinc-600">3</button>
                <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
