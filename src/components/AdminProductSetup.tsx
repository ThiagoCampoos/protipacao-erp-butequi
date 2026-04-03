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
  Info,
  Image as ImageIcon,
  PlusCircle,
  Plus,
  Trash2,
  UploadCloud,
  Check
} from "lucide-react";

export default function AdminProductSetup() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-zinc-200 flex flex-col h-screen sticky top-0 hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F25D27] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold leading-tight uppercase tracking-wider text-[#F25D27]">Doca das Porções</h1>
            <p className="text-xs text-zinc-500 font-medium">Admin Dashboard</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-3 py-2.5 bg-[#FFF5F0] text-[#F25D27] rounded-xl transition-colors">
            <Utensils className="w-5 h-5" />
            <span className="text-sm font-medium">Produtos</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <ClipboardList className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <BarChart2 className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors group">
            <Settings className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              G
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-xs font-bold truncate text-zinc-900">Gerente de Vendas</p>
              <p className="text-[10px] text-zinc-500">Sair da conta</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-zinc-900">Cadastro de Produto</h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">Preencha os dados para adicionar um novo item ao cardápio</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/menu" className="px-6 py-2.5 flex items-center justify-center rounded-xl border border-zinc-300 font-bold text-sm text-zinc-700 hover:bg-zinc-50 transition-colors">
              Cancelar
            </Link>
            <button className="px-6 py-2.5 rounded-xl bg-[#F25D27] hover:bg-[#E04D17] text-white font-bold text-sm shadow-sm shadow-orange-500/20 transition-colors">
              Salvar Produto
            </button>
          </div>
        </header>

        {/* Form Content */}
        <div className="p-8 max-w-5xl mx-auto w-full space-y-8 overflow-y-auto">
          
          {/* Basic Info Section */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-900">
              <Info className="w-5 h-5 text-[#F25D27]" />
              Informações Básicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Nome do Produto</label>
                <input 
                  type="text" 
                  placeholder="Ex: Porção de Batata Rustica Especial" 
                  className="w-full h-11 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Categoria</label>
                <select className="w-full h-11 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium appearance-none">
                  <option>Selecione uma categoria</option>
                  <option>Porções de Peixe</option>
                  <option>Porções de Carne</option>
                  <option>Bebidas</option>
                  <option>Sobremesas</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Preço de Venda (R$)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0,00" 
                  className="w-full h-11 px-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25D27]"></div>
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Incluir na comissão do garçom (%)</span>
                </label>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-zinc-700">Descrição</label>
                <textarea 
                  rows={3} 
                  placeholder="Descreva os ingredientes e detalhes do prato..." 
                  className="w-full p-4 rounded-xl border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Media Upload Section */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-900">
              <ImageIcon className="w-5 h-5 text-[#F25D27]" />
              Imagem do Produto
            </h3>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-zinc-300 border-dashed rounded-2xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 text-zinc-400 mb-3" />
                  <p className="mb-2 text-sm text-zinc-600 font-bold tracking-tight">Clique para fazer upload ou arraste uma foto</p>
                  <p className="text-xs text-zinc-400 font-medium">PNG, JPG ou WEBP (Max. 5MB)</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </section>

          {/* Attributes & Extras Section */}
          <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-900">
                <PlusCircle className="w-5 h-5 text-[#F25D27]" />
                Atributos e Complementos
              </h3>
              <button className="flex items-center gap-1 text-[#F25D27] text-sm font-bold hover:underline">
                <Plus className="w-4 h-4" /> Adicionar Opção
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Extra Cheese Item */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                <div className="flex-1">
                  <input type="text" defaultValue="Extra Cheese" className="w-full bg-transparent border-none focus:ring-0 font-bold text-zinc-900 p-0 outline-none" />
                </div>
                <div className="w-32">
                  <div className="flex items-center border-l border-zinc-300 pl-4">
                    <span className="text-xs text-zinc-500 font-bold mr-1">R$</span>
                    <input type="number" step="0.01" defaultValue="4.50" className="w-full bg-transparent border-none focus:ring-0 font-black text-zinc-900 p-0 outline-none" />
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-rose-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              {/* No Onions Item */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                <div className="flex-1 text-zinc-500 italic">
                  <input type="text" defaultValue="Sem Cebola" className="w-full bg-transparent border-none focus:ring-0 font-medium p-0 outline-none" />
                </div>
                <div className="w-32">
                  <div className="flex items-center border-l border-zinc-300 pl-4">
                    <span className="text-xs text-zinc-500 font-bold mr-1">R$</span>
                    <input type="number" step="0.01" defaultValue="0.00" className="w-full bg-transparent border-none focus:ring-0 font-black text-zinc-900 p-0 outline-none" />
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-rose-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              {/* Molho Especial */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                <div className="flex-1">
                  <input type="text" defaultValue="Molho Especial" className="w-full bg-transparent border-none focus:ring-0 font-bold text-zinc-900 p-0 outline-none" />
                </div>
                <div className="w-32">
                  <div className="flex items-center border-l border-zinc-300 pl-4">
                    <span className="text-xs text-zinc-500 font-bold mr-1">R$</span>
                    <input type="number" step="0.01" defaultValue="3.00" className="w-full bg-transparent border-none focus:ring-0 font-black text-zinc-900 p-0 outline-none" />
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-rose-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Action Footer Buttons */}
          <div className="flex justify-end gap-4 py-8 border-t border-zinc-200">
            <Link to="/admin/menu" className="px-8 py-3 rounded-xl border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center justify-center">
              Descartar
            </Link>
            <button className="px-8 py-3 rounded-xl bg-[#F25D27] hover:bg-[#E04D17] text-white font-bold shadow-sm shadow-orange-500/20 transition-all flex items-center gap-2">
              <Check className="w-5 h-5" />
              Confirmar Cadastro
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
