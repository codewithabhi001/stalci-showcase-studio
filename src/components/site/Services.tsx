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
  return (
    <section id="services" className="bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="End-to-end IT services under one roof"
          subtitle="Eight core practices, one delivery standard. Combine them into a full product team or plug a single specialism into your existing setup."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: "var(--gradient-copper)" }}
              />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink">
                <s.icon className="h-6 w-6 text-copper" strokeWidth={1.4} />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
