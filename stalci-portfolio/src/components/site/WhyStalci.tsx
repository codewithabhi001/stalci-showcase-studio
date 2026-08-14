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
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 z-10">
        <div ref={headerRef as any}>
          <SectionHeading
            tone="light"
            eyebrow="The STALCI Advantage"
            title="Strategic Transformation Partners"
            subtitle="Transcending traditional vendor models to forge enduring alliances that drive enterprise agility and sustainable innovation."
          />
        </div>

        <div 
          ref={gridRef as any}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              className="group relative rounded-3xl bg-[#F8FAFC] p-7 sm:p-9 border border-slate-200/90 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl hover:bg-white overflow-hidden"
              whileHover="hover"
              initial="initial"
            >
              <div className="relative z-10 flex flex-col items-start">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] group-hover:bg-[#9E6229] group-hover:text-white transition-colors shadow-2xs">
                  <r.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#9E6229] transition-colors tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {r.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
