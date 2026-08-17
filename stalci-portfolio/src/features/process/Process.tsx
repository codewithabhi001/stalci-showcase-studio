import { motion } from "framer-motion";
import { SectionHeading } from "@/components/brand/Brand";
import { Search, Code2, Rocket, ShieldCheck, RefreshCw, Layers } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discovery & Architecture Scoping",
    desc: "We analyze your technical requirements, existing schemas, security constraints, and target SLAs to construct an immutable sprint blueprint.",
    deliverable: "Sprint Blueprint & Architecture Spec",
  },
  {
    step: "02",
    icon: Code2,
    title: "Iterative Sprint Execution",
    desc: "Dedicated senior squads deliver production-tested code in 2-week agile sprints with bi-directional telemetry and transparent PR reviews.",
    deliverable: "Bi-Weekly Production Releases",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Security Audit & Zero-Trust Verification",
    desc: "Rigorous static security analysis, penetration testing, compliance checks (SOC 2, ISO 27001), and air-gapped data validation.",
    deliverable: "Security Audit Certificate",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Zero-Downtime Deployment & Handover",
    desc: "Canary rollout to Kubernetes clusters, full CI/CD pipeline automation, zero-vendor lock-in IP transfer, and proactive SLA monitoring.",
    deliverable: "100% IP Ownership & Live System",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Deterministic Delivery Pipeline"
          title="How We Engineer &amp; Ship At Scale"
          subtitle="A battle-tested 4-stage engineering methodology built for transparency, speed, and zero technical debt."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-3xl bg-[#FAFAFC] border border-zinc-200/90 p-6 sm:p-7 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-blue-600">
                      {s.step}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 shadow-2xs">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-zinc-950 leading-snug">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-200/80 text-[11px] font-mono text-zinc-500">
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Deliverable:</span>
                  <span className="font-semibold text-zinc-900">{s.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
