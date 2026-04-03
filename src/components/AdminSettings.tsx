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
  Bell,
  Store,
  Banknote,
  Clock,
  Image as ImageIcon,
  History,
  Info
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Painel Administrativo</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Visão Geral</span>
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Gerenciamento de Mesas</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <ClipboardList className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Cardápio</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <BarChart2 className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <Printer className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Impressoras</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 bg-[#F25D27] text-white rounded-xl transition-colors shadow-sm shadow-orange-500/20">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-bold">Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              C
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate text-zinc-900">Carlos Silva</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Gerente</p>
            </div>
            <button className="text-zinc-400 hover:text-[#F25D27] transition-colors p-1">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[#F25D27]" />
            <h2 className="text-xl font-black tracking-tight">Configurações do Sistema</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm shadow-orange-500/20">
              Salvar Alterações
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Page Title Section */}
          <section>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">Configurações Gerais</h1>
            <p className="text-zinc-500 mt-1 font-medium">Gerencie as informações principais e parâmetros operacionais do seu restaurante.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Forms */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Restaurant Info Card */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Store className="w-6 h-6 text-[#F25D27]" />
                  <h3 className="font-black text-xl text-zinc-900">Identidade do Restaurante</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Nome Fantasia</label>
                    <input 
                      type="text" 
                      defaultValue="Doca das Porções" 
                      className="w-full h-12 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">CNPJ</label>
                    <input 
                      type="text" 
                      placeholder="00.000.000/0001-00" 
                      className="w-full h-12 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Telefone de Contato</label>
                    <input 
                      type="text" 
                      defaultValue="(11) 99999-9999" 
                      className="w-full h-12 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Endereço Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Av. Beira Mar, 1200 - Centro" 
                      className="w-full h-12 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Fiscal & Service Settings */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Banknote className="w-6 h-6 text-amber-500" />
                  <h3 className="font-black text-xl text-zinc-900">Impostos e Taxas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Alíquota ISS (%)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        defaultValue="5" 
                        className="w-full h-12 pl-4 pr-10 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Alíquota ICMS (%)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        defaultValue="18" 
                        className="w-full h-12 pl-4 pr-10 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Taxa de Serviço</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        defaultValue="10" 
                        className="w-full h-12 pl-4 pr-10 rounded-xl border-amber-300 bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-black text-amber-700"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 font-black">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
                  <Info className="w-6 h-6 text-amber-500 shrink-0" />
                  <p className="text-sm text-zinc-700 font-medium">A taxa de serviço é opcional para o cliente mas será calculada automaticamente no fechamento da conta.</p>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-6 h-6 text-[#F25D27]" />
                  <h3 className="font-black text-xl text-zinc-900">Horário de Funcionamento</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                    <span className="text-sm font-bold w-32 text-zinc-700">Segunda - Quinta</span>
                    <div className="flex items-center gap-4">
                      <input type="time" defaultValue="11:00" className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-50 outline-none font-medium text-sm" />
                      <span className="text-zinc-400 font-medium">às</span>
                      <input type="time" defaultValue="23:00" className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-50 outline-none font-medium text-sm" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-600 font-black tracking-wider">ABERTO</span>
                      <div className="w-11 h-6 bg-emerald-100 rounded-full relative flex items-center px-1">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                    <span className="text-sm font-bold w-32 text-zinc-700">Sexta - Sábado</span>
                    <div className="flex items-center gap-4">
                      <input type="time" defaultValue="11:00" className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-50 outline-none font-medium text-sm" />
                      <span className="text-zinc-400 font-medium">às</span>
                      <input type="time" defaultValue="01:00" className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-50 outline-none font-medium text-sm" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-600 font-black tracking-wider">ABERTO</span>
                      <div className="w-11 h-6 bg-emerald-100 rounded-full relative flex items-center px-1">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4">
                    <span className="text-sm font-bold w-32 text-zinc-700">Domingo</span>
                    <div className="flex items-center gap-4">
                      <input type="time" defaultValue="11:00" disabled className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-100 text-zinc-400 outline-none font-medium text-sm" />
                      <span className="text-zinc-400 font-medium">às</span>
                      <input type="time" defaultValue="18:00" disabled className="h-10 px-3 rounded-lg border-zinc-200 bg-zinc-100 text-zinc-400 outline-none font-medium text-sm" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 font-black tracking-wider">FECHADO</span>
                      <div className="w-11 h-6 bg-zinc-200 rounded-full relative flex items-center px-1">
                        <div className="w-4 h-4 bg-zinc-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Logo & Additional */}
            <div className="space-y-8">
              
              {/* Logo Upload */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm text-center">
                <h3 className="font-black text-xl text-zinc-900 mb-8">Logo do Restaurante</h3>
                <div className="relative group cursor-pointer">
                  <div className="w-40 h-40 mx-auto bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#F25D27] group-hover:bg-[#FFF5F0]">
                    <ImageIcon className="w-8 h-8 text-zinc-400 group-hover:text-[#F25D27] mb-3" />
                    <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">PNG, JPG ou SVG</span>
                  </div>
                  <div className="absolute inset-0 w-40 h-40 mx-auto rounded-3xl bg-[#F25D27]/90 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <span className="text-sm font-bold">Alterar Logo</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mt-6 font-medium">Tamanho recomendado: 512x512px. O logo será exibido nos pedidos e relatórios.</p>
              </div>

              {/* System Status */}
              <div className="bg-[#F25D27] p-8 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-xl">Status do Sistema</h3>
                  <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90 font-medium">Conexão Impressoras</span>
                    <span className="font-bold">Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90 font-medium">Backup Automático</span>
                    <span className="font-bold">Há 2 horas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90 font-medium">Sincronização Cloud</span>
                    <span className="font-bold">Ativa</span>
                  </div>
                </div>
                <button className="w-full mt-8 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl text-sm font-bold transition-colors">
                  Testar Conexões
                </button>
              </div>

              {/* Maintenance */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="font-black text-xl text-zinc-900 mb-6">Zona de Perigo</h3>
                <button className="w-full border-2 border-rose-100 text-rose-600 py-3.5 rounded-xl text-sm font-bold hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center gap-2">
                  <History className="w-5 h-5" />
                  Resetar Configurações
                </button>
                <p className="text-[11px] text-zinc-500 mt-4 text-center font-medium leading-relaxed">
                  Atenção: Esta ação não pode ser desfeita e voltará aos padrões de fábrica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
