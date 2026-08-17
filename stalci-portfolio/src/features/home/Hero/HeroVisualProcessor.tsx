import { Smartphone, Globe, Sparkles, Cloud, Code2, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { StalciLogoIcon } from "@/components/brand/Brand";

export function HeroVisualProcessor() {
  return (
    <>
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

      {/* ─── DESKTOP ONLY: Sapphire Laser Circuit ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className="hidden sm:block mt-6 md:mt-8 relative w-full max-w-3xl mx-auto"
      >
        <div className="relative flex items-center justify-center h-[200px] md:h-[220px]">
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

            <path d="M 90 35 L 200 35 L 290 95 L 350 95" fill="none" stroke="#1A2234" strokeWidth="2" />
            <path d="M 60 110 L 220 110 L 290 110 L 350 110" fill="none" stroke="#1A2234" strokeWidth="2" />
            <path d="M 90 185 L 200 185 L 290 125 L 350 125" fill="none" stroke="#1A2234" strokeWidth="2" />

            <path d="M 385 155 L 385 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
            <path d="M 395 155 L 395 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
            <path d="M 405 155 L 405 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />
            <path d="M 415 155 L 415 220" fill="none" stroke="#1A2234" strokeWidth="1.6" />

            <path d="M 710 35 L 600 35 L 510 95 L 450 95" fill="none" stroke="#1A2234" strokeWidth="2" />
            <path d="M 740 110 L 580 110 L 510 110 L 450 110" fill="none" stroke="#1A2234" strokeWidth="2" />
            <path d="M 710 185 L 600 185 L 510 125 L 450 125" fill="none" stroke="#1A2234" strokeWidth="2" />

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

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-2 sm:-m-3 rounded-2xl sm:rounded-3xl bg-[#0052FF]/25 blur-md pointer-events-none"
            />

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,82,255,0.5)",
                  "0 0 50px rgba(0,82,255,0.85)",
                  "0 0 20px rgba(0,82,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#003ACC] via-[#0A1633] to-[#020617] border-2 border-[#0052FF] flex items-center justify-center shadow-2xl"
            >
              <StalciLogoIcon size={38} />

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
    </>
  );
}
