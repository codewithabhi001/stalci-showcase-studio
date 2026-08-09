"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";
import Link from "next/link";
import { Users, Briefcase, FileText, Layout, Heart, Layers } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  const cards = [
    { label: "Total Inquiries", value: stats?.totalInquiries ?? "—", href: "/inquiries", icon: Users },
    { label: "Active Jobs", value: stats?.activeJobs ?? "—", href: "/jobs", icon: Briefcase },
    { label: "Pending Revenue", value: stats?.pendingAmount ? `$${stats.pendingAmount.toLocaleString()}` : "—", href: "/invoices", icon: FileText },
    { label: "Total Blogs", value: stats?.totalBlogs ?? "—", href: "/blogs", icon: Layout },
    { label: "Total Pages", value: stats?.totalPages ?? "—", href: "/pages", icon: Layers },
    { label: "Total Services", value: stats?.totalServices ?? "—", href: "/services", icon: Heart },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold leading-tight text-ink-black animate-fade-in" style={{ fontFamily: "var(--font-display)" }}>
          Golden Hour Workbench
        </h1>
        <p className="mt-2 text-warm-stone max-w-xl animate-fade-in">
          Warm cream canvas, white floating panels, and copper flame accents. Here is your Stalci Showcase Studio status at a glance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              href={c.href}
              key={c.label}
              className="group block p-8 bg-paper-white rounded-[20px] border border-mist-gray hover:border-copper/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              style={{ 
                boxShadow: "var(--shadow-card)",
                animation: `fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both ${i * 0.05}s`
              }}
            >
              {/* Marigold Glow highlights on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cream-canvas to-transparent pointer-events-none" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">{c.label}</p>
                  <p className="text-4xl font-semibold text-ink-black leading-none">
                    {isLoading ? (
                      <span className="inline-block w-16 h-8 rounded animate-pulse bg-cream-canvas" />
                    ) : (
                      c.value
                    )}
                  </p>
                </div>
                <span className="p-3.5 rounded-2xl bg-cream-canvas text-copper-deep group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        <RevenueChart />
        <CRMChart />
      </div>

      {/* Decorative Warm Banner */}
      <div 
        className="p-8 rounded-[20px] bg-paper-white border border-mist-gray flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden" 
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-copper), transparent 70%)" }} />
        
        <div className="space-y-2 relative z-10 max-w-xl">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-copper">Site Settings</span>
          <h3 className="text-xl font-semibold text-ink-black">Looking to update global settings, headers, or social profiles?</h3>
          <p className="text-sm text-warm-stone leading-relaxed">
            Configure contact info, office locations, Twitter and LinkedIn handles. Your changes will sync automatically to the portfolio.
          </p>
        </div>
        <Link href="/settings" className="px-6 py-3 rounded-2xl font-semibold text-sm text-white shrink-0 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all" style={{ background: "var(--color-copper)" }}>
          Configure Site
        </Link>
      </div>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="bg-paper-white rounded-[20px] p-6 border border-mist-gray space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">Financial Telemetry</p>
          <h3 className="text-lg font-semibold text-ink-black mt-1" style={{ fontFamily: "var(--font-display)" }}>Revenue Stream</h3>
        </div>
        <span className="text-xs font-semibold text-copper">+18.4% vs last quarter</span>
      </div>
      
      {/* Custom SVG Area Chart */}
      <div className="relative h-48 w-full pt-4">
        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-copper)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-copper)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(216,155,91,0.08)" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(216,155,91,0.08)" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(216,155,91,0.08)" strokeWidth="1" strokeDasharray="4" />
          
          {/* Area Path */}
          <path
            d="M 0 135 L 80 110 L 160 125 L 240 80 L 320 95 L 400 45 L 480 30 L 500 30 L 500 150 L 0 150 Z"
            fill="url(#chart-glow)"
          />
          {/* Stroke Path */}
          <path
            d="M 0 135 L 80 110 L 160 125 L 240 80 L 320 95 L 400 45 L 480 30 L 500 30"
            fill="none"
            stroke="var(--color-copper)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data nodes */}
          <circle cx="240" cy="80" r="4.5" fill="var(--color-paper-white)" stroke="var(--color-copper-deep)" strokeWidth="2.5" />
          <circle cx="480" cy="30" r="4.5" fill="var(--color-paper-white)" stroke="var(--color-copper-deep)" strokeWidth="2.5" />
        </svg>
        {/* Chart tooltips */}
        <div className="absolute top-[68px] left-[225px] -translate-x-1/2 bg-ink-black text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow">
          $12.5k
        </div>
        <div className="absolute top-[18px] left-[465px] -translate-x-1/2 bg-ink-black text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow">
          $42.8k
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-driftwood font-semibold tracking-wider uppercase pt-2 border-t border-mist-gray/40">
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug (Active)</span>
      </div>
    </div>
  );
}

function CRMChart() {
  const months = [
    { label: "Mar", value: 35 },
    { label: "Apr", value: 55 },
    { label: "May", value: 42 },
    { label: "Jun", value: 78 },
    { label: "Jul", value: 64 },
    { label: "Aug", value: 92 },
  ];
  return (
    <div className="bg-paper-white rounded-[20px] p-6 border border-mist-gray space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">CRM Analytics</p>
          <h3 className="text-lg font-semibold text-ink-black mt-1" style={{ fontFamily: "var(--font-display)" }}>Lead Conversion</h3>
        </div>
        <span className="text-xs font-semibold text-emerald-600">+14 inquiries today</span>
      </div>
      
      {/* Custom HTML/CSS Bar Chart */}
      <div className="flex items-end justify-between h-48 w-full pt-4 px-2">
        {months.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-3 flex-1 group/bar">
            <div className="relative w-7 sm:w-9 bg-cream-canvas rounded-t-lg h-36 flex items-end overflow-hidden border border-mist-gray/40">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-copper-deep to-copper group-hover/bar:brightness-110 transition-all duration-500"
                style={{ height: `${m.value}%` }}
              />
              {/* Value tooltip */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-ink-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-20">
                {m.value}
              </div>
            </div>
            <span className="text-[10px] text-driftwood font-bold uppercase tracking-wider">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

