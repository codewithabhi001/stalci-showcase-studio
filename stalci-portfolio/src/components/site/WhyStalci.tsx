import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const reasons = [
  { 
    icon: Rocket, 
    title: "100% Senior Engineering Pods", 
    tag: "Talent Density",
    copy: "Exclusively staffed by seasoned principal architects and senior engineers to guarantee rapid execution without junior learning curves.",
    metricLabel: "Seniority",
    metricValue: "100% Staff & Lead",
  },
  { 
    icon: Timer, 
    title: "Accelerated Value Realization", 
    tag: "High Velocity",
    copy: "Rapid, deterministic deployment of operational software increments, shipping measurable business value in predictable bi-weekly sprints.",
    metricLabel: "Cadence",
    metricValue: "14-Day Sprints",
  },
  { 
    icon: Globe2, 
    title: "Global 24/7 Delivery Scale", 
    tag: "Continuous",
    copy: "Seamless, distributed delivery across global timezones enabling round-the-clock engineering momentum and proactive incident triage.",
    metricLabel: "Coverage",
    metricValue: "24/7 Active NOC",
  },
  { 
    icon: Layers, 
    title: "End-to-End System Ownership", 
    tag: "Full-Stack",
    copy: "Comprehensive architectural ownership from initial system blueprinting and infrastructure provisioning to production release and SRE.",
    metricLabel: "Scope",
    metricValue: "Design to Cloud SRE",
  },
  { 
    icon: Handshake, 
    title: "Commercial Transparency", 
    tag: "Predictable",
    copy: "Itemized sprint burndown telemetry, transparent governance, and zero hidden platform licensing fees or vendor lock-in.",
    metricLabel: "Governance",
    metricValue: "Fixed & T&M Models",
  },
  { 
    icon: ShieldCheck, 
    title: "SOC 2 & Zero-Trust Standards", 
    tag: "Enterprise",
    copy: "Mission-critical reliability fortified by automated dynamic security audits, chaos testing pipelines, and hardware-level MFA enclaves.",
    metricLabel: "Security",
    metricValue: "Zero-Trust Verified",
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
    stalci: "100% Type-Safe + 99.9% SLA Uptime",
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
    <section className="border-t border-zinc-200/90 bg-[#FAFAFC] py-14 sm:py-20 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div ref={headerRef as any}>
          <SectionHeading
            tone="light"
            eyebrow="The STALCI Advantage"
            title="Strategic Engineering & Transformation Partner"
            subtitle="Transcending traditional agency models to deliver predictable enterprise software systems with high velocity and zero technical debt."
          />
        </div>

        {/* 6 Clean Value Cards Grid with Soft Gray Shadows */}
        <div 
          ref={gridRef as any}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Icon + Standard Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-200/90 text-zinc-950 p-2 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <Icon className="h-5 w-5 text-zinc-950" strokeWidth={1.8} />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-zinc-100/90 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 border border-zinc-200">
                      {r.tag}
                    </span>
                  </div>

                  {/* Title & Full Unclipped Summary */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-zinc-950 tracking-tight leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                    {r.copy}
                  </p>
                </div>

                {/* Bottom Metric */}
                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-[11px] font-mono">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                    {r.metricLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-950">
                    {r.metricValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Delivery Benchmark Comparison Table */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                Comparative Industry Analysis
              </span>
              <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                How STALCI Outperforms Alternative Models
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Contractual SLA Guarantee
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-[11px] font-mono font-bold uppercase text-zinc-400 tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Evaluation Metric</th>
                  <th className="pb-3 px-4 font-bold text-zinc-950">STALCI Studio Pods</th>
                  <th className="pb-3 px-4 font-semibold text-zinc-500">Traditional Agency</th>
                  <th className="pb-3 pl-4 font-semibold text-zinc-500">Direct In-House Hiring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-zinc-900">{row.factor}</td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600 bg-indigo-50/40 rounded-xl">{row.stalci}</td>
                    <td className="py-3.5 px-4 text-zinc-500">{row.traditional}</td>
                    <td className="py-3.5 pl-4 text-zinc-500">{row.inHouse}</td>
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
