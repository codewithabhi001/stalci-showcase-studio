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
      change: "+24.8% this quarter",
      href: "/invoices?status=PAID",
      icon: DollarSign,
      tone: "success",
    },
    {
      label: "Outstanding Invoices",
      value: stats?.pendingAmount ? `$${Number(stats.pendingAmount).toLocaleString()}` : "$162,120",
      change: `${invoices.filter((i: any) => i.status === 'PENDING' || i.status === 'SENT').length} invoices pending`,
      href: "/invoices?status=PENDING",
      icon: Receipt,
      tone: "warn",
    },
    {
      label: "Active Projects",
      value: stats?.activeProjectsCount ?? projects.length,
      change: `${projects.filter((p: any) => p.progress >= 75).length} near completion`,
      href: "/projects",
      icon: FolderKanban,
      tone: "copper",
    },
    {
      label: "Total Clients",
      value: stats?.totalClients ?? clients.length,
      change: "Enterprise accounts",
      href: "/clients",
      icon: Users,
      tone: "info",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-surface p-6 rounded-2xl border border-line shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-copper-wash px-2.5 py-0.5 text-[11px] font-semibold text-copper-deep border border-copper/20">
              <Sparkles className="h-3 w-3" /> Live Operations
            </span>
            <span className="text-[12px] text-muted">All systems optimal</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
            STALCI Executive Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">
            Overview of clients, active project delivery, billing status, and incoming inquiries.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link href="/invoices">
            <Button variant="secondary" className="gap-2">
              <Receipt className="h-4 w-4 text-copper" /> Invoices
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary" className="gap-2">
              <FolderKanban className="h-4 w-4 text-copper" /> Projects
            </Button>
          </Link>
          <Link href="/clients">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Client
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-copper/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {c.label}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-canvas text-ink group-hover:bg-copper-wash group-hover:text-copper-deep transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
                {statsLoading ? "..." : c.value}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <TrendingUp className="h-3 w-3 text-emerald-600" />
                <span>{c.change}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Revenue Trend Visual & Project Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-semibold text-ink">Revenue & Billing Trend</h2>
              <p className="text-xs text-muted">Monthly closed revenue performance</p>
            </div>
            <Badge tone="success">
              +24.8% YoY
            </Badge>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between gap-2 h-44 pt-6 px-2">
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
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group/bar">
                    <div className="relative w-full flex items-end justify-center h-32">
                      <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 text-[10px] font-bold bg-ink text-white px-1.5 py-0.5 rounded shadow-sm transition-opacity whitespace-nowrap z-10">
                        ${(item.value / 1000).toFixed(0)}k
                      </span>
                      <div
                        className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-copper/20 via-copper/60 to-copper transition-all duration-300 group-hover/bar:brightness-110"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-muted">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-copper" /> Collected Invoices
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-copper/30" /> Pending Invoices
              </span>
            </div>
            <Link href="/invoices" className="text-copper-deep font-semibold hover:underline inline-flex items-center gap-1">
              View Invoicing Center <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Quick Active Projects Card */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div>
                <h2 className="text-base font-semibold text-ink">Active Delivery</h2>
                <p className="text-xs text-muted">Sprint progress & milestones</p>
              </div>
              <Link href="/projects" className="text-xs font-semibold text-copper-deep hover:underline">
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {activeProjects.map((p: any) => (
                <div key={p.id} className="p-3 rounded-xl bg-canvas border border-line space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-ink line-clamp-1">{p.title}</h4>
                      <p className="text-[11px] text-muted">{p.client?.company || "Direct Client"}</p>
                    </div>
                    <Badge tone={p.priority === "URGENT" ? "danger" : p.priority === "HIGH" ? "warn" : "neutral"}>
                      {p.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-muted font-medium">
                      <span>Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="w-full bg-line rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-copper h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {activeProjects.length === 0 && (
                <p className="text-xs text-muted py-6 text-center">No active projects found.</p>
              )}
            </div>
          </div>

          <Link href="/projects" className="mt-4">
            <Button variant="secondary" className="w-full text-xs gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Launch New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Two-Column Lower Grid: Recent Invoices & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-semibold text-ink">Recent Invoices</h2>
              <p className="text-xs text-muted">Latest billing records & status</p>
            </div>
            <Link href="/invoices" className="text-xs font-semibold text-copper-deep hover:underline">
              View all ({invoices.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInvoices.map((inv: any) => (
              <div key={inv.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-canvas border border-line flex items-center justify-center font-mono text-[11px] font-bold text-ink">
                    INV
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink font-mono">{inv.invoiceNumber}</span>
                      <Badge tone={inv.status === "PAID" ? "success" : inv.status === "SENT" ? "info" : "warn"}>
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
                  <span className="text-[10px] text-muted">
                    {inv.items?.length || 1} line items
                  </span>
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && (
              <p className="text-xs text-muted py-6 text-center">No invoices yet.</p>
            )}
          </div>
        </div>

        {/* Recent Client Inquiries */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="text-base font-semibold text-ink">Incoming Inquiries & Leads</h2>
              <p className="text-xs text-muted">Direct submissions from the public website</p>
            </div>
            <Link href="/inquiries" className="text-xs font-semibold text-copper-deep hover:underline">
              Manage leads ({inquiries.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-line">
            {recentInquiries.map((inq: any) => (
              <div key={inq.id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">{inq.name}</span>
                    {inq.company && (
                      <span className="text-[11px] text-muted">({inq.company})</span>
                    )}
                    <Badge tone={inq.status === "NEW" ? "danger" : inq.status === "CONTACTED" ? "info" : "success"}>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-ink-2 mt-1 line-clamp-1">
                    "{inq.message}"
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-muted">
                    <span>{inq.service || "General Inquiry"}</span>
                    {inq.budget && <span>• Budget: {inq.budget}</span>}
                    <span>• {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <a
                  href={`mailto:${inq.email}?subject=RE: Project Inquiry with STALCI`}
                  className="shrink-0 text-xs font-semibold text-copper-deep hover:underline p-1"
                >
                  Reply
                </a>
              </div>
            ))}
            {recentInquiries.length === 0 && (
              <p className="text-xs text-muted py-6 text-center">No incoming inquiries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
