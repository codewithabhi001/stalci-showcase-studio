import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import mark from "@/assets/stalci-mark.png";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-ink"
    >
      {/* Layered ambient background */}
      <div className="hero-glow absolute inset-0 -z-30" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-20 opacity-[0.35]" aria-hidden />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 45%, transparent 40%, oklch(0.16 0.008 250 / 0.85) 100%)",
        }}
        aria-hidden
      />
      <div
        className="animate-float-orb absolute left-1/2 top-[38%] -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/15 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={mark}
          alt="STALCI monogram"
          width={96}
          height={96}
          className="h-16 w-16 object-contain drop-shadow-[0_0_24px_rgba(216,155,91,0.45)] sm:h-20 sm:w-20"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7 text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-copper sm:text-[0.7rem]"
        >
          Create · Innovate · Empower
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-on-ink sm:text-5xl md:text-[3.5rem]"
        >
          Enterprise technology,
          <br className="hidden sm:block" />{" "}
          <span className="text-copper-gradient">engineered to scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 max-w-xl text-balance text-sm leading-relaxed text-on-ink-muted sm:text-base"
        >
          STALCI is a global IT partner delivering software engineering, cloud, AI,
          data and cyber security for organisations that cannot afford downtime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:w-auto"
            style={{ background: "var(--gradient-copper)" }}
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#services"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-on-ink transition-colors hover:border-copper/50 hover:text-copper sm:w-auto"
          >
            Explore services
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-7 flex justify-center"
        aria-hidden
      >
        <span className="h-10 w-px bg-gradient-to-b from-transparent via-copper/60 to-transparent" />
      </motion.div>
    </section>
  );
}
