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
    if (email === "admin@stalci.com" && password === "stalci2026") {
      document.cookie = "stalci_admin=authenticated; path=/; max-age=86400";
      window.location.href = "/";
    } else {
      setError("Invalid credentials. Try admin@stalci.com / stalci2026");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#fff8f1" }}>
      {/* Decorative warm gradient wash */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]" style={{ background: "#D89B5B" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]" style={{ background: "#E8B97A" }} />
      </div>

      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-[420px] bg-white rounded-[20px] p-10 space-y-8" style={{ boxShadow: "0px 25px 60px -15px rgba(0,0,0,0.1), 0px 2px 12px 0px rgba(180,140,80,0.08)" }}>
        <div className="text-center space-y-3">
          <h1 className="text-[40px] font-medium leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#1d1e1c" }}>
            Stalci <span style={{ color: "#D89B5B" }}>Studio</span>
          </h1>
          <p className="text-[15px]" style={{ color: "#8e8b87" }}>Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-2xl text-[13px]" style={{ background: "rgba(220,38,38,0.06)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.12)" }}>
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-semibold mb-2" style={{ color: "#4a4a47" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@stalci.com" required
              className="w-full px-5 py-3.5 rounded-2xl text-[15px] outline-none transition-all"
              style={{ background: "white", color: "#1d1e1c", border: "1px solid #c0bbb6" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#D89B5B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(216,155,91,0.15)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#c0bbb6"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold mb-2" style={{ color: "#4a4a47" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
              className="w-full px-5 py-3.5 rounded-2xl text-[15px] outline-none transition-all"
              style={{ background: "white", color: "#1d1e1c", border: "1px solid #c0bbb6" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#D89B5B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(216,155,91,0.15)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#c0bbb6"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white transition-all hover:brightness-110 disabled:opacity-60"
          style={{ background: "#D89B5B", boxShadow: "0px 1px 4px rgba(0,0,0,0.12)" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
