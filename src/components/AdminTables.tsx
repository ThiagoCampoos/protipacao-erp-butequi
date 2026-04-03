import { useState, useEffect } from "react";
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
  Filter,
  Plus,
  Users,
  Clock,
  Banknote,
  PieChart,
  TrendingUp,
  Timer,
  X,
  ChevronRight,
  Search,
  Minus,
  Trash2,
  CreditCard,
  Wallet,
  AlertCircle,
  Check
} from "lucide-react";

interface Table {
  id: number;
  table_number: number;
  status: string;
  capacity?: number;
}

interface ActiveTab {
  id: number;
  table_id: number;
  status: string;
  opened_at: string;
  subtotal: number;
  client_name?: string;
}

interface TabItem {
  id: number;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  unit_price: number;
  unique_notes: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface OrderItemDraft {
  tempId: string;
  product: Product;
  quantity: number;
  unique_notes: string;
}

export default function AdminTables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [activeTabs, setActiveTabs] = useState<ActiveTab[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("4");

  const [isTableDetailsModalOpen, setIsTableDetailsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedTableTabs, setSelectedTableTabs] = useState<ActiveTab[]>([]);
  const [selectedTabItems, setSelectedTabItems] = useState<TabItem[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsView, setDetailsView] = useState<'main' | 'subtabs'>('main');

  const [isAddSubTabModalOpen, setIsAddSubTabModalOpen] = useState(false);
  const [newSubTabName, setNewSubTabName] = useState("");

  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItemDraft[]>([]);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSelectedTabs, setCheckoutSelectedTabs] = useState<number[]>([]);
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState("credit");
  const [checkoutAmount, setCheckoutAmount] = useState("");
  const [checkoutWarning, setCheckoutWarning] = useState("");

