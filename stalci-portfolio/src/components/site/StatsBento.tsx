import { motion } from "framer-motion";
import { BadgePill } from "./Brand";

const bentoCards = [
  // ─── Row 1 ───
  {
    id: "projects",
    number: "700+",
    description: "Projects delivered successfully using 50+ modern technologies and frameworks.",
    numPosition: "top",
    colSpan: "lg:col-span-4",
    glow: "from-amber-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-amber-500/30",
  },
  {
    id: "talent",
    number: "120+",
    description: "In-house principal architects & engineers with average 5+ years of deep domain experience.",
    numPosition: "bottom",
    colSpan: "lg:col-span-3",
    glow: "from-emerald-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-emerald-500/30",
  },
  {
    id: "reach",
    number: "24Mn+",
    description: "Active end users served globally daily with 99.99% verified uptime across distributed edge clusters.",
    numPosition: "top",
    colSpan: "lg:col-span-5",
    glow: "from-blue-600/15 via-indigo-500/10 to-transparent",
    borderGlow: "hover:border-blue-500/30",
  },

  // ─── Row 2 ───
  {
    id: "ai-specialists",
    number: "60%",
    description: "Senior-level AI specialists & principal system architects on direct staff.",
    numPosition: "top",
    colSpan: "lg:col-span-4",
    glow: "from-orange-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-orange-500/30",
  },
  {
    id: "retention",
    number: "99%",
    description: "Verified client satisfaction rating and multi-year recurring enterprise business.",
    numPosition: "bottom",
    colSpan: "lg:col-span-4",
    glow: "from-blue-500/10 via-transparent to-transparent",
    borderGlow: "hover:border-blue-500/30",
  },
  {
    id: "industries",
    number: "20+",
    description: "Specialized global industry verticals served across 25+ countries worldwide.",
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
        <div className="relative rounded-[32px] sm:rounded-[40px] border border-zinc-800 bg-[#0B0D13] text-white p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden">
          
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
