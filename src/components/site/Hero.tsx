import { ArrowRight, Code2, Cloud, ShieldCheck, Box, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import mark from "@/assets/stalci-mark.png";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";

const pillars = [
  { icon: Code2, title: "IT Services", copy: "Custom software development" },
  { icon: Cloud, title: "Cloud & AI", copy: "Cloud solutions & AI products" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Secure systems for a safer future" },
  { icon: Box, title: "Products", copy: "Digital platforms & SaaS" },
  { icon: Cpu, title: "Data & Engineering", copy: "Pipelines, analytics, platforms" },
];

export function Hero() {
  const headlineRef = useScrollReveal({ distance: 40, duration: 1 });
  const textRef = useScrollReveal({ distance: 30, duration: 0.8, delay: 0.2 });
  const buttonRef = useScrollReveal({ distance: 30, duration: 0.8, delay: 0.4 });
  const staggerRef = useStaggerReveal({ staggerDelay: 0.1, delay: 0.6 });

  return (
    <section id="top" className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-ink/90 via-ink/75 to-ink" aria-hidden />

      {/* Floating light orbs */}
      <div className="animate-float-orb absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-copper/20 blur-[100px]" aria-hidden />
      <div className="animate-float-orb absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-copper/10 blur-[120px]" style={{ animationDelay: '2s' }} aria-hidden />
      
      {/* Grid lines */}
      <div className="grid-lines absolute inset-0 -z-10 opacity-30" aria-hidden />
      
      <div className="relative mx-auto flex w-full max-w-6xl flex-grow flex-col items-center justify-center px-5 pb-20 pt-32 text-center lg:px-8">
        
        {/* Floating Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="animate-float relative mb-12"
        >
          <div className="animate-pulse-glow absolute inset-0 -z-10 rounded-full blur-3xl" 
               style={{ background: "radial-gradient(circle, var(--copper) 0%, transparent 70%)", opacity: 0.4 }} aria-hidden />
          <img
            src={mark}
            alt="STALCI copper monogram"
            width={160}
            height={160}
            className="h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(216,155,91,0.6)] sm:h-36 sm:w-36"
          />
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} className="relative overflow-hidden">
          <h1 className="text-[2.8rem] font-semibold leading-none tracking-[0.16em] text-on-ink sm:text-7xl md:text-[5.5rem] lg:text-8xl">
            STALCI
          </h1>
          <span
            className="animate-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md mix-blend-overlay"
            aria-hidden
          />
        </div>

        {/* Tagline & Copy */}
        <div ref={textRef} className="mt-8 flex flex-col items-center">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.7rem] font-semibold tracking-[0.34em] text-on-ink-muted sm:text-xs">
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
        </div>

        {/* CTAs */}
        <div ref={buttonRef} className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-ink shadow-[0_0_30px_-5px_rgba(216,155,91,0.5)] transition-shadow hover:shadow-[0_0_40px_-5px_rgba(216,155,91,0.7)] sm:w-auto"
            style={{ background: "var(--gradient-copper)" }}
          >
            Start your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-on-ink transition-colors hover:bg-white/5 hover:border-copper/60 hover:text-copper sm:w-auto"
          >
            Explore capabilities
          </motion.a>
        </div>
      </div>

      {/* Bottom Pillars */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-5 pb-12 lg:px-8">
        <div ref={staggerRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -5 }}
              className="glass-dark group flex flex-col items-center gap-3 rounded-2xl border border-white/10 px-6 py-8 text-center shadow-lg transition-all hover:border-copper/30 hover:bg-white/5"
            >
              <div className="mb-2 rounded-full bg-white/5 p-3 transition-colors group-hover:bg-copper/10">
                <p.icon className="h-6 w-6 text-copper transition-transform group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-on-ink">{p.title}</h3>
              <p className="text-xs leading-relaxed text-on-ink-muted">{p.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
