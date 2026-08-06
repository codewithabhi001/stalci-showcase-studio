import { ArrowUpRight, Boxes, Bot, LineChart, Lock } from "lucide-react";
import { SectionHeading } from "./Brand";

const products = [
  {
    icon: Boxes,
    name: "StalciOps",
    tag: "Cloud platform",
    copy: "Unified infrastructure control plane with cost insight, IaC templates and one-click environments.",
    features: ["Multi-cloud provisioning", "Cost anomaly alerts", "Environment cloning"],
  },
  {
    icon: Bot,
    name: "Stalci AI Studio",
    tag: "AI product",
    copy: "Build, evaluate and deploy LLM assistants on your own data with guardrails and audit trails.",
    features: ["RAG pipelines", "Prompt versioning", "Eval dashboards"],
  },
  {
    icon: LineChart,
    name: "Stalci Insight",
    tag: "Analytics",
    copy: "Warehouse-native analytics with modelled metrics, alerting and embedded dashboards.",
    features: ["Semantic layer", "Realtime metrics", "Embedded BI"],
  },
  {
    icon: Lock,
    name: "Stalci Shield",
    tag: "Security",
    copy: "Continuous posture monitoring, vulnerability scanning and compliance evidence collection.",
    features: ["Continuous VAPT", "Policy as code", "SOC 2 evidence"],
  },
];

export function Products() {
  return (
    <section id="products" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Products"
          title="Software we own, run and license"
          subtitle="Beyond services, STALCI builds its own platforms — the same engineering standard, available as a product."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.name}
              className="card-lift group relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-9"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink">
                    <p.icon className="h-6 w-6 text-copper" strokeWidth={1.4} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-semibold">{p.name}</h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-copper-deep">{p.tag}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:text-copper" />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {f}
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
