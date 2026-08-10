"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchStats, fetchInquiries, fetchInvoices } from "@/lib/api";
import { Skeleton } from "@/components/ui/states";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Briefcase,
  Receipt,
  Newspaper,
  FileText,
  Boxes,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });
  const { data: inquiries = [] } = useQuery({ queryKey: ["inquiries"], queryFn: fetchInquiries });
  const { data: invoices = [] } = useQuery({ queryKey: ["invoices"], queryFn: fetchInvoices });

  const cards = [
    { label: "Client Inquiries", value: stats?.totalInquiries ?? 0, href: "/inquiries", icon: MessageSquare, hint: "Total received" },
    {
      label: "Pending Revenue",
      value: stats?.pendingAmount ? `$${Number(stats.pendingAmount).toLocaleString()}` : "$0",
      href: "/invoices",
      icon: Receipt,
      hint: "Awaiting payment",
    },
    { label: "Active Jobs", value: stats?.activeJobs ?? 0, href: "/jobs", icon: Briefcase, hint: "Open roles" },
    { label: "Published Blogs", value: stats?.totalBlogs ?? 0, href: "/blogs", icon: Newspaper, hint: "Articles live" },
    { label: "Site Pages", value: stats?.totalPages ?? 0, href: "/pages", icon: FileText, hint: "CMS entries" },
    { label: "Services", value: stats?.totalServices ?? 0, href: "/services", icon: Boxes, hint: "Offerings listed" },
  ];

  const recentInquiries = [...inquiries].slice(0, 5);
  const recentInvoices = [...invoices].slice(0, 5);

  return (
    <div className="animate-fade-up space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1.5 text-[26px] font-semibold leading-tight text-ink">Welcome back</h1>
          <p className="mt-1.5 text-[13px] text-muted">Everything happening across the Stalci portfolio, at a glance.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/blogs">
            <Button variant="secondary">
              <Plus className="h-4 w-4" /> New post
            </Button>
          </Link>
          <Link href="/settings">
            <Button>
              <Settings className="h-4 w-4" /> Site config
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-[14px] border border-line bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-copper/40 hover:shadow-md"
              style={{ animation: `fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both ${i * 0.04}s` }}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-copper/5 blur-2xl transition-all duration-500 group-hover:bg-copper/10" />
              
              <div className="relative flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-copper-wash text-copper-deep ring-1 ring-copper/10 transition-colors group-hover:bg-copper/10">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-2" />
                </span>
              </div>
              
              <div className="relative mt-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-medium text-muted">{c.label}</p>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
                    <span className="h-1 w-1 rounded-full bg-copper-soft" />
                    {c.hint}
                  </div>
                </div>
                <p className="mt-1 text-[24px] font-semibold leading-none tracking-tight text-ink">
                  {isLoading ? <span className="inline-block h-6 w-16 animate-pulse rounded bg-canvas" /> : c.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <RevenueCard stats={stats} />

        <section className="card p-4 relative overflow-hidden group">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">Latest inquiries</h2>
            <Link href="/inquiries" className="text-[12.5px] font-semibold text-copper hover:text-copper-deep">
              View all
            </Link>
          </header>
          {recentInquiries.length === 0 ? (
            <p className="py-8 text-center text-[13px] text-faint">No inquiries yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recentInquiries.map((q: any) => (
                <li key={q.id} className="flex items-start gap-3.5 py-3.5 first:pt-0 hover:bg-canvas/40 px-1 -mx-1 rounded-lg transition-colors">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-canvas shadow-sm text-[11.5px] font-bold text-ink-2">
                    {String(q.name ?? "?").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold text-ink">{q.name ?? "Unknown"}</p>
                    <p className="truncate text-[12.5px] text-muted">{q.message ?? q.email ?? "—"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Invoices */}
      <section className="card overflow-hidden">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-[15px] font-semibold text-ink">Recent invoices</h2>
          <Link href="/invoices" className="text-[12.5px] font-semibold text-copper hover:text-copper-deep">
            Manage invoices
          </Link>
        </header>
        {recentInvoices.length === 0 ? (
          <p className="py-12 text-center text-[13px] text-faint">No invoices recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th className="eyebrow px-5 py-3">Client</th>
                  <th className="eyebrow px-5 py-3">Amount</th>
                  <th className="eyebrow px-5 py-3">Status</th>
                  <th className="eyebrow px-5 py-3">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentInvoices.map((inv: any) => (
                  <tr key={inv.id} className="hover:bg-surface-2">
                    <td className="px-5 py-3.5 text-[13.5px] font-medium text-ink">{inv.clientName}</td>
                    <td className="px-5 py-3.5 text-[13.5px] text-ink-2">${Number(inv.amount ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={inv.status === "PAID" ? "success" : inv.status === "CANCELLED" ? "danger" : "warning"}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-[13.5px] text-muted">
                      {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
function RevenueCard({ stats }: { stats: any }) {
  const trend = stats?.revenueTrend || [];
  const growth = stats?.revenueGrowth || 0;
  
  // Calculate SVG path based on trend data
  // Max height of SVG is 140, min height is 30. width is 500.
  // We have 7 points, so x spacing is 500 / 6 = 83.33
  const maxVal = Math.max(...trend.map((t: any) => t.value), 1);
  
  let pathStr = "M 0 160"; // Start at bottom left
  let lineStr = "";
  
  if (trend.length > 0) {
    trend.forEach((t: any, i: number) => {
      const x = i * (500 / (trend.length - 1));
      const y = 140 - ((t.value / maxVal) * 110); // Map to y: 30-140
      
      if (i === 0) {
        pathStr += ` L ${x} ${y}`;
        lineStr += `M ${x} ${y}`;
      } else {
        pathStr += ` L ${x} ${y}`;
        lineStr += ` L ${x} ${y}`;
      }
    });
    pathStr += " L 500 160 Z"; // Close path at bottom right
  } else {
    // Fallback if no data
    pathStr = "M 0 140 L 80 115 L 160 128 L 240 84 L 320 98 L 400 48 L 500 30 L 500 160 Z";
    lineStr = "M 0 140 L 80 115 L 160 128 L 240 84 L 320 98 L 400 48 L 500 30";
  }

  return (
    <section className="card p-4 lg:col-span-2 relative overflow-hidden group z-0">
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-copper/5 blur-3xl -z-10 transition-transform duration-700 group-hover:scale-110" />
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Revenue trend</h2>
          <p className="mt-1 text-[12.5px] text-muted">Rolling view of invoiced value</p>
        </div>
        <Badge tone={growth >= 0 ? "success" : "danger"} className={`border font-medium shadow-sm ${growth >= 0 ? "border-success/20 bg-success-wash text-success" : "border-danger/20 bg-danger-wash text-danger"}`}>
          <TrendingUp className={`h-3.5 w-3.5 mr-1 ${growth < 0 ? "rotate-180" : ""}`} /> {growth >= 0 ? "+" : ""}{growth}%
        </Badge>
      </header>
      <div className="h-52 w-full">
        <svg className="h-full w-full" viewBox="0 0 500 160" preserveAspectRatio="none" role="img" aria-label="Revenue trend chart">
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-copper)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--color-copper)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 75, 115].map((y) => (
            <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 6" />
          ))}
          {trend.length > 0 && (
            <>
              <path d={pathStr} fill="url(#rev-fill)" />
              <path
                d={lineStr}
                fill="none"
                stroke="var(--color-copper)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[11.5px] text-faint">
        {trend.length > 0 
          ? trend.map((t: any) => <span key={t.month}>{t.month}</span>)
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => <span key={m}>{m}</span>)
        }
      </div>
    </section>
  );
}
