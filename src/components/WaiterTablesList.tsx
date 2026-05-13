import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, Search, ChevronRight, Settings, UtensilsCrossed, ReceiptText, LayoutGrid } from "lucide-react";

interface Table {
  id: number;
  table_number: number;
  status: string;
}

interface ActiveTab {
  id: number;
  table_id: number;
  client_name: string;
  subtotal: number;
  people_count?: number;
}

export default function WaiterTablesList() {
  const [tables, setTables] = useState<Table[]>([]);
  const [activeTabs, setActiveTabs] = useState<ActiveTab[]>([]);
  const [currentTab, setCurrentTab] = useState("Todas");

  useEffect(() => {
    Promise.all([
      fetch("/api/tables").then(res => res.json()),
      fetch("/api/active-tabs").then(res => res.json())
    ]).then(([tablesData, tabsData]) => {
      setTables(tablesData);
      setActiveTabs(tabsData);
    });
  }, []);

  const filteredTables = tables.filter(table => {
    if (currentTab === "Todas") return true;
    if (currentTab === "Ocupadas") return table.status === "Ocupada";
    if (currentTab === "Livres") return table.status === "Livre";
    if (currentTab === "Fechamento") return table.status === "Em Fechamento";
    return true;
  });

  const totalTablesCount = filteredTables.length;

  return (
    <div className="min-h-screen bg-white text-[#131D2E] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between p-4 px-5">
          <Link to="/waiter" className="text-[#FF0000] p-1 -ml-1 transition-colors">
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-[18px] font-bold tracking-tight text-[#131D2E]">Mesas</h1>
          </div>
          <button className="text-[#131D2E] p-1 -mr-1">
            <Search className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Segmented Control (Tabs) */}
        <div className="flex px-4 border-b border-zinc-100 mt-1 overflow-x-auto scrollbar-hide">
          {["Todas", "Ocupadas", "Livres", "Fechamento"].map(tab => {
            const isActive = tab === currentTab;
            return (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`min-w-[80px] px-3 py-3 text-[13px] font-bold transition-all relative text-center whitespace-nowrap ${
                  isActive ? "text-[#FF0000]" : "text-zinc-500"
                }`}
              >
                {tab}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000]" />
                )}
              </button>
            )
          })}
        </div>
      </header>

      {/* List Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-zinc-50 border-b border-zinc-100">
        <h2 className="text-[12px] font-bold tracking-widest text-[#131D2E] uppercase">Salão Principal</h2>
        <div className="bg-[#FF0000]/10 text-[#FF0000] text-[11px] font-bold tracking-wide px-2 py-1 rounded">
          {totalTablesCount} Mesas
        </div>
      </div>

      {/* Table List */}
      <main className="flex-1 overflow-y-auto">
        {filteredTables.map((table, index) => {
          const tableTabs = activeTabs.filter(t => t.table_id === table.id);
          const isOcupada = table.status === "Ocupada";
          const isFechamento = table.status === "Em Fechamento"; // Not explicitly mocked, grouping as occupied visually if needed.
          const tabsCount = tableTabs.length;

          let iconBg = "bg-slate-100";
          let iconColor = "text-slate-400";
          let dotColor = "bg-[#10B981]"; // Green
          let statusText = `Livre`;

          if (isOcupada || isFechamento) {
            iconBg = "bg-red-50";
            iconColor = "text-[#FF0000]";
            dotColor = isFechamento ? "bg-amber-500" : "bg-[#FF0000]";
            statusText = `${isFechamento ? 'Fechamento' : 'Ocupada'} • ${tabsCount} Comanda${tabsCount === 1 ? '' : 's'}`;
          }

          return (
            <Link 
              key={table.id}
              to={`/waiter/table/${table.id}`}
              className={`flex items-center justify-between p-4 px-5 border-b border-zinc-100 transition-colors hover:bg-zinc-50 active:bg-zinc-100`}
            >
              <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconColor}>
                     <path d="M4 10h16M5 10v9M19 10v9M3 10l1-6h16l1 6"/>
                   </svg>
                </div>

                {/* Text Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-[17px] font-bold text-[#131D2E] leading-snug">
                    Mesa {table.table_number.toString().padStart(2, '0')}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span className="text-[13px] text-zinc-500">{statusText}</span>
                  </div>
                </div>
              </div>

              {/* Price & Arrow */}
              <div className="flex items-center gap-3">
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
