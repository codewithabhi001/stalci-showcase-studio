"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchHrDashboard } from "@/lib/api";
import { useRbac } from "@/lib/rbac-context";
import {
  Users,
  UserCheck,
  UserPlus,
  Briefcase,
  CalendarCheck,
  Clock,
  DollarSign,
  Laptop,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HrDashboardPage() {
  const { roleInfo, currentRole } = useRbac();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["hr-dashboard"],
    queryFn: fetchHrDashboard,
  });

  const kpis = [
    {
      title: "Total Headcount",
      value: stats?.totalEmployees || 0,
      sub: `${stats?.activeEmployees || 0} active, ${stats?.onboardingCount || 0} onboarding`,
      icon: Users,
      tone: "copper" as const,
      href: "/hr/employees",
    },
    {
      title: "Open Candidates",
      value: stats?.openCandidates || 0,
      sub: "In screening & interview pipeline",
      icon: UserPlus,
      tone: "info" as const,
      href: "/hr/recruitment",
    },
    {
      title: "Pending Leave Requests",
      value: stats?.pendingLeaves || 0,
      sub: "Awaiting manager approval",
      icon: Clock,
      tone: "warn" as const,
      href: "/hr/attendance-leave",
    },
    {
      title: "Monthly Payroll Run",
      value: stats?.monthlyPayroll ? `$${stats.monthlyPayroll.toLocaleString()}` : "$0",
      sub: `Annual CTC: $${(stats?.totalCtc || 0).toLocaleString()}`,
      icon: DollarSign,
      tone: "success" as const,
      href: "/hr/payroll",
      hideForRecruiter: true,
    },
    {
      title: "Active Internships",
      value: stats?.internCount || 0,
      sub: "Mentored research programs",
      icon: GraduationCap,
      tone: "info" as const,
      href: "/hr/internships",
    },
    {
      title: "IT Assets Deployed",
      value: `${stats?.assignedAssets || 0} / ${stats?.totalAssets || 0}`,
      sub: "Hardware, MacBooks & Keys",
      icon: Laptop,
      tone: "neutral" as const,
      href: "/hr/assets",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Portfolio Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-card backdrop-blur-xl">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-10 blur-[100px] animate-float-orb"
          style={{ background: "#6366F1" }}
        />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/15 px-3 py-0.5 text-[11px] font-bold text-copper-deep border border-copper/35 font-mono shadow-2xs">
                <Sparkles className="h-3 w-3 text-copper animate-pulse" /> People & HR Operations
              </span>
              <Badge tone={roleInfo.badgeTone as any} dot className="text-[10px]">
                {roleInfo.label}
              </Badge>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
              HR Command Center & Talent Intelligence
            </h1>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted leading-relaxed">
              Global workforce telemetry, talent recruitment pipelines, monthly payroll allocations, and employee lifecycle management.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/hr/employees">
              <Button variant="primary" className="gap-2 text-xs">
                <UserPlus className="h-4 w-4" /> Manage Workforce
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          if (currentRole === "RECRUITER" && kpi.hideForRecruiter) return null;
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-5 shadow-card transition-all duration-300 card-lift hover:border-copper/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-muted uppercase tracking-widest font-mono">{kpi.title}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 text-faint group-hover:bg-copper/20 group-hover:text-copper transition-all border border-line group-hover:border-copper/40">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 text-2xl sm:text-[26px] font-extrabold text-ink font-display">
                {isLoading ? "..." : kpi.value}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span className="text-[11.5px]">{kpi.sub}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-copper opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Department Breakdown & Recent Hires Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Headcount */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-bold text-ink font-display flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-copper" />
              Department Headcount Distribution
            </h3>
            <span className="text-xs text-copper-deep font-mono font-bold bg-copper/10 px-2.5 py-1 rounded-full border border-copper/30">
              {stats?.departmentBreakdown?.length || 0} Departments
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {stats?.departmentBreakdown?.map((dept: any, idx: number) => {
              const pct = stats.totalEmployees > 0 ? Math.round((dept.count / stats.totalEmployees) * 100) : 0;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink">
                    <span>{dept.name}</span>
                    <span className="font-mono text-muted">{dept.count} Members ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-copper-deep via-copper to-copper-soft transition-all duration-500 shadow-2xs"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Action Items & Recent Hires */}
        <div className="rounded-3xl border border-line bg-surface/90 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-bold text-ink font-display flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-copper" />
              Recent High-Caliber Onboardings
            </h3>
            <Link href="/hr/employees" className="text-xs text-copper-deep font-bold hover:text-copper hover:underline">
              View Directory ↗
            </Link>
          </div>

          <div className="divide-y divide-line">
            {stats?.recentHires?.map((emp: any) => (
              <div key={emp.id} className="py-3 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-copper/15 border border-copper/35 text-copper-deep flex items-center justify-center font-mono font-bold text-xs shadow-2xs group-hover:border-copper transition-colors">
                    {emp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink group-hover:text-copper transition-colors">{emp.name}</h4>
                    <p className="text-[11px] text-muted">{emp.designation}</p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px]">
                  <span className="rounded-lg bg-surface-2 px-2.5 py-1 border border-line text-muted">
                    {emp.employeeCode}
                  </span>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                    Joined {new Date(emp.joiningDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

