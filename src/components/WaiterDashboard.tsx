import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Coffee, Search } from "lucide-react";

interface Table {
  id: number;
  table_number: number;
  status: string;
}

export default function WaiterDashboard() {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    fetch("/api/tables")
      .then(res => res.json())
      .then(data => setTables(data));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="bg-zinc-900 p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-emerald-500" />
            <h1 className="text-xl font-bold">Mesas</h1>
          </div>
          <Link to="/" className="text-sm text-zinc-400 hover:text-white">Sair</Link>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar mesa..." 
            className="w-full bg-zinc-800 border-none rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tables.map(table => (
            <Link 
              key={table.id} 
              to={`/waiter/table/${table.id}`}
              className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center transition-transform active:scale-95 ${
                table.status === "Livre" 
                  ? "bg-zinc-800 border-2 border-emerald-500/30 hover:border-emerald-500/50" 
                  : "bg-red-950/30 border-2 border-red-500/30 hover:border-red-500/50"
              }`}
            >
              <span className="text-4xl font-bold mb-2">{table.table_number}</span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                table.status === "Livre" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}>
                {table.status}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
