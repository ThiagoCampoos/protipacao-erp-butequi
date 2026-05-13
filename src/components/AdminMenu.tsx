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

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  active: boolean;
}

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All Items", "Food", "Drinks", "Desserts", "Specials"];

  const filteredItems = activeCategory === "All Items" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const toggleItemStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus })
      });
      
      if (res.ok) {
        setMenuItems(items => items.map(item => 
          item.id === id ? { ...item, active: !currentStatus } : item
        ));
      }
    } catch (error) {
      console.error("Error toggling item status:", error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (itemToDelete === null) return;
    try {
      const res = await fetch(`/api/menu/${itemToDelete}`, {
        method: "DELETE"
      });
      
      if (res.ok) {
        setMenuItems(items => items.filter(item => item.id !== itemToDelete));
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  if (loading) return <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Menu Management</h2>
              <p className="text-zinc-500 font-medium">Register and manage your restaurant's products</p>
            </div>
            
            <Link to="/admin/menu/new" className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-sm shadow-orange-500/20">
              <Plus className="w-5 h-5" />
              Add New Product
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search menu items..." 
                className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-xl py-2.5 pl-11 pr-4 text-zinc-900 focus:ring-2 focus:ring-[#F25D27] focus:border-[#F25D27] outline-none transition-all font-medium"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    activeCategory === category 
                      ? "bg-[#F25D27] text-white shadow-sm shadow-orange-500/20" 
                      : "bg-[#FFF5F0] text-[#F25D27] hover:bg-orange-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Table */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider w-24">Image</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400">
                              <Utensils className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-zinc-900 text-base mb-0.5">{item.name}</div>
                        <div className="text-xs text-zinc-400 font-medium">ID: #DOC-{item.id.toString().padStart(3, '0')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          item.category === 'Food' ? 'bg-amber-100 text-amber-700' :
                          item.category === 'Drinks' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'Desserts' ? 'bg-pink-100 text-pink-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-base font-black text-[#F25D27]">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => toggleItemStatus(item.id, item.active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                              item.active ? 'bg-[#F25D27]' : 'bg-zinc-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.active ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                          <span className={`text-sm font-bold ${item.active ? 'text-emerald-600' : 'text-zinc-400'}`}>
                            {item.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/admin/menu/edit/${item.id}`} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDeleteClick(item.id)} className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50 rounded-b-2xl">
              <span className="text-sm text-zinc-500 font-medium">Showing 1 to {filteredItems.length} of {menuItems.length} items</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Previous</button>
                <button className="w-8 h-8 bg-[#F25D27] text-white rounded-lg text-sm font-bold flex items-center justify-center shadow-sm shadow-orange-500/20">1</button>
                <button className="w-8 h-8 bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg text-sm font-bold flex items-center justify-center transition-colors">2</button>
                <button className="w-8 h-8 bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg text-sm font-bold flex items-center justify-center transition-colors">3</button>
                <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Next</button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-2">Excluir Produto</h3>
              <p className="text-zinc-500 font-medium">
                Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
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
