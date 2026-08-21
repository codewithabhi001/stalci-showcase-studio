import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Plus, X } from "lucide-react";
import { BadgePill } from "./Brand";

interface FaqItem {
  q: string;
  a: string;
}

const defaultFaqs: FaqItem[] = [
  {
    q: "Is your AI-enabled process just a gimmick?",
    a: "Nope. The thinking and architecture come from our engineers, that's the part you're paying for. AI co-pilots take care of the boring stuff like boilerplate, naming, and repetitive scaffolding, so the team can spend more time on the parts that actually shape your product.",
  },
  {
    q: "How involved will I be in this project?",
    a: "As involved as you want to be. We operate in bi-weekly sprint cadences with asynchronous Loom walkthroughs, live staging environments, and direct Slack/Teams channels. You get 100% visibility without the micromanagement overhead.",
  },
  {
    q: "Is your advanced process more expensive?",
    a: "We offer fixed-scope milestones for predictable deliverables and dedicated monthly pods. Because we eliminate architectural rework and technical debt upfront, total cost of ownership is significantly lower than traditional agency models.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You own 100% of all intellectual property, source code, neural models, and design assets from day one under strict bilateral NDA agreements with zero vendor lock-in.",
  },
  {
    q: "Can STALCI refactor or scale an existing product?",
    a: "Yes. Over 40% of our engagements involve taking over existing codebases, eliminating performance bottlenecks, fixing tech debt, and migrating to modern cloud architectures without user downtime.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const dynamicFaqs: FaqItem[] = config.faqsJson
    ? JSON.parse(config.faqsJson)
    : defaultFaqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#FFFFFF] py-16 sm:py-24 text-black border-t border-zinc-200/90 overflow-hidden isolate">
      {/* Subtle Geometric SVG Background Pattern */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─── Left Column: Section Header (Screenshot 5 Match) ─── */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            <div>
              <BadgePill tone="light" variant="gradient">
                <span className="text-zinc-600">Built on </span>
                <span className="font-bold text-zinc-950">Transparency &amp; Trust</span>
              </BadgePill>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 leading-[1.2] tracking-tight">
              Your <span className="font-extrabold text-black">Questions</span>, Answered with <span className="font-extrabold text-black">Clarity</span>
            </h2>

            <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed">
              Most teams have the same questions before signing. Here are honest answers to the ones that come up most: pricing, process, security, and who owns the code.
            </p>
          </div>

          {/* ─── Right Column: Minimalist Accordion (Screenshot 5 Match) ─── */}
          <div className="lg:col-span-7 divide-y divide-zinc-200/80">
            {dynamicFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between text-left gap-4 cursor-pointer group"
                  >
                    <span className="text-xs sm:text-[14.5px] font-semibold text-zinc-900 group-hover:text-black transition-colors">
                      {faq.q}
                    </span>

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-zinc-600 group-hover:text-black transition-colors">
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
                        <p className="pt-3 text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed font-normal pr-8">
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
