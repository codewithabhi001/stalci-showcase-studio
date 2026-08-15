import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap, ArrowUpRight } from "lucide-react";
import { SectionHeading, BadgePill } from "./Brand";

const roiCards = [
  {
    id: "innovation",
    tag: "INNOVATION",
    icon: Sparkles,
    multiplier: "3X",
    metricLabel: "Productivity Multiplier",
    title: "3X More Time on Core Strategic Features",
    description:
      "Let AI co-pilots and automated pipelines handle repetitive scaffolding. Your engineers spend 3x more time on domain logic that actually moves the needle.",
    tone: "bg-[#F4F6FB]",
  },
  {
    id: "growth",
    tag: "GROWTH",
    icon: TrendingUp,
    multiplier: "+25%",
    metricLabel: "Conversion Lift",
    title: "Up to 25% Increase in User Conversion",
    description:
      "Sub-millisecond TTFB latency, flawless Core Web Vitals, and friction-free user funnels consistently lift user activation and revenue retention.",
    tone: "bg-[#F0F7F4]",
  },
  {
    id: "efficiency",
    tag: "EFFICIENCY",
    icon: Zap,
    multiplier: "40%",
    metricLabel: "Timeline Compression",
    title: "Up to 40% Reduction in Time-to-Market",
    description:
      "Type-safe component libraries, deterministic automated testing, and agile sprint cadence compress roadmap delivery so you launch months ahead of competitors.",
    tone: "bg-[#FFF9F2]",
  },
];

export function RoiShowcase() {
  return (
    <section className="border-t border-zinc-200/90 bg-[#FAFAFC] py-14 sm:py-20 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Where Innovation Meets ROI</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-[32px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            The Tangible <span className="font-extrabold text-black">Return on Intelligence</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed max-w-xl mx-auto">
            Working with us isn't a line item, it's a multiplier. Here's where the return shows up first.
          </p>
        </div>

        {/* ─── 3-Column Balanced Bento Grid Layout ─── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {roiCards.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`rounded-3xl border border-zinc-200/90 ${item.tone} p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-zinc-400 hover:shadow-md transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Top Row: Icon & Tag */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-full bg-white/90 border border-zinc-200 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                {/* Hero Multiplier Metric */}
                <div className="mt-6 mb-2">
                  <span className="font-display text-4xl sm:text-5xl font-black text-zinc-950 tracking-tight block">
                    {item.multiplier}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-zinc-500 block mt-0.5">
                    {item.metricLabel}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent */}
              <div className="pt-6 mt-6 border-t border-zinc-200/80 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-800 group-hover:text-black">
                <span>Verified ROI Impact</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
