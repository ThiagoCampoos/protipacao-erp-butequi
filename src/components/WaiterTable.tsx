import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Clock, Pencil, Printer, PlusCircle, Ban } from "lucide-react";
import { TabSlider } from "./TabSlider";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface TabItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  unique_notes: string;
  product?: Product;
}

interface Tab {
  id: number;
  table_id: number;
  client_name: string;
  client_phone: string;
  status: string;
  subtotal: number;
  items?: TabItem[];
  opened_at?: string;
}

export default function WaiterTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [tableStatus, setTableStatus] = useState<string>("Livre");
  const [loading, setLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  // States for Add Individual Tab Modal Flow
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/tables/${id}/tabs`).then(res => res.json()),
      fetch("/api/tables").then(res => res.json())
    ]).then(([tabsData, tablesData]) => {
      setTabs(tabsData);
      const currentTable = tablesData.find((t: any) => t.id === parseInt(id!));
      if (currentTable) setTableStatus(currentTable.status);
      
      if (tabsData.length > 0) {
        // Select main tab or first available tab
        const mainTab = tabsData.find((t: Tab) => t.client_name === 'Comanda Principal' || t.client_name.toLowerCase() === 'mesa') || tabsData[0];
        setActiveTabId(mainTab.id);
      }
      setLoading(false);
    });
  }, [id]);

  const handleCreateIndividualTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tableStatus === "Em Fechamento") {
      alert("Mesa em fechamento. Não é possível adicionar contas.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const client_name = formData.get("client_name") as string;
    const client_phone = formData.get("client_phone") as string;

    try {
      const res = await fetch("/api/tabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_id: parseInt(id!), client_name, client_phone })
      });
      const newTab = await res.json();
      
      // Update local state
      const updatedTabsRes = await fetch(`/api/tables/${id}/tabs`);
      const updatedTabsData = await updatedTabsRes.json();
      setTabs(updatedTabsData);
      
      setIsCreateModalOpen(false);
      setActiveTabId(newTab.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenMainTab = async () => {
    if (tableStatus === "Em Fechamento") return;
    const res = await fetch("/api/tabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_id: parseInt(id!), client_name: "Comanda Principal" })
    });
    const newTab = await res.json();
    navigate(`/waiter/tab/${newTab.id}`);
  };

  const handleRequestClosure = async () => {
    try {
      const res = await fetch(`/api/tables/${id}/request-closure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setTableStatus("Em Fechamento");
        alert("Fechamento solicitado no caixa!");
        navigate("/waiter/tables-list");
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (error) {
      alert("Erro ao fechar mesa.");
    }
  };

  if (loading) return <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center font-sans tracking-tight">Carregando...</div>;

  const activeTab = tabs.find(t => t.id === activeTabId);

  // Helper to calculate elapsed time for a tab
  const getElapsedTime = (openedAtStr?: string) => {
    if (!openedAtStr) return "0 min";
    const start = new Date(openedAtStr).getTime();
    if (isNaN(start)) return "0 min";
    const now = new Date().getTime();
    const diffMins = Math.floor((now - start) / 60000);
    if (diffMins > 60) {
      const hours = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      return `${hours}h ${remainingMins}m`;
    }
    return `${diffMins} min`;
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans pb-40">
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center p-4">
          <Link to="/waiter" className="text-[#F20505] p-2 -ml-2 rounded-full hover:bg-red-50 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="flex-1 text-center font-bold tracking-widest text-[13px] uppercase">
            RESUMO DA MESA {id}
          </h1>
          <div className="w-10"></div>
        </div>
        
        {tabs.length > 0 && (
          <TabSlider 
            tabs={tabs} 
            activeTabId={activeTabId} 
            onSelectTab={setActiveTabId} 
            onCreateNew={() => setIsCreateModalOpen(true)} 
          />
        )}
      </header>

      <main className="flex-1 px-4 py-6">
        {tabs.length > 0 && activeTab ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Total Section */}
            <div className="text-center mb-8 mt-2">
              <h1 className="text-6xl font-black tracking-tighter text-[#131D2E]">
                <span className="text-4xl text-[#131D2E]/70 mr-1">R$</span>
                {(activeTab.subtotal || 0).toFixed(2).replace('.', ',')}
              </h1>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className={`${tableStatus === "Em Fechamento" ? "bg-amber-500 shadow-amber-500/20" : "bg-[#FF0000] shadow-red-500/20"} text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> {tableStatus === "Em Fechamento" ? "AGUARDANDO" : "OCUPADA"}
                </span>
                <span className="text-zinc-500 font-medium text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-zinc-400"/> {getElapsedTime(activeTab.opened_at)}
                </span>
              </div>
            </div>

            {/* Client Section */}
            <div className="mb-8">
              <h3 className="text-[11px] font-black text-zinc-500 mb-3 uppercase tracking-widest">Responsável</h3>
              <div className="bg-white border border-zinc-100 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)] rounded-2xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeTab.client_name}&backgroundColor=f3f4f6`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#131D2E] text-lg">{activeTab.client_name === 'Comanda Principal' ? 'Comanda Principal' : activeTab.client_name}</p>
                    <p className="text-zinc-500 text-[13px]">{activeTab.client_name === 'Comanda Principal' ? 'Líder da mesa' : 'Cliente Frequentador'}</p>
                  </div>
                </div>
                <button className="p-2 text-[#FF0000] hover:bg-red-50 rounded-full transition-colors">
                   <Pencil className="w-5 h-5" fill="currentColor" size={20} />
                </button>
              </div>
            </div>

            {/* Items Section */}
            <div>
              <div className="flex justify-between items-end mb-4 px-1">
                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                  Itens do pedido ({activeTab.items ? activeTab.items.length : 0})
                </h3>
                <span className="text-[#FF0000] font-bold text-sm tracking-tight">
                  Total: R$ {(activeTab.subtotal || 0).toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="space-y-3">
                {activeTab.items && activeTab.items.length > 0 ? (
                  activeTab.items.map(item => (
                    <div key={item.id} className="bg-white border border-zinc-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] rounded-2xl p-4 flex justify-between items-center">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-[#131D2E] text-[15px]">{item.quantity}x {item.product?.name || "Produto"}</p>
                        <p className="text-zinc-500 text-[13px] mt-0.5">Un: R$ {(item.unit_price).toFixed(2).replace('.', ',')}</p>
                        {item.unique_notes && <p className="text-zinc-400 text-[12px] italic mt-1 leading-snug">{item.unique_notes}</p>}
                      </div>
                      <p className="text-[17px] font-bold text-[#131D2E]">
                        R$ {(item.quantity * item.unit_price).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-zinc-50 border border-zinc-100 border-dashed rounded-2xl">
                    <p className="text-zinc-400 text-sm font-medium">Nenhum pedido lançado nesta comanda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-20 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div className="w-20 h-20 bg-zinc-200 rounded-full flex items-center justify-center mb-6">
              <Ban className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#131D2E] mb-2 tracking-tight">Mesa Livre</h2>
            <p className="text-zinc-500 mb-8 max-w-[250px] leading-relaxed text-[15px]">Abra uma comanda principal para começar a anotar pedidos.</p>
            <button 
              onClick={handleOpenMainTab}
              className="w-full bg-[#FF0000] hover:bg-[#e00000] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/25"
            >
              <PlusCircle className="w-5 h-5" />
              Abrir Comanda Principal
            </button>
          </div>
        )}
      </main>

      {/* Fixed Bottom Actions */}
      {tabs.length > 0 && activeTab && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-4 pb-6 space-y-3 z-30 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex gap-3">
            <button className="flex-1 py-3.5 bg-white border-2 border-zinc-100 text-[#FF0000] font-bold rounded-xl flex items-center justify-center gap-2 active:bg-red-50 transition-colors shadow-sm">
              <Printer className="w-[18px] h-[18px]" strokeWidth={2.5} /> <span className="tracking-tight text-[15px]">IMPRIMIR</span>
            </button>
            <button onClick={handleRequestClosure} disabled={tableStatus === "Em Fechamento"} className={`flex-[1.2] py-3.5 bg-white border-2 border-zinc-100 text-[#131D2E] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm ${tableStatus === "Em Fechamento" ? "opacity-50" : "active:bg-zinc-50"}`}>
              <span className="w-[18px] h-[18px] border-2 border-current rounded-full flex items-center justify-center relative"><span className="w-2 h-0.5 bg-current absolute transform -rotate-45"></span></span>
              <span className="tracking-tight text-[15px]">{tableStatus === "Em Fechamento" ? "AGUARDANDO" : "FECHAR MESA"}</span>
            </button>
          </div>
          <button 
            onClick={() => navigate(`/waiter/tab/${activeTabId}`)} 
            disabled={tableStatus === "Em Fechamento"}
            className={`w-full py-4 bg-[#FF0000] text-white font-black rounded-xl flex items-center justify-center gap-2 text-[17px] shadow-lg shadow-red-500/30 transition-all ${tableStatus === "Em Fechamento" ? "opacity-50 bg-zinc-400 shadow-none cursor-not-allowed" : "active:bg-[#e00000]"}`}
          >
            <span className="bg-white rounded-full p-0.5"><PlusCircle fill="currentColor" stroke="transparent" className={`w-5 h-5 flex-shrink-0 ${tableStatus === "Em Fechamento" ? "text-zinc-400" : "text-[#FF0000]"}`} /></span> 
            LANÇAR NOVO PEDIDO
          </button>
        </div>
      )}

      {/* Create Tab Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-xl font-bold text-[#131D2E] tracking-tight">Nova Comanda</h3>
              <p className="text-zinc-500 text-sm mt-1">Crie uma conta individual na mesa {id}</p>
            </div>
            
            <form onSubmit={handleCreateIndividualTab} className="p-6 space-y-4 bg-zinc-50">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Nome do Cliente</label>
                <input 
                  name="client_name" 
                  required 
                  className="w-full bg-white border border-zinc-200 rounded-xl py-3.5 px-4 text-[#131D2E] focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none shadow-sm transition-all"
                  placeholder="ex: Carlos Silva"
                />
              </div>
              <div className="pb-2">
                <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Telefone <span className="font-normal text-zinc-400">(Opcional)</span></label>
                <input 
                  name="client_phone" 
                  className="w-full bg-white border border-zinc-200 rounded-xl py-3.5 px-4 text-[#131D2E] focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none shadow-sm transition-all"
                  placeholder="ex: 11 99999-9999"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-3.5 bg-white border border-zinc-200 text-zinc-600 font-bold rounded-xl active:bg-zinc-100 transition-colors shadow-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3.5 bg-[#FF0000] text-white font-bold rounded-xl active:bg-[#e00000] shadow-md shadow-red-500/20 transition-all"
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
