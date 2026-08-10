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
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
      color: "text-amber-500",
      href: "/hr/employees",
    },
    {
      title: "Open Candidates",
      value: stats?.openCandidates || 0,
      sub: "In screening & interview pipeline",
      icon: UserPlus,
      color: "text-blue-500",
      href: "/hr/recruitment",
    },
    {
      title: "Pending Leave Requests",
      value: stats?.pendingLeaves || 0,
      sub: "Awaiting manager approval",
      icon: Clock,
      color: "text-amber-600",
      href: "/hr/attendance-leave",
    },
    {
      title: "Monthly Payroll Run",
      value: stats?.monthlyPayroll ? `$${stats.monthlyPayroll.toLocaleString()}` : "$0",
      sub: `Annual CTC: $${(stats?.totalCtc || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-500",
      href: "/hr/payroll",
      hideForRecruiter: true,
    },
    {
      title: "Active Internships",
      value: stats?.internCount || 0,
      sub: "Mentored research programs",
      icon: GraduationCap,
      color: "text-purple-500",
      href: "/hr/internships",
    },
    {
      title: "IT Assets Deployed",
      value: `${stats?.assignedAssets || 0} / ${stats?.totalAssets || 0}`,
      sub: "Hardware, MacBooks & Keys",
      icon: Laptop,
      color: "text-indigo-500",
      href: "/hr/assets",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-copper">People & Human Resources</span>
            <Badge tone={roleInfo.badgeTone} className="text-[10px]">
              {roleInfo.label}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            HR Command Center & Workforce Analytics
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time organizational telemetry, hiring pipeline metrics, payroll disbursements, and employee welfare.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/hr/employees"
            className="px-3.5 py-2 rounded-xl bg-copper text-slate-950 text-xs font-bold hover:bg-copper-soft transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="h-4 w-4" /> Manage Employees
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          if (currentRole === "RECRUITER" && kpi.hideForRecruiter) return null;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="rounded-2xl border border-line bg-surface p-5 hover:border-copper/60 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{kpi.title}</span>
                <span className={`p-2 rounded-xl bg-surface-2 ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-3 text-2xl font-extrabold text-ink">
                {isLoading ? "..." : kpi.value}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted">
                <span>{kpi.sub}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-copper opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Department Breakdown & Pending Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Headcount */}
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-copper" />
              Department Headcount Distribution
            </h3>
            <span className="text-xs text-muted font-mono">{stats?.departmentBreakdown?.length || 0} Departments</span>
          </div>

          <div className="space-y-3">
            {stats?.departmentBreakdown?.map((dept: any, idx: number) => {
              const pct = stats.totalEmployees > 0 ? Math.round((dept.count / stats.totalEmployees) * 100) : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink">
                    <span>{dept.name}</span>
                    <span className="font-mono text-muted">{dept.count} Members ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-copper transition-all duration-500"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Action Items & Recent Hires */}
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-copper" />
              Recent High-Caliber Onboardings
            </h3>
            <Link href="/hr/employees" className="text-xs text-copper font-semibold hover:underline">
              View All ↗
            </Link>
          </div>

          <div className="divide-y divide-line">
            {stats?.recentHires?.map((emp: any) => (
              <div key={emp.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-xs">
                    {emp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{emp.name}</h4>
                    <p className="text-[11px] text-muted">{emp.designation}</p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px]">
                  <span className="rounded-md bg-canvas px-2 py-0.5 border border-line text-muted">
                    {emp.employeeCode}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
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
