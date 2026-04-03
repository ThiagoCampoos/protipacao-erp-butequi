import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Printer, 
  Shield, 
  HeartHandshake,
  Banknote,
  CreditCard,
  QrCode,
  LayoutDashboard,
  LayoutGrid,
  ClipboardList,
  BookOpen,
  BarChart2,
  Settings,
  Utensils,
  LogOut
} from "lucide-react";

interface Tab {
  id: number;
  table_id: number;
  table_number: number;
  client_name: string;
  client_phone: string;
  status: string;
  opened_at: string;
  dynamic_waiter_tax_percent: number;
  items: any[];
}

export default function AdminCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab | null>(null);
  const [loading, setLoading] = useState(true);
  const [includeTax, setIncludeTax] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/tabs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTab(data);
        setIncludeTax(data.dynamic_waiter_tax_percent > 0);
        setLoading(false);
      });
  }, [id]);

  const handleTaxToggle = async () => {
    const newTax = includeTax ? 0 : 10;
    setIncludeTax(!includeTax);
    await fetch(`/api/tabs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dynamic_waiter_tax_percent: newTax })
    });
  };

  const handleCheckout = async () => {
    if (!selectedPayment) {
      alert("Por favor, selecione um método de pagamento.");
      return;
    }
    setIsClosing(true);
    await fetch(`/api/tabs/${id}/close`, {
      method: "POST"
    });
    navigate("/admin/tables");
  };

  if (loading || !tab) return <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center">Carregando...</div>;

  const subtotal = tab.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const taxAmount = includeTax ? (subtotal * 0.1) : 0;
  const grandTotal = subtotal + taxAmount;

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
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Painel Administrativo</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Visão Geral</span>
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-3 py-2.5 bg-[#FFF5F0] text-[#F25D27] rounded-lg transition-colors">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium">Gerenciamento de Mesas</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <ClipboardList className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Pedidos</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Cardápio</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <BarChart2 className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Relatórios</span>
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
            <Printer className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
            <span className="text-sm font-medium">Impressoras</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-zinc-100">
            <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors group">
              <Settings className="w-5 h-5 text-zinc-400 group-hover:text-[#F25D27]" />
              <span className="text-sm font-medium">Configurações</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 bg-zinc-50 m-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              R
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Ricardo Silva</p>
              <p className="text-[10px] text-zinc-500">Gerente de Turno</p>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
              <span>Gerenciamento de Mesas</span>
              <span className="text-zinc-300">›</span>
              <span className="text-[#F25D27] font-medium">Pagamento</span>
            </nav>
            <h2 className="text-3xl font-bold tracking-tight">Checkout: {tab.client_name}</h2>
          </div>
          <Link to="/admin/tables" className="flex items-center gap-2 px-4 py-2 text-zinc-600 hover:bg-zinc-200 rounded-lg transition-colors font-medium border border-zinc-300">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Salão
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Details Section */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            <section className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Resumo do Pedido</h3>
                <span className="px-2.5 py-1 bg-[#FFF5F0] text-[#F25D27] text-xs font-bold rounded-full uppercase tracking-wider">Aberto</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-3">Item</th>
                      <th className="px-6 py-3 text-center">Quantidade</th>
                      <th className="px-6 py-3 text-right">Preço Unit.</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {tab.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 font-medium">
                          {item.product.name}
                          {item.unique_notes && (
                            <span className="block text-xs text-zinc-500 font-normal mt-0.5">Obs: {item.unique_notes}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">{item.quantity}</td>
                        <td className="px-6 py-4 text-right">R$ {item.unit_price.toFixed(2).replace('.', ',')}</td>
                        <td className="px-6 py-4 text-right">R$ {(item.quantity * item.unit_price).toFixed(2).replace('.', ',')}</td>
                      </tr>
                    ))}
                    {tab.items.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">Nenhum item na comanda.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="bg-[#FFF5F0] border border-orange-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F25D27] rounded-lg text-white">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Taxa de Serviço (10%)</p>
                    <p className="text-xs text-zinc-500">Gratificação opcional para os atendentes</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={includeTax}
                    onChange={handleTaxToggle}
                  />
                  <div className={`w-11 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${includeTax ? 'bg-[#F25D27] after:translate-x-full after:border-white' : 'bg-zinc-200'}`}></div>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Sidebar Section */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            {/* Payment Methods */}
            <section className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
              <h3 className="font-bold text-lg mb-4">Método de Pagamento</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedPayment('dinheiro')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedPayment === 'dinheiro' ? 'border-[#F25D27] bg-[#FFF5F0] text-[#F25D27]' : 'border-zinc-100 hover:border-orange-200 text-zinc-600'}`}
                >
                  <Banknote className="w-8 h-8" />
                  <span className="text-sm font-semibold">Dinheiro</span>
                </button>
                <button 
                  onClick={() => setSelectedPayment('credito')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedPayment === 'credito' ? 'border-[#F25D27] bg-[#FFF5F0] text-[#F25D27]' : 'border-zinc-100 hover:border-orange-200 text-zinc-600'}`}
                >
                  <CreditCard className="w-8 h-8" />
                  <span className="text-sm font-semibold">Crédito</span>
                </button>
                <button 
                  onClick={() => setSelectedPayment('debito')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedPayment === 'debito' ? 'border-[#F25D27] bg-[#FFF5F0] text-[#F25D27]' : 'border-zinc-100 hover:border-orange-200 text-zinc-600'}`}
                >
                  <CreditCard className="w-8 h-8" />
                  <span className="text-sm font-semibold">Débito</span>
                </button>
                <button 
                  onClick={() => setSelectedPayment('pix')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedPayment === 'pix' ? 'border-[#F25D27] bg-[#FFF5F0] text-[#F25D27]' : 'border-zinc-100 hover:border-orange-200 text-zinc-600'}`}
                >
                  <QrCode className="w-8 h-8" />
                  <span className="text-sm font-semibold">PIX</span>
                </button>
              </div>
            </section>

            {/* Billing Summary */}
            <section className="bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {includeTax && (
                  <div className="flex justify-between text-zinc-600">
                    <span>Taxa de Serviço (10%)</span>
                    <span className="font-medium">R$ {taxAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-zinc-100 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total a Pagar</p>
                    <p className="text-4xl font-extrabold text-[#F25D27]">R$ {grandTotal.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button 
                    onClick={handleCheckout}
                    disabled={isClosing || tab.items.length === 0}
                    className="w-full bg-[#F25D27] hover:bg-[#E04D17] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {isClosing ? "Processando..." : "Finalizar Pagamento"}
                  </button>
                  <button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Printer className="w-5 h-5" />
                    Imprimir Prévia
                  </button>
                </div>
              </div>
              <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                  <Shield className="w-3 h-3" />
                  Transação criptografada e segura
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
