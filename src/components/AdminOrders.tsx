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
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  UserPlus,
  CheckCircle2,
  Users
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  active: boolean;
}

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  type: string;
  balance: number;
}

export default function AdminOrders() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fiado Modal State
  const [isFiadoModalOpen, setIsFiadoModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerType, setNewCustomerType] = useState("employee");

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => setMenuItems(data.filter((item: MenuItem) => item.active)));
      
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));
  };

  const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product_id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product_id === productId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (paymentMethod: string) => {
    if (cart.length === 0) return;

    if (paymentMethod === "Fiado") {
      setIsFiadoModalOpen(true);
      return;
    }

    processOrder(paymentMethod);
  };

  const processOrder = async (paymentMethod: string, customerId?: number) => {
    try {
      const res = await fetch("/api/orders/counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          payment_method: paymentMethod,
          customer_id: customerId
        })
      });

      if (res.ok) {
        setCart([]);
        setIsFiadoModalOpen(false);
        setSelectedCustomerId(null);
        setIsNewCustomer(false);
        setNewCustomerName("");
        setNewCustomerPhone("");
        alert("Pedido finalizado com sucesso!");
      } else {
        alert("Erro ao processar pedido.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Erro ao processar pedido.");
    }
  };

  const handleFiadoConfirm = async () => {
    let customerId = selectedCustomerId;

    if (isNewCustomer) {
      if (!newCustomerName) {
        alert("Nome é obrigatório para novo cadastro.");
        return;
      }
      try {
        const res = await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCustomerName, phone: newCustomerPhone, type: newCustomerType })
        });
        if (res.ok) {
          const newCustomer = await res.json();
          customerId = newCustomer.id;
          fetchCustomers(); // Refresh list
        } else {
          alert("Erro ao cadastrar cliente.");
          return;
        }
      } catch (error) {
        console.error("Error creating customer:", error);
        return;
      }
    }

    if (!customerId) {
      alert("Selecione um cliente ou cadastre um novo.");
      return;
    }

    processOrder("Fiado", customerId);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex h-screen overflow-hidden">
        
        {/* Left Side: Menu Selection */}
        <div className="flex-1 flex flex-col h-full border-r border-zinc-200 bg-[#F8F9FA]">
          <div className="p-6 bg-white border-b border-zinc-200">
            <h2 className="text-2xl font-black text-zinc-900 mb-4">Balcão</h2>
            
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Buscar produto..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-xl py-3 pl-11 pr-4 text-zinc-900 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-zinc-900 text-white' 
                      : 'bg-[#F8F9FA] text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-white p-4 rounded-2xl border border-zinc-200 hover:border-[#F25D27] hover:shadow-md transition-all text-left flex flex-col h-32"
                >
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">{item.category}</span>
                  <span className="font-bold text-zinc-900 leading-tight flex-1">{item.name}</span>
                  <span className="text-[#F25D27] font-black mt-2">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Cart & Checkout */}
        <div className="w-96 bg-white flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50/50">
            <h3 className="text-lg font-black text-zinc-900">Pedido Atual</h3>
            <p className="text-sm text-zinc-500 font-medium">Itens selecionados</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-3">
                <ClipboardList className="w-12 h-12 opacity-20" />
                <p className="font-medium text-sm">Nenhum item no pedido</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product_id} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-zinc-900 truncate">{item.name}</p>
                    <p className="text-sm text-zinc-500 font-medium">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-100 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.product_id, -1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-rose-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product_id, 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-emerald-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-zinc-200 bg-zinc-50/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-zinc-500 font-bold">Total</span>
              <span className="text-3xl font-black text-zinc-900">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleCheckout("Dinheiro")}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-zinc-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 text-zinc-600 hover:text-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Banknote className="w-6 h-6" />
                <span className="text-xs font-bold">Dinheiro</span>
              </button>
              <button 
                onClick={() => handleCheckout("Cartão")}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-zinc-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-zinc-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs font-bold">Cartão</span>
              </button>
              <button 
                onClick={() => handleCheckout("PIX")}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 text-zinc-600 hover:text-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs font-bold">PIX</span>
              </button>
              <button 
                onClick={() => handleCheckout("Fiado")}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-zinc-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 text-zinc-600 hover:text-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-6 h-6" />
                <span className="text-xs font-bold">Fiado</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Fiado Modal */}
      {isFiadoModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-xl font-black text-zinc-900">Lançar Fiado</h3>
              <p className="text-sm text-zinc-500 font-medium mt-1">Selecione ou cadastre a pessoa</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Toggle New/Existing */}
              <div className="flex bg-zinc-100 p-1 rounded-xl">
                <button 
                  onClick={() => setIsNewCustomer(false)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!isNewCustomer ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  Selecionar Existente
                </button>
                <button 
                  onClick={() => setIsNewCustomer(true)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${isNewCustomer ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  Novo Cadastro
                </button>
              </div>

              {isNewCustomer ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      value={newCustomerName}
                      onChange={e => setNewCustomerName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all"
                      placeholder="Ex: Carlos Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Telefone (Opcional)</label>
                    <input 
                      type="text" 
                      value={newCustomerPhone}
                      onChange={e => setNewCustomerPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Tipo</label>
                    <select 
                      value={newCustomerType}
                      onChange={e => setNewCustomerType(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all appearance-none"
                    >
                      <option value="employee">Funcionário</option>
                      <option value="customer">Cliente Frequente</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Selecione a Pessoa</label>
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                    {customers.map(customer => (
                      <button
                        key={customer.id}
                        onClick={() => setSelectedCustomerId(customer.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                          selectedCustomerId === customer.id 
                            ? 'border-[#F25D27] bg-[#FFF5F0]' 
                            : 'border-zinc-200 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <div className="text-left">
                          <p className="font-bold text-zinc-900">{customer.name}</p>
                          <p className="text-xs text-zinc-500 font-medium capitalize">{customer.type === 'employee' ? 'Funcionário' : 'Cliente'}</p>
                        </div>
                        {selectedCustomerId === customer.id && (
                          <CheckCircle2 className="w-5 h-5 text-[#F25D27]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsFiadoModalOpen(false)}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleFiadoConfirm}
                className="px-5 py-2.5 bg-[#F25D27] hover:bg-[#E04D17] text-white font-bold rounded-xl shadow-sm shadow-orange-500/20 transition-colors"
              >
                Confirmar Fiado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
