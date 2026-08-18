"use client";
import { useState, useEffect } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import { loginApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { StalciLogoIcon } from "@/components/BrandLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginApi({ email, password });
      if (res?.accessToken) {
        localStorage.setItem("stalci_access_token", res.accessToken);
        if (res?.refreshToken) {
          localStorage.setItem("stalci_refresh_token", res.refreshToken);
        }
        if (res?.user) {
          localStorage.setItem("stalci_user", JSON.stringify(res.user));
        }
        document.cookie = "stalci_admin=authenticated; path=/; max-age=604800; SameSite=Lax";
        window.location.href = "/";
      } else {
        setError("Login failed. No token received from server.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const msg = err?.response?.data?.message || "Invalid credentials. Please check your email and password.";
      setError(Array.isArray(msg) ? msg.join(", ") : msg);
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@stalci.com");
    setPassword("password123");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-[#FAFAFB] relative overflow-hidden selection:bg-zinc-200 selection:text-zinc-900">
      {/* Brand Showcase Panel */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex bg-white border-r border-line z-10">
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center p-2 shadow-md border border-zinc-800">
            <StalciLogoIcon size={28} />
          </div>
          <div>
            <span className="text-[16px] font-extrabold tracking-tight text-ink font-display">STALCI STUDIO</span>
            <span className="text-[10px] text-zinc-500 block uppercase font-mono font-bold tracking-wider">
              Enterprise Workspace OS
            </span>
          </div>
        </div>

        <div className="relative max-w-md space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3.5 py-1 text-[11px] font-bold text-zinc-900 border border-zinc-200 font-mono">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900" /> Sovereign Platform Control
          </span>
          <h2 className="text-[34px] font-bold leading-[1.16] tracking-tight text-ink font-display">
            The unified command center for your digital enterprise.
          </h2>
          <p className="text-sm leading-relaxed text-muted font-normal">
            Publish live portfolio showcases, orchestrate global workforce operations, track pipeline inquiries, and issue automated billing statements in one high-performance workspace.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 p-2.5 border border-line text-xs font-medium text-ink-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Real-Time CMS Sync</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 p-2.5 border border-line text-xs font-medium text-ink-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>HR & Talent Suite</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 p-2.5 border border-line text-xs font-medium text-ink-2">
              <CheckCircle2 className="h-4 w-4 text-zinc-900 shrink-0" />
              <span>Automated Billing</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 p-2.5 border border-line text-xs font-medium text-ink-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Role-Based Access</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between text-xs text-muted font-mono pt-4 border-t border-line">
          <span>© {new Date().getFullYear()} STALCI Technologies</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> 256-Bit SSL Encrypted
          </span>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center bg-[#FAFAFB] px-5 py-14 relative z-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[420px] p-8 sm:p-9 border border-line bg-white shadow-pop rounded-3xl space-y-5 relative"
        >
          <div className="lg:hidden mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center p-2 shadow-md border border-zinc-800">
              <StalciLogoIcon size={28} />
            </div>
            <div>
              <span className="text-[16px] font-bold text-ink font-display">STALCI STUDIO</span>
              <span className="text-[10px] text-[#0052FF] block uppercase font-mono font-bold tracking-wider">
                Workspace OS
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink font-display">Sign In</h1>
            <p className="mt-1 text-xs text-muted">Enter administrative credentials to access command telemetry.</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink block">Admin Email</label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stalci.com"
                  required
                  className="field pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink block">Password</label>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="field pl-10 pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer z-10"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-xl bg-[#0052FF] hover:bg-[#0045D8] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#0052FF] active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Sign In to Workspace OS"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="pt-2 border-t border-line text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted hover:text-[#0052FF] transition-colors cursor-pointer"
            >
              <Zap className="h-3 w-3 text-amber-500" /> Autofill Default Admin Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
