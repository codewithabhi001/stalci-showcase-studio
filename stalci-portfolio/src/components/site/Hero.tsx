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
    <div className="flex flex-col bg-[#000000] text-white overflow-hidden w-full contain-paint">
      
      {/* ─── Screen 1: Flagship Sovereign Studio Hero ─── */}
      <section
        id="top"
        className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#000000] pt-8 pb-10 sm:pt-14 sm:pb-16"
      >
        {/* Lightweight Hardware-Accelerated Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[70rem] h-[18rem] bg-gradient-to-b from-[#0052FF]/10 via-transparent to-transparent blur-[80px] pointer-events-none -z-20 gpu-layer" />

        {/* Crisp High-Tech Dot Matrix Grid */}
        <div 
          className="absolute inset-0 -z-10 bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:26px_26px] opacity-15 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" 
          aria-hidden 
        />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center space-y-3.5 sm:space-y-4">
          
          {/* Top Pill Badge */}
          <div className="flex justify-center mb-0.5">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-900/40 bg-[#060913]/90 px-3.5 py-1 text-[10.5px] sm:text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] shadow-[0_0_6px_#0052FF] shrink-0" />
              <span className="sm:hidden">⚡ Sovereign AI &bull; Cloud Studio</span>
              <span className="hidden sm:inline">Sovereign AI &bull; Cloud Infrastructure &bull; Platform Engineering</span>
            </div>
          </div>

          {/* Expansive, Sleek, Wide Headline */}
          <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.18] tracking-tight text-white max-w-5xl mx-auto font-display px-2">
            Engineering Sovereign AI &amp; Next-Gen Digital Platforms
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-[13.5px] md:text-[14px] leading-relaxed text-zinc-400 max-w-2xl sm:max-w-3xl mx-auto font-normal px-4">
            {heroSubtitle}
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-[280px] sm:max-w-none mx-auto">
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
          </div>

          {/* ─── Grand Hexagonal Winged Circuit Hub (Zero-Lag GPU Acceleration) ─── */}
          <div className="pt-6 sm:pt-8 relative w-full max-w-4xl lg:max-w-5xl mx-auto px-1 gpu-layer">
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
                    <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Base Dark Circuit Lines (Left Wing) */}
                <path d="M 140 30 L 280 30 L 390 85 L 450 85" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 45 120 L 280 120 L 390 120 L 450 120" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 140 210 L 280 210 L 390 155 L 450 155" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                {/* Bottom Bus Traces */}
                <path d="M 490 170 L 490 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                <path d="M 500 170 L 500 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                <path d="M 510 170 L 510 225" fill="none" stroke="#1E293B" strokeWidth="1.8" />

                {/* Base Dark Circuit Lines (Right Wing) */}
                <path d="M 860 30 L 720 30 L 610 85 L 550 85" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 955 120 L 720 120 L 610 120 L 550 120" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 860 210 L 720 210 L 610 155 L 550 155" fill="none" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                {/* Flowing Laser Beams (Hardware-Accelerated 120 FPS) */}
                <motion.path
                  d="M 140 30 L 280 30 L 390 85 L 450 85"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />
                <motion.path
                  d="M 45 120 L 280 120 L 390 120 L 450 120"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />
                <motion.path
                  d="M 140 210 L 280 210 L 390 155 L 450 155"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [380, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />

                {/* Flowing Laser Beams (Right to Center) */}
                <motion.path
                  d="M 860 30 L 720 30 L 610 85 L 550 85"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />
                <motion.path
                  d="M 955 120 L 720 120 L 610 120 L 550 120"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />
                <motion.path
                  d="M 860 210 L 720 210 L 610 155 L 550 155"
                  fill="none"
                  stroke="url(#laserGradReal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="60, 320"
                  animate={{ strokeDashoffset: [0, 380] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                  style={{ filter: "drop-shadow(0 0 3px #0052FF)" }}
                />
              </svg>

              {/* Left 3 Spatially Distributed Nodes */}
              <div 
                className="absolute left-[11%] sm:left-[13%] top-[4%] sm:top-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="Native Mobile & iOS/Android Systems"
              >
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

              <div 
                className="absolute left-[1.5%] sm:left-[2.5%] top-[44%] sm:top-[44%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="Enterprise Web Systems & React 19"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

              <div 
                className="absolute left-[11%] sm:left-[13%] bottom-[4%] sm:bottom-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="Sovereign AI & PyTorch ML Runtimes"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

              {/* Central STALCI Processor Core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#003ACC] via-[#0A1633] to-[#020617] border-2 border-[#0052FF] flex items-center justify-center shadow-[0_0_24px_rgba(0,82,255,0.4)]">
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
                </div>
              </div>

              {/* Right 3 Spatially Distributed Nodes */}
              <div 
                className="absolute right-[11%] sm:right-[13%] top-[4%] sm:top-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="Distributed Multi-Cloud Infrastructure"
              >
                <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

              <div 
                className="absolute right-[1.5%] sm:right-[2.5%] top-[44%] sm:top-[44%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="Strict Software Platform Architecture"
              >
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

              <div 
                className="absolute right-[11%] sm:right-[13%] bottom-[4%] sm:bottom-[5%] flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#080D1A]/95 border border-blue-900/50 text-blue-300 shadow-md transition-transform hover:scale-110 cursor-pointer group"
                title="DevOps, SRE & Kubernetes Orchestration"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white transition-colors" strokeWidth={1.75} />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── Screen 2: Pure Obsidian Black Marquee Floor (GPU CSS Marquee) ─── */}
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

          {/* Smooth GPU Hardware-Accelerated CSS Infinite Marquee */}
          <div className="pt-6 sm:pt-8 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-smooth-marquee py-2 select-none gap-10 sm:gap-20">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <span
                  key={`${client.slug}-${idx}`}
                  className="font-display font-bold text-xs sm:text-base md:text-lg tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-default whitespace-nowrap"
                >
                  {client.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
