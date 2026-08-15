"use client";
import { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-canvas">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex bg-[#080A0F] border-r border-line">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-20 blur-[130px]"
          style={{ background: "#D89B5B" }}
        />
        <div
          className="pointer-events-none absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "#D89B5B" }}
        />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-copper/15 border border-copper/30 flex items-center justify-center p-2 shadow-xs">
            <img src="/stalci-mark.png" alt="Stalci Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="text-[15px] font-bold tracking-tight text-white font-display">STALCI STUDIO</span>
            <span className="text-[9.5px] text-copper block uppercase font-mono font-bold tracking-widest">Enterprise Console</span>
          </div>
        </div>
        <div className="relative max-w-md">
          <h2 className="text-[34px] font-bold leading-[1.15] tracking-tight text-white font-display">
            The sovereign control room for your entire enterprise.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
            Publish portfolio articles, track global client inquiries, orchestrate workforce talent, and manage billing statements in one unified workspace.
          </p>
        </div>
        <p className="relative text-[12px] text-faint font-mono">© {new Date().getFullYear()} STALCI Global Technologies. Internal use only.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-canvas px-5 py-14">
        <form onSubmit={handleLogin} className="card w-full max-w-[420px] p-8 border border-line bg-surface shadow-2xl">
          <div className="lg:hidden mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-copper/15 border border-copper/30 flex items-center justify-center p-2">
              <img src="/stalci-mark.png" alt="Stalci Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-[15px] font-bold text-white font-display">STALCI STUDIO</span>
              <span className="text-[9px] text-copper block uppercase font-mono font-bold tracking-widest">Enterprise Console</span>
            </div>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-white font-display">Sign in</h1>
          <p className="mt-1.5 text-[13px] text-muted">Enter your administrative credentials to continue.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-[10px] border border-red-500/30 bg-red-500/15 px-3.5 py-2.5 text-[12.5px] text-red-400 font-medium">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
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
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field pl-9"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-copper text-sm font-bold text-black transition-all hover:bg-copper-soft active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-xs"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            ) : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="mt-5 text-center text-[11.5px] text-faint font-mono">Protected area — telemetry & activity is monitored.</p>
        </form>
      </div>
    </div>
  );
}
