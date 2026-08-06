import { ArrowRight, Code2, Cloud, ShieldCheck, Box, Cpu } from "lucide-react";
import mark from "@/assets/stalci-mark.png";

const pillars = [
  { icon: Code2, title: "IT Services", copy: "Custom software development" },
  { icon: Cloud, title: "Cloud & AI", copy: "Cloud solutions & AI products" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Secure systems for a safer future" },
  { icon: Box, title: "Products", copy: "Digital platforms & SaaS" },
  { icon: Cpu, title: "Data & Engineering", copy: "Pipelines, analytics, platforms" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden hero-glow">
      <div className="absolute inset-0 grid-lines opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.73 0.101 62 / 0.35), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-24 pt-36 text-center sm:pb-28 sm:pt-44 lg:px-8">
        <span className="animate-rise rounded-full border border-copper/40 bg-white/5 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-copper">
          Global technology company
        </span>

        <div className="relative mt-10 animate-float">
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.73 0.101 62 / 0.55), transparent 70%)" }}
            aria-hidden
          />
          <img
            src={mark}
            alt="STALCI copper monogram"
            width={160}
            height={160}
            className="h-28 w-28 object-contain drop-shadow-[0_20px_45px_rgba(216,155,91,0.35)] sm:h-40 sm:w-40"
          />
        </div>

        <div className="relative mt-8 overflow-hidden">
          <h1 className="text-[2.6rem] font-semibold leading-none tracking-[0.16em] text-on-ink sm:text-7xl md:text-8xl">
            STALCI
          </h1>
          <span
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md mix-blend-overlay"
            aria-hidden
          />
        </div>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.68rem] font-semibold tracking-[0.34em] text-on-ink-muted sm:text-xs">
          <span>CREATE</span>
          <span className="text-copper">•</span>
          <span className="text-copper">INNOVATE</span>
          <span className="text-copper">•</span>
          <span>EMPOWER</span>
        </p>

        <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-on-ink-muted sm:text-lg">
          STALCI is a global technology company delivering IT services, digital solutions and
          engineered products that empower businesses to move faster, scale safely and build what
          comes next.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_16px_40px_-16px_rgba(216,155,91,0.9)] sm:w-auto"
            style={{ background: "var(--gradient-copper)" }}
          >
            Start your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-on-ink transition-colors hover:border-copper/60 hover:text-copper sm:w-auto"
          >
            Explore capabilities
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col items-center gap-3 bg-ink-soft/90 px-6 py-8 text-center transition-colors hover:bg-ink-soft"
            >
              <p.icon className="h-8 w-8 text-copper transition-transform group-hover:scale-110" strokeWidth={1.4} />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-on-ink">{p.title}</h3>
              <p className="text-sm text-on-ink-muted">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
