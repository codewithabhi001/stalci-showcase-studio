import { Lightbulb, Award, ShieldCheck, Users, Globe2, CheckCircle2, ArrowRight, Zap, Cpu, Sparkles, Activity, Layers } from "lucide-react";
import { SectionHeading, BadgePill } from "@/components/brand/Brand";
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
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  { 
    icon: Award, 
    title: "100% Type-Safe Craftsmanship", 
    tag: "Zero Regressions",
    copy: "Uncompromising code quality with strict static typing, automated integration suites, and principal code reviews.",
    metricLabel: "Test Coverage",
    metricValue: "> 95% Automated",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  { 
    icon: ShieldCheck, 
    title: "SOC 2 Zero-Trust Security", 
    tag: "Enterprise Security",
    copy: "End-to-end encrypted telemetry, hardware key vaults, and strict compliance with global data privacy frameworks.",
    metricLabel: "Audit Rating",
    metricValue: "ISO 27001 / SOC 2",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  { 
    icon: Users, 
    title: "Dedicated Senior Squads", 
    tag: "Principal Engineers",
    copy: "No junior bloat. Every team is led by senior staff engineers who own architecture, delivery, and post-launch SLAs.",
    metricLabel: "Seniority",
    metricValue: "Senior Staff Allocation",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
  },
];

export function About() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const aboutDescription =
    config.aboutDescription ||
    "Founded by distributed systems architects, STALCI is an elite technology studio. We partner with ambitious founders and enterprise executives to build high-scale cloud platforms, sovereign AI agents, and resilient mobile ecosystems.";

  return (
    <section id="about" className="bg-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Architectural Rigor & Engineering Excellence"
          title="The Studio Built For High-Scale Engineering"
          subtitle="We exist to eliminate technical debt, accelerate product velocity, and deliver deterministic software architectures."
        />

        {/* Studio Overview Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Mission & Metrics Box */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <BadgePill tone="dark" variant="gradient">
                  <Sparkles className="h-3 w-3 text-blue-400 mr-1" />
                  <span>Sovereign Engineering Partner</span>
                </BadgePill>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Building Tomorrow's Mission-Critical Infrastructure Today
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mt-3">
                {aboutDescription}
              </p>

              {/* Dynamic Live Stats */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-white">
                    {stats?.completedProjects ? `${stats.completedProjects}+` : "700+"}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1 block">
                    Shipped Systems
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-white">
                    {stats?.totalClients ? `${stats.totalClients}+` : "250+"}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1 block">
                    Global Clients
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-white">
                    99.99%
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1 block">
                    Uptime SLA
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-100 transition-colors shadow-md group"
                >
                  <span>Initiate Technical Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Core Engineering Principles */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-3xl border border-slate-200/90 bg-slate-50/60 p-5 sm:p-6 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-2xl border ${v.iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${v.badgeBg}`}>
                        {v.tag}
                      </span>
                    </div>

                    <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {v.title}
                    </h4>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {v.copy}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{v.metricLabel}:</span>
                    <span className="font-bold text-slate-900">{v.metricValue}</span>
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
