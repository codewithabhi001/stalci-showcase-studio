import { 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Server,
  Cloud,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Users,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
];

const clientLogos = [
  { name: "GR Class Maritime", badge: "Recognized Org (RO)", sector: "Maritime Cloud" },
  { name: "Konvo Footwear Group", badge: "₹15 Cr+ GMV", sector: "B2B E-Commerce" },
  { name: "ApniSabha Foundation", badge: "250k+ Citizens", sector: "Civic Tech" },
  { name: "Meridian Finance", badge: "Fintech Core", sector: "Lending Engine" },
  { name: "CareLoop Health", badge: "HIPAA Compliant", sector: "Clinical AI" },
  { name: "Loomex Retail", badge: "Multi-Cloud", sector: "Omnichannel ERP" },
];

function Monogram() {
  return (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center shrink-0 group">
      <div className="absolute inset-0 rounded-2xl bg-[#D89B5B]/30 blur-xl group-hover:bg-[#D89B5B]/50 transition-colors" />
      <img
        src="/stalci-mark.png"
        alt="STALCI Monogram Logo"
        width={80}
        height={80}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_24px_rgba(216,155,91,0.6)] transition-transform duration-300 group-hover:scale-105"
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

  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI is a premier enterprise software engineering & digital transformation studio delivering sovereign AI systems, multi-cloud platforms, bespoke full-stack applications, and zero-trust cyber resilience for global industry leaders.";

  const totalDeployments = config.stat_shipped || `${statsData?.totalProjectsCount || 140}+`;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[96svh] w-full flex-col items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#07090E] text-white"
    >
      {/* Background Deep Grid Overlay */}
      <div 
        className="absolute inset-0 -z-20 grid-lines opacity-35 pointer-events-none" 
        aria-hidden 
      />

      {/* Ambient Spotlight Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[520px] bg-gradient-to-tr from-[#D89B5B]/30 via-[#F2CFAB]/15 to-amber-600/5 blur-[170px] pointer-events-none -z-10 rounded-full animate-float-orb" />
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-blue-600/10 blur-[160px] pointer-events-none -z-10 rounded-full" />

      {/* Decorative Architecture Node Graphic SVGs */}
      <div className="absolute top-28 left-6 lg:left-16 hidden md:block opacity-35 pointer-events-none -z-10">
        <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md font-mono text-[11px] text-slate-300 space-y-1.5 shadow-xl">
          <div className="flex items-center gap-2 text-[#F2CFAB]">
            <Server className="h-3.5 w-3.5" />
            <span>K8s Cluster &bull; Multi-AZ</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-bold">● 100% Mesh Health</p>
        </div>
      </div>

      <div className="absolute top-36 right-6 lg:right-16 hidden md:block opacity-35 pointer-events-none -z-10">
        <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md font-mono text-[11px] text-slate-300 space-y-1.5 shadow-xl">
          <div className="flex items-center gap-2 text-[#F2CFAB]">
            <Cpu className="h-3.5 w-3.5" />
            <span>AI Inference Engine</span>
          </div>
          <p className="text-[10px] text-[#F2CFAB] font-bold">● P99 Latency: 11.4ms</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 lg:px-8 text-center relative z-10">
        
        {/* Official Monogram & Live Studio Chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3.5"
        >
          <Monogram />
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D89B5B]/40 bg-[#D89B5B]/15 px-4 py-1.5 text-xs font-mono font-bold text-[#F2CFAB] shadow-sm tracking-wider uppercase backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2CFAB] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D89B5B]" />
            </span>
            <span>GLOBAL ENTERPRISE IT & SOFTWARE STUDIO</span>
          </div>
        </motion.div>

        {/* Master WebMobTech / Google Caliber Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-6 text-balance text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight max-w-4xl mx-auto"
        >
          <span className="text-white drop-shadow-sm">Engineering Bespoke</span> <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EB] via-[#E8BC88] to-[#C27E3E]">
            Sovereign AI & Cloud
          </span> <br />
          <span className="text-white drop-shadow-sm">Digital Solutions.</span>
        </motion.h1>

        {/* Subtitle with High Contrast */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-200 font-normal"
        >
          {heroSubtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#F2CFAB] via-[#D89B5B] to-[#9E6229] hover:opacity-95 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#D89B5B]/30 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Live Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-bold text-white transition-all hover:border-[#D89B5B]/70 hover:text-[#F2CFAB] hover:bg-white/[0.12] backdrop-blur-md cursor-pointer shadow-sm"
          >
            Schedule Technical Consultation
          </a>
        </motion.div>

        {/* Social Proof & Rating Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-300"
        >
          <div className="flex items-center -space-x-2">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Client avatar"
                className="h-8 w-8 rounded-full border-2 border-[#07090E] object-cover ring-1 ring-white/10"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#D89B5B] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#D89B5B] text-[#D89B5B]" />
              ))}
            </div>
            <span className="font-semibold text-slate-200">
              Trusted by 140+ enterprise leaders & Fortune 500 partners
            </span>
          </div>
        </motion.div>

        {/* 4-Metric High-Impact Hero KPI Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5 p-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="p-3 text-center">
            <span className="block font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EB] to-[#F2CFAB]">
              {totalDeployments}
            </span>
            <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold mt-1">
              Enterprise Apps Shipped
            </span>
          </div>
          <div className="p-3 text-center border-l border-white/10">
            <span className="block font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EB] to-[#F2CFAB]">
              15+
            </span>
            <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold mt-1">
              Years Experience
            </span>
          </div>
          <div className="p-3 text-center border-l border-white/10">
            <span className="block font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EB] to-[#F2CFAB]">
              60+
            </span>
            <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold mt-1">
              In-House Tech Architects
            </span>
          </div>
          <div className="p-3 text-center border-l border-white/10">
            <span className="block font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EB] to-[#F2CFAB]">
              99.9%
            </span>
            <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold mt-1">
              SLA Uptime Guarantee
            </span>
          </div>
        </motion.div>

        {/* Client Partner Marquee Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mt-10 pt-8 border-t border-white/[0.08]"
        >
          <p className="text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-slate-400 mb-4">
            Trusted By High-Growth Startups & Global Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {clientLogos.map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs font-mono font-semibold text-slate-300 shadow-2xs hover:border-[#D89B5B]/60 transition-colors"
              >
                <Building className="h-3.5 w-3.5 text-[#D89B5B]" />
                <span>{client.name}</span>
                <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-white/10 text-[#F2CFAB]">
                  {client.badge}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
