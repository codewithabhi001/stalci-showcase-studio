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
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex" style={{ background: "#17181b" }}>
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-25 blur-[130px]"
          style={{ background: "#c17f42" }}
        />
        <div className="relative flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-copper text-sm font-bold text-white">S</span>
          <span className="text-[15px] font-semibold tracking-tight text-white">Stalci Console</span>
        </div>
        <div className="relative max-w-md">
          <h2 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-white">
            The control room for your entire portfolio.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-white/55">
            Publish content, track client inquiries, manage hiring and invoicing — all from one premium workspace.
          </p>
        </div>
        <p className="relative text-[12.5px] text-white/35">© {new Date().getFullYear()} Stalci. Internal use only.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-canvas px-5 py-14">
        <form onSubmit={handleLogin} className="card w-full max-w-[400px] p-8">
          <div className="lg:hidden">
            <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-[11px] bg-copper text-sm font-bold text-white">
              S
            </span>
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight text-ink">Sign in</h1>
          <p className="mt-1.5 text-[13px] text-muted">Use your Stalci administrator account to continue.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-[10px] border border-danger/15 bg-danger-wash px-3.5 py-2.5 text-[12.5px] text-danger">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink-2">
                Email
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
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-copper text-sm font-semibold text-white transition-all hover:bg-copper-deep active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="mt-5 text-center text-[12px] text-faint">Protected area — activity is logged.</p>
        </form>
      </div>
    </div>
  );
}
