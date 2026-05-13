import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Eye, HelpCircle, Settings, Headset, Terminal, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@docadasprocoes.com");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex flex-col font-mono relative overflow-hidden text-[#131D2E]">
      
      {/* Background huge text bottom right */}
      <div className="absolute bottom-6 right-0 translate-x-12 pointer-events-none opacity-[0.03]">
        <span className="text-[200px] font-black leading-none tracking-tighter">DOCA</span>
      </div>

      {/* Top Bar */}
      <header className="border-b-2 border-[#131D2E] bg-white px-8 py-5 flex items-center justify-between relative z-10 w-full shrink-0">
        <div className="border-2 border-[#131D2E] relative inline-block bg-white px-4 py-2">
           <div className="absolute top-1 left-1 w-full h-full bg-[#FFD700] -z-10" />
           <span className="font-black text-lg tracking-tight uppercase">DOCA INDUSTRIAL</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-zinc-500 hover:text-[#131D2E] transition-colors">
            <HelpCircle className="w-6 h-6 fill-current text-white" />
          </button>
          <button className="text-zinc-500 hover:text-[#131D2E] transition-colors">
            <Settings className="w-6 h-6 fill-current text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 py-12">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#B91C1C] flex items-center justify-center relative mb-8">
          <div className="absolute -right-1.5 -bottom-1.5 w-full h-full bg-[#FFD700] -z-10" />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2V15H8V22H6V15H3V2C3 2 4.5 3 6 3C7.5 3 9 2 9 2V9H11V2Z" fill="white"/>
            <path d="M19 2C19 2 15 2 15 7V15H17V22H19V2Z" fill="white"/>
          </svg>
        </div>

        {/* Title */}
        <div className="text-center mb-10 space-y-3 font-sans">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Painel Administrativo</h1>
          <p className="text-[13px] font-mono text-zinc-500 max-w-sm mx-auto leading-relaxed">Acesse sua conta para gerenciar o restaurante</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-[440px] space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-600">E-mail ou Usuário</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <User className="w-5 h-5 fill-current" />
              </div>
              <input
                type="text"
                placeholder="Ex: admin@doca.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-2 border-[#131D2E] py-4 pl-12 pr-4 text-base text-[#131D2E] placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-600">Senha</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Lock className="w-5 h-5 fill-current" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-2 border-[#131D2E] py-4 pl-12 pr-12 text-xl tracking-widest text-[#131D2E] placeholder:tracking-widest placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] transition-all font-mono"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#131D2E] transition-colors">
                 <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 pb-2">
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-5 h-5 border-2 border-[#131D2E] flex items-center justify-center transition-colors group-hover:bg-zinc-50 relative">
                  {/* Just empty for now, could be checked state later */}
               </div>
               <span className="text-[12px] font-black tracking-widest uppercase">Lembrar de Mim</span>
             </label>
             <button type="button" className="text-[10px] font-bold text-[#B91C1C] hover:text-[#991b1b] uppercase tracking-wider">
               Recuperar Senha
             </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B91C1C] hover:bg-[#991b1b] active:bg-[#7f1d1d] text-white py-5 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#B91C1C]/20 border-2 border-[#B91C1C]"
          >
            <span className="text-[14px] font-sans font-bold tracking-wider uppercase">Entrar no Painel</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </form>

        <div className="w-full max-w-[440px] mt-12 border-t border-zinc-200/60 pt-8 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFDFB] px-4 font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
             Problemas com o acesso?
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <button className="bg-transparent border-2 border-[#131D2E] py-3 flex justify-center items-center gap-2 hover:bg-zinc-50 transition-colors">
                <Headset className="w-4 h-4 text-[#131D2E]" />
                <span className="text-[12px] font-sans font-bold tracking-wider uppercase text-[#131D2E]">Suporte</span>
              </button>
              <button className="bg-transparent border-2 border-[#131D2E] py-3 flex justify-center items-center gap-2 hover:bg-zinc-50 transition-colors">
                <Terminal className="w-4 h-4 text-[#131D2E]" />
                <span className="text-[12px] font-sans font-bold tracking-wider uppercase text-[#131D2E]">Terminal</span>
              </button>
           </div>
        </div>
      </main>

      {/* Minimum Footer */}
      <footer className="bg-[#1A1F2B] text-zinc-400 py-6 px-8 flex justify-between items-center relative z-20 shrink-0">
        <div className="text-[10px] font-bold tracking-widest uppercase">
          © 2024 DOCA INDUSTRIAL | HIGH-STRESS HOSPITALITY SYSTEMS
        </div>
        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Terminal Support</a>
        </div>
      </footer>
    </div>
  );
}
