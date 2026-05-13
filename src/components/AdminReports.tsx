import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { 
  Banknote,
  Wallet,
  Users,
  Receipt,
  TrendingUp,
  TrendingDown,
  Search,
  Calendar,
  Download,
  Filter,
  X
} from "lucide-react";

type ReportTab = "bar" | "waiters" | "fiado";
type DateFilter = "today" | "yesterday" | "month" | "custom";

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("bar");
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [isCustomDateModalOpen, setIsCustomDateModalOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  
  const [salesData, setSalesData] = useState<any>(null);
  const [waitersData, setWaitersData] = useState<any[]>([]);
  const [fiadoData, setFiadoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab, dateFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let queryParams = "";
      if (dateFilter === "today") {
        const today = new Date().toISOString().split('T')[0];
        queryParams = `?start=${today}&end=${today}`;
      } else if (dateFilter === "yesterday") {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        queryParams = `?start=${yesterday}&end=${yesterday}`;
      } else if (dateFilter === "month") {
        const date = new Date();
        const start = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
        queryParams = `?start=${start}&end=${end}`;
      } else if (dateFilter === "custom" && customStartDate && customEndDate) {
        queryParams = `?start=${customStartDate}&end=${customEndDate}`;
      }

      if (activeTab === "bar") {
        const res = await fetch(`/api/reports/sales${queryParams}`);
        const data = await res.json();
        setSalesData(data);
      } else if (activeTab === "waiters") {
        const res = await fetch(`/api/reports/waiters${queryParams}`);
        const data = await res.json();
        setWaitersData(data);
      } else if (activeTab === "fiado") {
        const res = await fetch(`/api/reports/fiado${queryParams}`);
        const data = await res.json();
        setFiadoData(data);
      }
    } catch (error) {
      console.error("Error fetching report data", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const renderDateFilter = () => (
    <div className="flex items-center gap-2 bg-white border border-zinc-200 p-1 rounded-lg">
      <button 
        onClick={() => setDateFilter("today")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${dateFilter === "today" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
      >
        Hoje
      </button>
      <button 
        onClick={() => setDateFilter("yesterday")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${dateFilter === "yesterday" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
      >
        Ontem
      </button>
      <button 
        onClick={() => setDateFilter("month")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${dateFilter === "month" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
      >
        Este Mês
      </button>
      <button 
        onClick={() => setIsCustomDateModalOpen(true)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${dateFilter === "custom" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
      >
        <Calendar className="w-4 h-4" />
        Personalizado
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight">Relatórios</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F25D27] text-white rounded-lg text-sm font-bold hover:bg-[#E04D17] transition-all shadow-sm shadow-orange-500/20">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Tabs and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab("bar")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "bar" ? "bg-[#FFF5F0] text-[#F25D27]" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
              >
                Vendas do Bar
              </button>
              <button 
                onClick={() => setActiveTab("waiters")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "waiters" ? "bg-[#FFF5F0] text-[#F25D27]" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
              >
                Desempenho Garçons
              </button>
              <button 
                onClick={() => setActiveTab("fiado")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "fiado" ? "bg-[#FFF5F0] text-[#F25D27]" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
              >
                Contas Fiado
              </button>
            </div>
            
            {renderDateFilter()}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F25D27]"></div>
            </div>
          ) : (
            <>
              {/* Bar Sales Tab */}
              {activeTab === "bar" && salesData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-zinc-500">Vendas Totais</p>
                        <div className="w-10 h-10 bg-[#FFF5F0] text-[#F25D27] rounded-lg flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-black">{formatCurrency(salesData.totalSales)}</p>
                      <div className="flex items-center gap-1 mt-2 text-emerald-600 font-medium text-sm">
                        <TrendingUp className="w-4 h-4" />
                        +5.2% vs período anterior
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-zinc-500">Comissões Pagas</p>
                        <div className="w-10 h-10 bg-[#FFF5F0] text-[#F25D27] rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-black">{formatCurrency(salesData.totalCommission)}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-zinc-500">Ticket Médio</p>
                        <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-black">
                        {salesData.tabsCount > 0 ? formatCurrency(salesData.totalSales / salesData.tabsCount) : 'R$ 0,00'}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-zinc-500">Comandas Fechadas</p>
                        <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-black">{salesData.tabsCount}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Waiters Tab */}
              {activeTab === "waiters" && (
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Performance por Garçom</h3>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="Buscar garçom..." 
                        className="pl-9 pr-4 py-2 border border-zinc-200 bg-zinc-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F25D27] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-50">
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Garçom</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Vendas Totais</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Comissão</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Comandas</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Ticket Médio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {waitersData.map((waiter) => (
                          <tr key={waiter.id} className="hover:bg-zinc-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                  {waiter.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-zinc-900">{waiter.name}</p>
                                  <p className="text-xs text-zinc-500">ID: #{waiter.id.toString().padStart(3, '0')}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right font-semibold text-sm text-zinc-900">
                              {formatCurrency(waiter.sales)}
                            </td>
                            <td className="px-6 py-4 text-right text-[#F25D27] font-bold text-sm">
                              {formatCurrency(waiter.commission)}
                            </td>
                            <td className="px-6 py-4 text-center text-sm font-medium text-zinc-600">
                              {waiter.tabsCount}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium text-zinc-600">
                              {waiter.tabsCount > 0 ? formatCurrency(waiter.sales / waiter.tabsCount) : 'R$ 0,00'}
                            </td>
                          </tr>
                        ))}
                        {waitersData.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                              Nenhum dado encontrado para o período selecionado.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Fiado Tab */}
              {activeTab === "fiado" && (
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Contas Fiado (Colaboradores/Clientes)</h3>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50">
                        <Filter className="w-4 h-4" />
                        Filtrar
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-50">
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Data</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Cliente/Colaborador</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Descrição</th>
                          <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {fiadoData.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-zinc-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-zinc-600">
                              {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-bold text-sm text-zinc-900">{transaction.customer_name}</p>
                              <p className="text-xs text-zinc-500">{transaction.customer_phone}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-600">
                              {transaction.description}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-sm text-rose-600">
                              {formatCurrency(transaction.amount)}
                            </td>
                          </tr>
                        ))}
                        {fiadoData.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                              Nenhuma conta fiado registrada no período.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Custom Date Modal */}
      {isCustomDateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h3 className="text-xl font-black text-zinc-900">Período Personalizado</h3>
              <button 
                onClick={() => setIsCustomDateModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Data Inicial</label>
                <input 
                  type="date" 
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Data Final</label>
                <input 
                  type="date" 
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsCustomDateModalOpen(false)}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (customStartDate && customEndDate) {
                    setDateFilter("custom");
                    setIsCustomDateModalOpen(false);
                    // fetchData will be triggered by dateFilter change
                  } else {
                    alert("Por favor, selecione a data inicial e final.");
                  }
                }}
                className="px-5 py-2.5 bg-[#F25D27] hover:bg-[#E04D17] text-white font-bold rounded-xl shadow-sm shadow-orange-500/20 transition-colors"
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
