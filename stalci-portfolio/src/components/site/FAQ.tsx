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
    <section id="faq" className="relative bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 overflow-hidden">
      {/* ─── Architectural Clean Grid Overlay on Left (As in reference image) ─── */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 -z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:linear-gradient(to_right,#000_30%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─── Left Column: Section Header (Image 2 Match) ─── */}
          <div ref={headingRef} className="lg:col-span-5 space-y-4">
            <div>
              <BadgePill tone="light" variant="gradient">
                <span>Built on </span>
                <span className="font-bold text-zinc-950">Transparency & Trust</span>
              </BadgePill>
            </div>

            <h2 className="font-display text-2xl sm:text-[32px] font-bold text-zinc-950 leading-[1.2] tracking-tight">
              Your <span className="font-extrabold text-black">Questions</span>, Answered with <span className="font-extrabold text-black">Clarity</span>
            </h2>

            <p className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed">
              Most teams have the same questions before signing. Here are honest answers to the ones that come up most: pricing, process, security, and who owns the code.
            </p>
          </div>

          {/* ─── Right Column: Clean Accordion List (Image 2 Match) ─── */}
          <div ref={staggerRef} className="lg:col-span-7 divide-y divide-zinc-200/80">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between text-left gap-4 py-2 group cursor-pointer"
                  >
                    <span className={`text-xs sm:text-sm font-bold transition-colors ${
                      isOpen ? "text-zinc-950 font-extrabold" : "text-zinc-800 group-hover:text-zinc-950"
                    }`}>
                      {faq.q}
                    </span>

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-zinc-500 group-hover:text-zinc-950 transition-colors">
                      {isOpen ? (
                        <X className="h-4 w-4 stroke-[2]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2]" />
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
                        <p className="pt-2 pb-3 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                          {faq.a}
                        </p>
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
