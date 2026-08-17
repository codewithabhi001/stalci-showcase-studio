import { motion } from "framer-motion";
import { BadgePill } from "./Brand";
import { Cpu, ShieldCheck, Zap, Sparkles, Check, ArrowRight } from "lucide-react";

export function About() {
  const accelerators = [
    {
      icon: Cpu,
      title: "AI-Powered Code Augmentation",
      description:
        "Our developers don't start from a blank page. They leverage intelligent assistants that generate boilerplate, validate algorithms, and translate architecture specs into functional code, turning hours of work into minutes.",
    },
    {
      icon: ShieldCheck,
      title: "Deterministic Quality Gates",
      description:
        "Continuous automated testing, strict static typing, and principal peer reviews ensure high velocity never comes at the cost of production stability or long-term maintainability.",
    },
    {
      icon: Zap,
      title: "Zero-Ramp Senior Squads",
      description:
        "Direct collaboration with senior engineers who understand distributed architecture, eliminating junior learning curves and delivering measurable production increments every sprint.",
    },
  ];

  return (
    <section id="about" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-16 sm:py-24 text-black overflow-hidden relative isolate">
      {/* Subtle Geometric Diagonal SVG Pattern */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-60" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section (Screenshot 1 Match) ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Expert-Driven Velocity</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            The <span className="font-extrabold text-black">Symbiosis</span>: How We Achieve <span className="font-extrabold text-black">5X Velocity</span>.
          </h2>

          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Smart engineers plus the right AI tools means shorter cycles, fewer bugs, and software in your hands roughly 5X faster than the old way.
          </p>
        </div>

        {/* ─── 2-Column Symbiosis Layout (Screenshot 1 Match) ─── */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column: Narrative & Key Bullets */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <p className="text-xs sm:text-[14px] leading-relaxed text-zinc-600 font-normal">
              It's not about working longer hours. It's about giving good engineers better tools. The three accelerators show how AI compresses each phase of the build, without cutting corners on the parts that matter.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "70% Faster Time-to-Market",
                "60% Cost Savings on Development",
                "Smarter AI Assistance = Higher Productivity, Lower Errors",
                "100% Client Intellectual Property Ownership",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-[13.5px] text-zinc-800 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Clean Accelerator Cards */}
          <div className="lg:col-span-7 space-y-4">
            {accelerators.map((acc, idx) => {
              const Icon = acc.icon;
              return (
                <motion.div
                  key={acc.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-6 sm:p-8 shadow-xs hover:border-zinc-300 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-white border border-zinc-200 p-2.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="h-5 w-5 text-zinc-950" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                        {acc.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 font-normal">
                        {acc.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
