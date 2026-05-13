import AdminSidebar from "./AdminSidebar";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
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
  Info,
  Users
} from "lucide-react";

export default function AdminWaiterSetup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [commissionRate, setCommissionRate] = useState(10);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (isEditing) {
      fetch("/api/waiters")
        .then(res => res.json())
        .then(data => {
          const waiter = data.find((w: any) => w.id === parseInt(id));
          if (waiter) {
            setName(waiter.name);
            setCpf(waiter.cpf);
            setPhone(waiter.phone);
            setEmail(waiter.email);
            setUsername(waiter.username);
            setPassword(waiter.password);
            setCommissionRate(waiter.commission_rate);
            setActive(waiter.active);
          }
        });
    }
  }, [id, isEditing]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !username || !password) {
      alert("Por favor, preencha nome, usuário e senha.");
      return;
    }

    const waiterData = {
      name,
      cpf,
      phone,
      email,
      username,
      password,
      commission_rate: commissionRate,
      active
    };

    try {
      const url = isEditing ? `/api/waiters/${id}` : "/api/waiters";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waiterData)
      });

      if (res.ok) {
        navigate("/admin/settings"); // Or wherever the waiters list is linked from
      } else {
        alert("Erro ao salvar garçom.");
      }
    } catch (error) {
      console.error("Error saving waiter:", error);
      alert("Erro ao salvar garçom.");
    }
  };
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <UserPlus className="w-6 h-6 text-[#F25D27]" />
            <h2 className="text-xl font-bold tracking-tight">{isEditing ? "Editar Garçom" : "Cadastro de Garçom"}</h2>
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
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight">{isEditing ? "Editar Colaborador" : "Novo Colaborador"}</h3>
            <p className="text-zinc-500 mt-1 font-medium">Preencha as informações abaixo para registrar um garçom na plataforma.</p>
          </div>

          <form onSubmit={handleSave} className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 space-y-8">
            {/* Section: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-zinc-700 mb-2">Nome Completo <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: João da Silva Santos" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">CPF</label>
                <input 
                  type="text" 
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  placeholder="000.000.000-00" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">E-mail</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="joao.silva@email.com" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>

              <div className="col-span-full border-t border-zinc-100 pt-6 mt-2">
                <h4 className="text-lg font-bold text-zinc-900 mb-4">Acesso ao Aplicativo (Mobile)</h4>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Usuário <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="joao.silva" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Senha <span className="text-rose-500">*</span></label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="****" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                />
              </div>

              <div className="col-span-full border-t border-zinc-100 pt-6 mt-2">
                <h4 className="text-lg font-bold text-zinc-900 mb-4">Comissionamento</h4>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Taxa do Garçom (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={commissionRate}
                    onChange={e => setCommissionRate(Number(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-[#F25D27] focus:ring-2 focus:ring-[#F25D27] outline-none transition-all font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Section: Settings & Status */}
            <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-zinc-700">Status do Colaborador:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25D27]"></div>
                  <span className="ml-3 text-sm font-bold text-zinc-900">{active ? 'Ativo' : 'Inativo'}</span>
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/admin/waiters" className="px-6 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-bold hover:bg-zinc-50 transition-colors">
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
