import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle, Pencil, Search } from "lucide-react";
import { TabSlider } from "./TabSlider";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface Tab {
  id: number;
  table_id: number;
  client_name: string;
  items: any[];
}

export default function WaiterTab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab | null>(null);
  const [tableTabs, setTableTabs] = useState<Tab[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Bebidas");
  const [cart, setCart] = useState<{product: Product, quantity: number, notes: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/tabs/${id}`).then(res => res.json()),
      fetch("/api/products").then(res => res.json())
    ]).then(([tabData, productsData]) => {
      setTab(tabData);
      setProducts(productsData);
      
      // Also fetch siblings tabs for the same table
      if (tabData && tabData.table_id) {
         fetch(`/api/tables/${tabData.table_id}/tabs`).then(res => res.json()).then(tabs => {
            setTableTabs(tabs);
            setLoading(false);
         });
      } else {
        setLoading(false);
      }
    });
  }, [id]);

  const showToast = (message: string) => {
     setToastMessage(message);
     setTimeout(() => setToastMessage(null), 3000);
  }

  const handleSelectTab = (newTabId: number) => {
    if (newTabId === Number(id)) return;
    const selectedTab = tableTabs.find(t => t.id === newTabId);
    if (selectedTab) {
      showToast(`Lançando pedidos agora na comanda de: ${selectedTab.client_name === 'Comanda Principal' ? 'Líder da Mesa' : selectedTab.client_name}`);
    }
    navigate(`/waiter/tab/${newTabId}`);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1, notes: "" }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const updateNotes = (productId: number, notes: string) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, notes } : item));
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    for (const item of cart) {
      await fetch(`/api/tabs/${id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: item.product.id,
          quantity: item.quantity,
          unique_notes: item.notes
        })
      });
    }
    setCart([]);
    setIsSubmitting(false);
    setIsReviewing(false);
    // Returning to summary screen instead of staying here
    if (tab) {
       navigate(`/waiter/table/${tab.table_id}`);
    }
  };

  if (loading || !tab) return <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center font-sans tracking-tight">Carregando...</div>;

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = products.filter(p => p.category === category);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (isReviewing) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans pb-40">
        <header className="sticky top-0 z-20 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-zinc-100">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsReviewing(false)} className="text-[#131D2E] p-2 -ml-2 rounded-full hover:bg-zinc-100 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-sm font-bold tracking-tight text-[#131D2E] uppercase">Check-in do Pedido</h1>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Mesa {tab.table_id}</span>
              <span className="text-[12px] font-bold text-[#F20505] truncate max-w-[100px]">{tab.client_name}</span>
            </div>
          </div>
          
          {tableTabs.length > 0 && (
            <div className="px-4 pb-3">
               <TabSlider tabs={tableTabs} activeTabId={Number(id)} onSelectTab={handleSelectTab} />
            </div>
          )}
        </header>

        <main className="flex-1 p-4">
          <h2 className="text-[11px] font-black tracking-widest uppercase text-zinc-500 ml-1 mb-3">Revisar e Adicionar Observações</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-200" />
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h3 className="font-bold text-[15px] text-[#131D2E] leading-tight">{item.quantity}x {item.product.name}</h3>
                    <p className="font-mono tracking-tighter text-[13px] text-zinc-500 mt-1">R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-full p-1 shadow-inner">
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" strokeWidth={3} />
                    </button>
                    <span className="w-3 text-center font-black text-[#131D2E] text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item.product)}
                      className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-[#F20505] hover:bg-red-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                </div>
                <div className="relative pl-2">
                   <Pencil className="w-4 h-4 text-zinc-400 absolute left-5 top-1/2 -translate-y-1/2" />
                   <input 
                     type="text"
                     placeholder="Ex: sem gelo, bem passado..."
                     value={item.notes}
                     onChange={(e) => updateNotes(item.product.id, e.target.value)}
                     className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-[14px] text-[#131D2E] focus:ring-2 focus:ring-[#FF0000]/20 focus:border-[#FF0000] outline-none transition-all placeholder-zinc-400"
                   />
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white border-t border-zinc-100 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)] z-30">
          <div className="flex justify-between items-center mb-4 px-2">
             <span className="font-bold text-zinc-500 text-[13px] uppercase tracking-wider">Total do Pedido</span>
             <span className="font-black text-[20px] tracking-tight">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <button 
            disabled={isSubmitting || cart.length === 0}
            onClick={submitOrder}
            className="w-full bg-[#FF0000] active:bg-[#e00000] disabled:bg-zinc-300 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
               <span className="text-[16px] tracking-tight text-white">ENVIANDO...</span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-[16px] tracking-tight text-white">CONFIRMAR E ENVIAR</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans pb-40">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
           <div className="bg-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-600/20 p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-100" />
              <p className="font-bold text-sm leading-tight">{toastMessage}</p>
           </div>
        </div>
      )}

      <header className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between p-4 px-5">
          <Link to={`/waiter/table/${tab.table_id}`} className="text-[#FF0000] p-1 -ml-1 transition-colors">
            <ArrowLeft className="w-7 h-7" strokeWidth={2.5}/>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-[20px] font-black tracking-tighter text-[#131D2E] uppercase">TABLE {tab.table_id}</h1>
          </div>
          <button className="text-[#131D2E] p-1 -mr-1">
             <Search className="w-6 h-6" strokeWidth={2.5}/>
          </button>
        </div>
        
        {tableTabs.length > 0 && (
          <div className="px-4 pb-2">
             <TabSlider tabs={tableTabs} activeTabId={Number(id)} onSelectTab={handleSelectTab} />
          </div>
        )}
        
        <div className="flex gap-6 overflow-x-auto px-5 border-y border-zinc-100 scrollbar-hide bg-white">
          {categories.map(cat => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-4 whitespace-nowrap font-black text-[11px] uppercase tracking-widest transition-all relative ${
                  isActive 
                    ? "text-[#FF0000]" 
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {cat}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF0000]" />
                )}
              </button>
            )
          })}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-white pb-32">
        <div>
          {filteredProducts.map((product, index) => {
            const cartItem = cart.find(c => c.product.id === product.id);
            
            // Dummy image logic based on name to simulate UI
            let imageUrl = "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop"; // drink
            if (product.name.toLowerCase().includes("lula") || product.name.toLowerCase().includes("porção")) {
               imageUrl = "https://images.unsplash.com/photo-1599487405256-11f8b46eb132?w=200&h=200&fit=crop"; // food
            } else if (product.name.toLowerCase().includes("stella") || product.name.toLowerCase().includes("cerveja")) {
               imageUrl = "https://images.unsplash.com/photo-1628269785233-a38e82ef4d8b?w=200&h=200&fit=crop"; // beer
            }

            return (
              <div 
                key={product.id} 
                className={`p-4 flex gap-4 ${index !== filteredProducts.length - 1 ? 'border-b border-zinc-100' : ''} ${cartItem ? 'bg-amber-50/30' : 'bg-white'}`}
              >
                {/* Image */}
                <div className="w-[88px] h-[88px] rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 shadow-sm border border-zinc-200/50">
                  <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-bold text-[#131D2E] text-[15px] uppercase tracking-tight leading-tight mb-1">{product.name}</h3>
                    <p className="font-black text-[#FF0000] text-[13px] tracking-tight">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-end mt-2">
                    {cartItem ? (
                      <div className="flex items-center shadow-sm">
                        <button 
                          onClick={() => removeFromCart(product.id)}
                          className="w-10 h-10 bg-[#FFD700] hover:bg-[#FACC15] flex items-center justify-center text-[#131D2E] transition-colors"
                        >
                          <Minus className="w-5 h-5" strokeWidth={3} />
                        </button>
                        <div className="w-10 h-10 bg-[#FFD700] flex items-center justify-center font-black text-[#131D2E] text-[16px] border-x border-[#FACC15]/20">
                          {cartItem.quantity}
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-10 h-10 bg-[#FFD700] hover:bg-[#FACC15] flex items-center justify-center text-[#131D2E] transition-colors"
                        >
                          <Plus className="w-5 h-5" strokeWidth={3} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-12 h-10 bg-white border-2 border-[#FF0000] flex items-center justify-center text-[#FF0000] transition-colors active:bg-red-50"
                      >
                        <Plus className="w-6 h-6" strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white z-30">
          <button 
            onClick={() => setIsReviewing(true)}
            className="w-full bg-[#FF0000] active:bg-[#e00000] text-white py-4 rounded-lg font-bold transition-all shadow-lg shadow-red-500/25 flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-black uppercase tracking-widest">VIEW CART ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
            </div>
            <span className="text-[14px] font-black tracking-widest bg-white/20 px-3 py-1 rounded">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
