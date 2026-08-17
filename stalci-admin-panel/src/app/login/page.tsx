"use client";
import { useState } from "react";
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound, Sparkles, ShieldCheck } from "lucide-react";
import { loginApi } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        document.cookie = "stalci_admin=authenticated; path=/; max-age=604800";
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
    <div className="grid min-h-screen lg:grid-cols-2 bg-[#FAFAFC] relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Brand Showcase Panel */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex bg-white border-r border-zinc-200/90 z-10">
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center p-2 shadow-xs">
            <span className="font-display font-extrabold text-base tracking-tight text-white">S</span>
          </div>
          <div>
            <span className="text-[15px] font-bold tracking-tight text-zinc-950 font-display">STALCI STUDIO</span>
            <span className="text-[9.5px] text-indigo-600 block uppercase font-mono font-bold tracking-wider">
              Executive Console OS
            </span>
          </div>
        </div>

        <div className="relative max-w-md space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700 border border-indigo-200 font-mono shadow-2xs">
            <Sparkles className="h-3 w-3 text-indigo-600" /> Portfolio Showcase OS
          </span>
          <h2 className="text-[32px] font-bold leading-[1.18] tracking-tight text-zinc-950 font-display">
            The sovereign control room for your entire digital enterprise.
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 font-normal">
            Publish portfolio showcases, monitor real-time client inquiries, orchestrate workforce operations, and issue automated billing statements in one unified workspace.
          </p>
        </div>

        <div className="relative flex items-center justify-between text-xs text-zinc-400 font-mono pt-4 border-t border-zinc-100">
          <span>© {new Date().getFullYear()} STALCI Global Technologies</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit Encrypted
          </span>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex items-center justify-center bg-[#FAFAFC] px-5 py-14 relative z-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[420px] p-8 sm:p-9 border border-zinc-200/90 bg-white shadow-card rounded-3xl space-y-5 relative"
        >
          <div className="lg:hidden mb-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center p-2 shadow-xs">
              <span className="font-display font-extrabold text-base tracking-tight text-white">S</span>
            </div>
            <div>
              <span className="text-[15px] font-bold text-zinc-950 font-display">STALCI STUDIO</span>
              <span className="text-[9px] text-indigo-600 block uppercase font-mono font-bold tracking-wider">
                Executive Console
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 font-display">Sign in</h1>
            <p className="mt-1 text-xs text-zinc-500">Enter administrative credentials to access command telemetry.</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-950 block">Admin Email</label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 z-10" />
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
              <label className="text-xs font-bold text-zinc-950 block">Password</label>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 z-10" />
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 cursor-pointer z-10"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Admin OS"}
            <ArrowRight className="h-4 w-4" />
          </button>

        </form>
      </div>
    </div>
  );
}
