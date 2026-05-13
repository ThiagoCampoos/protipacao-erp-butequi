import AdminSidebar from "./AdminSidebar";
import React, { useState, useEffect } from "react";
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
  Plus,
  Search,
  Edit2,
  Trash2,
  Users
} from "lucide-react";

interface Waiter {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  username: string;
  commission_rate: number;
  active: boolean;
}

export default function AdminWaiters() {
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [waiterToDelete, setWaiterToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waiters")
      .then(res => res.json())
      .then(data => {
        setWaiters(data);
        setLoading(false);
      });
  }, []);

  const filteredWaiters = waiters.filter(waiter => 
    waiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    waiter.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWaiterStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/waiters/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus })
      });
      
      if (res.ok) {
        setWaiters(items => items.map(item => 
          item.id === id ? { ...item, active: !currentStatus } : item
        ));
      }
    } catch (error) {
      console.error("Error toggling waiter status:", error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setWaiterToDelete(id);
  };

  const confirmDelete = async () => {
    if (waiterToDelete === null) return;
    try {
      const res = await fetch(`/api/waiters/${waiterToDelete}`, {
        method: "DELETE"
      });
      
      if (res.ok) {
        setWaiters(items => items.filter(item => item.id !== waiterToDelete));
        setWaiterToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting waiter:", error);
    }
  };

  const cancelDelete = () => {
    setWaiterToDelete(null);
  };

  if (loading) return <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-[#F25D27]" />
            <h2 className="text-xl font-black tracking-tight">Garçons</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Buscar garçom..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#F8F9FA] border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all w-64"
              />
            </div>
            <Link to="/admin/waiters/new" className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm shadow-orange-500/20 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Garçom
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Usuário</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Taxa (%)</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredWaiters.map(waiter => (
                    <tr key={waiter.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 font-bold">
                            {waiter.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{waiter.name}</p>
                            <p className="text-xs text-zinc-500 font-medium">{waiter.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-600">
                        {waiter.username}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#F25D27]">
                        {waiter.commission_rate}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => toggleWaiterStatus(waiter.id, waiter.active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                              waiter.active ? 'bg-[#F25D27]' : 'bg-zinc-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              waiter.active ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                          <span className={`text-sm font-bold ${waiter.active ? 'text-emerald-600' : 'text-zinc-400'}`}>
                            {waiter.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/admin/waiters/edit/${waiter.id}`} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDeleteClick(waiter.id)} className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {waiterToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-2">Excluir Garçom</h3>
              <p className="text-zinc-500 font-medium">
                Tem certeza que deseja excluir este garçom? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button 
                onClick={cancelDelete}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm shadow-rose-500/20 transition-colors"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
