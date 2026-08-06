import {
  Code2,
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Database,
  Workflow,
  LifeBuoy,
} from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    copy: "Web platforms, internal tools and enterprise systems engineered to your exact workflow.",
    points: ["Product architecture", "Web app engineering", "API & integrations"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    copy: "Native and cross-platform apps with offline-first performance and clean UX.",
    points: ["iOS & Android", "React Native / Flutter", "App store delivery"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    copy: "Cloud migration, infrastructure as code and CI/CD pipelines that ship daily.",
    points: ["AWS · Azure · GCP", "Kubernetes & Docker", "Observability & SRE"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    copy: "LLM applications, RAG systems, computer vision and predictive models in production.",
    points: ["LLM & agent systems", "MLOps pipelines", "Vision & NLP"],
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    copy: "Penetration testing, hardening and compliance for a safer, audit-ready stack.",
    points: ["VAPT & audits", "Zero-trust identity", "ISO / SOC 2 readiness"],
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    copy: "Warehouses, streaming pipelines and dashboards that turn raw data into decisions.",
    points: ["ETL / ELT pipelines", "Warehouse modelling", "BI dashboards"],
  },
  {
    icon: Workflow,
    title: "Enterprise Automation",
    copy: "Workflow automation, RPA and system integration that removes manual overhead.",
    points: ["Process automation", "ERP / CRM integration", "Workflow orchestration"],
  },
  {
    icon: LifeBuoy,
    title: "Managed IT & Support",
    copy: "24/7 monitoring, maintenance and dedicated engineering pods that scale with you.",
    points: ["24/7 monitoring", "Dedicated squads", "SLA-backed support"],
  },
];

export function Services() {
  const staggerRef = useStaggerReveal();

  return (
    <section id="services" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="End-to-end IT services under one roof"
          subtitle="Eight core practices, one delivery standard. Combine them into a full product team or plug a single specialism into your existing setup."
        />

        <div 
          ref={staggerRef as any}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, index) => {
            const isLarge = index === 0 || index === 1;
            
            return (
              <motion.article
                key={s.title}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 ${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ background: "var(--gradient-copper)" }}
                />
                
                <div className="relative mb-6 inline-flex self-start">
                   <motion.div
                     animate={{
                       scale: [1, 1.2, 1],
                       opacity: [0.3, 0.6, 0.3],
                     }}
                     transition={{
                       duration: 3,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                     className="absolute -inset-2 rounded-full bg-copper/20 blur-md"
                   />
                   <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink ring-1 ring-copper/30">
                     <s.icon className="h-6 w-6 text-copper" strokeWidth={1.5} />
                   </div>
                </div>

                <div className={`flex flex-col flex-1 ${isLarge ? "sm:flex-row sm:gap-8 sm:items-start" : ""}`}>
                  <div className={`${isLarge ? "sm:w-1/2" : ""}`}>
                    <h3 className="text-xl font-bold leading-snug text-ink">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.copy}</p>
                  </div>
                  
                  <div className={`mt-6 ${isLarge ? "sm:mt-0 sm:w-1/2 sm:pl-8 sm:border-l sm:border-copper/10" : ""}`}>
                    <ul className={`space-y-3 ${!isLarge ? "border-t border-copper/10 pt-5 mt-5" : ""}`}>
                      {s.points.map((p) => (
                        <motion.li 
                          key={p} 
                          initial="initial"
                          whileHover="hover"
                          className="flex items-start gap-3 text-sm text-ink-soft font-medium cursor-default"
                        >
                          <motion.span 
                            variants={{
                              initial: { scale: 1 },
                              hover: { scale: 1.5, opacity: 0.8 }
                            }}
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper"
                          />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
