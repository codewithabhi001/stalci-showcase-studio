import { ArrowRight, Sparkles, ShieldCheck, Cloud, Cpu, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const pills = [
  { icon: Cpu, label: "AI & Agentic Systems" },
  { icon: Cloud, label: "Cloud & Platform Engineering" },
  { icon: ShieldCheck, label: "Cyber Security & Zero Trust" },
];

function Monogram() {
  return (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center">
      <img
        src="/stalci-mark.png"
        alt="STALCI monogram"
        width={96}
        height={96}
        className="h-full w-full object-contain drop-shadow-[0_0_28px_rgba(216,155,91,0.55)]"
      />
    </div>
  );
}

export function Hero() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const { data: statsData } = useQuery({
    queryKey: ["site-stats"],
    queryFn: fetchStats,
  });

  const heroTitle = config.heroTitle || "We build AI-native software engineered to scale.";
  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI is a global technology company delivering custom software, cloud architecture, AI agentic systems, data pipelines and cyber security for enterprises that cannot afford downtime.";

  const dynamicStats = [
    { value: config.stat_shipped || `${statsData?.totalProjectsCount || 140}+`, label: "Products Shipped" },
    { value: config.stat_uptime || "99.99%", label: "Uptime Delivered" },
    { value: config.stat_industries || "14", label: "Industries Served" },
    { value: config.stat_support || "24/7/365", label: "Managed SRE Support" },
  ];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      <div 
        className="absolute inset-0 -z-30 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40" 
        aria-hidden 
      />
      <div className="grid-lines absolute inset-0 -z-20 opacity-[0.35]" aria-hidden />
      
      {/* Animated Glowing Orbs */}
      <div
        className="animate-float-orb absolute left-1/2 top-[32%] -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/20 blur-[130px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute right-[15%] top-[20%] -z-10 h-[20rem] w-[20rem] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Monogram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Enterprise-Grade Sovereign Engineering
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance text-[2.2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.6rem]"
        >
          {heroTitle.includes("engineered to scale") ? (
            <>
              {heroTitle.split("engineered to scale")[0]}
              <span className="text-copper-gradient">engineered to scale.</span>
            </>
          ) : (
            <span className="text-copper-gradient">{heroTitle}</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-6 max-w-2xl text-balance text-sm leading-relaxed text-slate-300 sm:text-base font-normal"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {pills.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-sm shadow-xs"
            >
              <p.icon className="h-3.5 w-3.5 text-copper" />
              {p.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
          className="mt-8 flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.03] sm:w-auto shadow-lg shadow-amber-950/20"
            style={{ background: "var(--gradient-copper)" }}
          >
            <span className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-120%] group-hover:animate-shine pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-copper hover:text-copper hover:bg-white/[0.06] sm:w-auto"
          >
            Book Architecture Review
          </a>
        </motion.div>

        {/* KPI Stats Counter Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="mt-16 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-copper/10 via-transparent to-copper/10 pointer-events-none" />
          
          <dl className="relative z-10 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x divide-white/10">
            {dynamicStats.map((s) => (
              <div key={s.label} className="px-4 text-center group/stat cursor-default">
                <dt className="font-sans text-2xl font-extrabold text-copper sm:text-3xl tracking-tight transition-transform duration-300 group-hover/stat:scale-105">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover/stat:text-copper">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-5 flex justify-center pointer-events-none"
        aria-hidden
      >
        <span className="h-8 w-px bg-gradient-to-b from-transparent via-copper/60 to-transparent" />
      </motion.div>
    </section>
  );
}
