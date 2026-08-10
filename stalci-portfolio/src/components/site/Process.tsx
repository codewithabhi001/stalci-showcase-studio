import { motion } from "framer-motion";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useLineReveal } from "@/lib/animations";

const steps = [
  { n: "01", title: "Strategic Discovery", copy: "Architecture audits, security threat modeling, and stakeholder roadmapping." },
  { n: "02", title: "Systems Architecture", copy: "High-level design, zero-trust perimeter modeling, and tech stack specification." },
  { n: "03", title: "Agile Sprints", copy: "Bi-weekly sprint increments with automated unit tests, CI/CD pipelines, and code reviews." },
  { n: "04", title: "Hardened Rollout", copy: "Chaos testing, automated pentesting, and canary rollout with full APM telemetry." },
  { n: "05", title: "Scale & SLA Support", copy: "24/7 proactive NOC monitoring, FinOps cost tuning, and continuous enhancements." },
];

export function Process() {
  const headingRef = useScrollReveal();
  const staggerRef = useStaggerReveal({ staggerChildren: 0.1 });
  const lineRef = useLineReveal();

  return (
    <section id="process" className="relative bg-[#F8FAFC] py-24 sm:py-32 overflow-hidden text-slate-900 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Delivery Methodology"
            title="How We Architect & Deliver"
            subtitle="Five disciplined stages, transparent governance, and production value shipped in every single sprint."
            tone="light"
          />
        </div>

        <div className="relative mt-14" ref={staggerRef}>
          {/* Horizontal line for desktop */}
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 lg:block overflow-hidden" aria-hidden>
            <div 
              ref={lineRef} 
              className="h-full w-full origin-left bg-gradient-to-r from-amber-500 to-amber-700"
            />
          </div>

          <ol className="relative grid gap-6 lg:grid-cols-5">
            {steps.map((s) => (
              <motion.li
                key={s.n}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="relative flex flex-col lg:block"
              >
                <div className="mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white text-base font-extrabold shadow-md shadow-amber-900/20"
                  >
                    {s.n}
                  </motion.div>
                </div>
                
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-5 relative h-full hover:shadow-md hover:border-amber-500/70 transition-all duration-300">
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
