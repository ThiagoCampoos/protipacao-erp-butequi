import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, ArrowRight, HelpCircle, Info, Settings, LogIn, Headset } from "lucide-react";

export default function WaiterLogin() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/waiter");
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col font-mono relative overflow-hidden">
      {/* Background huge text */}
      <div className="absolute top-0 right-0 left-0 flex justify-center -mt-10 pointer-events-none opacity-40">
        <span className="text-[140px] font-black text-[#F0EBE1] leading-none tracking-tighter">DOCA</span>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 -mt-10">
        {/* Logo */}
        <div className="w-24 h-24 bg-[#FF0000] flex items-center justify-center relative mb-6">
          <div className="absolute -right-1 -bottom-1 w-full h-full bg-[#FFD700] -z-10" />
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2V15H8V22H6V15H3V2C3 2 4.5 3 6 3C7.5 3 9 2 9 2V9H11V2Z" fill="white"/>
            <path d="M19 2C19 2 15 2 15 7V15H17V22H19V2Z" fill="white"/>
          </svg>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight flex items-center justify-center gap-2 font-sans">
            <span className="text-[#131D2E]">DOCA DAS</span>
            <span className="text-[#FF0000]">PROÇÕES</span>
          </h1>
          <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase mt-2">Staff Access Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-[#131D2E] tracking-widest uppercase">Employee ID</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <User className="w-5 h-5 fill-current" />
              </div>
              <input
                type="text"
                placeholder="000-000"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full bg-white border border-zinc-100 rounded shadow-sm py-4 pl-12 pr-4 text-lg tracking-widest text-[#131D2E] placeholder:text-zinc-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-[#131D2E] tracking-widest uppercase">Security PIN</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Lock className="w-5 h-5 fill-current" />
              </div>
              <input
                type="password"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-white border border-zinc-100 rounded shadow-sm py-4 pl-12 pr-4 text-xl tracking-[0.5em] text-[#131D2E] placeholder:text-zinc-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF0000] hover:bg-[#e00000] active:bg-[#cc0000] text-white py-5 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-red-500/20"
          >
            <span className="text-[15px] font-black tracking-widest uppercase font-sans">Sign In</span>
            <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </form>

        {/* Footer Links */}
        <div className="w-full max-w-sm flex items-center justify-between mt-8 border-t border-zinc-200 pt-6">
          <button className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-zinc-800 tracking-wider">
            <HelpCircle className="w-4 h-4 fill-zinc-400 text-white" />
            FORGOT ID?
          </button>
          <button className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-zinc-800 tracking-wider">
            <Headset className="w-4 h-4 text-zinc-400" />
            SUPPORT
          </button>
        </div>
      </main>

      {/* Bottom Tabs */}
      <div className="bg-white border-t border-zinc-200 flex justify-center items-center py-3 pb-6 relative z-10 w-full">
        <button className="flex-1 flex flex-col items-center gap-1.5 text-[#FF0000]">
          <LogIn className="w-6 h-6" strokeWidth={2} />
          <span className="text-[9px] font-black tracking-widest uppercase">Login</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-zinc-600 transition-colors">
          <Info className="w-6 h-6 fill-zinc-400 text-white" />
          <span className="text-[9px] font-black tracking-widest uppercase">About</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-zinc-600 transition-colors">
          <Settings className="w-6 h-6 fill-zinc-400 text-white" />
          <span className="text-[9px] font-black tracking-widest uppercase">Setup</span>
        </button>
      </div>
    </div>
  );
}
