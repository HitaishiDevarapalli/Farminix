import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAdminConfig } from './context/AdminConfigContext';

export const AdminAuth: React.FC<{ onBackToStore: () => void }> = ({ onBackToStore }) => {
  const { adminLogin } = useAdminConfig();
  const [email, setEmail] = useState('admin@farminix.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const ok = adminLogin(email, password);
      if (!ok) {
        setError('Invalid admin credentials. Use admin@farminix.com / admin123');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl z-10 text-left">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-purple-950/60 border border-purple-800/60 rounded-2xl mb-4 shadow-inner">
            <img src="/farminix_logo.png" alt="Farminix" className="h-10 w-auto object-contain brightness-110" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900/50 border border-purple-700/50 rounded-full text-purple-300 text-[10px] font-extrabold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Store Control Center</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Farminix Admin CRM</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Pin-to-pin real-time control for Farminix Store</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email / Username</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@farminix.com"
                required
                className="w-full h-11 pl-10 pr-4 text-xs font-medium text-white bg-slate-950/80 border border-slate-800 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 pl-10 pr-10 text-xs font-medium text-white bg-slate-950/80 border border-slate-800 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Tip */}
        <div className="mt-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Default Master Credentials:</span>
          </div>
          <div className="text-slate-300 font-mono text-[10px]">
            User: <strong className="text-white">admin@farminix.com</strong> | Pass: <strong className="text-white">admin123</strong>
          </div>
        </div>

        {/* Back to main website */}
        <div className="mt-5 text-center">
          <button
            onClick={onBackToStore}
            className="text-xs font-semibold text-slate-400 hover:text-purple-400 transition-colors cursor-pointer"
          >
            ← Return to Farminix Public Store
          </button>
        </div>
      </div>
    </div>
  );
};
