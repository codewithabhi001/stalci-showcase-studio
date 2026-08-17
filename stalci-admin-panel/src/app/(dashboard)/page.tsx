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
      sparkline: [40, 55, 75, 60, 90, 100],
    },
    {
      label: "Outstanding Billing",
      value: `$${Number(stats?.pendingAmount || 0).toLocaleString()}`,
      change: `${invoices.filter((i: any) => i.status === 'PENDING' || i.status === 'SENT').length} pending`,
      href: "/invoices?status=PENDING",
      icon: Receipt,
      tone: "warn" as const,
      sparkline: [30, 45, 40, 60, 50, 42],
    },
    {
      label: "Active Projects",
      value: stats?.activeProjectsCount ?? projects.length,
      change: `${projects.filter((p: any) => p.progress >= 75).length} near completion`,
      href: "/projects",
      icon: FolderKanban,
      tone: "copper" as const,
      sparkline: [20, 35, 50, 65, 80, 85],
    },
    {
      label: "Enterprise Clients",
      value: stats?.totalClients ?? clients.length,
      change: "Active Accounts",
      href: "/clients",
      icon: Users,
      tone: "info" as const,
      sparkline: [10, 25, 40, 55, 70, 95],
    },
  ];

  const cmsWidgets = [
    { label: "Services CMS", count: `${services.length} Active`, href: "/services", icon: Boxes },
    { label: "Tech Stack & Skills", count: `${technologies.length} Technologies`, href: "/technologies", icon: Code2 },
    { label: "Testimonials", count: `${testimonials.length} Verified Reviews`, href: "/testimonials", icon: Quote },
    { label: "Blogs & Insights", count: `${blogs.length} Published`, href: "/blogs", icon: Newspaper },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Banner */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 border border-indigo-200 font-mono">
                <Sparkles className="h-3 w-3 text-indigo-600" /> STALCI OS v3.0
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-display">
              Executive Command Center
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Global telemetry orchestrating client accounts, active delivery sprints, automated billing performance, and live public portfolio CMS sync.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link href="/invoices">
              <Button variant="secondary" className="gap-2 text-xs">
                <Receipt className="h-4 w-4 text-zinc-500" /> Invoices
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" className="gap-2 text-xs">
                <FolderKanban className="h-4 w-4 text-zinc-500" /> Projects
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
              className="group relative rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-2xs transition-all duration-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                  {c.label}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-50 text-zinc-700 border border-zinc-200/90 group-hover:bg-zinc-100 transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl sm:text-[26px] font-bold tracking-tight text-zinc-950 font-display">
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
                      className="w-1 rounded-full bg-zinc-200 group-hover:bg-indigo-600 transition-all"
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
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100">
              <div>
                <h2 className="text-base font-bold text-zinc-950 font-display flex items-center gap-2">
                  Revenue & Billing Telemetry
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                </h2>
                <p className="text-xs text-zinc-500">Monthly closed billing performance</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="success" dot>
                  +24.8% YoY
                </Badge>
                <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded-lg border border-zinc-200">
                  2026 Q3
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between gap-2.5 h-48 pt-6 px-1">
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
                  const heightPercent = Math.max(15, Math.round((item.value / maxValue) * 100));
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer">
                      <div className="relative w-full flex items-end justify-center h-36">
                        <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 text-[10px] font-bold bg-zinc-900 text-white px-2 py-0.5 rounded-md shadow-md transition-all duration-200 whitespace-nowrap z-20 font-mono scale-95 group-hover/bar:scale-100">
                          ${(item.value / 1000).toFixed(0)}k
                        </span>
                        <div
                          className="w-full max-w-[40px] rounded-t-lg bg-zinc-100 border border-zinc-200 group-hover/bar:bg-indigo-600 group-hover/bar:border-indigo-600 transition-all duration-200"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-500 font-mono group-hover/bar:text-zinc-950 transition-colors">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-4 font-medium">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-md bg-indigo-600" /> Closed Revenue
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-md bg-zinc-200" /> Baseline Target
              </span>
            </div>
            <Link href="/invoices" className="text-zinc-950 font-bold hover:text-indigo-600 hover:underline inline-flex items-center gap-1.5 transition-all">
              Invoicing Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Active Delivery Bento */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 font-display">Active Sprints</h2>
              <Link href="/projects" className="text-xs font-semibold text-zinc-950 hover:underline inline-flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {activeProjects.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center">No active projects currently in flight.</p>
              ) : (
                activeProjects.map((p: any) => (
                  <div key={p.id} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-950 truncate max-w-[150px]">{p.title}</span>
                      <span className="font-mono text-[10px] text-zinc-500">{p.progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono text-[11px]">4 Sprints Delivering</span>
            <Link href="/projects" className="font-semibold text-zinc-950 hover:underline">
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
              className="group rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-2xs hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="h-8 w-8 rounded-lg bg-zinc-50 border border-zinc-200/90 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-100 transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-black transition-colors truncate">
                {w.label}
              </h3>
              <p className="mt-0.5 text-[11px] font-mono text-zinc-500 font-medium">
                {w.count}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Client Inquiries & Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">Recent Client Inquiries</h2>
              <p className="text-xs text-zinc-500">Live prospect submissions from public website</p>
            </div>
            <Link href="/inquiries" className="text-xs font-semibold text-zinc-950 hover:underline inline-flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recentInquiries.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No client inquiries received yet.</p>
            ) : (
              recentInquiries.map((inq: any) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-950 truncate">{inq.name}</span>
                      <span className="text-[10px] font-mono text-zinc-400">({inq.company || "Direct"})</span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">{inq.message || inq.subject}</p>
                  </div>
                  <Badge tone={inq.status === "NEW" ? "copper" : "neutral"} className="shrink-0 text-[10px]">
                    {inq.status || "NEW"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Billing Statements */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">Recent Billing & Invoices</h2>
              <p className="text-xs text-zinc-500">Live payment settlements</p>
            </div>
            <Link href="/invoices" className="text-xs font-semibold text-zinc-950 hover:underline inline-flex items-center gap-1">
              Invoices <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recentInvoices.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No invoices recorded yet.</p>
            ) : (
              recentInvoices.map((inv: any) => (
                <div key={inv.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-zinc-950">{inv.number || `INV-${inv.id}`}</span>
                      <span className="text-xs text-zinc-500 truncate">{inv.client?.name || inv.clientName || "Enterprise"}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 mt-0.5 block">${Number(inv.total || 0).toLocaleString()}</span>
                  </div>
                  <Badge tone={inv.status === "PAID" ? "success" : inv.status === "SENT" ? "warn" : "neutral"} className="shrink-0 text-[10px]">
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
