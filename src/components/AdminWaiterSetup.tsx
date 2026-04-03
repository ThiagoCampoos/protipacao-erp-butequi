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
  UserPlus,
  Search,
  Bell,
  Save,
  Info
} from "lucide-react";

export default function AdminWaiterSetup() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-100">
          <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
            <p className="text-[10px] text-[#F25D27] font-bold uppercase tracking-wider mt-0.5">Painel Administrativo</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Visão Geral</span>
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium">Gerenciamento de Mesas</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <ClipboardList className="w-5 h-5" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Cardápio</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <BarChart2 className="w-5 h-5" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-[#FFF5F0] hover:text-[#F25D27] rounded-lg transition-colors group">
            <Printer className="w-5 h-5" />
            <span className="text-sm font-medium">Impressoras</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-zinc-100">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 bg-[#FFF5F0] text-[#F25D27] rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Configurações</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-zinc-900">Admin Doca</p>
              <p className="text-xs text-zinc-500 truncate">admin@doca.com</p>
            </div>
            <button className="text-zinc-400 hover:text-[#F25D27] transition-colors p-1">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <UserPlus className="w-6 h-6 text-[#F25D27]" />
            <h2 className="text-xl font-bold tracking-tight">Cadastro de Garçom</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Buscar no sistema..." 
                className="pl-9 pr-4 py-2 bg-[#F8F9FA] border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 text-zinc-500 hover:text-[#F25D27] relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F25D27] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Form Area */}
        <div className="p-8 max-w-4xl mx-auto w-full overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Novo Colaborador</h3>
            <p className="text-zinc-500 mt-1 font-medium">Preencha as informações abaixo para registrar um novo garçom na plataforma.</p>
          </div>

          <form className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Section: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-zinc-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Ex: João da Silva Santos" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">CPF</label>
                <input 
                  type="text" 
                  placeholder="000.000.000-00" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">E-mail</label>
                <input 
                  type="email" 
                  placeholder="joao.silva@email.com" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">PIN de Acesso (4 dígitos)</label>
                <input 
                  type="password" 
                  maxLength={4}
                  placeholder="****" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all tracking-widest text-lg font-black"
                />
              </div>
            </div>

            {/* Section: Settings & Status */}
            <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-zinc-700">Status do Colaborador:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25D27]"></div>
                  <span className="ml-3 text-sm font-bold text-zinc-900">Ativo</span>
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/admin/settings" className="px-6 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-bold hover:bg-zinc-50 transition-colors">
                  Cancelar
                </Link>
                <button type="submit" className="px-8 py-3 rounded-xl bg-[#F25D27] hover:bg-[#E04D17] text-white font-bold shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Salvar Garçom
                </button>
              </div>
            </div>
          </form>

          {/* Help Tip */}
          <div className="mt-8 flex items-start gap-4 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <Info className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Dica de segurança</h4>
              <p className="text-sm text-zinc-700 mt-1 font-medium">
                O PIN de acesso é exclusivo para o terminal de pedidos. Certifique-se de que o colaborador escolha uma senha segura e não a compartilhe.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
