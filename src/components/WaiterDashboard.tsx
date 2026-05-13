import { useState, useEffect } from "react";
import { Link } from "react-router";
import { User, List } from "lucide-react";

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

export default function WaiterDashboard() {
  const [tables, setTables] = useState<Table[]>([]);
  const [activeTabs, setActiveTabs] = useState<ActiveTab[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/tables").then(res => res.json()),
      fetch("/api/active-tabs").then(res => res.json())
    ]).then(([tablesData, tabsData]) => {
      setTables(tablesData);
      setActiveTabs(tabsData);
    });
  }, []);

  // Calculate global total
  const globalTotal = activeTabs.reduce((sum, tab) => sum + (tab.subtotal || 0), 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] px-4 py-4 flex items-center justify-center">
        <h1 className="text-[17px] font-black tracking-tight text-[#131D2E]">Doca das Proções</h1>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {tables.map(table => {
            const tableTabs = activeTabs.filter(t => t.table_id === table.id);
            const isOcupada = table.status === "Ocupada";
            const isFechamento = table.status === "Em Fechamento";
            const tabsCount = tableTabs.length;

            let borderColor = "border-[#34D399]"; // Livre
            let textColor = "text-[#34D399]";
            if (isOcupada) {
              borderColor = "border-[#FF0000]";
              textColor = "text-[#FF0000]";
            } else if (isFechamento) {
              borderColor = "border-[#FACC15]"; // Yellow
              textColor = "text-[#FACC15]";
            }

            return (
              <Link 
                key={table.id} 
                to={`/waiter/table/${table.id}`}
                className={`relative aspect-square bg-white border-[2px] ${borderColor} flex items-center justify-center transition-transform active:scale-95 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]`}
              >
                {/* Status Badge (Top Right) */}
                {(isOcupada || isFechamento) && (
                  <div className={`absolute top-2 right-2 text-[8px] font-black tracking-widest ${textColor} uppercase`}>
                    {table.status}
                  </div>
                )}

                {/* Table Number */}
                <span className="text-4xl font-extrabold tracking-tighter text-[#131D2E]">
                  T-{table.table_number.toString().padStart(2, '0')}
                </span>

                {/* Bottom Bar */}
                {table.status === "Livre" ? (
                  <div className={`absolute bottom-2 right-2 text-[10px] font-black tracking-widest ${textColor} uppercase`}>
                    LIVRE
                  </div>
                ) : (
                  <>
                    {/* Comandas count */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-zinc-500">
                      <List className="w-[14px] h-[14px]" strokeWidth={2.5} />
                      <span className="text-[12px] font-mono tracking-tighter font-bold">{tabsCount} {tabsCount === 1 ? 'Comanda' : 'Comandas'}</span>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-100 z-30 flex items-center shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.05)]">
        <Link to="/waiter/tables-list" className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C] text-white py-4 rounded-lg font-bold tracking-widest text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
          <List className="w-5 h-5" />
          LISTA DE MESAS
        </Link>
      </div>
    </div>
  );
}
