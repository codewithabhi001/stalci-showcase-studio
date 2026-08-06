"use client";

import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const reasons = [
  { icon: Rocket, title: "Senior-only teams", copy: "No juniors billed as experts — every pod is led by 8+ year engineers." },
  { icon: Timer, title: "Fast time to value", copy: "First working increment inside 3 weeks, every single engagement." },
  { icon: Globe2, title: "Global delivery", copy: "Overlapping timezone coverage across EMEA, APAC and the Americas." },
  { icon: Layers, title: "Full-stack ownership", copy: "Design, build, secure and operate — one accountable partner." },
  { icon: Handshake, title: "Transparent pricing", copy: "Fixed-scope or T&M with weekly burn reporting. No hidden lines." },
  { icon: CheckCircle2, title: "Production quality", copy: "Automated testing, security review and observability as standard." },
];

export function WhyStalci() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal();

  return (
    <section className="surface-ink relative isolate overflow-hidden py-24 sm:py-32">
      {/* Grid lines overlay */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" aria-hidden />

      {/* Top copper accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef as any}>
          <SectionHeading
            tone="dark"
            eyebrow="Why STALCI"
            title="A technology partner, not a vendor"
            subtitle="Short, unique and memorable — and built to stay with you long after launch."
          />
        </div>

        <div 
          ref={gridRef as any}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              className="group relative bg-ink/90 p-8 transition-colors duration-300 hover:bg-ink-soft overflow-hidden"
              whileHover="hover"
              initial="initial"
            >
              {/* Animated gradient border / background effect */}
              <motion.div
                className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                variants={{
                  initial: { background: "linear-gradient(to bottom right, rgba(216,155,91,0), rgba(216,155,91,0))" },
                  hover: { background: "linear-gradient(to bottom right, rgba(216,155,91,0.15), rgba(216,155,91,0))" }
                }}
              />
              
              <div className="relative z-10 flex flex-col items-start">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-soft border border-white/5 glow-copper group-hover:border-copper/30 transition-colors duration-300">
                  <r.icon className="h-6 w-6 text-copper animate-float" strokeWidth={1.5} />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-on-ink tracking-tight">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-ink-muted">{r.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom copper accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper/50 to-transparent" />
    </section>
  );
}
