import { useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Cloud, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const pills = [
  { icon: Cpu, label: "AI & Agentic Systems" },
  { icon: Cloud, label: "Cloud & Platform Engineering" },
  { icon: ShieldCheck, label: "Cyber Security" },
];

const stats = [
  { value: "120+", label: "Products shipped" },
  { value: "12", label: "Industries served" },
  { value: "99.98%", label: "Uptime delivered" },
  { value: "24/7", label: "Managed support" },
];

function Monogram() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  if (state === "error") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-copper/40 bg-copper/10 font-display text-2xl font-bold text-copper sm:h-20 sm:w-20">
        S
      </div>
    );
  }

  return (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
      {state === "loading" ? (
        <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/10" aria-hidden />
      ) : null}
      <img
        src="/stalci-mark.png"
        alt="STALCI monogram"
        width={96}
        height={96}
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        className={
          "h-full w-full object-contain drop-shadow-[0_0_24px_rgba(216,155,91,0.45)] transition-opacity duration-500 " +
          (state === "ready" ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink py-24"
    >
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

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Monogram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-driven engineering
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-on-ink sm:text-5xl md:text-[3.4rem]"
        >
          We build AI-native software
          <br className="hidden sm:block" />{" "}
          <span className="text-copper-gradient">engineered to scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-on-ink-muted sm:text-base"
        >
          STALCI is a global IT partner. We design, engineer and operate custom software,
          cloud platforms, data pipelines, AI agents and security programmes for
          organisations that cannot afford downtime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {pills.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-on-ink-muted"
            >
              <p.icon className="h-3.5 w-3.5 text-copper" />
              {p.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
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

        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-xl font-semibold text-copper sm:text-2xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-on-ink-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-5 flex justify-center"
        aria-hidden
      >
        <span className="h-8 w-px bg-gradient-to-b from-transparent via-copper/60 to-transparent" />
      </motion.div>
    </section>
  );
}
