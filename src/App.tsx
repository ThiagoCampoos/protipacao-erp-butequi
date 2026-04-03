/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link } from "react-router";
import WaiterDashboard from "./components/WaiterDashboard";
import WaiterTable from "./components/WaiterTable";
import WaiterTab from "./components/WaiterTab";
import AdminDashboard from "./components/AdminDashboard";
import AdminTables from "./components/AdminTables";
import AdminCheckout from "./components/AdminCheckout";
import AdminMenu from "./components/AdminMenu";
import AdminReports from "./components/AdminReports";
import AdminPrinters from "./components/AdminPrinters";
import AdminPrinterSetup from "./components/AdminPrinterSetup";
import AdminProductSetup from "./components/AdminProductSetup";
import AdminWaiterSetup from "./components/AdminWaiterSetup";
import AdminSettings from "./components/AdminSettings";

function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Doca das Porções</h1>
        <p className="text-zinc-400">Selecione seu perfil para continuar</p>
        <div className="grid gap-4">
          <Link to="/waiter" className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-medium transition-colors">
            Visão do Garçom (Mobile)
          </Link>
          <Link to="/admin" className="bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-medium transition-colors">
            Visão do Administrador (Desktop)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waiter" element={<WaiterDashboard />} />
        <Route path="/waiter/table/:id" element={<WaiterTable />} />
        <Route path="/waiter/tab/:id" element={<WaiterTab />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/admin/tab/:id" element={<AdminCheckout />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/menu/new" element={<AdminProductSetup />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/printers" element={<AdminPrinters />} />
        <Route path="/admin/printers/new" element={<AdminPrinterSetup />} />
        <Route path="/admin/waiters/new" element={<AdminWaiterSetup />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </BrowserRouter>
  );
}
