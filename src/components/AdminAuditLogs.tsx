import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { ShieldAlert, Search, Filter, CalendarClock, User, FileWarning, AlertOctagon } from "lucide-react";

export default function AdminAuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const auditEvents = [
    { id: "EV-9921", time: "Hoje, 20:45", user: "Garçom 02 (João)", action: "Item Cancelado", detail: "Removido: Isca de Peixe c/ Fritas (- R$ 85,00) da Mesa 04.", reason: "Cliente achou que a porção estava pequena/fria.", severity: "high" },
    { id: "EV-9920", time: "Hoje, 20:15", user: "Caixa Principal (Maria)", action: "Desconto Aplicado", detail: "Desconto de 10% (R$ 15,00) na Mesa 12.", reason: "Desconto de gerente por atraso no prato principal.", severity: "medium" },
    { id: "EV-9919", time: "Hoje, 19:30", user: "Gerente (Carlos)", action: "Reabertura de Mesa", detail: "A Mesa 08 (Status: Fechamento) foi reaberta.", reason: "Cliente decidiu pedir mais uma sobremesa antes de sair.", severity: "low" },
    { id: "EV-9918", time: "Hoje, 18:05", user: "Garçom 01 (Ana)", action: "Edição de Quantidade", detail: "Alterado Cerveja Especial de 4 para 2 un. na Mesa 03.", reason: "Lançamento incorreto anterior.", severity: "medium" },
    { id: "EV-9917", time: "Ontem, 23:10", user: "Supervisor (José)", action: "Sangria de Caixa", detail: "Sangria no valor de R$ 800,00.", reason: "Retirada padrão de fim de turno.", severity: "low" },
    { id: "EV-9916", time: "Ontem, 21:00", user: "Garçom 04 (Pedro)", action: "Transferência de Mesa", detail: "Transferiu Conta 1445 da Mesa 05 para Mesa 10.", reason: "Cliente pediu para trocar de mesa (mais próxima à janela).", severity: "low" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 max-h-screen overflow-hidden flex flex-col">
        <header className="bg-white border-b border-zinc-200 px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                 <ShieldAlert className="w-5 h-5" />
             </div>
             <div>
               <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Auditoria e Segurança</h1>
               <p className="text-sm text-zinc-500 font-medium tracking-tight">Event Sourcing: Log de ações sensíveis e prevenção de fraudes.</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filtros
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
              Exportar Relatório
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <div className="flex max-w-lg relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-zinc-400 w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar por Garçom, Mesa ou ID do Evento..."
                className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F25D27]/20 focus:border-[#F25D27] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-wider">ID / Data</th>
                          <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Ação e Detalhe</th>
                          <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Responsável</th>
                          <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Motivo Informado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-sm">
                        {auditEvents.map(event => (
                          <tr key={event.id} className="hover:bg-zinc-50">
                             <td className="p-5 align-top">
                                <div className="font-mono text-zinc-400 text-xs font-bold mb-1">{event.id}</div>
                                <div className="text-zinc-900 font-bold text-[13px] flex items-center gap-1.5"><CalendarClock className="w-3.5 h-3.5 text-zinc-400"/> {event.time}</div>
                             </td>
                             <td className="p-5 align-top max-w-sm">
                                <div className="flex items-center gap-2 mb-1">
                                   {event.severity === 'high' && <AlertOctagon className="w-4 h-4 text-red-500" />}
                                   {event.severity === 'medium' && <FileWarning className="w-4 h-4 text-amber-500" />}
                                   <span className={`font-bold text-[13px] ${
                                      event.severity === 'high' ? 'text-red-700' :
                                      event.severity === 'medium' ? 'text-amber-700' :
                                      'text-zinc-800'
                                   }`}>{event.action}</span>
                                </div>
                                <p className="text-zinc-600 text-[13px] leading-relaxed">{event.detail}</p>
                             </td>
                             <td className="p-5 align-top">
                                <div className="flex items-center gap-2 text-zinc-900 font-medium text-[13px]">
                                   <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                      <User className="w-3 h-3 text-zinc-500" />
                                   </div>
                                   {event.user}
                                </div>
                             </td>
                             <td className="p-5 align-top">
                                <span className="bg-zinc-100 px-3 py-1.5 rounded-lg text-zinc-700 text-[13px] italic border border-zinc-200/60 block leading-relaxed">
                                   "{event.reason}"
                                </span>
                             </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
