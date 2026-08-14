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

const faqs = [
  {
    q: "How does STALCI ensure enterprise delivery success and mitigate risks?",
    a: "We employ a rigorous, milestone-driven agile methodology. Every engagement begins with a comprehensive technical audit and discovery phase. We assign dedicated, cross-functional pods led by senior architects, ensuring transparent communication, continuous integration, and proactive risk management throughout the product lifecycle.",
  },
  {
    q: "What is your typical onboarding process for a new enterprise client?",
    a: "Our onboarding is designed to be seamless and non-disruptive. Within the first two weeks, we conduct deep-dive workshops with your stakeholders, establish secure communication channels, integrate with your existing CI/CD pipelines, and define clear SLAs and KPIs. A dedicated Delivery Manager ensures alignment from day one.",
  },
  {
    q: "Do you provide post-deployment support and 24/7 SLA maintenance?",
    a: "Absolutely. We offer comprehensive, SLA-backed managed services. This includes 24/7 proactive monitoring, rapid incident response, continuous security patching, and scheduled performance optimizations to ensure your digital assets remain resilient and scale effortlessly as your user base grows.",
  },
  {
    q: "How does STALCI handle data security, GDPR and SOC 2 compliance?",
    a: "Security is embedded into our engineering DNA. We follow DevSecOps practices with automated vulnerability scanning, penetration testing, and strict access controls. Our infrastructure designs are compliant with global standards including SOC 2 Type II, ISO 27001, GDPR, and HIPAA, ensuring your enterprise data is unequivocally protected.",
  },
  {
    q: "Can STALCI integrate with our legacy on-premise systems and ERPs?",
    a: "Yes. Our engineering teams specialize in complex digital transformations. We routinely build secure middleware, design robust APIs, and implement hybrid-cloud architectures that allow modern applications to seamlessly and securely communicate with legacy mainframes and on-premise databases without business disruption.",
  },
  {
    q: "What intellectual property (IP) rights do we retain as a client?",
    a: "Our standard engagement model is work-for-hire. Upon project completion and settlement, you retain 100% exclusive ownership of all intellectual property, source code, design assets, and infrastructure configurations created during the engagement. We ensure full IP transfer with zero vendor lock-in.",
  },
];

export function FAQ() {
  const [value, setValue] = useState<string>("");

  const headingRef = useScrollReveal({ distance: 30 });
  const staggerRef = useStaggerReveal({ staggerChildren: 0.08 });

  return (
    <section id="faq" className="relative bg-white py-20 sm:py-28 overflow-hidden text-slate-900 border-t border-slate-200/80">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Enterprise FAQs"
            subtitle="Everything engineering leaders and CTOs ask before initiating our technical discovery sprint."
            tone="light"
          />
        </div>

        <div className="mt-10 max-w-2xl mx-auto relative">
          <div ref={staggerRef}>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              value={value}
              onValueChange={setValue}
            >
              {faqs.map((f, i) => {
                const isOpen = value === f.q;

                return (
                  <motion.div
                    key={f.q}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="relative"
                  >
                    <AccordionItem
                      value={f.q}
                      className="border border-slate-200 rounded-xl bg-[#F8FAFC] px-4 sm:px-5 overflow-hidden transition-all duration-200 hover:border-slate-400"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 group">
                        <div className="flex items-center text-left gap-3">
                          <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-900">
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
                              transition={{ duration: 0.2 }}
                            >
                              <div className="pb-4 pl-10 pr-3 text-xs sm:text-sm leading-relaxed text-slate-600">
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
