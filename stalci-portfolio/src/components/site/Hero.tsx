import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";

const clientLogos = [
  { name: "AWS", slug: "aws" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Docker", slug: "docker" },
];

export function Hero() {
  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const heroSubtitle =
    config.heroSubtitle ||
    "STALCI is a global technology studio delivering custom software, cloud architecture, sovereign AI systems, data pipelines, and cyber resilience for enterprises that cannot afford downtime.";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] w-full flex-col items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#FFFFFF] text-black border-b border-zinc-200/90"
    >
      {/* ─── Architectural Clean Vertical Grid Background (Replo Style) ─── */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto w-full max-w-5xl px-5 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/90 px-4 py-1 text-[11px] font-mono text-zinc-800 shadow-2xs">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-widest font-bold">STALCI FOR MODERN ENTERPRISES & SCALE</span>
          </div>
        </motion.div>

        {/* Clean, Bold Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mt-6 text-balance text-3xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.12] tracking-tight text-zinc-950 max-w-4xl mx-auto font-display"
        >
          Architecting High-Performance <br className="hidden sm:inline" />
          Software, AI & Cloud Platforms
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto font-normal"
        >
          {heroSubtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 transition-all shadow-sm hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>Book Architecture Discovery</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-zinc-50 hover:border-zinc-400 transition-all shadow-2xs cursor-pointer"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="h-4 w-4 text-zinc-500" />
          </a>
        </motion.div>

        {/* ─── Client Trust Logo Ticker Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-16 pt-8 border-t border-zinc-200/80"
        >
          <p className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-6">
            Trusted Platform & Infrastructure Toolchains
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {clientLogos.map((tech) => (
              <div
                key={tech.slug}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-black transition-colors"
              >
                <div className="h-7 w-7 rounded-lg bg-zinc-50 border border-zinc-200/80 p-1.5 flex items-center justify-center shadow-2xs">
                  <img
                    src={`/icons/${tech.slug}.svg`}
                    alt={tech.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="hidden sm:inline font-sans">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