  const fetchData = () => {
    Promise.all([
      fetch("/api/tables").then(res => res.json()),
      fetch("/api/active-tabs").then(res => res.json())
    ]).then(([tablesData, tabsData]) => {
      const tablesWithCapacity = tablesData.map((t: Table) => ({
        ...t,
        capacity: t.capacity || 4
      }));
      setTables(tablesWithCapacity);
      setActiveTabs(tabsData);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
    fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleAddTable = async () => {
    if (!newTableNumber) return;
    try {
      await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_number: parseInt(newTableNumber),
          capacity: parseInt(newTableCapacity)
        })
      });
      setIsAddTableModalOpen(false);
      setNewTableNumber("");
      setNewTableCapacity("4");
      fetchData();
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  const handleOpenTable = async (tableId: number) => {
    try {
      await fetch("/api/tabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_id: tableId,
          client_name: "Comanda Principal"
        })
      });
      fetchData();
    } catch (error) {
      console.error("Error opening table:", error);
    }
  };

  const handleViewDetails = async (table: Table) => {
    setSelectedTable(table);
    setIsTableDetailsModalOpen(true);
    setDetailsLoading(true);
    setDetailsView('main');
    
    try {
      // Fetch tabs for this table
      const tabsRes = await fetch(`/api/tables/${table.id}/tabs`);
      const tabsData = await tabsRes.json();
      setSelectedTableTabs(tabsData);

      // If there's a main tab, fetch its items
      if (tabsData.length > 0) {
        const mainTab = tabsData[0];
        const tabDetailsRes = await fetch(`/api/tabs/${mainTab.id}`);
        const tabDetailsData = await tabDetailsRes.json();
        setSelectedTabItems(tabDetailsData.items || []);
      } else {
        setSelectedTabItems([]);
      }
    } catch (error) {
      console.error("Error fetching table details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAddSubTab = async () => {
    if (!selectedTable || !newSubTabName) return;
    try {
      await fetch("/api/tabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_id: selectedTable.id,
          client_name: newSubTabName
        })
      });
      setIsAddSubTabModalOpen(false);
      setNewSubTabName("");
      // Refresh details
      handleViewDetails(selectedTable);
      fetchData();
    } catch (error) {
      console.error("Error adding sub tab:", error);
    }
  };

  const handleAddOrder = async () => {
    if (!selectedTable || currentOrderItems.length === 0) return;
    
    const mainTab = selectedTableTabs[0];
    if (!mainTab) return;

    try {
      await Promise.all(currentOrderItems.map(item => 
        fetch(`/api/tabs/${mainTab.id}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: item.product.id,
            quantity: item.quantity,
            unique_notes: item.unique_notes
          })
        })
      ));
      
      setIsAddOrderModalOpen(false);
      setCurrentOrderItems([]);
      setOrderSearchQuery("");
      
      // Refresh details
      handleViewDetails(selectedTable);
      fetchData();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCurrentOrderItems(prev => [
      ...prev, 
      { tempId: Math.random().toString(), product, quantity: 1, unique_notes: "" }
    ]);
  };

  const updateCartItem = (tempId: string, field: 'quantity' | 'unique_notes', value: any) => {
    setCurrentOrderItems(prev => prev.map(item => 
      item.tempId === tempId ? { ...item, [field]: value } : item
    ));
  };

  const removeCartItem = (tempId: string) => {
    setCurrentOrderItems(prev => prev.filter(item => item.tempId !== tempId));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  const handleCloseTable = async (tabId: number) => {
    try {
      await fetch(`/api/tabs/${tabId}/close`, { method: "POST" });
      setIsTableDetailsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error closing table:", error);
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutModalOpen(true);
    setCheckoutSelectedTabs(selectedTableTabs.map(t => t.id));
    setCheckoutWarning("");
    setCheckoutAmount("");
  };

  const handleConfirmCheckout = async () => {
    if (checkoutSelectedTabs.length === 0) return;
    
    try {
      // Close all selected tabs
      await Promise.all(checkoutSelectedTabs.map(tabId => 
        fetch(`/api/tabs/${tabId}/close`, { method: "POST" })
      ));
      
      setIsCheckoutModalOpen(false);
      
      // If we didn't close all tabs, we should just refresh the details
      if (checkoutSelectedTabs.length < selectedTableTabs.length) {
        if (selectedTable) {
          handleViewDetails(selectedTable);
        }
      } else {
        setIsTableDetailsModalOpen(false);
      }
      
      fetchData();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const toggleCheckoutTab = (tabId: number) => {
    setCheckoutSelectedTabs(prev => {
      const newSelection = prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId];
      
      // Check for warning: if main tab is selected but not all tabs are selected
      const mainTabId = selectedTableTabs[0]?.id;
      if (newSelection.includes(mainTabId) && newSelection.length < selectedTableTabs.length) {
        setCheckoutWarning("Atenção: A mesa principal será fechada, mas as submesas continuarão abertas.");
      } else {
        setCheckoutWarning("");
      }
      
      return newSelection;
    });
  };

  const formatTimeSince = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateAverageTime = () => {
    if (activeTabs.length === 0) return "00:00:00";
    
    const now = new Date().getTime();
    const totalDuration = activeTabs.reduce((sum, tab) => {
      const openedAt = new Date(tab.opened_at).getTime();
      return sum + (now - openedAt);
    }, 0);
    
    const avgDurationMs = totalDuration / activeTabs.length;
    
    const hours = Math.floor(avgDurationMs / (1000 * 60 * 60));
    const minutes = Math.floor((avgDurationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((avgDurationMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTableDetails = (tableId: number) => {
    const tab = activeTabs.find(t => t.table_id === tableId);
    return tab;
  };

  if (loading) return <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center">Carregando...</div>;

  const occupiedTablesCount = tables.filter(t => t.status === "Ocupada").length;
  const totalTablesCount = tables.length;
  const occupancyRate = totalTablesCount > 0 ? Math.round((occupiedTablesCount / totalTablesCount) * 100) : 0;
  const totalRevenue = activeTabs.reduce((sum, tab) => sum + tab.subtotal, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Painel Administrativo</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Visão Geral
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-4 py-3 bg-[#F25D27] text-white rounded-xl font-medium shadow-sm shadow-orange-500/20">
            <LayoutGrid className="w-5 h-5" />
            Gerenciamento de Mesas
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <ClipboardList className="w-5 h-5" />
            Pedidos
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5" />
            Cardápio
          </Link>
          <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <BarChart2 className="w-5 h-5" />
            Relatórios
          </Link>
          <Link to="/admin/printers" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <Printer className="w-5 h-5" />
            Impressoras
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3 border border-zinc-100">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Admin Carlos</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Gerente</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Gerenciamento de Mesas</h2>
              <p className="text-zinc-500 font-medium">Monitore o status e a ocupação em tempo real.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsAddTableModalOpen(true)}
                className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-sm shadow-orange-500/20 hidden"
              >
                <Plus className="w-4 h-4" />
                Adicionar Mesa
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 hidden">
            <button className="bg-[#F25D27] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm">
              Todas as Seções
            </button>
            <button className="bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 px-5 py-2 rounded-full text-sm font-bold transition-colors">
              Térreo
            </button>
            <button className="bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 px-5 py-2 rounded-full text-sm font-bold transition-colors">
              Primeiro Andar
            </button>
            <button className="bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 px-5 py-2 rounded-full text-sm font-bold transition-colors">
              Varanda
            </button>
            <button className="bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 px-5 py-2 rounded-full text-sm font-bold transition-colors">
              VIP
            </button>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {tables.map(table => {
              const tabDetails = getTableDetails(table.id);
              const isOccupied = table.status === "Ocupada";
              const isClosing = table.status === "Fechando"; // Assuming we might have this status
              const isFree = table.status === "Livre";

              let borderColor = "border-zinc-200";
              let topBorderColor = "bg-zinc-200";
              let badgeBg = "bg-zinc-100";
              let badgeText = "text-zinc-600";
              let badgeLabel = table.status.toUpperCase();
              let actionBtnClass = "bg-zinc-100 text-zinc-900 hover:bg-zinc-200";
              let actionBtnText = "Ver Detalhes";
              let actionBtnClick = () => handleViewDetails(table);

              if (isOccupied) {
                borderColor = "border-zinc-200";
                topBorderColor = "bg-[#F25D27]";
                badgeBg = "bg-orange-50";
                badgeText = "text-[#F25D27]";
                actionBtnClass = "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 font-bold";
              } else if (isFree) {
                borderColor = "border-zinc-200";
                topBorderColor = "bg-emerald-400";
                badgeBg = "bg-emerald-50";
                badgeText = "text-emerald-600";
                actionBtnClass = "bg-[#F25D27] text-white hover:bg-[#E04D17] font-bold shadow-sm shadow-orange-500/20";
                actionBtnText = "Abrir Mesa";
                actionBtnClick = () => handleOpenTable(table.id);
              } else if (isClosing) {
                borderColor = "border-zinc-200";
                topBorderColor = "bg-amber-400";
                badgeBg = "bg-amber-50";
                badgeText = "text-amber-600";
                actionBtnClass = "bg-amber-500 text-white hover:bg-amber-600 font-bold shadow-sm shadow-amber-500/20";
                actionBtnText = "Receber Conta";
                actionBtnClick = () => handleViewDetails(table);
              }

              return (
                <div key={table.id} className={`bg-white rounded-2xl border ${borderColor} shadow-sm overflow-hidden flex flex-col`}>
                  <div className={`h-1.5 w-full ${topBorderColor}`}></div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-black text-zinc-900">Mesa {table.table_number.toString().padStart(2, '0')}</h3>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider ${badgeBg} ${badgeText}`}>
                        {badgeLabel}
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3 text-zinc-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-bold">{isOccupied ? Math.floor(Math.random() * (table.capacity || 4)) + 1 : 0} / {table.capacity} pessoas</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-bold">{tabDetails ? formatTimeSince(tabDetails.opened_at) : "--:--:--"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-500">
                        <Banknote className="w-4 h-4" />
                        <span className="text-sm font-black text-zinc-800">
                          R$ {tabDetails && tabDetails.subtotal !== undefined ? tabDetails.subtotal.toFixed(2).replace('.', ',') : "0,00"}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={actionBtnClick}
                      className={`w-full mt-6 py-2.5 rounded-xl text-sm transition-colors ${actionBtnClass}`}
                    >
                      {actionBtnText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ocupação Atual */}
            <div className="bg-[#FFF5F0] rounded-2xl p-6 border border-orange-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-black text-zinc-600 tracking-wider uppercase">Ocupação Atual</h4>
                <PieChart className="w-5 h-5 text-[#F25D27]" />
              </div>
              <div className="text-4xl font-black text-[#F25D27] mb-1">{occupancyRate}%</div>
              <p className="text-sm font-medium text-zinc-500">{occupiedTablesCount} de {totalTablesCount} mesas ocupadas</p>
            </div>

            {/* Faturamento Ativo */}
            <div className="bg-[#F0FDF4] rounded-2xl p-6 border border-emerald-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-black text-zinc-600 tracking-wider uppercase">Faturamento Ativo</h4>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-4xl font-black text-emerald-600 mb-1">
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-sm font-medium text-zinc-500">Soma de todas as mesas abertas</p>
            </div>

            {/* Tempo Médio */}
            <div className="bg-[#F0F9FF] rounded-2xl p-6 border border-blue-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-black text-zinc-600 tracking-wider uppercase">Tempo Médio</h4>
                <Timer className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-4xl font-black text-blue-600 mb-1">{calculateAverageTime()}</div>
              <p className="text-sm font-medium text-zinc-500">Média de permanência hoje</p>
            </div>
          </div>

        </div>
      </main>

      {/* Add Table Modal */}
      {isAddTableModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900">Adicionar Nova Mesa</h3>
              <button 
                onClick={() => setIsAddTableModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Número da Mesa</label>
                <input 
                  type="number" 
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  placeholder="Ex: 12"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Capacidade (Pessoas)</label>
                <input 
                  type="number" 
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  placeholder="Ex: 4"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsAddTableModalOpen(false)}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddTable}
                disabled={!newTableNumber}
                className="px-5 py-2.5 bg-[#F25D27] text-white font-bold rounded-xl hover:bg-[#E04D17] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Mesa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Details Modal */}
      {isTableDetailsModalOpen && selectedTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <div>
                <h3 className="text-xl font-black text-zinc-900">Mesa {selectedTable.table_number.toString().padStart(2, '0')}</h3>
                <p className="text-sm text-zinc-500 font-medium mt-1">
                  {selectedTableTabs.length} comandas abertas
                </p>
              </div>
              <button 
                onClick={() => setIsTableDetailsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex border-b border-zinc-200">
              <button 
                onClick={() => setDetailsView('main')}
                className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${detailsView === 'main' ? 'border-[#F25D27] text-[#F25D27]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
              >
                Pedidos Principais
              </button>
              <button 
                onClick={() => setDetailsView('subtabs')}
                className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${detailsView === 'subtabs' ? 'border-[#F25D27] text-[#F25D27]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
              >
                Submesas / Comandas
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {detailsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F25D27]"></div>
                </div>
              ) : detailsView === 'main' ? (
                <div className="space-y-4">
                  {selectedTabItems.length > 0 ? (
                    <div className="divide-y divide-zinc-100">
                      {selectedTabItems.map(item => (
                        <div key={item.id} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-zinc-900">{item.quantity}x {item.product.name}</p>
                            {item.unique_notes && <p className="text-xs text-zinc-500 mt-1">Obs: {item.unique_notes}</p>}
                          </div>
                          <span className="font-bold text-zinc-700">R$ {(item.quantity * item.unit_price).toFixed(2).replace('.', ',')}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-zinc-500">
                      <Utensils className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="font-medium">Nenhum pedido na comanda principal.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTableTabs.length > 0 ? (
                    selectedTableTabs.map(tab => (
                      <div key={tab.id} className="p-4 border border-zinc-200 rounded-xl flex items-center justify-between hover:border-[#F25D27]/30 transition-colors cursor-pointer">
                        <div>
                          <p className="font-bold text-zinc-900">{tab.client_name || `Comanda #${tab.id}`}</p>
                          <p className="text-xs text-zinc-500 mt-1">Aberta às {new Date(tab.opened_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-black text-[#F25D27]">R$ {tab.subtotal !== undefined ? tab.subtotal.toFixed(2).replace('.', ',') : "0,00"}</span>
                          <ChevronRight className="w-5 h-5 text-zinc-300" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-500">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="font-medium">Nenhuma submesa aberta.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between gap-3">
              <button 
                onClick={handleOpenCheckout}
                disabled={selectedTableTabs.length === 0}
                className="px-5 py-2.5 text-rose-600 font-bold hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
              >
                Fechar Mesa
              </button>
              <button 
                onClick={() => {
                  if (detailsView === 'subtabs') {
                    setIsAddSubTabModalOpen(true);
                  } else {
                    setIsAddOrderModalOpen(true);
                  }
                }}
                className="px-5 py-2.5 bg-[#F25D27] text-white font-bold rounded-xl hover:bg-[#E04D17] transition-colors"
              >
                {detailsView === 'subtabs' ? 'Adicionar Submesa' : 'Adicionar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {isAddOrderModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <h3 className="text-xl font-bold text-zinc-900">Adicionar Pedido - Mesa {selectedTable?.table_number.toString().padStart(2, '0')}</h3>
              <button 
                onClick={() => {
                  setIsAddOrderModalOpen(false);
                  setCurrentOrderItems([]);
                  setOrderSearchQuery("");
                }}
                className="text-zinc-400 hover:text-zinc-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
              {/* Left Side: Product Selection */}
              <div className="w-full md:w-1/2 border-r border-zinc-200 flex flex-col bg-white">
                <div className="p-4 border-b border-zinc-100">
                  <div className="relative">
                    <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      placeholder="Buscar produtos..."
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <div 
                        key={product.id} 
                        onClick={() => handleAddToCart(product)}
                        className="p-4 border border-zinc-200 rounded-xl flex items-center justify-between hover:border-[#F25D27] hover:shadow-sm transition-all cursor-pointer group"
                      >
                        <div>
                          <p className="font-bold text-zinc-900 group-hover:text-[#F25D27] transition-colors">{product.name}</p>
                          <p className="text-xs text-zinc-500 mt-1">{product.category}</p>
                        </div>
                        <span className="font-black text-zinc-700">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-500">
                      <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                      <p className="font-medium">Nenhum produto encontrado.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Current Order Items */}
              <div className="w-full md:w-1/2 flex flex-col bg-zinc-50">
                <div className="p-4 border-b border-zinc-200 bg-white">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-[#F25D27]" />
                    Itens do Pedido ({currentOrderItems.length})
                  </h4>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentOrderItems.length > 0 ? (
                    currentOrderItems.map((item, index) => (
                      <div key={item.tempId} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-zinc-900">{item.product.name}</p>
                            <p className="text-sm font-black text-[#F25D27]">R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                          </div>
                          <button 
                            onClick={() => removeCartItem(item.tempId)}
                            className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center bg-zinc-100 rounded-lg border border-zinc-200 overflow-hidden">
                            <button 
                              onClick={() => updateCartItem(item.tempId, 'quantity', Math.max(1, item.quantity - 1))}
                              className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1.5 font-bold text-zinc-900 min-w-[2.5rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateCartItem(item.tempId, 'quantity', item.quantity + 1)}
                              className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <input 
                            type="text" 
                            value={item.unique_notes}
                            onChange={(e) => updateCartItem(item.tempId, 'unique_notes', e.target.value)}
                            placeholder="Observações (ex: sem cebola)"
                            className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-400 flex flex-col items-center justify-center h-full">
                      <Utensils className="w-12 h-12 mb-3 opacity-20" />
                      <p className="font-medium">Selecione produtos ao lado<br/>para adicionar ao pedido.</p>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-zinc-200 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-zinc-500 font-medium">Total do Pedido</span>
                    <span className="text-2xl font-black text-zinc-900">
                      R$ {currentOrderItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setIsAddOrderModalOpen(false);
                        setCurrentOrderItems([]);
                        setOrderSearchQuery("");
                      }}
                      className="flex-1 py-3 text-zinc-600 font-bold hover:bg-zinc-100 rounded-xl transition-colors border border-zinc-200"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleAddOrder}
                      disabled={currentOrderItems.length === 0}
                      className="flex-1 py-3 bg-[#F25D27] text-white font-bold rounded-xl hover:bg-[#E04D17] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-orange-500/20"
                    >
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub Tab Modal */}
      {isAddSubTabModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900">Nova Submesa</h3>
              <button 
                onClick={() => setIsAddSubTabModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-bold text-zinc-700 mb-2">Nome do Cliente / Identificação</label>
              <input 
                type="text" 
                value={newSubTabName}
                onChange={(e) => setNewSubTabName(e.target.value)}
                placeholder="Ex: João, Casal, etc."
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all"
              />
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsAddSubTabModalOpen(false)}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddSubTab}
                disabled={!newSubTabName}
                className="px-5 py-2.5 bg-[#F25D27] text-white font-bold rounded-xl hover:bg-[#E04D17] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar Submesa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <h3 className="text-xl font-bold text-zinc-900">Fechar Mesa {selectedTable?.table_number.toString().padStart(2, '0')}</h3>
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Select Tabs to Close */}
              <div>
                <h4 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Selecione o que deseja fechar</h4>
                <div className="space-y-2">
                  {selectedTableTabs.map(tab => {
                    const isSelected = checkoutSelectedTabs.includes(tab.id);
                    return (
                      <div 
                        key={tab.id}
                        onClick={() => toggleCheckoutTab(tab.id)}
                        className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'border-[#F25D27] bg-orange-50/50' : 'border-zinc-200 hover:border-zinc-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#F25D27] border-[#F25D27]' : 'border-zinc-300'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{tab.client_name || `Comanda #${tab.id}`}</p>
                          </div>
                        </div>
                        <span className="font-black text-zinc-900">R$ {tab.subtotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                    );
                  })}
                </div>
                
                {checkoutWarning && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-amber-800">{checkoutWarning}</p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Forma de Pagamento</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'credit', label: 'Crédito', icon: CreditCard },
                    { id: 'debit', label: 'Débito', icon: CreditCard },
                    { id: 'pix', label: 'PIX', icon: Wallet },
                    { id: 'cash', label: 'Dinheiro', icon: Banknote },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setCheckoutPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${checkoutPaymentMethod === method.id ? 'border-[#F25D27] bg-orange-50/50 text-[#F25D27]' : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
                    >
                      <method.icon className="w-6 h-6" />
                      <span className="text-sm font-bold">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partial Payment */}
              <div>
                <h4 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Valor a Pagar (Pagamento Parcial)</h4>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-500">R$</span>
                  <input 
                    type="number"
                    value={checkoutAmount}
                    onChange={(e) => setCheckoutAmount(e.target.value)}
                    placeholder={selectedTableTabs.filter(t => checkoutSelectedTabs.includes(t.id)).reduce((sum, t) => sum + t.subtotal, 0).toFixed(2)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all text-xl font-black text-zinc-900"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2 font-medium">Deixe em branco para pagar o valor total selecionado.</p>
              </div>

            </div>

            <div className="p-6 border-t border-zinc-200 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-500 font-medium">Total Selecionado</span>
                <span className="text-3xl font-black text-zinc-900">
                  R$ {selectedTableTabs.filter(t => checkoutSelectedTabs.includes(t.id)).reduce((sum, t) => sum + t.subtotal, 0).toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="flex-1 py-3 text-zinc-600 font-bold hover:bg-zinc-100 rounded-xl transition-colors border border-zinc-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmCheckout}
                  disabled={checkoutSelectedTabs.length === 0}
                  className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20"
                >
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
