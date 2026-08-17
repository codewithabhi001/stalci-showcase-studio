import { motion } from "framer-motion";
import { BadgePill } from "./Brand";

const bentoCards = [
  // ─── Row 1 ───
  {
    id: "projects",
    number: "45+",
    description: "Digital systems and AI applications shipped with zero post-release regressions.",
    numPosition: "top",
    colSpan: "lg:col-span-4",
    glow: "from-blue-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-blue-500/30",
  },
  {
    id: "talent",
    number: "15+",
    description: "Senior full-stack architects, cloud specialists, and ML engineers with deep domain expertise.",
    numPosition: "bottom",
    colSpan: "lg:col-span-3",
    glow: "from-emerald-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-emerald-500/30",
  },
  {
    id: "reach",
    number: "99.8%",
    description: "On-time sprint milestone delivery SLA with deterministic sprint velocity.",
    numPosition: "top",
    colSpan: "lg:col-span-5",
    glow: "from-indigo-600/15 via-blue-500/10 to-transparent",
    borderGlow: "hover:border-indigo-500/30",
  },

  // ─── Row 2 ───
  {
    id: "ai-specialists",
    number: "2+ Yrs",
    description: "Of continuous engineering velocity, delivering modern tech to scaleups worldwide.",
    numPosition: "top",
    colSpan: "lg:col-span-4",
    glow: "from-amber-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-amber-500/30",
  },
  {
    id: "retention",
    number: "100%",
    description: "Complete IP ownership transfer and zero vendor lock-in guarantee for all client assets.",
    numPosition: "bottom",
    colSpan: "lg:col-span-4",
    glow: "from-blue-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-blue-500/30",
  },
  {
    id: "industries",
    number: "8+",
    description: "Core industry verticals including FinTech, HealthTech, AI SaaS, and E-Commerce.",
    numPosition: "top",
    colSpan: "lg:col-span-4",
    glow: "from-purple-500/10 via-rose-500/5 to-transparent",
    borderGlow: "hover:border-purple-500/30",
  },
];

export function StatsBento() {
  return (
    <section className="relative bg-[#FFFFFF] py-14 sm:py-20 text-black overflow-hidden border-t border-zinc-200/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── High-Contrast Obsidian Bento Telemetry Enclave (Exact Reference Match) ─── */}
        <div className="relative rounded-[32px] sm:rounded-[40px] border border-zinc-800 bg-[#0B0D13] text-white p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden isolate">
          
          {/* Subtle Dark Telemetry Dot Grid */}
          <div 
            className="absolute inset-0 -z-10 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" 
            aria-hidden 
          />

          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-[28rem] h-[28rem] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex justify-center">
              <BadgePill tone="dark" variant="gradient">
                <span>Proven by </span>
                <span className="font-bold text-white">Performance &amp; Trust</span>
              </BadgePill>
            </div>

            <h2 className="font-display text-2xl sm:text-[34px] font-bold text-white tracking-tight leading-[1.2]">
              The Data Behind the <span className="font-extrabold text-white">Dominance</span>
            </h2>

            <p className="text-xs sm:text-[13.5px] text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto">
              Built on proven expertise, in-house talent, and cross-industry experience, we create reliable digital solutions designed for long-term growth.
            </p>
          </div>

          {/* ─── Clean 6-Card Asymmetric Bento Grid (Exact Reference Match) ─── */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 relative z-10">
            {bentoCards.map((card, idx) => {
              const isNumTop = card.numPosition === "top";

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`${card.colSpan} relative rounded-3xl border border-white/10 bg-[#131722]/80 p-6 sm:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[175px] backdrop-blur-md ${card.borderGlow} hover:bg-[#161B28] transition-all duration-300 overflow-hidden group`}
                >
                  {/* Subtle Inner Ambient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

                  {isNumTop ? (
                    <>
                      {/* Top: Large Bold Number */}
                      <div className="relative z-10">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight block">
                          {card.number}
                        </span>
                      </div>

                      {/* Bottom: Clear Description */}
                      <div className="relative z-10 mt-6">
                        <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal">
                          {card.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Top: Clear Description */}
                      <div className="relative z-10 mb-6">
                        <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom: Large Bold Number */}
                      <div className="relative z-10">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight block">
                          {card.number}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
