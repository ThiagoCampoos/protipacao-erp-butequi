import React, { useState } from "react";
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
  Calendar,
  Wallet,
  Banknote,
  ShoppingBag,
  Filter,
  Search,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Info,
  X,
  Edit2,
  Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'Entry' | 'Exit'>('Entry');
  const [transactionValue, setTransactionValue] = useState('');
  const [transactionObservation, setTransactionObservation] = useState('');
  const [editingTransactionId, setEditingTransactionId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Entry' | 'Exit'>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Entry', description: 'Table 05 Payment - Debit Card', value: 120.00, time: '14:30' },
    { id: 2, type: 'Exit', description: 'Supplier: Meat Market Premium', value: 450.00, time: '13:15' },
    { id: 3, type: 'Entry', description: 'Table 12 Payment - Cash', value: 85.00, time: '12:45' },
    { id: 4, type: 'Entry', description: 'Table 02 Payment - PIX', value: 210.00, time: '12:10' },
    { id: 5, type: 'Exit', description: 'Supplier: Beverage Distribution Co.', value: 320.00, time: '11:55' },
    { id: 6, type: 'Entry', description: 'Table 08 Payment - Credit Card', value: 155.00, time: '11:20' },
  ]);

  const handleSaveTransaction = () => {
    if (!transactionValue) return;
    
    const value = parseFloat(transactionValue.replace(',', '.'));
    const description = transactionObservation || (transactionType === 'Entry' ? 'Entrada Manual' : 'Saída Manual');

    if (editingTransactionId !== null) {
      setTransactions(transactions.map(tx => 
        tx.id === editingTransactionId 
          ? { ...tx, type: transactionType, description, value }
          : tx
      ));
    } else {
      const newTransaction = {
        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
        type: transactionType,
        description,
        value,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTransactions([newTransaction, ...transactions]);
    }

    closeModal();
  };

  const handleEditTransaction = (tx: any) => {
    setTransactionType(tx.type);
    setTransactionValue(tx.value.toString());
    setTransactionObservation(tx.description);
    setEditingTransactionId(tx.id);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const openNewTransactionModal = () => {
    setTransactionType('Entry');
    setTransactionValue('');
    setTransactionObservation('');
    setEditingTransactionId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionValue('');
    setTransactionObservation('');
    setEditingTransactionId(null);
  };

  const totalEntries = transactions.filter(t => t.type === 'Entry').reduce((acc, curr) => acc + curr.value, 0);
  const totalExits = transactions.filter(t => t.type === 'Exit').reduce((acc, curr) => acc + curr.value, 0);
  const totalBalance = totalEntries - totalExits;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.value.toString().includes(searchQuery);
    const matchesFilter = filterType === 'All' || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Admin Dashboard</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#FFF5F0] text-[#F25D27] rounded-xl font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Visão Geral
          </Link>
          <Link to="/admin/tables" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 rounded-xl font-medium transition-colors">
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

        <div className="p-4 mt-auto border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#74A877] rounded-full flex items-center justify-center text-white font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">Julio C.</p>
                <p className="text-[10px] text-zinc-500 font-medium">Manager</p>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500 font-medium">Dashboard</span>
            <span className="text-zinc-300">›</span>
            <span className="text-zinc-900 font-bold">Cashier Control</span>
          </div>
          <button 
            onClick={openNewTransactionModal}
            className="bg-[#F25D27] hover:bg-[#E04D17] text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Entrada e Saída
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Controle de Caixa</h2>
              <p className="text-zinc-500 font-medium">Manage your daily transactions and balance for <span className="text-[#F25D27]">Doca das Proções</span>.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-sm">
                <Calendar className="w-4 h-4 text-zinc-400" />
                October 24, 2023
              </button>
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-6 right-6 w-12 h-12 bg-[#FFF5F0] rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#F25D27] opacity-40" />
              </div>
              <h4 className="text-sm font-medium text-zinc-500 mb-2">Total Balance</h4>
              <div className="text-3xl font-black text-zinc-900 mb-4">R$ {totalBalance.toFixed(2).replace('.', ',')}</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  <ArrowUp className="w-3 h-3" />
                  12%
                </span>
                <span className="text-xs font-medium text-zinc-400 italic">vs. yesterday</span>
              </div>
            </div>

            {/* Total Entries */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-6 right-6 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Banknote className="w-6 h-6 text-emerald-500 opacity-40" />
              </div>
              <h4 className="text-sm font-medium text-zinc-500 mb-2">Total Entries</h4>
              <div className="text-3xl font-black text-zinc-900 mb-4">R$ {totalEntries.toFixed(2).replace('.', ',')}</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  <ArrowUp className="w-3 h-3" />
                  8%
                </span>
                <span className="text-xs font-medium text-zinc-400 italic">from sales today</span>
              </div>
            </div>

            {/* Total Exits */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-6 right-6 w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-rose-500 opacity-40" />
              </div>
              <h4 className="text-sm font-medium text-zinc-500 mb-2">Total Exits</h4>
              <div className="text-3xl font-black text-zinc-900 mb-4">R$ {totalExits.toFixed(2).replace('.', ',')}</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-md">
                  <ArrowDown className="w-3 h-3" />
                  5%
                </span>
                <span className="text-xs font-medium text-zinc-400 italic">suppliers & overhead</span>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm mb-8">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Histórico de Transações</h3>
              <div className="flex items-center gap-3">
                {isSearchOpen ? (
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar transação..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-8 py-1.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25D27]/50 w-48 transition-all"
                      autoFocus
                    />
                    <button 
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-zinc-400 hover:text-zinc-600 transition-colors p-1"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
                
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="text-sm border border-zinc-200 rounded-lg py-1.5 pl-3 pr-8 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#F25D27]/50 appearance-none bg-white cursor-pointer"
                  >
                    <option value="All">Todos</option>
                    <option value="Entry">Entradas</option>
                    <option value="Exit">Saídas</option>
                  </select>
                  <Filter className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Hora</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            tx.type === 'Entry' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {tx.type === 'Entry' ? 'Entrada' : 'Saída'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-zinc-700">{tx.description}</td>
                        <td className="px-6 py-4 text-sm font-bold text-zinc-900">
                          R$ {tx.value.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{tx.time}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditTransaction(tx)}
                              className="text-zinc-400 hover:text-blue-600 transition-colors p-1"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                        Nenhuma transação encontrada com os filtros atuais.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50 rounded-b-2xl">
              <span className="text-sm text-zinc-500 font-medium">Mostrando {filteredTransactions.length} de {transactions.length} transações</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-50" disabled>Anterior</button>
                <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-50" disabled>Próxima</button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods Breakdown */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 mb-6">Payment Methods Breakdown</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-zinc-600">Debit/Credit Card</span>
                    <span className="text-zinc-900 font-bold">65%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2">
                    <div className="bg-[#F25D27] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-zinc-600">PIX (Instant)</span>
                    <span className="text-zinc-900 font-bold">25%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-zinc-600">Cash</span>
                    <span className="text-zinc-900 font-bold">10%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="text-base font-bold text-zinc-900 mb-6">Quick Insights</h3>
              
              <div className="bg-[#FFF5F0] border border-orange-100 rounded-xl p-4 flex gap-3 mb-6">
                <div className="w-6 h-6 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Info className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#D94A1A] mb-1">Pending Supplier Payment</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    "Green Harvest Vegetables" payment of R$ 140,00 is due in 2 hours.
                  </p>
                </div>
              </div>
              
              <div className="mt-auto grid grid-cols-2 gap-4">
                <button className="w-full py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-bold hover:bg-zinc-50 transition-colors text-sm">
                  Export Report
                </button>
                <button className="w-full py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-bold hover:bg-zinc-50 transition-colors text-sm">
                  Daily Close
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Modal Entrada/Saída */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900">
                {editingTransactionId ? 'Editar Transação' : 'Nova Transação'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Tipo de Transação */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTransactionType('Entry')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    transactionType === 'Entry' 
                      ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500' 
                      : 'bg-zinc-50 text-zinc-500 border-2 border-transparent hover:bg-zinc-100'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  Entrada
                </button>
                <button
                  onClick={() => setTransactionType('Exit')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    transactionType === 'Exit' 
                      ? 'bg-rose-50 text-rose-700 border-2 border-rose-500' 
                      : 'bg-zinc-50 text-zinc-500 border-2 border-transparent hover:bg-zinc-100'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                  Saída
                </button>
              </div>

              {/* Valor */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Valor (R$)</label>
                <input 
                  type="number" 
                  value={transactionValue}
                  onChange={(e) => setTransactionValue(e.target.value)}
                  placeholder="0,00"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all text-lg font-medium"
                />
              </div>

              {/* Observação */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Observação (Opcional)</label>
                <textarea 
                  value={transactionObservation}
                  onChange={(e) => setTransactionObservation(e.target.value)}
                  placeholder="Ex: Pagamento de fornecedor, Troco..."
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-[#F25D27]/50 focus:border-[#F25D27] outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveTransaction}
                disabled={!transactionValue}
                className="px-5 py-2.5 bg-[#F25D27] text-white font-bold rounded-xl hover:bg-[#E04D17] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingTransactionId ? 'Salvar Alterações' : 'Salvar Transação'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
