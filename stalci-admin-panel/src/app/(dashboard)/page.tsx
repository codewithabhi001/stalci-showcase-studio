"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  fetchStats,
  fetchInquiries,
  fetchInvoices,
  fetchProjects,
  fetchClients,
  fetchServices,
  fetchTechnologies,
  fetchTestimonials,
  fetchBlogs,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Receipt,
  Users,
  FolderKanban,
  ArrowUpRight,
  TrendingUp,
  Plus,
  ArrowRight,
  DollarSign,
  Clock,
  Sparkles,
  ExternalLink,
  Boxes,
  Code2,
  Quote,
  Newspaper,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });
  const { data: inquiries = [], isLoading: inquiriesLoading } = useQuery({ queryKey: ["inquiries"], queryFn: fetchInquiries });
  const { data: invoices = [], isLoading: invoicesLoading } = useQuery({ queryKey: ["invoices"], queryFn: () => fetchInvoices() });
  const { data: projects = [], isLoading: projectsLoading } = useQuery({ queryKey: ["projects"], queryFn: () => fetchProjects() });
  const { data: clients = [], isLoading: clientsLoading } = useQuery({ queryKey: ["clients"], queryFn: fetchClients });
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: technologies = [] } = useQuery({ queryKey: ["technologies"], queryFn: () => fetchTechnologies() });
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
  const { data: blogs = [] } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  const recentInquiries = [...inquiries].slice(0, 4);
  const recentInvoices = [...invoices].slice(0, 5);
  const activeProjects = projects.filter((p: any) => p.status === "IN_PROGRESS" || p.status === "PLANNING" || p.status === "REVIEW").slice(0, 4);

  const statCards = [
    {
      label: "Collected Revenue",
      value: `$${Number(stats?.paidAmount || 0).toLocaleString()}`,
      change: "+24.8% YoY",
      href: "/invoices?status=PAID",
      icon: DollarSign,
      tone: "success" as const,
      iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs",
      sparkline: [40, 55, 75, 60, 90, 100],
    },
    {
      label: "Outstanding Billing",
      value: `$${Number(stats?.pendingAmount || 0).toLocaleString()}`,
      change: `${invoices.filter((i: any) => i.status === 'PENDING' || i.status === 'SENT').length} pending`,
      href: "/invoices?status=PENDING",
      icon: Receipt,
      tone: "warn" as const,
      iconBg: "bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs",
      sparkline: [30, 45, 40, 60, 50, 42],
    },
    {
      label: "Active Projects",
      value: stats?.activeProjectsCount ?? projects.length,
      change: `${projects.filter((p: any) => p.progress >= 75).length} near completion`,
      href: "/projects",
      icon: FolderKanban,
      tone: "neutral" as const,
      iconBg: "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs",
      sparkline: [20, 35, 50, 65, 80, 85],
    },
    {
      label: "Enterprise Clients",
      value: stats?.totalClients ?? clients.length,
      change: "Active Accounts",
      href: "/clients",
      icon: Users,
      tone: "info" as const,
      iconBg: "bg-blue-50 text-[#0052FF] border border-blue-200 shadow-2xs",
      sparkline: [10, 25, 40, 55, 70, 95],
    },
  ];

  const cmsWidgets = [
    { label: "Services CMS", count: `${services.length} Active`, href: "/services", icon: Boxes, iconBg: "bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs" },
    { label: "Tech Stack & Skills", count: `${technologies.length} Technologies`, href: "/technologies", icon: Code2, iconBg: "bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs" },
    { label: "Testimonials", count: `${testimonials.length} Verified Reviews`, href: "/testimonials", icon: Quote, iconBg: "bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs" },
    { label: "Blogs & Insights", count: `${blogs.length} Published`, href: "/blogs", icon: Newspaper, iconBg: "bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Banner */}
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-800 border border-zinc-200 font-mono shadow-2xs">
                <Sparkles className="h-3 w-3 text-zinc-900" /> STALCI Workspace OS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-mono font-semibold text-emerald-700 border border-emerald-200 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
              Executive Command Center
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted leading-relaxed font-normal">
              Global telemetry orchestrating client accounts, active delivery sprints, automated billing performance, and live public portfolio CMS sync.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link href="/invoices">
              <Button variant="secondary" className="gap-2 text-xs">
                <Receipt className="h-4 w-4 text-muted" /> Invoices
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" className="gap-2 text-xs">
                <FolderKanban className="h-4 w-4 text-muted" /> Projects
              </Button>
            </Link>
            <Link href="/clients">
              <Button variant="primary" className="gap-2 text-xs">
                <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Client
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Bento Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group relative rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-200 hover:border-zinc-400 hover:shadow-pop hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted font-mono">
                  {c.label}
                </span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${c.iconBg} group-hover:scale-105 shadow-2xs`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl sm:text-[26px] font-bold tracking-tight text-ink font-display">
                {statsLoading ? "..." : c.value}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <Badge tone={c.tone} dot>
                  {c.change}
                </Badge>
                {/* Sparkline bars */}
                <div className="flex items-end gap-1 h-5">
                  {c.sparkline.map((h, i) => (
                    <div
                      key={i}
                      className="w-1.2 rounded-full bg-[#0052FF]/30 group-hover:bg-[#0052FF] transition-all"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Revenue Telemetry Chart & Active Delivery Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-line bg-white p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-line">
              <div>
                <h2 className="text-base font-bold text-ink font-display flex items-center gap-2">
                  Revenue & Billing Telemetry
                  <span className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
                </h2>
                <p className="text-xs text-muted">Monthly closed billing performance</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="info" dot>
                  +24.8% YoY
                </Badge>
                <span className="text-[11px] font-mono text-muted bg-surface-2 px-2.5 py-1 rounded-lg border border-line font-bold">
                  2026 Q3
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between gap-2 sm:gap-3 h-52 pt-8 px-2 border-b border-line pb-2">
                {(stats?.revenueTrend || [
                  { month: "Jan", value: 45000 },
                  { month: "Feb", value: 58000 },
                  { month: "Mar", value: 150000 },
                  { month: "Apr", value: 72000 },
                  { month: "May", value: 89000 },
                  { month: "Jun", value: 97650 },
                  { month: "Jul", value: 105000 },
                  { month: "Aug", value: 57120 },
                ]).map((item: any) => {
                  const maxValue = 150000;
                  const heightPercent = Math.max(18, Math.round((item.value / maxValue) * 100));
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2.5 group/bar cursor-pointer">
                      <div className="relative w-full flex items-end justify-center h-40">
                        <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 text-[11px] font-bold bg-[#090A0F] text-white px-2.5 py-1 rounded-md shadow-md transition-all duration-150 whitespace-nowrap z-20 font-mono scale-95 group-hover/bar:scale-100 border border-zinc-700">
                          ${(item.value / 1000).toFixed(0)}k
                        </span>
                        <div
                          className="w-full max-w-[44px] rounded-t-md bg-[#0052FF] group-hover/bar:bg-[#0045D8] shadow-xs transition-all duration-150"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] font-bold text-zinc-600 font-mono group-hover/bar:text-[#0052FF] transition-colors">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <div className="flex items-center gap-4 font-medium">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-md bg-[#0052FF]" /> Closed Revenue
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-md bg-zinc-300" /> Baseline Target
              </span>
            </div>
            <Link href="/invoices" className="text-[#0052FF] font-bold hover:underline inline-flex items-center gap-1.5 transition-all">
              Invoicing Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Active Delivery Bento */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h2 className="text-base font-bold text-ink font-display">Active Sprints</h2>
              <Link href="/projects" className="text-xs font-semibold text-zinc-900 hover:underline inline-flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {activeProjects.length === 0 ? (
                <p className="text-xs text-muted py-6 text-center">No active projects currently in flight.</p>
              ) : (
                activeProjects.map((p: any) => (
                  <div key={p.id} className="p-3 rounded-xl bg-surface-2/60 border border-line hover:border-zinc-400 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-ink truncate max-w-[150px]">{p.title}</span>
                      <span className="font-mono text-[10px] text-muted">{p.progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-surface-3 overflow-hidden">
                      <div className="h-full bg-zinc-950 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs">
            <span className="text-muted font-mono text-[11px]">4 Sprints Delivering</span>
            <Link href="/projects" className="font-semibold text-zinc-900 hover:underline">
              Manage Pipeline →
            </Link>
          </div>
        </div>
      </div>

      {/* CMS & Content Hub Quick Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cmsWidgets.map((w) => {
          const Icon = w.icon;
          return (
            <Link
              key={w.label}
              href={w.href}
              className="group rounded-2xl border border-line bg-white p-4 shadow-card hover:border-zinc-400 hover:shadow-pop transition-all"
            >
              <div className="flex items-center justify-between">
                <span className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all ${w.iconBg} group-hover:scale-105 shadow-2xs`}>
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted group-hover:text-ink transition-colors" />
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-ink group-hover:text-black transition-colors truncate font-display">
                {w.label}
              </h3>
              <p className="mt-0.5 text-[11px] font-mono text-muted font-medium">
                {w.count}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Client Inquiries & Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Recent Client Inquiries</h2>
              <p className="text-xs text-muted">Live prospect submissions from public website</p>
            </div>
            <Link href="/inquiries" className="text-xs font-semibold text-purple-700 hover:underline inline-flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInquiries.length === 0 ? (
              <p className="text-xs text-muted py-6 text-center">No client inquiries received yet.</p>
            ) : (
              recentInquiries.map((inq: any) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-ink truncate">{inq.name}</span>
                      <span className="text-[10px] font-mono text-muted">({inq.company || "Direct"})</span>
                    </div>
                    <p className="text-xs text-muted truncate mt-0.5">{inq.message || inq.subject}</p>
                  </div>
                  <Badge tone={inq.status === "NEW" ? "purple" : "neutral"} className="shrink-0 text-[10px]" dot={inq.status === "NEW"}>
                    {inq.status || "NEW"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Billing Statements */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Recent Billing & Invoices</h2>
              <p className="text-xs text-muted">Live payment settlements</p>
            </div>
            <Link href="/invoices" className="text-xs font-semibold text-purple-700 hover:underline inline-flex items-center gap-1">
              Invoices <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInvoices.length === 0 ? (
              <p className="text-xs text-muted py-6 text-center">No invoices recorded yet.</p>
            ) : (
              recentInvoices.map((inv: any) => (
                <div key={inv.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-ink">{inv.number || `INV-${inv.id}`}</span>
                      <span className="text-xs text-muted truncate">{inv.client?.name || inv.clientName || "Enterprise"}</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted mt-0.5 block">${Number(inv.total || 0).toLocaleString()}</span>
                  </div>
                  <Badge tone={inv.status === "PAID" ? "success" : inv.status === "SENT" ? "warn" : "neutral"} className="shrink-0 text-[10px]" dot={inv.status === "PAID" || inv.status === "SENT"}>
                    {inv.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
