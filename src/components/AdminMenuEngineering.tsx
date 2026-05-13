import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { ArrowLeft, BrainCircuit, ExternalLink, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { Link } from "react-router";

export default function AdminMenuEngineering() {
  const [view, setView] = useState<'matrix' | 'list'>('matrix');

  // Dummy analytics data for Menu Engineering
  const menuStats = [
    { id: 1, name: "Picanha Fatiada (500g)", category: "Carnes", volume: 150, profitMargin: 45, class: "Plowhorse" },
    { id: 2, name: "Isca de Peixe c/ Fritas", category: "Peixes", volume: 210, profitMargin: 65, class: "Star" },
    { id: 3, name: "Camarão Empanado", category: "Frutos do Mar", volume: 90, profitMargin: 70, class: "Puzzle" },
    { id: 4, name: "Bolinho de Bacalhau (6 un)", category: "Porções", volume: 180, profitMargin: 55, class: "Star" },
    { id: 5, name: "Salada Tropical", category: "Saladas", volume: 20, profitMargin: 40, class: "Dog" },
    { id: 6, name: "Torre de Chopp 2L", category: "Bebidas", volume: 300, profitMargin: 35, class: "Plowhorse" },
    { id: 7, name: "Mousse de Maracujá", category: "Sobremesas", volume: 40, profitMargin: 20, class: "Dog" },
    { id: 8, name: "Filé à Parmegiana", category: "Carnes", volume: 80, profitMargin: 60, class: "Puzzle" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 max-h-screen overflow-hidden flex flex-col">
        <header className="bg-white border-b border-zinc-200 px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#F25D27]/10 text-[#F25D27] rounded-xl flex items-center justify-center">
                 <BrainCircuit className="w-5 h-5" />
             </div>
             <div>
               <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Engenharia de Cardápio</h1>
               <p className="text-sm text-zinc-500 font-medium tracking-tight">Matriz BCG de Produtos: Volume vs Lucratividade</p>
             </div>
          </div>
          <div className="flex bg-zinc-100 p-1 rounded-lg">
             <button 
               className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${view === 'matrix' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
               onClick={() => setView('matrix')}
             >
               Matriz Visual
             </button>
             <button 
               className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${view === 'list' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
               onClick={() => setView('list')}
             >
               Lista de Produtos
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="max-w-6xl mx-auto space-y-6">
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
               <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
               <div>
                  <h3 className="font-bold text-blue-900">Como analisar este dashboard</h3>
                  <p className="text-sm text-blue-800/80 mt-1">Este dashboard classifica seus pratos baseado na quantidade vendida e margem de lucro. Use estes insights para saber o que promover, destacar no cardápio físico ou repensar ingredientes.</p>
               </div>
             </div>

             {view === 'matrix' ? (
                <div className="grid grid-cols-2 gap-4">
                  {/* Stars */}
                  <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">⭐ Estrelas (Stars)</h3>
                           <p className="text-sm text-emerald-700/80">Alta Lucratividade, Alto Volume</p>
                        </div>
                        <span className="bg-emerald-200 text-emerald-800 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded">Manter e Promover</span>
                     </div>
                     <div className="space-y-3">
                        {menuStats.filter(m => m.class === 'Star').map(item => (
                           <div key={item.id} className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between shadow-sm shadow-emerald-100/50">
                              <div>
                                 <p className="font-bold text-zinc-900 text-sm">{item.name}</p>
                                 <p className="text-xs text-zinc-500">{item.category}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-emerald-600 font-bold text-sm">{item.profitMargin}% Margem</p>
                                 <p className="text-zinc-400 text-xs">{item.volume} un.</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Plowhorses */}
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">🐴 Burros de Carga (Plowhorses)</h3>
                           <p className="text-sm text-blue-700/80">Baixa Lucratividade, Alto Volume</p>
                        </div>
                        <span className="bg-blue-200 text-blue-800 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded">Aumentar Preço ou Reduzir Custo</span>
                     </div>
                     <div className="space-y-3">
                        {menuStats.filter(m => m.class === 'Plowhorse').map(item => (
                           <div key={item.id} className="bg-white p-3 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm shadow-blue-100/50">
                              <div>
                                 <p className="font-bold text-zinc-900 text-sm">{item.name}</p>
                                 <p className="text-xs text-zinc-500">{item.category}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-blue-600 font-bold text-sm">{item.profitMargin}% Margem</p>
                                 <p className="text-zinc-400 text-xs">{item.volume} un.</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Puzzles */}
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">🧩 Quebra-Cabeças (Puzzles)</h3>
                           <p className="text-sm text-amber-700/80">Alta Lucratividade, Baixo Volume</p>
                        </div>
                        <span className="bg-amber-200 text-amber-800 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded">Maior Visibilidade</span>
                     </div>
                     <div className="space-y-3">
                        {menuStats.filter(m => m.class === 'Puzzle').map(item => (
                           <div key={item.id} className="bg-white p-3 rounded-xl border border-amber-100 flex items-center justify-between shadow-sm shadow-amber-100/50">
                              <div>
                                 <p className="font-bold text-zinc-900 text-sm">{item.name}</p>
                                 <p className="text-xs text-zinc-500">{item.category}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-amber-600 font-bold text-sm">{item.profitMargin}% Margem</p>
                                 <p className="text-zinc-400 text-xs">{item.volume} un.</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Dogs */}
                  <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">🐕 Cães (Dogs)</h3>
                           <p className="text-sm text-red-700/80">Baixa Lucratividade, Baixo Volume</p>
                        </div>
                        <span className="bg-red-200 text-red-800 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded">Remover ou Substituir</span>
                     </div>
                     <div className="space-y-3">
                        {menuStats.filter(m => m.class === 'Dog').map(item => (
                           <div key={item.id} className="bg-white p-3 rounded-xl border border-red-100 flex items-center justify-between shadow-sm shadow-red-100/50">
                              <div>
                                 <p className="font-bold text-zinc-900 text-sm">{item.name}</p>
                                 <p className="text-xs text-zinc-500">{item.category}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-red-600 font-bold text-sm">{item.profitMargin}% Margem</p>
                                 <p className="text-zinc-400 text-xs">{item.volume} un.</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                </div>
             ) : (
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-zinc-50 border-b border-zinc-200">
                            <th className="p-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">Produto</th>
                            <th className="p-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">Categoria</th>
                            <th className="p-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Volume</th>
                            <th className="p-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Margem</th>
                            <th className="p-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">Classificação BCG</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-sm">
                         {menuStats.map(item => (
                            <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer">
                               <td className="p-4 font-bold text-zinc-900">{item.name}</td>
                               <td className="p-4 text-zinc-500">{item.category}</td>
                               <td className="p-4 text-right font-medium">{item.volume} un.</td>
                               <td className="p-4 text-right font-medium text-emerald-600">{item.profitMargin}%</td>
                               <td className="p-4">
                                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                                     item.class === 'Star' ? 'bg-emerald-100 text-emerald-700' :
                                     item.class === 'Plowhorse' ? 'bg-blue-100 text-blue-700' :
                                     item.class === 'Puzzle' ? 'bg-amber-100 text-amber-700' :
                                     'bg-red-100 text-red-700'
                                  }`}>
                                     {item.class}
                                  </span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
