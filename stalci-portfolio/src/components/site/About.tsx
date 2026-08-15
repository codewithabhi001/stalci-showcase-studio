import { Lightbulb, Award, ShieldCheck, Users, Globe2, CheckCircle2, ArrowRight, Zap, Cpu, Sparkles } from "lucide-react";
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
    glow: "group-hover:border-blue-500/30",
  },
  { 
    icon: Award, 
    title: "100% Type-Safe Craftsmanship", 
    tag: "Zero Regressions",
    copy: "Uncompromising code quality with strict static typing, automated integration suites, and principal code reviews.",
    metricLabel: "Test Coverage",
    metricValue: "> 95% Automated",
    glow: "group-hover:border-indigo-500/30",
  },
  { 
    icon: ShieldCheck, 
    title: "Zero-Trust Security & Enclaves", 
    tag: "ISO 27001 / SOC 2",
    copy: "Transparent IT governance, automated regulatory compliance, dynamic IAM pruning, and cryptographic hardware safety.",
    metricLabel: "Standard",
    metricValue: "FIDO2 & Enclaves",
    glow: "group-hover:border-emerald-500/30",
  },
  { 
    icon: Users, 
    title: "Embedded Agile Squads", 
    tag: "Dedicated Pod",
    copy: "Seamlessly integrating alongside your core engineering leadership as a dedicated high-velocity agile pod.",
    metricLabel: "Team Model",
    metricValue: "100% Senior Staff",
    glow: "group-hover:border-purple-500/30",
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
      gradient: "from-blue-600 to-cyan-500"
    },
    { 
      value: config.stat_markets || "18", 
      label: "Global Markets",
      gradient: "from-indigo-600 to-blue-500"
    },
    { 
      value: config.stat_engineers || "120+", 
      label: "Principal Engineers",
      gradient: "from-emerald-600 to-teal-500"
    },
    { 
      value: config.stat_uptime || "99.99%", 
      label: "Availability SLA",
      gradient: "from-amber-600 to-orange-500"
    },
  ];

  return (
    <section id="about" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-14 sm:py-20 text-black overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span>✦ Studio Philosophy &amp; Heritage</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Architecting the Technological Foundation for <span className="font-extrabold text-black">Modern Enterprise Agility</span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We synergize enterprise architecture, elite software engineering, and strategic IT consulting to deliver mission-critical solutions—from initial blueprinting to global production deployment.
          </p>
        </div>

        {/* ─── 2-Column Luxury Studio Showcase ─── */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          
          {/* Left Column: Narrative & Live Metric Enclave */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-[#FAFAFD] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  Engineering Ethos
                </span>
              </div>

              <h3 className="mt-3 text-lg sm:text-xl font-bold text-zinc-950 leading-snug">
                Sovereignty, Velocity, and Zero Technical Debt
              </h3>

              <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                Our cross-functional studio specializes in sovereign enterprise platforms, multi-cloud orchestration, advanced AI model integration, and distributed zero-trust cybersecurity.
              </p>

              <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                Every engagement is executed by elite principal engineers utilizing deterministic agile delivery, automated continuous integration, and enterprise-grade quality gates.
              </p>
            </div>

            {/* 4 Metric Counter Boxes with Gradient Fill */}
            <div className="mt-8 pt-6 border-t border-zinc-200/80">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {dynamicStats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-xs transition-all"
                  >
                    <span className={`font-display text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent block leading-tight`}>
                      {stat.value}
                    </span>
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Compliance Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-zinc-600">
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> ISO 27001
                </span>
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> SOC 2 Type II
                </span>
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Zero-Trust
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
                  className={`group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div>
                    {/* Top Row: Icon + Pill Tag */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-200/90 text-zinc-950 p-2 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        <Icon className="h-5 w-5 text-zinc-950" strokeWidth={1.8} />
                      </div>

                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 border border-zinc-200">
                        {val.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="mt-4 text-base font-bold text-zinc-950 tracking-tight leading-snug">
                      {val.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                      {val.copy}
                    </p>
                  </div>

                  {/* Bottom Metric */}
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-[11px] font-mono">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                      {val.metricLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-950">
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
