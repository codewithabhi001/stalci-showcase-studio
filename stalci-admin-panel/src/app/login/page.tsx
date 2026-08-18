"use client";
import { useState, useEffect } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound, Sparkles, ShieldCheck } from "lucide-react";
import { loginApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

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

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-[#F8F9FC] relative overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Background ambient gradient blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#7B2BF9]/15 to-[#0091FF]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-[#FA12E3]/15 to-[#F76808]/10 blur-3xl pointer-events-none" />

      {/* Brand Showcase Panel */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex bg-white/80 backdrop-blur-md border-r border-line z-10">
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#7B2BF9] via-[#5E3BEE] to-[#0091FF] text-white flex items-center justify-center p-2 shadow-sm ring-2 ring-purple-100">
            <span className="font-display font-black text-base tracking-tight text-white">S</span>
          </div>
          <div>
            <span className="text-[15px] font-bold tracking-tight text-ink font-display">STALCI STUDIO</span>
            <span className="text-[9.5px] text-muted block uppercase font-mono font-bold tracking-wider">
              Workspace OS
            </span>
          </div>
        </div>

        <div className="relative max-w-md space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-700 border border-purple-200 font-mono shadow-2xs">
            <Sparkles className="h-3 w-3 text-purple-600" /> ClickUp-Inspired Command Center
          </span>
          <h2 className="text-[32px] font-bold leading-[1.18] tracking-tight text-ink font-display">
            The sovereign control room for your entire digital enterprise.
          </h2>
          <p className="text-sm leading-relaxed text-muted font-normal">
            Publish portfolio showcases, monitor real-time client inquiries, orchestrate workforce operations, and issue automated billing statements in one unified workspace.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-xs text-muted font-mono pt-4 border-t border-line">
          <span>© {new Date().getFullYear()} STALCI Global Technologies</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> 256-Bit Encrypted
          </span>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center bg-[#F8F9FC] px-5 py-14 relative z-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[420px] p-8 sm:p-9 border border-line bg-white shadow-pop rounded-3xl space-y-5 relative"
        >
          <div className="lg:hidden mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#7B2BF9] via-[#5E3BEE] to-[#0091FF] text-white flex items-center justify-center p-2 shadow-sm ring-2 ring-purple-100">
              <span className="font-display font-black text-base tracking-tight text-white">S</span>
            </div>
            <div>
              <span className="text-[15px] font-bold text-ink font-display">STALCI STUDIO</span>
              <span className="text-[9px] text-muted block uppercase font-mono font-bold tracking-wider">
                Workspace OS
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink font-display">Sign in</h1>
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
            className="w-full h-10 rounded-xl bg-gradient-to-r from-[#7B2BF9] via-[#6835F1] to-[#5E3BEE] hover:from-[#6D24E3] hover:to-[#4E2ED6] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#5E3BEE]/40 active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Sign In to Workspace OS"}
            <ArrowRight className="h-4 w-4" />
          </button>

        </form>
      </div>
    </div>
  );
}
