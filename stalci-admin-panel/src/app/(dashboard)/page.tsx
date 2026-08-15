"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchStats, fetchInquiries, fetchInvoices, fetchProjects, fetchClients } from "@/lib/api";
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

  const recentInquiries = [...inquiries].slice(0, 4);
  const recentInvoices = [...invoices].slice(0, 5);
  const activeProjects = projects.filter((p: any) => p.status === "IN_PROGRESS" || p.status === "PLANNING" || p.status === "REVIEW").slice(0, 4);

  const statCards = [
    {
      label: "Collected Revenue",
      value: stats?.paidAmount ? `$${Number(stats.paidAmount).toLocaleString()}` : "$247,650",
      change: "+24.8% YoY",
      href: "/invoices?status=PAID",
      icon: DollarSign,
      tone: "success" as const,
      sparkline: [40, 55, 75, 60, 90, 100],
    },
    {
      label: "Outstanding Billing",
      value: stats?.pendingAmount ? `$${Number(stats.pendingAmount).toLocaleString()}` : "$162,120",
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
    { label: "Services CMS", count: "12 Active", href: "/services", icon: Boxes },
    { label: "Tech Stack & Skills", count: "24 Technologies", href: "/technologies", icon: Code2 },
    { label: "Testimonials", count: "18 Verified Reviews", href: "/testimonials", icon: Quote },
    { label: "Blogs & Insights", count: "9 Published", href: "/blogs", icon: Newspaper },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Portfolio-Grade Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/90 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[100px] animate-float-orb"
          style={{ background: "#D89B5B" }}
        />
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full opacity-10 blur-[90px]"
          style={{ background: "#D89B5B" }}
        />
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/15 px-3 py-0.5 text-[11px] font-bold text-copper-deep border border-copper/35 font-mono shadow-2xs">
                <Sparkles className="h-3 w-3 text-copper animate-pulse" /> STALCI OS v3.0
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
              Executive Command Center
            </h1>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted leading-relaxed">
              Global telemetry orchestrating client accounts, active delivery sprints, automated billing performance, and live public portfolio CMS sync.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link href="/invoices">
              <Button variant="secondary" className="gap-2 text-xs">
                <Receipt className="h-4 w-4 text-copper" /> Invoices
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" className="gap-2 text-xs">
                <FolderKanban className="h-4 w-4 text-copper" /> Projects
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

      {/* 4 Bento Stat Cards with Sparkline Visualizers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-5 shadow-card transition-all duration-300 card-lift hover:border-copper/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-widest text-muted font-mono">
                  {c.label}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2/80 text-faint group-hover:bg-copper/20 group-hover:text-copper transition-all border border-line group-hover:border-copper/40 group-hover:scale-105">
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
                      className="w-1 rounded-full bg-copper/30 group-hover:bg-copper transition-all"
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
        <div className="lg:col-span-2 rounded-3xl border border-line bg-surface/90 p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-line">
              <div>
                <h2 className="text-base font-bold text-ink font-display flex items-center gap-2">
                  Revenue & Billing Telemetry
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                </h2>
                <p className="text-xs text-muted">Monthly closed billing performance</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="success" dot>
                  +24.8% YoY
                </Badge>
                <span className="text-[11px] font-mono text-faint bg-surface-2 px-2 py-1 rounded-lg border border-line">
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
                        <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 text-[10px] font-bold bg-surface-2 text-ink border border-copper/40 px-2 py-0.5 rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap z-20 font-mono scale-95 group-hover/bar:scale-100">
                          ${(item.value / 1000).toFixed(0)}k
                        </span>
                        <div
                          className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-copper/20 via-copper/60 to-copper transition-all duration-300 group-hover/bar:brightness-125 group-hover/bar:shadow-[0_0_20px_rgba(216,155,91,0.4)]"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-muted font-mono group-hover/bar:text-copper transition-colors">
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
                <span className="h-2.5 w-2.5 rounded-md bg-gradient-to-r from-copper to-copper-soft" /> Paid Invoices
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-md bg-copper/20 border border-copper/40" /> Pending Billing
              </span>
            </div>
            <Link href="/invoices" className="text-copper-deep font-bold hover:text-copper hover:underline inline-flex items-center gap-1.5 transition-all">
              Invoicing Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Active Delivery Bento */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div>
                <h2 className="text-base font-bold text-ink font-display">Active Delivery</h2>
                <p className="text-xs text-muted">Live sprint milestones</p>
              </div>
              <Link href="/projects" className="text-xs font-bold text-copper-deep hover:text-copper hover:underline">
                View all ({projects.length})
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {activeProjects.map((p: any) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-surface-2/70 border border-line space-y-2 hover:border-copper/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-ink line-clamp-1">{p.title}</h4>
                      <p className="text-[11px] text-muted">{p.client?.company || "Direct Enterprise Client"}</p>
                    </div>
                    <Badge tone={p.priority === "URGENT" ? "danger" : p.priority === "HIGH" ? "warn" : "neutral"} dot>
                      {p.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-muted font-mono font-medium">
                      <span>Completion</span>
                      <span className="text-copper-deep font-bold">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-3 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-copper-deep to-copper h-1.5 rounded-full transition-all duration-500 shadow-2xs"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {activeProjects.length === 0 && (
                <p className="text-xs text-muted py-8 text-center font-mono">No active delivery projects.</p>
              )}
            </div>
          </div>

          <Link href="/projects" className="mt-4">
            <Button variant="secondary" className="w-full text-xs gap-1.5">
              <Plus className="h-3.5 w-3.5 text-copper" /> Launch New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Two-Column Lower Grid: Recent Invoices & Incoming Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Recent Billing Statements</h2>
              <p className="text-xs text-muted">Latest client invoices & payment status</p>
            </div>
            <Link href="/invoices" className="text-xs font-bold text-copper-deep hover:text-copper hover:underline">
              View all ({invoices.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInvoices.map((inv: any) => (
              <div key={inv.id} className="py-3 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-surface-2 border border-line flex items-center justify-center font-mono text-[11px] font-bold text-copper group-hover:border-copper/40 transition-colors">
                    INV
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink font-mono">{inv.invoiceNumber}</span>
                      <Badge tone={inv.status === "PAID" ? "success" : inv.status === "SENT" ? "info" : "warn"} dot>
                        {inv.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted mt-0.5">
                      {inv.client?.company || inv.client?.name || "Client"} • Due {new Date(inv.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-ink block font-mono">
                    ${Number(inv.total || 0).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {inv.items?.length || 1} line item{inv.items?.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && (
              <p className="text-xs text-muted py-6 text-center font-mono">No billing statements yet.</p>
            )}
          </div>
        </div>

        {/* Recent Client Inquiries */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-bold text-ink font-display">Incoming Leads & Inquiries</h2>
              <p className="text-xs text-muted">Direct submissions from stalci.com portfolio</p>
            </div>
            <Link href="/inquiries" className="text-xs font-bold text-copper-deep hover:text-copper hover:underline">
              Manage leads ({inquiries.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInquiries.map((inq: any) => (
              <div key={inq.id} className="py-3 flex items-start justify-between gap-3 group">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-ink">{inq.name}</span>
                    {inq.company && (
                      <span className="text-[11px] text-muted">({inq.company})</span>
                    )}
                    <Badge tone={inq.status === "NEW" ? "danger" : inq.status === "CONTACTED" ? "info" : "success"} dot>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-ink-2 mt-1 line-clamp-1 italic">
                    "{inq.message}"
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-muted font-mono">
                    <span className="text-copper">{inq.service || "General Project"}</span>
                    {inq.budget && <span>• Budget: {inq.budget}</span>}
                    <span>• {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <a
                  href={`mailto:${inq.email}?subject=RE: Project Inquiry with STALCI`}
                  className="shrink-0 text-xs font-bold text-copper hover:text-copper-soft hover:underline p-1"
                >
                  Reply ↗
                </a>
              </div>
            ))}
            {recentInquiries.length === 0 && (
              <p className="text-xs text-muted py-6 text-center font-mono">No incoming website leads.</p>
            )}
          </div>
        </div>
      </div>

      {/* CMS Live Portfolio Telemetry Bar */}
      <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-copper/15 border border-copper/30 flex items-center justify-center text-copper">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink font-display">Live Portfolio CMS Telemetry</h2>
              <p className="text-xs text-muted">Real-time content sync across STALCI Showcase Studio</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-copper-deep bg-copper/10 px-2.5 py-1 rounded-full border border-copper/30">
            Synced with Portfolio
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cmsWidgets.map((w) => {
            const Icon = w.icon;
            return (
              <Link
                key={w.label}
                href={w.href}
                className="group p-4 rounded-2xl bg-surface-2/60 border border-line hover:border-copper/40 transition-all card-lift flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-copper group-hover:scale-110 transition-transform" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-faint group-hover:text-copper transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink group-hover:text-copper transition-colors">{w.label}</h4>
                  <p className="text-[11px] text-muted font-mono mt-0.5">{w.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

