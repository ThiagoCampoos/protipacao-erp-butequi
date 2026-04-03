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
  Network,
  Save,
  Info
} from "lucide-react";

export default function AdminPrinterSetup() {
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
            <p className="text-[10px] text-[#F25D27] font-bold uppercase tracking-wider">Painel Admin</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Visão Geral</span>
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
            <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Gerenciamento de Mesas</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
            <ClipboardList className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
            <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Cardápio</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
            <BarChart2 className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-4 py-3 bg-[#FFF5F0] text-[#F25D27] rounded-lg transition-colors">
            <Printer className="w-5 h-5" />
            <span className="text-sm font-medium">Impressoras</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-zinc-100">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors group">
              <Settings className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
              <span className="text-sm font-medium">Configurações</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 mt-auto border-t border-zinc-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold">
              A
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-zinc-900">Admin Principal</p>
              <p className="text-[10px] text-zinc-500">Sair da conta</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <nav className="text-sm text-zinc-500 mb-2 flex items-center gap-2 font-medium">
              <span>Configurações</span>
              <span className="text-zinc-300">›</span>
              <Link to="/admin/printers" className="hover:text-[#F25D27] transition-colors">Impressoras</Link>
              <span className="text-zinc-300">›</span>
              <span className="text-[#F25D27]">Nova Impressora</span>
            </nav>
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Configurar Nova Impressora</h2>
            <p className="text-zinc-500 mt-2 max-w-xl font-medium">Configure os parâmetros de impressão para automatizar o envio de pedidos para a cozinha, bar ou recepção.</p>
          </header>

          {/* Form Section */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Printer Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Nome da Impressora</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Cozinha Principal 01" 
                    className="w-full h-12 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] transition-all px-4 font-medium outline-none"
                  />
                </div>

                {/* Connection Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Tipo de Conexão</label>
                  <select className="w-full h-12 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] transition-all px-4 font-medium outline-none appearance-none">
                    <option>Selecionar Conexão</option>
                    <option>USB</option>
                    <option>Ethernet (Rede Cabeada)</option>
                    <option>Wi-Fi</option>
                    <option>Bluetooth</option>
                  </select>
                </div>

                {/* IP Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Endereço IP</label>
                  <input 
                    type="text" 
                    placeholder="192.168.1.100" 
                    className="w-full h-12 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] transition-all px-4 font-medium outline-none"
                  />
                </div>

                {/* Port */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Porta</label>
                  <input 
                    type="text" 
                    placeholder="9100" 
                    className="w-full h-12 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] transition-all px-4 font-medium outline-none"
                  />
                </div>

                {/* Printing Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Área de Impressão</label>
                  <select className="w-full h-12 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] transition-all px-4 font-medium outline-none appearance-none">
                    <option>Cozinha</option>
                    <option>Bar / Bebidas</option>
                    <option>Recepção / Caixa</option>
                    <option>Estoque</option>
                  </select>
                </div>

                {/* Automatic Printing Toggle */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-700">Impressão Automática</label>
                  <div className="flex items-center h-12 gap-3">
                    <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#F25D27] transition-colors focus:outline-none">
                      <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                    </button>
                    <span className="text-sm text-zinc-600 font-medium">Ativado - Imprime ao confirmar pedido</span>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button type="button" className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-zinc-50 transition-all group">
                  <Network className="w-5 h-5 text-[#F25D27] group-hover:rotate-12 transition-transform" />
                  Testar Conexão
                </button>
                
                <div className="flex gap-4">
                  <Link to="/admin/printers" className="px-6 py-3 font-bold text-zinc-500 hover:text-zinc-700 transition-colors flex items-center">
                    Cancelar
                  </Link>
                  <button type="submit" className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Salvar Configuração
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Helper Card */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
            <Info className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900">Dica de Configuração</h4>
              <p className="text-sm text-zinc-700 mt-1 font-medium">
                Certifique-se de que a impressora está na mesma rede Wi-Fi/Ethernet do tablet de atendimento para garantir uma conexão estável e rápida.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
