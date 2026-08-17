import { Lightbulb, Award, ShieldCheck, Users, Globe2, CheckCircle2, ArrowRight, Zap, Cpu, Sparkles, Activity, Layers } from "lucide-react";
import { SectionHeading, BadgePill } from "./Brand";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const values = [
  { 
    icon: Lightbulb, 
    title: "Continuous Innovation & Speed", 
    tag: "High Velocity",
    copy: "We architect scalable distributed systems that accelerate enterprise time-to-market without compromising resilience.",
    metricLabel: "Cadence",
    metricValue: "Bi-weekly Sprints",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
  },
  { 
    icon: Award, 
    title: "100% Type-Safe Craftsmanship", 
    tag: "Zero Regressions",
    copy: "Uncompromising code quality with strict static typing, automated integration suites, and principal code reviews.",
    metricLabel: "Test Coverage",
    metricValue: "> 95% Automated",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
  },
  { 
    icon: ShieldCheck, 
    title: "Zero-Trust Security & Enclaves", 
    tag: "ISO 27001 / SOC 2",
    copy: "Transparent IT governance, automated regulatory compliance, dynamic IAM pruning, and cryptographic hardware safety.",
    metricLabel: "Standard",
    metricValue: "FIDO2 & Enclaves",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
  },
  { 
    icon: Users, 
    title: "Embedded Agile Squads", 
    tag: "Dedicated Pod",
    copy: "Seamlessly integrating alongside your core engineering leadership as a dedicated high-velocity agile pod.",
    metricLabel: "Team Model",
    metricValue: "100% Senior Staff",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
  },
];

export function About() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const { data: statsData } = useQuery({
    queryKey: ["site-stats"],
    queryFn: fetchStats,
  });

  const dynamicStats = [
    { 
      value: config.stat_shipped || `${statsData?.totalProjectsCount || 140}+`, 
      label: "Deployments",
      icon: Cpu,
    },
    { 
      value: config.stat_markets || "18", 
      label: "Global Markets",
      icon: Globe2,
    },
    { 
      value: config.stat_engineers || "120+", 
      label: "Principal Engineers",
      icon: Users,
    },
    { 
      value: config.stat_uptime || "99.99%", 
      label: "Availability SLA",
      icon: Activity,
    },
  ];

  return (
    <section id="about" className="border-t border-slate-200/90 bg-white py-16 sm:py-24 text-slate-900 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-16">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <Sparkles className="h-3.5 w-3.5 text-slate-900 mr-1.5" />
              <span className="font-semibold text-slate-900">Studio Philosophy &amp; Heritage</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            Architecting the Technological Foundation for <span className="font-extrabold text-slate-950 underline decoration-slate-900/30 underline-offset-8">Modern Enterprise Agility</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We synergize enterprise architecture, elite software engineering, and strategic IT consulting to deliver mission-critical solutions—from initial blueprinting to global production deployment.
          </p>
        </div>

        {/* ─── 2-Column Studio Showcase ─── */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          
          {/* Left Column: Narrative & Live Metric Enclave */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50 via-slate-50/60 to-white p-7 sm:p-9 shadow-sm relative overflow-hidden group"
          >
            {/* Top Slate Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-900 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Engineering Ethos
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Sovereignty, Velocity, and Zero Technical Debt
              </h3>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Our cross-functional studio specializes in sovereign enterprise platforms, multi-cloud orchestration, advanced AI model integration, and distributed zero-trust cybersecurity.
              </p>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Every engagement is executed by elite principal engineers utilizing deterministic agile delivery, automated continuous integration, and enterprise-grade quality gates.
              </p>
            </div>

            {/* 4 Metric Counter Boxes */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-3.5">
                {dynamicStats.map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-400 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-900 border border-slate-200">
                          <StatIcon className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="font-display text-2xl sm:text-3xl font-black text-slate-950 block leading-tight">
                        {stat.value}
                      </span>
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mt-1">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Compliance Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-700">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-900 border border-slate-200 px-3 py-1 rounded-full font-bold shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" /> ISO 27001
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-900 border border-slate-200 px-3 py-1 rounded-full font-bold shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" /> SOC 2 Type II
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full font-bold shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" /> Zero-Trust
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Strategic Value Bento Cards */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 p-6 sm:p-7 shadow-2xs hover:shadow-lg hover:border-slate-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Top Dark Slate Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Row: Dark Slate Icon Squircle + Tag */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md p-2.5 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>

                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border ${val.badgeBg}`}>
                        {val.tag}
                      </span>
                    </div>

                    {/* Title & Copy */}
                    <h4 className="mt-5 text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-slate-950 transition-colors">
                      {val.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                      {val.copy}
                    </p>
                  </div>

                  {/* Bottom Metric */}
                  <div className="mt-6 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[10.5px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      {val.metricLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {val.metricValue}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
