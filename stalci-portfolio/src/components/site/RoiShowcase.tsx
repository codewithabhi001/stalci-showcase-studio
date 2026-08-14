import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { SectionHeading } from "./Brand";

const roiCards = [
  {
    id: "innovation",
    tag: "INNOVATION",
    icon: Sparkles,
    multiplier: "3X",
    title: "Innovation: 3X More Time Spent on Strategic Features",
    description:
      "Let AI handle the repetitive stuff. Your engineers spend 3x more time on the features that actually move the needle.",
    reverse: false,
  },
  {
    id: "growth",
    tag: "GROWTH",
    icon: TrendingUp,
    multiplier: "25%",
    title: "Growth: Up to 25% Increase in Conversion & Engagement",
    description:
      "Faster pages, cleaner flows, fewer dead ends. Our build process consistently produces apps that lift conversion and engagement up to 25%.",
    reverse: true,
  },
  {
    id: "efficiency",
    tag: "EFFICIENCY",
    icon: Zap,
    multiplier: "40%",
    title: "Efficiency: Up to 40% Reduction in Development Timelines",
    description:
      "Auto-generated code, AI-driven testing, and project plans that adjust as work happens. Together they cut timelines up to 40%. You get to market while your competitor is still scoping.",
    reverse: false,
  },
];

export function RoiShowcase() {
  return (
    <section className="relative bg-[#FAFAFC] py-20 sm:py-28 text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Where Innovation Meets ROI"
          title="The Tangible Return on Intelligence"
          subtitle="Working with us isn't a line item, it's a multiplier. Here's where the return shows up first."
        />

        <div className="mt-14 space-y-10 sm:space-y-12">
          {roiCards.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-10 ${
                item.reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
              }`}
            >
              {/* Visual Multiplier Card */}
              <div className="relative group">
                <div className="relative rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-slate-400/60 hover:shadow-md transition-all duration-300 min-h-[170px] flex flex-col justify-between overflow-hidden">
                  
                  {/* Icon & Tag */}
                  <div className="relative z-10">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                      <item.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </div>
                    <span className="block mt-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  {/* Watermark Multiplier */}
                  <div className="absolute bottom-1 right-5 sm:right-6 z-0">
                    <span className="font-display text-6xl sm:text-7xl font-extrabold text-slate-100/90 select-none tracking-tighter leading-none">
                      {item.multiplier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Narrative Column */}
              <div className="flex flex-col justify-center space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
