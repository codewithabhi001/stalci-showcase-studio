import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BadgePill } from "./Brand";

export function Contact() {
  return (
    <section id="contact" className="bg-[#FFFFFF] py-16 sm:py-24 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── Elevated Obsidian Island Card (Creates Clean Visual Break Before Footer) ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[32px] sm:rounded-[44px] bg-[#07090E] text-white border border-zinc-800 p-8 sm:p-14 lg:p-20 shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          {/* Subtle Ambient Atmosphere Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[22rem] bg-[#0052FF]/[0.09] blur-[140px] pointer-events-none -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[10rem] bg-indigo-600/[0.05] blur-[110px] pointer-events-none -z-10" />

          {/* Architectural Dot Matrix Pattern */}
          <div 
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" 
            aria-hidden 
          />

          {/* Fine Structural Blueprint Lines */}
          <div 
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_45%,transparent_100%)] pointer-events-none" 
            aria-hidden 
          />

          <div className="mx-auto max-w-3xl text-center relative z-10 space-y-6">
            
            {/* Top Pill Badge */}
            <div className="flex justify-center">
              <BadgePill tone="dark" variant="gradient">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                  <span>100% Contractual SLA Guarantee</span>
                </span>
              </BadgePill>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.14]">
              Ready to Scale With Zero Technical Debt?
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Experience predictable engineering sprints, enterprise zero-trust security standards, and dedicated senior squad allocation with complete intellectual property ownership.
            </p>

            {/* Luminous White Action Button */}
            <div className="pt-4 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-zinc-950 font-bold px-9 py-4 text-xs sm:text-sm shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:shadow-[0_0_60px_rgba(255,255,255,0.55)] hover:bg-zinc-100 hover:scale-105 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <span>Consult With Principal Architects</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
