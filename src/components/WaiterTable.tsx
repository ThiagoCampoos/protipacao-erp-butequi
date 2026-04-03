import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Plus, Users, User } from "lucide-react";

interface Tab {
  id: number;
  table_id: number;
  client_name: string;
  client_phone: string;
  status: string;
}

export default function WaiterTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tables/${id}/tabs`)
      .then(res => res.json())
      .then(data => {
        setTabs(data);
        setLoading(false);
      });
  }, [id]);

  const handleOpenMainTab = async () => {
    const res = await fetch("/api/tabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_id: parseInt(id!), client_name: "Comanda Principal" })
    });
    const newTab = await res.json();
    navigate(`/waiter/tab/${newTab.id}`);
  };

  const handleCreateIndividualTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const client_name = formData.get("client_name") as string;
    const client_phone = formData.get("client_phone") as string;

    const res = await fetch("/api/tabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_id: parseInt(id!), client_name, client_phone })
    });
    const newTab = await res.json();
    navigate(`/waiter/tab/${newTab.id}`);
  };

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="bg-zinc-900 p-4 sticky top-0 z-10 shadow-md flex items-center gap-4">
        <Link to="/waiter" className="p-2 -ml-2 hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Mesa {id}</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {tabs.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-400">Comandas Ativas</h2>
            <div className="grid gap-3">
              {tabs.map(tab => (
                <Link 
                  key={tab.id} 
                  to={`/waiter/tab/${tab.id}`}
                  className="bg-zinc-800 p-4 rounded-2xl flex items-center justify-between border border-zinc-700 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-zinc-700 p-3 rounded-full">
                      <User className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{tab.client_name}</p>
                      <p className="text-sm text-zinc-400">ID: #{tab.id}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    Aberta
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
            <Users className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Mesa Livre</h2>
            <p className="text-zinc-400 mb-6">Abra uma comanda para começar a anotar pedidos.</p>
            <button 
              onClick={handleOpenMainTab}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Abrir Comanda Principal
            </button>
          </div>
        )}

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Criar Comanda Individual</h2>
          <form onSubmit={handleCreateIndividualTab} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Nome do Cliente</label>
              <input 
                name="client_name" 
                required 
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="ex: João Silva"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Telefone (Opcional)</label>
              <input 
                name="client_phone" 
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="ex: 11 99999-9999"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-medium transition-colors border border-zinc-700"
            >
              Criar Comanda Individual
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
