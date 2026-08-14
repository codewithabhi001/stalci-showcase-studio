import { 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Shield,
  Layers,
  Cpu,
  Globe,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
];

function Monogram() {
  return (
    <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center shrink-0">
      <img
        src="/stalci-mark.png"
        alt="STALCI monogram"
        width={56}
        height={56}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
    "STALCI is a global technology studio delivering custom software, cloud architecture, sovereign AI systems, data pipelines, and cyber resilience for enterprises that cannot afford downtime.";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[96svh] w-full flex-col items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#06080F] text-white"
    >
      {/* ─── Rich Luxury Tech Atmosphere Background ─── */}
      
      {/* 1. Subtle Radial Gradient Aurora Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65rem] h-[35rem] bg-gradient-to-b from-slate-700/20 via-slate-800/10 to-transparent blur-[120px] pointer-events-none -z-20" />
      <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-20" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-20" />

      {/* 2. Precision Perspective Grid Overlay */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      {/* 3. Subtle Horizon Glow Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-5xl px-5 lg:px-8 text-center relative z-10">
        
        {/* Monogram & Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3.5"
        >
          <Monogram />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-inner">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-widest font-semibold">GLOBAL ENTERPRISE IT STUDIO</span>
          </div>
        </motion.div>

        {/* Clean Headline with Balanced Scale */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-6 text-balance text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white max-w-3xl mx-auto"
        >
          Architecting Sovereign <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            AI & Multi-Cloud Systems
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-400 font-normal"
        >
          {heroSubtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-slate-200 transition-all shadow-md hover:scale-[1.02] active:scale-98"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-xs font-semibold text-white transition-all hover:bg-white/[0.08] hover:border-white/40"
          >
            Schedule Consultation
          </a>
        </motion.div>

        {/* Social Proof Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-slate-400"
        >
          <div className="flex items-center -space-x-2">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Client avatar"
                className="h-7 w-7 rounded-full border border-[#06080F] object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400/90 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400/90" />
              ))}
            </div>
            <span className="text-slate-300 font-medium">
              Trusted by 140+ enterprise partners worldwide
            </span>
          </div>
        </motion.div>

        {/* High-End Enterprise Standards Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-[11px] text-slate-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />
            <span>100% Type-Safe TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />
            <span>99.99% Production SLA Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />
            <span>Zero-Trust Cybersecurity</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
