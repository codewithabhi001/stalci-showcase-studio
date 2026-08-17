import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/brand/Brand";

export const faqs = [
  {
    q: "How quickly can an engineering squad ramp up on our codebase?",
    a: "Our typical deployment velocity allows a fully staffed, senior engineering pod to begin architectural discovery within 5 to 7 business days following contract execution.",
  },
  {
    q: "How is intellectual property and source code ownership governed?",
    a: "100% of all code, neural weights, architecture artifacts, and documentation created during our engagement belong exclusively to your organization under a work-for-hire model with zero vendor lock-in.",
  },
  {
    q: "Do you sign enterprise Non-Disclosure Agreements (NDAs)?",
    a: "Yes. We execute mutual enterprise NDAs prior to reviewing proprietary technical roadmaps, schemas, or sensitive data repositories.",
  },
  {
    q: "What commercial engagement models do you support?",
    a: "We support Dedicated Agile Pods (monthly dedicated squads), Milestone-Driven Fixed Scopes, and Retained Solutions Architecture models tailored to your roadmap.",
  },
  {
    q: "How do you ensure zero-downtime during system migrations?",
    a: "We implement active-active multi-region Kubernetes clusters, automated blue/green canary deployments, and sub-frame failover proxies to guarantee 99.999% availability.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Clear Engagement Governance"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about engineering pods, SLAs, IP ownership, and technical discovery."
        />

        <div className="mt-12 divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-black transition-colors">
                    {faq.q}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 group-hover:bg-black group-hover:text-white transition-colors">
                    {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2 pb-1"
                    >
                      <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
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
    </section>
  );
}
