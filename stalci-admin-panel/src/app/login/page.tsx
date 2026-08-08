"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simple auth — in production, use NextAuth or JWT
    if (email === "admin@stalci.com" && password === "stalci2026") {
      document.cookie = "stalci_admin=authenticated; path=/; max-age=86400";
      window.location.href = "/";
    } else {
      setError("Invalid credentials. Try admin@stalci.com / stalci2026");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "var(--gradient-ink)" }}>
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--copper)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "var(--copper-soft)" }} />
      
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md p-10 rounded-3xl space-y-8" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }}>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)", background: "var(--gradient-copper)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Stalci Studio
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Admin Control Panel</p>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@stalci.com" required className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)", ringColor: "var(--copper)" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)", ringColor: "var(--copper)" }} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50" style={{ background: "var(--gradient-copper)", color: "var(--ink)", boxShadow: "0 0 40px -8px var(--copper)" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
