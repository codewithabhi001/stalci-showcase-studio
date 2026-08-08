import { motion } from "framer-motion";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useLineReveal } from "@/lib/animations";

const steps = [
  { n: "01", title: "Strategic Discovery", copy: "Audits and workshops to agree scope, risks and success metrics." },
  { n: "02", title: "Enterprise Architecture", copy: "System design, security modelling and stack choices, written into a roadmap." },
  { n: "03", title: "Agile Engineering", copy: "Two-week increments with automated tests, review and continuous integration." },
  { n: "04", title: "Hardened Deployment", copy: "Load testing, hardening and staged rollout with observability from day one." },
  { n: "05", title: "Sustainable Scaling", copy: "SLA-backed support, cost tuning and a standing improvement backlog." },
];

export function Process() {
  const headingRef = useScrollReveal();
  const staggerRef = useStaggerReveal({ staggerChildren: 0.1 });
  const lineRef = useLineReveal();

  return (
    <section id="process" className="relative bg-background py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Process"
            title="How we deliver"
            subtitle="Five stages, transparent governance, and value shipped in every sprint."
          />
        </div>

        <div className="relative mt-14" ref={staggerRef}>
          {/* Timeline lines */}
          {/* Horizontal line for desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-px lg:block overflow-hidden" aria-hidden>
            <div 
              ref={lineRef} 
              className="h-full w-full origin-left bg-gradient-to-r from-[var(--copper-deep)] to-[var(--copper)]"
            />
          </div>
          {/* Vertical line for mobile */}
          <div className="absolute left-10 top-0 bottom-0 block w-px lg:hidden bg-gradient-to-b from-[var(--copper-deep)] to-[var(--copper)] opacity-30" aria-hidden />

          <ol className="relative grid gap-8 lg:grid-cols-5">
            {steps.map((s, index) => (
              <motion.li
                key={s.n}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="relative flex flex-col lg:block pl-20 lg:pl-0"
              >
                {/* Mobile/Desktop badge positioning */}
                <div className="absolute left-0 top-0 lg:relative lg:mb-6 lg:-ml-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex h-14 w-14 lg:h-12 lg:w-12 items-center justify-center rounded-full text-base font-bold text-ink animate-pulse-glow animate-float shadow-lg"
                    style={{ background: "var(--gradient-copper)" }}
                  >
                    {s.n}
                  </motion.div>
                </div>
                
                <div className="card-lift gradient-border surface-ink h-full rounded-2xl p-6 relative">
                  <h3 className="text-base font-semibold text-[var(--on-ink)]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--on-ink-muted)]">{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
