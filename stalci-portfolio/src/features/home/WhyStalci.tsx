import { ShieldCheck, Cpu, Code2, Zap, Layers, Lock, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/brand/Brand";

const features = [
  {
    icon: Cpu,
    title: "Sovereign AI & ML Pipelines",
    desc: "Private LLM deployments, air-gapped vector search, RAG retrieval engines, and fine-tuned domain models with zero data leakage.",
    tag: "Autonomous AI",
  },
  {
    icon: Code2,
    title: "100% Type-Safe Full-Stack",
    desc: "React 19, Next.js 16, TypeScript, Node.js, and Golang microservices built with strict compile-time validation and zero regressions.",
    tag: "High Velocity",
  },
  {
    icon: Layers,
    title: "Multi-Cloud & Kubernetes",
    desc: "Terraform IaC, multi-region EKS/GKE orchestration, zero-downtime canary deployments, and proactive FinOps governance.",
    tag: "Zero Downtime",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Security & SLAs",
    desc: "ISO 27001 / SOC 2 Type II certified standards, hardware encryption vaults, and dedicated senior staff engineer allocation.",
    tag: "Enterprise Grade",
  },
];

export function WhyStalci() {
  return (
    <section id="why-stalci" className="bg-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tone="light"
          eyebrow="The STALCI Engineering Advantage"
          title="Why Global Leaders Choose STALCI Studio"
          subtitle="We combine sovereign AI engineering, multi-cloud resilience, and senior squad allocation to deliver high-scale systems."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 p-6 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xs">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                    {f.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>Senior Staff Allocation</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
