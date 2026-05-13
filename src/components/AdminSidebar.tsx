import React from "react";
import { Link, useLocation } from "react-router";
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
  Users,
  BrainCircuit,
  ShieldAlert
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Visão Geral", exact: true },
    { path: "/admin/tables", icon: LayoutGrid, label: "Gerenciamento de Mesas" },
    { path: "/admin/orders", icon: ClipboardList, label: "Pedidos" },
    { path: "/admin/menu", icon: BookOpen, label: "Cardápio" },
    { path: "/admin/menu-engineering", icon: BrainCircuit, label: "Eng. de Cardápio" },
    { path: "/admin/waiters", icon: Users, label: "Garçons" },
    { path: "/admin/reports", icon: BarChart2, label: "Relatórios" },
    { path: "/admin/audit-logs", icon: ShieldAlert, label: "Auditoria e Log" },
    { path: "/admin/printers", icon: Printer, label: "Impressoras" },
  ];

  const isActive = (itemPath: string, exact?: boolean) => {
    if (exact) {
      return path === itemPath;
    }
    return path.startsWith(itemPath);
  };

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col hidden md:flex shrink-0 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F25D27] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
          <Utensils className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-zinc-900 leading-tight">Doca das Porções</h1>
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Painel Administrativo</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path, item.exact);
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                active 
                  ? "bg-[#F25D27] text-white shadow-sm shadow-orange-500/20 font-bold" 
                  : "text-zinc-600 hover:bg-zinc-50 font-medium"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "text-white" : "text-zinc-400 group-hover:text-[#F25D27]"}`} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-200">
        <Link 
          to="/admin/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group mb-2 ${
            isActive("/admin/settings")
              ? "bg-[#F25D27] text-white shadow-sm shadow-orange-500/20 font-bold" 
              : "text-zinc-600 hover:bg-zinc-50 font-medium"
          }`}
        >
          <Settings className={`w-5 h-5 ${isActive("/admin/settings") ? "text-white" : "text-zinc-400 group-hover:text-[#F25D27]"}`} />
          <span className="text-sm">Configurações</span>
        </Link>
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            C
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate text-zinc-900">Carlos Silva</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Gerente</p>
          </div>
          <button className="text-zinc-400 hover:text-[#F25D27] transition-colors p-1">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
