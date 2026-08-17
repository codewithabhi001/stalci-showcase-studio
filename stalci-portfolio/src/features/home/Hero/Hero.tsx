import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BadgePill } from "@/components/brand/Brand";
import { HeroVisualProcessor } from "./HeroVisualProcessor";
import { HeroClientLogos } from "./HeroClientLogos";
import { useSiteConfigQuery } from "@/hooks/queries/useSiteConfigQuery";

export function Hero() {
  const { data: config = {} } = useSiteConfigQuery();

  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI engineers high-performance web applications, scalable mobile ecosystems, and autonomous AI pipelines for forward-thinking enterprises and rapid-growth scaleups worldwide.";

  return (
    <div className="flex flex-col min-h-[calc(100svh-4rem)] sm:block bg-black text-white">
      {/* Screen 1: Dark Obsidian Hero */}
      <section
        id="top"
        className="relative isolate flex-1 flex flex-col items-center justify-center overflow-hidden sm:min-h-[calc(100vh-4rem)] bg-[#000000] text-white pt-20 pb-4 sm:py-8"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65rem] h-[22rem] bg-gradient-to-b from-[#0052FF]/[0.08] via-[#1D4ED8]/[0.03] to-transparent blur-[140px] pointer-events-none -z-20" />
        <div className="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] bg-[#0052FF]/[0.06] rounded-full blur-[130px] pointer-events-none -z-20" />
        <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-[#1E40AF]/[0.06] rounded-full blur-[130px] pointer-events-none -z-20" />

        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px] opacity-15 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none"
          aria-hidden
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-[#0052FF]/[0.10] rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center my-auto">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:flex mb-3 sm:mb-4 justify-center"
          >
            <BadgePill tone="dark" variant="gradient">
              <span className="text-[11px] font-mono text-white">⚡ Intelligent Digital Engineering &amp; Autonomous AI</span>
            </BadgePill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="text-balance text-2xl xs:text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold leading-[1.14] tracking-tight text-white max-w-4xl mx-auto font-display"
          >
            <span className="block">
              Architecting Next-Gen Software{" "}
              <span className="font-normal text-zinc-300">&amp; AI</span>
            </span>
            <span className="block font-semibold text-white/95 mt-1 sm:mt-0.5">
              Engineering Studio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-xl mx-auto font-normal px-2"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-xs sm:max-w-none mx-auto"
          >
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-[13px] font-bold text-black hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Initiate Your Architecture</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="/#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3 text-xs sm:text-[13px] font-semibold text-white hover:bg-white/[0.12] hover:border-white/40 backdrop-blur-md transition-all shadow-2xs cursor-pointer"
            >
              <span>Explore Realized Systems</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
            </a>
          </motion.div>

          <HeroVisualProcessor />
        </div>
      </section>

      <HeroClientLogos />
    </div>
  );
}
