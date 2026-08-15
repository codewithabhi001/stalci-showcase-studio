"use client";
import { useState } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound, Sparkles, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (email === "admin@stalci.com" && password === "stalci2026") {
      document.cookie = "stalci_admin=authenticated; path=/; max-age=86400";
      window.location.href = "/";
    } else {
      setError("Invalid credentials. Please check your email and password.");
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("admin@stalci.com");
    setPassword("stalci2026");
    setError("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-canvas relative overflow-hidden selection:bg-copper/20 selection:text-copper-soft">
      {/* Background ambient lighting orbs & perspective grid */}
      <div className="absolute inset-0 perspective-grid opacity-30 pointer-events-none" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-20 blur-[150px] animate-float-orb"
        style={{ background: "#D89B5B" }}
      />
      <div
        className="pointer-events-none absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full opacity-15 blur-[140px]"
        style={{ background: "#D89B5B" }}
      />

      {/* Brand showcase panel */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex bg-[#050608]/90 border-r border-line backdrop-blur-xl z-10">
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-copper/15 border border-copper/35 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(216,155,91,0.25)]">
            <img src="/stalci-mark.png" alt="Stalci Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="text-[15px] font-bold tracking-tight text-white font-display">STALCI STUDIO</span>
            <span className="text-[9.5px] text-copper block uppercase font-mono font-bold tracking-widest">
              Executive Console OS
            </span>
          </div>
        </div>

        <div className="relative max-w-md space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/15 px-3 py-1 text-[11px] font-bold text-copper-soft border border-copper/35 font-mono shadow-[0_0_15px_rgba(216,155,91,0.2)]">
            <Sparkles className="h-3 w-3 text-copper animate-pulse" /> Portfolio Showcase OS
          </span>
          <h2 className="text-[34px] font-bold leading-[1.15] tracking-tight text-white font-display">
            The sovereign control room for your entire enterprise.
          </h2>
          <p className="text-[14.5px] leading-relaxed text-muted">
            Publish portfolio showcases, monitor real-time client lead submissions, orchestrate workforce operations, and issue automated billing statements in one unified workspace.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-[12px] text-faint font-mono pt-4 border-t border-line">
          <span>© {new Date().getFullYear()} STALCI Global Technologies</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit Encrypted
          </span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-canvas/80 px-5 py-14 relative z-10 backdrop-blur-md">
        <form
          onSubmit={handleLogin}
          className="card w-full max-w-[420px] p-8 sm:p-9 border border-line bg-surface/90 shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-xl rounded-3xl space-y-5 relative"
        >
          <div className="lg:hidden mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-copper/15 border border-copper/35 flex items-center justify-center p-2">
              <img src="/stalci-mark.png" alt="Stalci Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-[15px] font-bold text-white font-display">STALCI STUDIO</span>
              <span className="text-[9px] text-copper block uppercase font-mono font-bold tracking-widest">
                Executive Console
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">Sign in</h1>
            <p className="mt-1 text-[13px] text-muted">Enter administrative credentials to access command telemetry.</p>
          </div>

          {/* Quick Demo Fill Shortcut */}
          <div className="p-3 rounded-2xl bg-copper/10 border border-copper/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-copper-soft">
              <KeyRound className="h-3.5 w-3.5 text-copper shrink-0" />
              <span className="font-mono text-[11px] truncate">admin@stalci.com / stalci2026</span>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="shrink-0 text-[11px] font-bold text-black bg-copper hover:bg-copper-soft px-2.5 py-1 rounded-lg transition-colors font-mono cursor-pointer"
            >
              Fill Demo
            </button>
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/15 px-3.5 py-2.5 text-[12.5px] text-red-400 font-medium animate-pop">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stalci.com"
                  className="field pl-9"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-ink-2">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B4783B] via-[#D89B5B] to-[#F0BC86] text-sm font-bold text-black shadow-[0_4px_20px_rgba(216,155,91,0.35)] transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 cursor-pointer border border-copper/40"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            ) : (
              <>
                Sign in to Console <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-faint font-mono pt-1">
            Protected area — activity telemetry is monitored.
          </p>
        </form>
      </div>
    </div>
  );
}

