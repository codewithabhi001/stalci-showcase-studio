import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Terminal } from "lucide-react";
import { BadgePill } from "./Brand";

interface SectionBreakerProps {
  badge: string;
  badgeHighlight?: string;
  title: string;
  titleHighlight?: string;
  titleEnd?: string;
  subtitle: string;
  buttonText: string;
  buttonHref?: string;
  variant?: "grid" | "glow" | "wave";
}

export function SectionBreaker({
  badge,
  badgeHighlight,
  title,
  titleHighlight,
  titleEnd,
  subtitle,
  buttonText,
  buttonHref = "/#contact",
  variant = "glow",
}: SectionBreakerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#07090E] text-white py-14 sm:py-18 border-y border-zinc-800/80 shadow-2xl">
      
      {/* ─── Variant 1: Perspective Grid Background (Screenshot 2 Style) ─── */}
      {variant === "grid" && (
        <>
          <div 
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" 
            aria-hidden 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[18rem] bg-blue-600/[0.08] blur-[120px] pointer-events-none -z-10" />
        </>
      )}

      {/* ─── Variant 2: Vibrant Blue Floor Aura (Screenshot 1 Style) ─── */}
      {variant === "glow" && (
        <>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[65rem] h-[16rem] bg-gradient-to-t from-blue-600/25 via-indigo-600/10 to-transparent blur-[110px] pointer-events-none -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[10rem] bg-indigo-500/[0.06] blur-[100px] pointer-events-none -z-10" />
          <div 
            className="absolute inset-0 -z-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" 
            aria-hidden 
          />
        </>
      )}

      {/* ─── Variant 3: Deep Royal Wave ─── */}
      {variant === "wave" && (
        <>
          <div className="absolute top-1/2 left-1/4 w-[30rem] h-[20rem] bg-blue-600/[0.12] rounded-full blur-[130px] pointer-events-none -z-10" />
          <div className="absolute top-1/2 right-1/4 w-[30rem] h-[20rem] bg-indigo-600/[0.12] rounded-full blur-[130px] pointer-events-none -z-10" />
        </>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-3.5 flex justify-center"
        >
          <BadgePill tone="dark" variant="gradient">
            <span>{badge}</span>
            {badgeHighlight && <span className="font-bold text-white ml-1">{badgeHighlight}</span>}
          </BadgePill>
        </motion.div>

        {/* Dynamic Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-balance text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-tight leading-[1.2] font-display"
        >
          {title}{" "}
          {titleHighlight && (
            <span className="font-extrabold text-white">
              {titleHighlight}
            </span>
          )}{" "}
          {titleEnd && <span>{titleEnd}</span>}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3.5 text-xs sm:text-[13.5px] leading-relaxed text-zinc-300 max-w-2xl mx-auto font-normal"
        >
          {subtitle}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-6 flex justify-center"
        >
          <a
            href={buttonHref}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs sm:text-[13px] font-bold text-black hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
