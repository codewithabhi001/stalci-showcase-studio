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
    "STALCI engineers high-performance web applications, scalable mobile ecosystems, and autonomous AI pipelines for forward-thinking enterprises and rapid-growth scaleups worldwide.";

  return (
    <div className="flex flex-col min-h-[calc(100svh-4rem)] sm:block bg-black text-white">
      {/* ─── Screen 1: Full Viewport Dark Obsidian Hero ─── */}
      <section
        id="top"
        className="relative isolate flex-1 flex flex-col items-center justify-center overflow-hidden sm:min-h-[calc(100vh-4rem)] bg-[#000000] text-white pt-20 pb-4 sm:py-8"
      >
        {/* Deep Sapphire Blue Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65rem] h-[22rem] bg-gradient-to-b from-[#0052FF]/[0.08] via-[#1D4ED8]/[0.03] to-transparent blur-[140px] pointer-events-none -z-20" />
        <div className="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] bg-[#0052FF]/[0.06] rounded-full blur-[130px] pointer-events-none -z-20" />
        <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-[#1E40AF]/[0.06] rounded-full blur-[130px] pointer-events-none -z-20" />

        {/* Crisp Luminous Dot Matrix Overlay */}
        <div 
          className="absolute inset-0 -z-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px] opacity-15 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" 
          aria-hidden 
        />

        {/* Focused Pure Sapphire Blue Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-[#0052FF]/[0.10] rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center my-auto">
          
          {/* ─── MOBILE ONLY: Glowing Processor Chip ─── */}
          <div className="sm:hidden mb-6 flex flex-col items-center justify-center relative w-full max-w-[280px] h-28">
            <div className="absolute w-32 h-32 bg-[#0052FF]/25 rounded-full blur-2xl pointer-events-none" />
            
            <svg 
              viewBox="0 0 280 112" 
              className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-visible"
            >
              <path d="M 0 46 L 95 46" fill="none" stroke="#1D2A44" strokeWidth="1.8" />
              <path d="M 0 56 L 95 56" fill="none" stroke="#0052FF" strokeWidth="2" strokeOpacity="0.7" />
              <path d="M 0 66 L 95 66" fill="none" stroke="#1D2A44" strokeWidth="1.8" />

              <path d="M 185 46 L 280 46" fill="none" stroke="#1D2A44" strokeWidth="1.8" />
              <path d="M 185 56 L 280 56" fill="none" stroke="#0052FF" strokeWidth="2" strokeOpacity="0.7" />
              <path d="M 185 66 L 280 66" fill="none" stroke="#1D2A44" strokeWidth="1.8" />

              <path d="M 124 96 L 124 112" fill="none" stroke="#1D2A44" strokeWidth="1.8" />
              <path d="M 132 96 L 132 112" fill="none" stroke="#0052FF" strokeWidth="1.8" strokeOpacity="0.8" />
              <path d="M 140 96 L 140 112" fill="none" stroke="#0052FF" strokeWidth="2" />
              <path d="M 148 96 L 148 112" fill="none" stroke="#0052FF" strokeWidth="1.8" strokeOpacity="0.8" />
              <path d="M 156 96 L 156 112" fill="none" stroke="#1D2A44" strokeWidth="1.8" />

              <path d="M 134 0 L 134 16" fill="none" stroke="#1D2A44" strokeWidth="1.8" />
              <path d="M 140 0 L 140 16" fill="none" stroke="#0052FF" strokeWidth="2" strokeOpacity="0.7" />
              <path d="M 146 0 L 146 16" fill="none" stroke="#1D2A44" strokeWidth="1.8" />
            </svg>

            <div className="relative z-10 h-20 w-20 rounded-2xl bg-gradient-to-br from-[#003ACC] via-[#0A1633] to-[#020617] border-2 border-[#0052FF] flex items-center justify-center shadow-[0_0_35px_rgba(0,82,255,0.7)]">
              <StalciLogoIcon size={34} />
              
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
              </div>

              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
                <div className="w-1.5 h-1 bg-blue-200/90 rounded-xs" />
              </div>

              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div className="w-1 h-1.5 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-1.5 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-1.5 bg-blue-200/90 rounded-xs" />
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div className="w-1 h-2 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-2 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-2 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-2 bg-blue-200/90 rounded-xs" />
                <div className="w-1 h-2 bg-blue-200/90 rounded-xs" />
              </div>
            </div>
          </div>

          {/* ─── DESKTOP ONLY: Top Pill Badge ─── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:flex mb-3 sm:mb-4 justify-center"
          >
            <BadgePill tone="dark" variant="gradient">
              <span className="text-[11px] font-mono text-white">⚡ Intelligent Digital Engineering &amp; Autonomous AI</span>
            </BadgePill>
          </motion.div>

          {/* 2-Line Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="text-balance text-2xl xs:text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold leading-[1.14] tracking-tight text-white max-w-4xl mx-auto font-display"
          >
            <span className="block">
              Architecting Next-Gen Software{" "}
              <span className="font-normal text-zinc-300">&amp; AI</span>
            </span>
            <span className="block font-semibold text-white/95 mt-1 sm:mt-0.5">
              Engineering Studio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-xl mx-auto font-normal px-2"
          >
            {heroSubtitle}
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-xs sm:max-w-none mx-auto"
          >
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-[13px] font-bold text-black hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Initiate Your Architecture</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="/#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3 text-xs sm:text-[13px] font-semibold text-white hover:bg-white/[0.12] hover:border-white/40 backdrop-blur-md transition-all shadow-2xs cursor-pointer"
            >
              <span>Explore Realized Systems</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
            </a>
          </motion.div>

          {/* ─── DESKTOP ONLY: Fully Visible Sapphire Laser Circuit Canvas ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="hidden sm:block mt-6 md:mt-8 relative w-full max-w-3xl mx-auto"
          >
            <div className="relative flex items-center justify-center h-[200px] md:h-[220px]">
              
              {/* SVG Circuit Traces with Deep Sapphire & Royal Blue Lasers */}
              <svg 
                viewBox="0 0 800 220" 
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full select-none pointer-events-none"
              >
                <defs>
                  <linearGradient id="sapphireLaserPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity="0" />
                    <stop offset="30%" stopColor="#2563EB" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#0052FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                  </linearGradient>
                  <filter id="sapphireLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Static Dark Circuit Traces */}
                <path d="M 90 35 L 200 35 L 290 95 L 350 95" fill="none" stroke="#1A2234" strokeWidth="2" />
                <path d="M 60 110 L 220 110 L 290 110 L 350 110" fill="none" stroke="#1A2234" strokeWidth="2" />
                <path d="M 90 185 L 200 185 L 290 125 L 350 125" fill="none" stroke="#1A2234" strokeWidth="2" />

                {/* Bottom Vertical Traces */}
                <path d="M 385 155 L 385 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
                <path d="M 395 155 L 395 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
                <path d="M 405 155 L 405 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
                <path d="M 415 155 L 415 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />

                <path d="M 710 35 L 600 35 L 510 95 L 450 95" fill="none" stroke="#1A2234" strokeWidth="2" />
                <path d="M 740 110 L 580 110 L 510 110 L 450 110" fill="none" stroke="#1A2234" strokeWidth="2" />
                <path d="M 710 185 L 600 185 L 510 125 L 450 125" fill="none" stroke="#1A2234" strokeWidth="2" />

                {/* Flowing Pure Sapphire Blue Laser Streams */}
                <motion.path
                  d="M 90 35 L 200 35 L 290 95 L 350 95"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [320, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 60 110 L 220 110 L 290 110 L 350 110"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [320, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
                <motion.path
                  d="M 90 185 L 200 185 L 290 125 L 350 125"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [320, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />

                <motion.path
                  d="M 710 35 L 600 35 L 510 95 L 450 95"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [0, 320] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 740 110 L 580 110 L 510 110 L 450 110"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [0, 320] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
                <motion.path
                  d="M 710 185 L 600 185 L 510 125 L 450 125"
                  fill="none"
                  stroke="url(#sapphireLaserPulse)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#sapphireLaserGlow)"
                  strokeDasharray="60, 260"
                  animate={{ strokeDashoffset: [0, 320] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />
              </svg>

              {/* Left 3 Squircle Capability Badges */}
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute left-[7%] top-[10%] flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Smartphone className="h-5 w-5 text-blue-200" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute left-[3%] top-[43%] flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Globe className="h-5 w-5 text-blue-200" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute left-[7%] bottom-[10%] flex items-center justify-center h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />
              </motion.div>

              {/* Center STALCI Processor Chip */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 -m-2 sm:-m-3 rounded-2xl sm:rounded-3xl bg-[#0052FF]/25 blur-md pointer-events-none"
                />

                <motion.div
                  animate={{ boxShadow: ["0 0 20px rgba(0,82,255,0.5)", "0 0 50px rgba(0,82,255,0.85)", "0 0 20px rgba(0,82,255,0.5)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#003ACC] via-[#0A1633] to-[#020617] border-2 border-[#0052FF] flex items-center justify-center shadow-2xl"
                >
                  <StalciLogoIcon size={38} />
                  
                  {/* Metallic Bus Pins */}
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                  </div>
                  <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                    <div className="w-1.5 h-1 bg-blue-200/80 rounded-xs" />
                  </div>
                </motion.div>
              </div>

              {/* Right 3 Squircle Capability Badges */}
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute right-[7%] top-[10%] flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Cloud className="h-5 w-5 text-blue-200" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute right-[3%] top-[43%] flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Code2 className="h-5 w-5 text-blue-200" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "#0052FF", boxShadow: "0 0 20px rgba(0,82,255,0.5)" }}
                className="absolute right-[7%] bottom-[10%] flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#090D18] border border-blue-900/40 text-white shadow-xl transition-all cursor-pointer"
              >
                <Settings className="h-5 w-5 text-blue-200" />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Screen 2: Clean Client Logo Marquee Seamlessly Blended ─── */}
      <section className="flex-none w-full bg-gradient-to-b from-[#000000] via-[#04060E] to-[#070A14] pt-8 sm:pt-20 pb-12 sm:pb-24 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[12rem] bg-blue-600/[0.04] blur-[120px] pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          
          {/* Gradient Border Pill */}
          <div className="flex justify-center">
            <BadgePill tone="dark" variant="gradient">
              <span className="text-[10.5px] sm:text-[11px]">
                Trusted by <span className="font-bold text-white">250+ Brands worldwide</span>
              </span>
            </BadgePill>
          </div>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            The Engine Behind Ambitious <span className="font-extrabold text-white">Innovators</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed px-2 sm:px-0">
            Whether you're a five-person startup or a Fortune 500 team, you're not building alone. 250+ Brands across 25+ countries have trusted us with their software.
          </p>

          {/* ─── Smooth Infinite Horizontal Moving Marquee Banner ─── */}
          <div className="pt-8 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex w-max items-center gap-12 sm:gap-20 py-3 select-none"
            >
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <span
                  key={`${client.slug}-${idx}`}
                  className="font-display font-black text-sm sm:text-base md:text-lg tracking-[0.2em] text-zinc-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition-all cursor-default whitespace-nowrap"
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
