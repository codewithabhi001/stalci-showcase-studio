import { motion } from "framer-motion";
import { BadgePill } from "@/components/brand/Brand";

const clientLogos = [
  { name: "ARROW", slug: "arrow" },
  { name: "fixytrade", slug: "fixytrade" },
  { name: "melly", slug: "melly" },
  { name: "Fischer", slug: "fischer" },
  { name: "DENSIK", slug: "densik" },
  { name: "1Villager", slug: "villager" },
  { name: "CareLoop", slug: "careloop" },
  { name: "Meridian", slug: "meridian" },
];

export function HeroClientLogos() {
  return (
    <section className="flex-none w-full bg-gradient-to-b from-[#000000] via-[#04060E] to-[#070A14] pt-8 sm:pt-20 pb-12 sm:pb-24 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[12rem] bg-blue-600/[0.04] blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
        <div className="flex justify-center">
          <BadgePill tone="dark" variant="gradient">
            <span className="text-[10.5px] sm:text-[11px]">
              Trusted by <span className="font-bold text-white">250+ Brands worldwide</span>
            </span>
          </BadgePill>
        </div>

        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Engine Behind Ambitious <span className="font-extrabold text-white">Innovators</span>
        </h2>

        <p className="text-xs sm:text-[13px] text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed px-2 sm:px-0">
          Whether you're a five-person startup or a Fortune 500 team, you're not building alone. 250+ Brands across 25+ countries have trusted us with their software.
        </p>

        <div className="pt-8 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex w-max items-center gap-12 sm:gap-20 py-3 select-none"
          >
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
              <span
                key={`${client.slug}-${idx}`}
                className="font-display font-black text-sm sm:text-base md:text-lg tracking-[0.2em] text-zinc-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition-all cursor-default whitespace-nowrap"
              >
                {client.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
