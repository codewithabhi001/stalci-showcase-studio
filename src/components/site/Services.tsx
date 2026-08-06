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
    title: "Enterprise Software Engineering",
    copy: "Bespoke digital platforms, robust internal applications and systems engineered for mission-critical workflows.",
    points: ["Enterprise architecture", "Full-stack engineering", "API & microservices"],
  },
  {
    icon: Smartphone,
    title: "Enterprise Mobility Solutions",
    copy: "Native and cross-platform mobility solutions delivering robust performance and intuitive enterprise UI/UX.",
    points: ["iOS & Android", "React Native / Flutter", "MDM & secure delivery"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    copy: "Cloud migrations, infrastructure-as-code and resilient CI/CD pipelines enabling continuous enterprise delivery.",
    points: ["AWS · Azure · GCP", "Kubernetes & Cloud-native", "Enterprise SRE"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Cognitive Services",
    copy: "Enterprise generative AI, RAG architectures, and advanced predictive models securely deployed to production.",
    points: ["Enterprise LLMs", "MLOps & governance", "Computer vision & NLP"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    copy: "Advanced threat mitigation, zero-trust architectures, and robust compliance strategies for a fortified enterprise stack.",
    points: ["Red teaming & audits", "Zero-trust identity", "ISO / SOC 2 compliance"],
  },
  {
    icon: Database,
    title: "Data Architecture & Intelligence",
    copy: "Modern data architectures, scalable processing pipelines, and BI dashboards that drive enterprise decision intelligence.",
    points: ["Enterprise ETL / ELT", "Data lakehouse modelling", "Advanced BI analytics"],
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    copy: "Workflow automation, RPA, and complex system integrations that optimize enterprise operational efficiency.",
    points: ["Process automation (RPA)", "Enterprise system integration", "Workflow orchestration"],
  },
  {
    icon: LifeBuoy,
    title: "Managed IT Services",
    copy: "Proactive IT service management, rigorous monitoring, and dedicated engineering pods driving continuous agility.",
    points: ["24/7 proactive NOC/SOC", "Dedicated delivery pods", "Strict SLA adherence"],
  },
];

export function Services() {
  const staggerRef = useStaggerReveal();

  return (
    <section id="services" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Comprehensive Enterprise IT Solutions"
          subtitle="Eight specialized IT practices, unified by enterprise-grade delivery standards. Seamlessly integrate our capabilities as a managed service or augment your existing architecture with deep domain expertise."
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
