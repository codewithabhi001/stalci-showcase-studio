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
    <section className="bg-[#080B12] relative isolate overflow-hidden py-20 sm:py-28 border-t border-white/10 text-white">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
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
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              className="rounded-2xl border border-white/10 bg-[#0E1320] p-6 transition-all duration-200 hover:border-white/20 hover:bg-[#121827]"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#161E30] border border-white/10 text-slate-200">
                  <r.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">{r.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{r.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
