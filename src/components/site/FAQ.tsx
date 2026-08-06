"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What engagement models do you offer?",
    a: "Fixed-scope projects, dedicated engineering pods and staff augmentation. Most clients start with a discovery sprint and then scale into a dedicated pod.",
  },
  {
    q: "How quickly can a team start?",
    a: "A standard pod of 3–5 specialists is typically staffed within two weeks. Discovery sprints can begin in a matter of days.",
  },
  {
    q: "Do you sign NDAs and handle IP transfer?",
    a: "Yes. NDAs are signed before discovery and all intellectual property, source code and infrastructure ownership transfers to you.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Security reviews, dependency scanning and secrets management are built into delivery. We support SOC 2, ISO 27001, HIPAA and GDPR programmes.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Regularly. We start with a technical audit covering architecture, test coverage, security and cost, then present a prioritised remediation roadmap.",
  },
  {
    q: "What happens after launch?",
    a: "SLA-backed managed support with 24/7 monitoring, incident response, continuous delivery and a quarterly optimisation roadmap.",
  },
];

export function FAQ() {
  const [value, setValue] = useState<string>("");
  
  const headingRef = useScrollReveal({ distance: 40 });
  const staggerRef = useStaggerReveal({ staggerChildren: 0.1 });

  return (
    <section id="faq" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            subtitle="Everything teams usually ask before the first call."
          />
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl relative">

          
          <div ref={staggerRef}>
            <Accordion 
              type="single" 
              collapsible 
              className="w-full space-y-4"
              value={value}
              onValueChange={setValue}
            >
              {faqs.map((f, i) => {
                const isOpen = value === f.q;
                
                return (
                  <motion.div 
                    key={f.q}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="relative"
                  >
                    <AccordionItem 
                      value={f.q} 
                      className="border border-white/5 rounded-2xl bg-white/5 px-5 sm:px-6 overflow-hidden transition-colors hover:bg-white/10"
                    >
                      {/* Animated Copper Accent Line */}
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-copper rounded-l-2xl origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />

                      <AccordionTrigger className="hover:no-underline py-5 sm:py-6 group">
                        <div className="flex items-center text-left gap-4">
                          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-copper/20 to-copper/5 border border-copper/20 text-xs sm:text-sm font-bold text-copper mr-2 sm:mr-4 shadow-[0_0_15px_rgba(216,155,91,0.15)] group-hover:shadow-[0_0_20px_rgba(216,155,91,0.3)] transition-shadow">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors underline-sweep">
                            {f.q}
                          </span>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent 
                        forceMount 
                        className="overflow-hidden data-[state=closed]:animate-none data-[state=open]:animate-none p-0"
                      >
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ 
                                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 }
                              }}
                            >
                              <div className="pb-6 pl-14 sm:pl-18 pr-4 text-sm sm:text-base leading-relaxed text-on-ink-muted">
                                {f.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
