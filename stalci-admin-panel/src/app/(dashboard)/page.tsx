"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  const cards = [
    { label: "Total Inquiries", value: stats?.totalInquiries ?? "—", href: "/inquiries" },
    { label: "Active Jobs", value: stats?.activeJobs ?? "—", href: "/jobs" },
    { label: "Pending Revenue", value: stats?.pendingAmount ? `$${stats.pendingAmount.toLocaleString()}` : "—", href: "/invoices" },
    { label: "Total Blogs", value: stats?.totalBlogs ?? "—", href: "/blogs" },
    { label: "Total Pages", value: stats?.totalPages ?? "—", href: "/pages" },
    { label: "Total Services", value: stats?.totalServices ?? "—", href: "/services" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Dashboard</h1>
        <p style={{ color: "rgba(255,255,255,0.45)" }}>Welcome back to Stalci Showcase Studio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <a href={c.href} key={c.label} className="group block p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(216,155,91,0.15), transparent 70%)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 relative z-10" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</p>
            <p className="text-5xl font-light relative z-10" style={{ background: "var(--gradient-copper)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isLoading ? <span className="inline-block w-16 h-10 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} /> : c.value}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
