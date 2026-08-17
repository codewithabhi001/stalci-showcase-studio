import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers, ShieldCheck, Sparkles, ArrowRight, Zap, Check, X, Shield, Award } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const reasons = [
  { 
    icon: Rocket, 
    title: "100% Senior Engineering Pods", 
    tag: "Talent Density",
    copy: "Exclusively staffed by seasoned principal architects and senior engineers to guarantee rapid execution without junior learning curves.",
    metricLabel: "Seniority Density",
    metricValue: "100% Staff & Lead",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
  { 
    icon: Timer, 
    title: "Accelerated Value Realization", 
    tag: "High Velocity",
    copy: "Rapid, deterministic deployment of operational software increments, shipping measurable business value in predictable bi-weekly sprints.",
    metricLabel: "Sprint Cadence",
    metricValue: "14-Day Sprints",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
  { 
    icon: Globe2, 
    title: "Global 24/7 Delivery Scale", 
    tag: "Continuous",
    copy: "Seamless, distributed delivery across global timezones enabling round-the-clock engineering momentum and proactive incident triage.",
    metricLabel: "Support Coverage",
    metricValue: "24/7 Active NOC",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
  { 
    icon: Layers, 
    title: "End-to-End System Ownership", 
    tag: "Full-Stack",
    copy: "Comprehensive architectural ownership from initial system blueprinting and infrastructure provisioning to production release and SRE.",
    metricLabel: "Lifecycle Scope",
    metricValue: "Design to Cloud SRE",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
  { 
    icon: Handshake, 
    title: "Commercial Transparency", 
    tag: "Predictable",
    copy: "Itemized sprint burndown telemetry, transparent governance, and zero hidden platform licensing fees or vendor lock-in.",
    metricLabel: "Governance Model",
    metricValue: "Fixed & T&M Models",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
  { 
    icon: ShieldCheck, 
    title: "SOC 2 & Zero-Trust Standards", 
    tag: "Enterprise",
    copy: "Mission-critical reliability fortified by automated dynamic security audits, chaos testing pipelines, and hardware-level MFA enclaves.",
    metricLabel: "Security Posture",
    metricValue: "Zero-Trust Verified",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badgeBg: "bg-slate-100/90 text-slate-700 border-slate-200",
  },
];

const comparisonRows = [
  {
    factor: "Time to First Production Commit",
    stalci: "< 7 Business Days (Dedicated Squad)",
    traditional: "6 – 12 Weeks (Protracted Scoping)",
    inHouse: "3 – 6 Months (Recruitment Lag)",
  },
  {
    factor: "Engineering Seniority Density",
    stalci: "100% Principal & Staff Specialists",
    traditional: "Heavy Junior / Offshore Staffing",
    inHouse: "Variable Skill Distribution",
  },
  {
    factor: "Quality & Security Guarantee",
    stalci: "100% Type-Safe + 99.99% SLA Uptime",
    traditional: "Best-effort / Frequent Regressions",
    inHouse: "Constrained by Internal Backlog",
  },
  {
    factor: "Intellectual Property Ownership",
    stalci: "100% Client-Owned Work-for-Hire",
    traditional: "Proprietary Vendor Lock-in",
    inHouse: "100% Internal Ownership",
  },
];

export function WhyStalci() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal({ stagger: 0.04, y: 15 });

  return (
    <section className="border-t border-slate-200/90 bg-white py-16 sm:py-24 text-slate-900 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={headerRef as any}>
          <SectionHeading
            tone="light"
            eyebrow="The STALCI Advantage"
            title="Strategic Engineering &amp; Transformation Partner"
            subtitle="Transcending traditional agency models to deliver predictable enterprise software systems with high velocity and zero technical debt."
          />
        </div>

        {/* 6 Value Cards Grid */}
        <div 
          ref={gridRef as any}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/40 p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div>
                  {/* Top Row: Colored Icon Squircle + Tag */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${r.iconBg}`}>
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>

                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border ${r.badgeBg}`}>
                      {r.tag}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="mt-5 text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                    {r.copy}
                  </p>
                </div>

                {/* Bottom Metric */}
                <div className="mt-6 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[10.5px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                    {r.metricLabel}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${r.badgeBg}`}>
                    {r.metricValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Delivery Benchmark Comparison Table */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-md relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Comparative Industry Analysis
              </span>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">
                How STALCI Outperforms Alternative Models
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 100% Contractual SLA Guarantee
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  <th className="pb-3.5 pr-4 font-semibold">Evaluation Metric</th>
                  <th className="pb-3.5 px-4 font-bold text-slate-950 bg-emerald-50/60 rounded-t-xl border-t border-x border-emerald-200">STALCI Studio Pods</th>
                  <th className="pb-3.5 px-4 font-semibold text-slate-500">Traditional Agency</th>
                  <th className="pb-3.5 pl-4 font-semibold text-slate-500">Direct In-House Hiring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pr-4 font-semibold text-slate-900">{row.factor}</td>
                    <td className="py-4 px-4 font-bold text-emerald-950 bg-emerald-50/70 border border-emerald-200 rounded-xl shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{row.stalci}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{row.traditional}</td>
                    <td className="py-4 pl-4 text-slate-600">{row.inHouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
