import AdminSidebar from "./AdminSidebar";
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
  Search,
  Bell,
  HelpCircle,
  Plus,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Filter,
  WifiOff,
  AlertTriangle
} from "lucide-react";

export default function AdminPrinters() {
  const printers = [
    { id: 1, name: "Cozinha", ip: "192.168.1.50", status: "Online", lastActive: "Há 2 min" },
    { id: 2, name: "Bar", ip: "192.168.1.51", status: "Online", lastActive: "Há 15 min" },
    { id: 3, name: "Caixa", ip: "192.168.1.52", status: "Online", lastActive: "Há 5 min" },
    { id: 4, name: "Delivery", ip: "192.168.1.53", status: "Offline", lastActive: "Ontem às 22:45" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Buscar impressora ou IP..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Configuração de Impressoras</h2>
              <p className="text-zinc-500 mt-1">Gerencie a infraestrutura de impressão do seu restaurante</p>
            </div>
            <Link to="/admin/printers/new" className="flex items-center justify-center gap-2 bg-[#F25D27] hover:bg-[#E04D17] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-orange-500/20">
              <Plus className="w-5 h-5" />
              <span>Nova Impressora</span>
            </Link>
          </div>

          {/* Stats/Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-sm font-medium">Total Online</span>
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-3xl font-bold mt-2">3</p>
              <p className="text-xs text-emerald-500 mt-1 font-medium">Rede estável</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-sm font-medium">Offline/Erro</span>
                <AlertCircle className="w-6 h-6 text-rose-500" />
              </div>
              <p className="text-3xl font-bold mt-2">1</p>
              <p className="text-xs text-rose-500 mt-1 font-medium">Atenção necessária</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-sm font-medium">Impressões (Hoje)</span>
                <Printer className="w-6 h-6 text-[#F25D27]" />
              </div>
              <p className="text-3xl font-bold mt-2">128</p>
              <p className="text-xs text-zinc-400 mt-1">Média: 110/dia</p>
            </div>
          </div>

          {/* Printer List Table */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <h3 className="font-bold text-zinc-900">Dispositivos Conectados</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
                  <RefreshCw className="w-5 h-5 text-zinc-500" />
                </button>
                <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
                  <Filter className="w-5 h-5 text-zinc-500" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-400 text-xs uppercase tracking-wider font-bold bg-white">
                    <th className="px-6 py-4">Nome da Impressora</th>
                    <th className="px-6 py-4">Endereço IP</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Última Atividade</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {printers.map((printer) => (
                    <tr key={printer.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-zinc-900">{printer.name}</td>
                      <td className="px-6 py-4 font-mono text-sm text-zinc-600">{printer.ip}</td>
                      <td className="px-6 py-4">
                        {printer.status === "Online" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                            Online
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase tracking-wide">
                            Offline
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 font-medium">{printer.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                            printer.status === "Online" 
                              ? "bg-[#FFF5F0] hover:bg-orange-100 text-[#F25D27]" 
                              : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                          }`}
                          disabled={printer.status === "Offline"}
                        >
                          Teste de Impressão
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secondary Alert/Notice Area */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
              <AlertTriangle className="w-6 h-6 text-[#F25D27]" />
              Alertas do Sistema
            </h3>
            <div className="bg-[#FFF5F0] border border-orange-200 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-orange-200 flex items-center justify-center text-[#F25D27] shrink-0">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Impressora 'Delivery' não encontrada</p>
                <p className="text-sm text-zinc-600 mt-1">
                  O sistema não consegue se comunicar com o IP 192.168.1.53. Verifique se o cabo de rede está conectado ou se a impressora está ligada.
                </p>
                <div className="flex gap-4 mt-3">
                  <button className="text-sm font-bold text-[#F25D27] hover:underline">Tentar Reconectar</button>
                  <button className="text-sm font-bold text-zinc-500 hover:text-zinc-700">Ver Manual de Solução</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
