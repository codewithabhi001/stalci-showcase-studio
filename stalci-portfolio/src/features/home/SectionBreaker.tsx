import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BadgePill } from "@/components/brand/Brand";

interface SectionBreakerProps {
  badge: string | ReactNode;
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
  title,
  titleHighlight,
  titleEnd,
  subtitle,
  buttonText,
  buttonHref = "/contact",
  variant = "grid",
}: SectionBreakerProps) {
  return (
    <section className="bg-white py-12 sm:py-16 text-black border-t border-slate-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-[#07090E] text-white border border-zinc-800 p-8 sm:p-12 lg:p-14 shadow-xl overflow-hidden"
        >
          {variant === "glow" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[18rem] bg-purple-600/[0.08] blur-[120px] pointer-events-none -z-10" />
          )}

          {variant === "grid" && (
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none"
              aria-hidden
            />
          )}

          <div className="mx-auto max-w-3xl text-center relative z-10 space-y-4">
            <div className="flex justify-center">
              <BadgePill tone="dark" variant="gradient">
                <span className="font-mono text-[11px] font-semibold">{badge}</span>
              </BadgePill>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-[1.18]">
              {title}{" "}
              {titleHighlight && <span className="text-blue-400">{titleHighlight}</span>}{" "}
              {titleEnd}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2 flex justify-center">
              <Link
                to={buttonHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 font-bold px-7 py-3 text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all duration-200 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
