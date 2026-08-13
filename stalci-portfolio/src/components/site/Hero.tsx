import { 
  ArrowRight, 
  ShieldCheck, 
  Cloud, 
  Cpu, 
  CheckCircle2, 
  Layers,
  Lock,
  Activity,
  Star,
  Zap,
  Server,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";

const capabilities = [
  { icon: Layers, name: "Custom Software Engineering", tag: "Enterprise Grade", status: "Active" },
  { icon: Cpu, name: "Sovereign AI & Agentic Systems", tag: "LLMs & Neural Pipelines", status: "Optimized" },
  { icon: Cloud, name: "Multi-Cloud Architecture", tag: "AWS / GCP / Azure", status: "Deployed" },
  { icon: Lock, name: "Zero-Trust Cybersecurity", tag: "SOC2 & ISO Compliant", status: "Shielded" },
];

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
];

function Monogram() {
  return (
    <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center shrink-0">
      <img
        src="/stalci-mark.png"
        alt="STALCI monogram"
        width={64}
        height={64}
        className="relative z-10 h-full w-full object-contain drop-shadow-lg"
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
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 bg-[#06080F] text-white"
    >
      {/* Crisp Grid Background Pattern */}
      <div 
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        aria-hidden 
      />

      {/* Atmospheric Gradient Atmosphere behind Showcase */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#D89B5B]/20 via-[#F0BC86]/10 to-amber-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8 text-center relative z-10">
        
        {/* Centered Monogram & Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <Monogram />
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D89B5B]/40 bg-[#D89B5B]/10 px-4 py-1.5 text-xs font-mono font-bold text-[#F0BC86] shadow-xs tracking-wider uppercase">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0BC86] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D89B5B]" />
            </span>
            <span>GLOBAL ENTERPRISE IT STUDIO</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-balance text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white max-w-4xl mx-auto"
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
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-slate-300 font-normal"
        >
          {heroSubtitle}
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#F0BC86] via-[#D89B5B] to-[#B4783B] hover:opacity-95 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#D89B5B]/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Live Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-sm font-bold text-white transition-all hover:border-[#D89B5B]/70 hover:text-[#F0BC86] hover:bg-white/[0.08]"
          >
            Schedule Consultation
          </a>
        </motion.div>

        {/* Social Proof & Rating Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400"
        >
          <div className="flex items-center -space-x-2">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Client avatar"
                className="h-8 w-8 rounded-full border-2 border-[#06080F] object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-medium text-slate-300">
              Trusted by 140+ enterprise leaders worldwide
            </span>
          </div>
        </motion.div>

        {/* Clean Enterprise Trust Highlights Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
            <span>100% Type-Safe Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
            <span>99.99% Production SLA Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#D89B5B]" />
            <span>Zero-Trust Cybersecurity</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
