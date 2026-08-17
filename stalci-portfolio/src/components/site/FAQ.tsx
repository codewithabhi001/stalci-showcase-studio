"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { BadgePill } from "./Brand";

const faqs = [
  {
    q: "Is your AI-enabled process just a gimmick?",
    a: "Nope. The high-level systems thinking and architecture come strictly from our senior human engineers—that is what you are paying for. AI co-pilots and internal LLM agents take care of repetitive scaffolding, type validation, and test generation, so the core engineering team spends 100% of their time on domain logic and performance optimization.",
  },
  {
    q: "How involved will our team need to be during the project?",
    a: "As involved as you want to be. We operate in bi-weekly sprint cadences with asynchronous Loom walkthroughs, live staging environments, and dedicated Slack/Teams channels. You have full visibility without the burden of micromanagement.",
  },
  {
    q: "Is your advanced architecture process more expensive?",
    a: "We offer fixed-scope milestones for predictable deliverables and dedicated monthly pods for continuous innovation. Because we eliminate architectural rework and technical debt upfront, our total cost of ownership is significantly lower than traditional agencies.",
  },
  {
    q: "What kind of enterprises and companies do you work with?",
    a: "We work with high-growth venture-backed startups, mid-market SaaS platforms, and Fortune 500 enterprises across FinTech, HealthTech, Supply Chain, and Sovereign AI infrastructure.",
  },
  {
    q: "How do you ensure the security and privacy of our proprietary IP?",
    a: "We operate under strict bilateral NDAs. All source code, design files, neural models, and infrastructure definitions are 100% your exclusive intellectual property from day one with zero vendor lock-in. Our team adheres to SOC 2 Type II, ISO 27001, and GDPR compliance standards.",
  },
  {
    q: "Can STALCI take over and refactor an existing codebase or cloud stack?",
    a: "Yes. Over 40% of our engagements involve modernizing legacy stacks, eliminating technical debt, scaling slow databases, or migrating monolithic apps to multi-cloud Kubernetes architectures without service downtime.",
  },
  {
    q: "What does your UI/UX and product design process look like?",
    a: "We build function-first, accessible, and high-conversion design systems in Figma. Every micro-interaction, token, and responsive breakpoint is mapped 1:1 to production React/Tailwind components for zero design-to-code drift.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const headingRef = useScrollReveal({ distance: 20 });
  const staggerRef = useStaggerReveal({ staggerChildren: 0.06 });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 overflow-hidden">
      {/* ─── Architectural Grid Overlay ─── */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 -z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:linear-gradient(to_right,#000_30%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─── Left Column: Section Header ─── */}
          <div ref={headingRef} className="lg:col-span-5 space-y-4">
            <div>
              <BadgePill tone="light" variant="gradient">
                <span className="font-semibold text-slate-900">Transparency &amp; Governance</span>
              </BadgePill>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight">
              Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Questions</span>, Answered with <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Clarity</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Most teams have the same questions before signing. Here are honest answers to the ones that come up most: pricing, process, security, and who owns the code.
            </p>
          </div>

          {/* ─── Right Column: Elevated Accordion Cards List ─── */}
          <div ref={staggerRef} className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-gradient-to-r from-blue-50/90 via-white to-blue-50/40 border-blue-300 shadow-md" 
                      : "bg-white border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between text-left gap-4 p-5 group cursor-pointer"
                  >
                    <span className={`text-xs sm:text-sm font-bold transition-colors ${
                      isOpen ? "text-blue-900 font-extrabold" : "text-slate-800 group-hover:text-blue-600"
                    }`}>
                      {faq.q}
                    </span>

                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isOpen 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" 
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}>
                      {isOpen ? (
                        <X className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-blue-200/50 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
