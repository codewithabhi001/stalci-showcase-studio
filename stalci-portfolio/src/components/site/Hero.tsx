import { 
  ArrowRight, 
  Sparkles,
  Smartphone,
  Globe,
  Cloud,
  Code2,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { BadgePill, StalciLogoIcon } from "./Brand";

const clientLogos = [
  { name: "ARROW", slug: "arrow" },
  { name: "fixytrade", slug: "fixytrade" },
  { name: "melly", slug: "melly" },
  { name: "Fischer", slug: "fischer" },
  { name: "DENSIK", slug: "densik" },
  { name: "1Villager", slug: "villager" },
  { name: "CareLoop", slug: "careloop" },
  { name: "Meridian", slug: "meridian" },
];

export function Hero() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI engineers custom software, high-performance web & mobile platforms, and sovereign AI solutions for startups, enterprises, and large-scale organizations worldwide.";

  return (
    <div className="flex flex-col bg-[#000000] text-white overflow-hidden w-full">
      
      {/* ─── Screen 1: Flagship Sovereign Studio Hero ─── */}
      <section
        id="top"
        className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#000000] pt-8 pb-10 sm:pt-14 sm:pb-16"
      >
        {/* Ambient Sapphire Radial Lighting (Soft Luxury Glow) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-[80rem] h-[20rem] sm:h-[26rem] bg-gradient-to-b from-[#0052FF]/12 via-[#1D4ED8]/3 to-transparent blur-[130px] pointer-events-none -z-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75vw] max-w-[36rem] h-[22rem] bg-[#0052FF]/8 rounded-full blur-[120px] pointer-events-none -z-20" />

        {/* Crisp High-Tech Dot Matrix Grid */}
        <div 
          className="absolute inset-0 -z-10 bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:26px_26px] opacity-15 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" 
          aria-hidden 
        />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center space-y-3.5 sm:space-y-4">
          
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-0.5"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-900/40 bg-[#060913]/90 px-3.5 py-1 text-[10.5px] sm:text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] shadow-[0_0_6px_#0052FF] shrink-0" />
              <span className="sm:hidden">⚡ Sovereign AI &bull; Cloud Studio</span>
              <span className="hidden sm:inline">Sovereign AI &bull; Cloud Infrastructure &bull; Platform Engineering</span>
            </div>
          </motion.div>

          {/* Expansive, Sleek, Wide Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.18] tracking-tight text-white max-w-5xl mx-auto font-display px-2"
          >
            Engineering Sovereign AI &amp; Next-Gen Digital Platforms
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-xs sm:text-[13.5px] md:text-[14px] leading-relaxed text-zinc-400 max-w-2xl sm:max-w-3xl mx-auto font-normal px-4"
          >
            {heroSubtitle}
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="pt-1.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-[280px] sm:max-w-none mx-auto"
          >
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 sm:px-7 sm:py-2.5 text-xs sm:text-[13px] font-bold text-black hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Initiate Architecture</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="/#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-2.5 sm:px-7 sm:py-2.5 text-xs sm:text-[13px] font-semibold text-white hover:bg-white/[0.1] hover:border-white/40 backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Explore Realized Systems</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
            </a>
          </motion.div>

          {/* ─── Grand Hexagonal Winged Circuit Hub with Unified Ice-Blue Icons ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="pt-6 sm:pt-8 relative w-full max-w-4xl lg:max-w-5xl mx-auto px-1"
          >
            <div className="relative flex items-center justify-center h-[200px] sm:h-[240px]">
              
              {/* Dynamic Hexagonal-Wing SVG Circuit Lines & Flowing Laser Streams */}
              <svg 
                viewBox="0 0 1000 240" 
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full select-none pointer-events-none"
              >
                <defs>
                  <linearGradient id="laserGradReal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0052FF" stopOpacity="0" />
                    <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                  </linearGradient>

                  <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base Dark Circuit Lines (Left Wing) */}
                {/* 1. Top Conduit */}
                <path d="M 140 30 L 280 30 L 390 85 L 450 85" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                {/* 2. Middle Conduit */}
                <path d="M 45 120 L 280 120 L 390 120 L 450 120" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                {/* 3. Bottom Conduit */}
                <path d="M 140 210 L 280 210 L 390 155 L 450 155" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                {/* Bottom Bus Traces */}
                <path d="M 490 170 L 490 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                <path d="M 500 170 L 500 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                <path d="M 510 170 L 510 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />

                {/* Base Dark Circuit Lines (Right Wing) */}
                {/* 4. Top Conduit */}
                <path d="M 860 30 L 720 30 L 610 85 L 550 85" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                {/* 5. Middle Conduit */}
                <path d="M 955 120 L 720 120 L 610 120 L 550 120" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                {/* 6. Bottom Conduit */}
                <path d="M 860 210 L 720 210 L 610 155 L 550 155" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                {/* Flowing Laser Beams (Left to Center) */}
                <motion.path
                  d="M 140 30 L 280 30 L 390 85 L 450 85"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 45 120 L 280 120 L 390 120 L 450 120"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
                <motion.path
                  d="M 140 210 L 280 210 L 390 155 L 450 155"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />

                {/* Flowing Laser Beams (Right to Center) */}
                <motion.path
                  d="M 860 30 L 720 30 L 610 85 L 550 85"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 955 120 L 720 120 L 610 120 L 550 120"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
                <motion.path
                  d="M 860 210 L 720 210 L 610 155 L 550 155"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />
              </svg>

              {/* Left 3 Spatially Distributed Nodes (Unified High-Tech Ice-Blue) */}
              {/* 1. Top Node: Native Mobile */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute left-[11%] sm:left-[13%] top-[4%] sm:top-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="Native Mobile & iOS/Android Systems"
              >
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

              {/* 2. Mid Node: Enterprise Web Platforms */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute left-[1.5%] sm:left-[2.5%] top-[44%] sm:top-[44%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="Enterprise Web Systems & React 19"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

              {/* 3. Bottom Node: Sovereign AI Pipelines */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute left-[11%] sm:left-[13%] bottom-[4%] sm:bottom-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="Sovereign AI & PyTorch ML Runtimes"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

              {/* Central STALCI Processor Core with Bold Stylish 'S' Monogram */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.18, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 -m-2 rounded-2xl bg-[#0052FF]/25 blur-md pointer-events-none"
                />

                <motion.div
                  animate={{ boxShadow: ["0 0 14px rgba(0,82,255,0.4)", "0 0 32px rgba(0,82,255,0.7)", "0 0 14px rgba(0,82,255,0.4)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#003ACC] via-[#0A1633] to-[#020617] border-2 border-[#0052FF] flex items-center justify-center shadow-xl"
                >
                  <StalciLogoIcon size={38} />
                  
                  {/* Glowing LED Neon Light Tubes Left */}
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                  </div>
                  {/* Glowing LED Neon Light Tubes Right */}
                  <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                    <div className="w-1.5 sm:w-2 h-1 bg-[#38BDF8] rounded-xs shadow-[0_0_6px_#38BDF8]" />
                  </div>
                </motion.div>
              </div>

              {/* Right 3 Spatially Distributed Nodes (Unified High-Tech Ice-Blue) */}
              {/* 4. Top Node: Multi-Cloud Infrastructure */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute right-[11%] sm:right-[13%] top-[4%] sm:top-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="Distributed Multi-Cloud Infrastructure"
              >
                <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

              {/* 5. Mid Node: Systems & Architecture */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute right-[1.5%] sm:right-[2.5%] top-[44%] sm:top-[44%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="Strict Software Platform Architecture"
              >
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

              {/* 6. Bottom Node: DevOps & Kubernetes */}
              <motion.div 
                whileHover={{ scale: 1.12, borderColor: "#0052FF", boxShadow: "0 0 16px rgba(0,82,255,0.4)" }}
                className="absolute right-[11%] sm:right-[13%] bottom-[4%] sm:bottom-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-[0_0_12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer group"
                title="DevOps, SRE & Kubernetes Orchestration"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Screen 2: Pure Obsidian Black Marquee Floor ─── */}
      <section className="flex-none w-full bg-[#000000] pt-8 sm:pt-14 pb-12 sm:pb-18 relative z-10 overflow-hidden">
        
        {/* Subtle Perspective Grid Lines Floor */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A8A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A_1px,transparent_1px)] bg-[size:4rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_70%,#000_60%,transparent_100%)] pointer-events-none -z-10" 
          aria-hidden 
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3.5 relative z-10">
          
          <div className="flex justify-center">
            <BadgePill tone="dark" variant="gradient">
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300">
                Trusted by <span className="font-bold text-white">250+ Brands worldwide</span>
              </span>
            </BadgePill>
          </div>

          <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            The Engine Behind Ambitious <span className="font-extrabold text-white">Innovators</span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed px-4">
            Whether you're a five-person startup or a Fortune 500 team, you're not building alone. 250+ Brands across 25+ countries have trusted us with their software.
          </p>

          {/* Smooth Infinite Horizontal Moving Marquee Banner */}
          <div className="pt-6 sm:pt-8 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
              className="flex w-max items-center gap-10 sm:gap-20 py-2 select-none"
            >
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <span
                  key={`${client.slug}-${idx}`}
                  className="font-display font-bold text-xs sm:text-base md:text-lg tracking-[0.2em] text-zinc-400 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-all cursor-default whitespace-nowrap"
                >
                  {client.name}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
