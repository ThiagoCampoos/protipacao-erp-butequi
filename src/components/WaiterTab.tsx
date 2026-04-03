import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ShoppingCart, Plus, Minus, Search } from "lucide-react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Bebidas");
  const [cart, setCart] = useState<{product: Product, quantity: number, notes: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/tabs/${id}`).then(res => res.json()),
      fetch("/api/products").then(res => res.json())
    ]).then(([tabData, productsData]) => {
      setTab(tabData);
      setProducts(productsData);
      setLoading(false);
    });
  }, [id]);

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
    // Refresh tab data
    const res = await fetch(`/api/tabs/${id}`);
    const updatedTab = await res.json();
    setTab(updatedTab);
  };

  if (loading || !tab) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Carregando...</div>;

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = products.filter(p => p.category === category);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col pb-24">
      <header className="bg-zinc-900 p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to={`/waiter/table/${tab.table_id}`} className="p-2 -ml-2 hover:bg-zinc-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">{tab.client_name}</h1>
              <p className="text-sm text-zinc-400">Mesa {tab.table_id} • Comanda #{tab.id}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                category === cat 
                  ? "bg-emerald-600 text-white" 
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid gap-4">
          {filteredProducts.map(product => {
            const cartItem = cart.find(c => c.product.id === product.id);
            return (
              <div key={product.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{product.description}</p>
                  <p className="text-emerald-400 font-medium">R$ {product.price.toFixed(2)}</p>
                </div>
                
                {cartItem ? (
                  <div className="flex items-center gap-3 bg-zinc-800 rounded-full p-1">
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-zinc-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-medium">{cartItem.quantity}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-emerald-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-xl transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-400">Observações do Pedido Atual</h2>
            {cart.map(item => (
              <div key={item.product.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <p className="font-medium mb-2">{item.product.name} (x{item.quantity})</p>
                <input 
                  type="text"
                  placeholder="Adicionar observações (ex: sem gelo, bem passado)..."
                  value={item.notes}
                  onChange={(e) => updateNotes(item.product.id, e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-zinc-800">
          <button 
            onClick={submitOrder}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-between px-6 shadow-lg shadow-emerald-900/20"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Enviar Pedido</span>
            </div>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
