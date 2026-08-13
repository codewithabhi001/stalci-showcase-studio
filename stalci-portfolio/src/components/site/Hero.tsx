import { ArrowRight, ShieldCheck, Cloud, Cpu, Terminal, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";

const pills = [
  { icon: Cpu, label: "AI Agentic Systems" },
  { icon: Cloud, label: "Cloud Platforms" },
  { icon: ShieldCheck, label: "Zero-Trust Security" },
];

function Monogram() {
  return (
    <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center shrink-0">
      <img
        src="/stalci-mark.png"
        alt="STALCI monogram"
        width={64}
        height={64}
        className="relative z-10 h-full w-full object-contain drop-shadow-md"
      />
    </div>
  );
}

export function Hero() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI is a global technology company delivering custom software, cloud architecture, AI agentic systems, data pipelines and cyber security for enterprises that cannot afford downtime.";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20 bg-[#06080F] text-white"
    >
      {/* Razor-Sharp Ultra-Light Crisp Grid Pattern (NO Heavy Blur Filters) */}
      <div 
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8 my-auto relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Premium Brand & Typography */}
          <div className="lg:col-span-7 text-left">
            
            {/* Header Badge Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <Monogram />
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D89B5B]/40 bg-[#D89B5B]/10 px-4 py-1.5 text-xs font-mono font-bold text-[#F0BC86] shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0BC86] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D89B5B]" />
                </span>
                <span>GLOBAL ENTERPRISE IT STUDIO</span>
              </div>
            </motion.div>

            {/* High-Impact Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white"
            >
              Architecting <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0BC86] via-[#D89B5B] to-[#B4783B]">
                Sovereign AI & Cloud
              </span> <br />
              Infrastructure.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300 font-normal"
            >
              {heroSubtitle}
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              {pills.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-200 shadow-2xs"
                >
                  <p.icon className="h-3.5 w-3.5 text-[#D89B5B]" />
                  {p.label}
                </span>
              ))}
            </motion.div>

            {/* Premium Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#F0BC86] via-[#D89B5B] to-[#B4783B] hover:opacity-95 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#D89B5B]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Live Portfolio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-[#D89B5B]/70 hover:text-[#F0BC86] hover:bg-white/[0.06]"
              >
                Schedule Consultation
              </a>
            </motion.div>

            {/* Enterprise Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
                <span>100% Type-Safe TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
                <span>99.99% Production SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
                <span>Zero-Trust Security</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Code Terminal Console Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border border-white/15 bg-[#0A0D17] p-6 shadow-2xl hover:border-[#D89B5B]/50 transition-colors duration-300">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-medium">stalci-engine.ts</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#F0BC86] bg-[#D89B5B]/15 px-2.5 py-1 rounded-md border border-[#D89B5B]/30">
                  <Terminal className="h-3 w-3 text-[#D89B5B]" /> ACTIVE NODE
                </span>
              </div>

              {/* Code Snippet Container */}
              <div className="font-mono text-xs leading-relaxed text-slate-300 space-y-2">
                <div className="text-slate-500">// STALCI Sovereign Core Engine v4.8</div>
                <div>
                  <span className="text-amber-400">import</span> {`{ SovereignPlatform }`} <span className="text-amber-400">from</span> <span className="text-emerald-400">"@stalci/core"</span>;
                </div>
                <div className="pt-2">
                  <span className="text-amber-400">const</span> app = <span className="text-blue-400">new</span> <span className="text-[#F0BC86]">SovereignPlatform</span>({`{`}
                </div>
                <div className="pl-4 text-slate-400">
                  cluster: <span className="text-emerald-400">"global-multi-region"</span>,<br />
                  aiInference: <span className="text-blue-400">true</span>,<br />
                  zeroTrust: <span className="text-blue-400">true</span>,<br />
                  latency: <span className="text-orange-400">"&lt; 14ms"</span>
                </div>
                <div>{`});`}</div>
                <div className="pt-2 text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  ✔ Deploying 14 microservices across 18 markets...
                </div>
              </div>

              {/* Stats Metrics Card Bar */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-5 border-t border-white/10 font-mono">
                <div className="rounded-2xl bg-white/[0.04] p-3.5 border border-white/10 text-center hover:border-[#D89B5B]/40 transition-colors">
                  <span className="block text-2xl font-extrabold text-[#D89B5B]">140+</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Deployments</span>
                </div>
                <div className="rounded-2xl bg-white/[0.04] p-3.5 border border-white/10 text-center hover:border-[#D89B5B]/40 transition-colors">
                  <span className="block text-2xl font-extrabold text-[#D89B5B]">99.99%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">SLA Uptime</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
