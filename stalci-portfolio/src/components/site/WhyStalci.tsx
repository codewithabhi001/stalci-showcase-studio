"use client";

import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const reasons = [
  { 
    icon: Rocket, 
    title: "100% Senior Engineering Pods", 
    tag: "Talent Density",
    copy: "Exclusively staffed by seasoned architects and senior engineers to guarantee rapid execution without junior learning curves.",
    metricLabel: "Seniority",
    metricValue: "100% Staff & Lead",
  },
  { 
    icon: Timer, 
    title: "Accelerated Value Realization", 
    tag: "High Velocity",
    copy: "Rapid, deterministic deployment of operational software increments, shipping measurable business value in bi-weekly sprints.",
    metricLabel: "Cadence",
    metricValue: "14-Day Sprints",
  },
  { 
    icon: Globe2, 
    title: "Global 24/7 Delivery Scale", 
    tag: "Continuous",
    copy: "Seamless, distributed delivery across global timezones enabling round-the-clock engineering momentum and incident triage.",
    metricLabel: "Coverage",
    metricValue: "24/7 Active NOC",
  },
  { 
    icon: Layers, 
    title: "End-to-End System Ownership", 
    tag: "Full-Stack",
    copy: "Comprehensive ownership from initial blueprinting and infrastructure provisioning to production release and observability.",
    metricLabel: "Scope",
    metricValue: "Design to Cloud SRE",
  },
  { 
    icon: Handshake, 
    title: "Commercial Transparency", 
    tag: "Predictable",
    copy: "Itemized sprint burndown telemetry, transparent billing, and zero hidden platform licensing or vendor lock-in fees.",
    metricLabel: "Governance",
    metricValue: "Fixed & T&M Models",
  },
  { 
    icon: ShieldCheck, 
    title: "SOC 2 & Zero-Trust Standards", 
    tag: "Enterprise",
    copy: "Mission-critical reliability fortified by automated dynamic security audits, chaos testing, and hardware MFA enclaves.",
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
    <section className="border-t border-zinc-200/90 bg-white py-20 sm:py-28 text-black">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        <div ref={headerRef as any}>
          <SectionHeading
            tone="light"
            eyebrow="The STALCI Advantage"
            title="Strategic Engineering & Transformation Partner"
            subtitle="Transcending traditional agency models to deliver predictable enterprise software systems with high velocity and zero technical debt."
          />
        </div>

        {/* 6 Clean Value Cards Grid */}
        <div 
          ref={gridRef as any}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 transition-all duration-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Icon + Standard Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/90 text-zinc-950 p-2.5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <Icon className="h-5 w-5 text-zinc-950" strokeWidth={1.8} />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-800 border border-zinc-200">
                      {r.tag}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal line-clamp-2">
                    {r.copy}
                  </p>
                </div>

                {/* Bottom Metric */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-[11px] font-mono">
                  <span className="text-[9.5px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
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
        <div className="mt-14 rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-2xs overflow-hidden">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 leading-tight">
                Enterprise Delivery Benchmark Comparison
              </h3>
              <p className="text-xs text-zinc-500 font-mono">How STALCI compares against traditional agencies and internal hiring</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-200 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 pr-4 font-semibold">Evaluation Criteria</th>
                  <th className="pb-3 px-4 text-black bg-zinc-100/80 rounded-t-xl">STALCI Dedicated Squads</th>
                  <th className="pb-3 px-4">Traditional Vendor / Agency</th>
                  <th className="pb-3 pl-4">In-House Team Hiring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-zinc-950">
                      {row.factor}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-zinc-950 bg-zinc-100/50 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{row.stalci}</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500">
                      {row.traditional}
                    </td>
                    <td className="py-3.5 pl-4 text-zinc-500">
                      {row.inHouse}
                    </td>
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
