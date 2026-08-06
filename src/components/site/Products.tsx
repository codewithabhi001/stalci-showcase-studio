import { ArrowUpRight, Boxes, Bot, LineChart, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useLineReveal } from "@/lib/animations";

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

function ProductCard({ p }: { p: typeof products[0] }) {
  const tagsRef = useStaggerReveal({ yOffset: 15, staggerDelay: 0.1 });
  
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      className="card-lift glass gradient-border group relative flex flex-col overflow-hidden rounded-3xl p-8 sm:p-10 md:p-12"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <span className="animate-pulse-glow relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink">
            <p.icon className="h-7 w-7 text-copper" strokeWidth={1.4} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-xl sm:text-2xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-copper-deep">{p.tag}</p>
          </div>
        </div>
        
        <motion.div
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: 45, scale: 1.15 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10 mt-1 cursor-pointer"
        >
          <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-copper" />
        </motion.div>
      </div>

      <p className="relative z-10 mt-8 max-w-sm text-sm sm:text-base leading-relaxed text-muted-foreground">
        {p.copy}
      </p>

      <div className="mt-auto pt-10">
        <ul ref={tagsRef} className="relative z-10 flex flex-wrap gap-2">
          {p.features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-border/50 bg-secondary/60 px-4 py-2 text-xs font-medium text-secondary-foreground backdrop-blur-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Products() {
  const headingRef = useScrollReveal({ yOffset: 30 });
  const lineRef = useLineReveal();

  return (
    <section id="products" className="mesh-gradient-light relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Products"
            title="Software we own, run and license"
            subtitle="Beyond services, STALCI builds its own platforms — the same engineering standard, available as a product."
          />
        </div>

        {/* Subtle gradient line separator */}
        <div className="relative mt-12 mb-14 h-px w-full overflow-hidden bg-border/30">
          <div 
            ref={lineRef}
            className="absolute inset-y-0 left-0 h-full w-full origin-left bg-gradient-to-r from-transparent via-copper to-transparent opacity-60"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
