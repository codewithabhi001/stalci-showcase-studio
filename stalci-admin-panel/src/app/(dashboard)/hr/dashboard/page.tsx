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
      tone: "neutral" as const,
      iconBg: "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs",
      href: "/hr/employees",
    },
    {
      title: "Open Candidates",
      value: stats?.openCandidates || 0,
      sub: "In screening & interview pipeline",
      icon: UserPlus,
      tone: "info" as const,
      iconBg: "bg-blue-50 text-[#0052FF] border border-blue-200 shadow-2xs",
      href: "/hr/recruitment",
    },
    {
      title: "Pending Leave Requests",
      value: stats?.pendingLeaves || 0,
      sub: "Awaiting manager approval",
      icon: Clock,
      tone: "warn" as const,
      iconBg: "bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs",
      href: "/hr/attendance-leave",
    },
    {
      title: "Monthly Payroll Run",
      value: stats?.monthlyPayroll ? `$${stats.monthlyPayroll.toLocaleString()}` : "$0",
      sub: `Annual CTC: $${(stats?.totalCtc || 0).toLocaleString()}`,
      icon: DollarSign,
      tone: "success" as const,
      iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs",
      href: "/hr/payroll",
      hideForRecruiter: true,
    },
    {
      title: "Active Internships",
      value: stats?.internCount || 0,
      sub: "Mentored research programs",
      icon: GraduationCap,
      tone: "neutral" as const,
      iconBg: "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs",
      href: "/hr/internships",
    },
    {
      title: "IT Assets Deployed",
      value: `${stats?.assignedAssets || 0} / ${stats?.totalAssets || 0}`,
      sub: "Hardware & Workstations",
      icon: Laptop,
      tone: "neutral" as const,
      iconBg: "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs",
      href: "/hr/assets",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Banner */}
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-800 border border-zinc-200 font-mono shadow-2xs">
                <Sparkles className="h-3 w-3 text-zinc-900" /> People & HR Operations
              </span>
              <Badge tone={roleInfo.badgeTone as any} dot className="text-[10px]">
                {roleInfo.label}
              </Badge>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
              HR Command Center & Talent Intelligence
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted leading-relaxed font-normal">
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
              className="group relative rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-200 hover:border-zinc-400 hover:shadow-pop hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-muted uppercase tracking-wider font-mono">{kpi.title}</span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${kpi.iconBg} group-hover:scale-105 shadow-2xs`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 text-2xl sm:text-[26px] font-extrabold text-ink font-display">
                {isLoading ? "..." : kpi.value}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span className="text-[11.5px]">{kpi.sub}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted opacity-0 group-hover:opacity-100 group-hover:text-ink transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Department Breakdown & Recent Hires Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Headcount */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-bold text-ink font-display flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-zinc-900" />
              Department Headcount Distribution
            </h3>
            <span className="text-xs text-zinc-900 font-mono font-bold bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
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
                  <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-950 transition-all duration-300"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Hires */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-bold text-ink font-display flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-zinc-900" />
              Recent High-Caliber Onboardings
            </h3>
            <Link href="/hr/employees" className="text-xs text-zinc-900 font-bold hover:underline">
              View Directory ↗
            </Link>
          </div>

          <div className="divide-y divide-line">
            {stats?.recentHires?.map((emp: any) => (
              <div key={emp.id} className="py-3 flex items-center justify-between gap-3 group first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                    {emp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink group-hover:text-black transition-colors">{emp.name}</h4>
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
