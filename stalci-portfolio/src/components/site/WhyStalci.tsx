import { BadgePill } from "./Brand";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Zap } from "lucide-react";

export function WhyStalci() {
  const returns = [
    {
      id: "innovation",
      watermark: "3X",
      label: "INNOVATION",
      icon: Brain,
      title: "Innovation: 3X More Time Spent on Strategic Features",
      description:
        "Let AI handle the repetitive stuff. Your engineers spend 3x more time on the features that actually move the needle.",
      reverse: false,
    },
    {
      id: "growth",
      watermark: "25%",
      label: "GROWTH",
      icon: TrendingUp,
      title: "Growth: Up to 25% Increase in Conversion & Engagement",
      description:
        "Faster pages, cleaner flows, fewer dead ends. Our build process consistently produces apps that lift conversion and engagement up to 25%.",
      reverse: true,
    },
    {
      id: "velocity",
      watermark: "40%",
      label: "VELOCITY",
      icon: Zap,
      title: "Velocity: 40% Reduction in Time-to-Market",
      description:
        "From sprint zero discovery to global production deployment, our embedded pod model strips away bureaucratic overhead and accelerates your release cadence.",
      reverse: false,
    },
  ];

  return (
    <section id="why-stalci" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-16 sm:py-24 text-black relative isolate overflow-hidden">
      {/* Subtle Dot Grid SVG Pattern */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-60" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section (Screenshot 2 Match) ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 sm:mb-20">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Where Innovation Meets ROI</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            The <span className="font-extrabold text-black">Tangible Return</span> on Intelligence
          </h2>

          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Working with us isn't a line item, it's a multiplier. Here's where the return shows up first.
          </p>
        </div>

        {/* ─── Alternating 2-Column Return Rows (Screenshot 2 Match) ─── */}
        <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
          {returns.map((row) => {
            const Icon = row.icon;

            const VisualCard = (
              <motion.div
                key={`card-${row.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative flex items-center justify-between rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-8 sm:p-12 overflow-hidden shadow-xs hover:border-zinc-300 hover:shadow-md transition-all duration-300 min-h-[180px]"
              >
                <div className="flex flex-col gap-3 z-10">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-700">
                    {row.label}
                  </span>
                </div>

                {/* Big Stylized Subtle Watermark */}
                <div className="font-display text-6xl sm:text-7xl font-black text-zinc-300/60 select-none pointer-events-none">
                  {row.watermark}
                </div>
              </motion.div>
            );

            const ContentBlock = (
              <div key={`content-${row.id}`} className="flex flex-col justify-center space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug">
                  {row.title}
                </h3>
                <p className="text-xs sm:text-[14px] leading-relaxed text-zinc-600 font-normal">
                  {row.description}
                </p>
              </div>
            );

            return (
              <div
                key={row.id}
                className="grid gap-8 md:grid-cols-2 items-center"
              >
                {row.reverse ? (
                  <>
                    <div className="order-2 md:order-1">{ContentBlock}</div>
                    <div className="order-1 md:order-2">{VisualCard}</div>
                  </>
                ) : (
                  <>
                    <div className="order-1">{VisualCard}</div>
                    <div className="order-2">{ContentBlock}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
