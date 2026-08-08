"use client";

import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const reasons = [
  { icon: Rocket, title: "Elite Engineering Pods", copy: "Exclusively staffed by seasoned architects and senior engineers to guarantee exceptional execution and technical maturity." },
  { icon: Timer, title: "Accelerated Value Realization", copy: "Rapid, deterministic deployment of operational increments, ensuring swift ROI across all strategic engagements." },
  { icon: Globe2, title: "Global Capability & Scale", copy: "Seamless, distributed delivery across global timezones enabling continuous, round-the-clock operational momentum." },
  { icon: Layers, title: "End-to-End Accountability", copy: "Comprehensive full-stack ownership—from initial architecture to sustained operations—providing a singular locus of accountability." },
  { icon: Handshake, title: "Commercial Transparency", copy: "Predictable engagement models with meticulous, real-time burn reporting and uncompromising financial clarity." },
  { icon: CheckCircle2, title: "Unyielding Quality Standards", copy: "Mission-critical reliability fortified by rigorous automated testing, continuous security validation, and proactive telemetry." },
];

export function WhyStalci() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal();

  return (
    <section className="surface-ink relative isolate overflow-hidden py-20 sm:py-24">
      {/* Grid lines overlay */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" aria-hidden />

      {/* Top copper accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef as any}>
          <SectionHeading
            tone="dark"
            eyebrow="The STALCI Advantage"
            title="Strategic Transformation Partners"
            subtitle="Transcending traditional vendor models to forge enduring alliances that drive enterprise agility and sustainable innovation."
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
