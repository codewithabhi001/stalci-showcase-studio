import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";

interface TechIcon {
  name: string;
  slug: string;
}

interface ProductItem {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  primaryLogo: string;
  primaryAlt: string;
  metric: string;
  stack: TechIcon[];
}

const products: ProductItem[] = [
  {
    slug: "stalci-ops",
    title: "StalciOps",
    tag: "FinOps & Infra",
    summary: "Multi-cloud cost governance, automated Kubernetes pod right-sizing, and idle cloud resource reclamation.",
    primaryLogo: "kubernetes",
    primaryAlt: "Kubernetes Cloud Control",
    metric: "-38% Cloud Waste",
    stack: [
      { name: "AWS", slug: "aws" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "Docker", slug: "docker" },
    ],
  },
  {
    slug: "stalci-ai-studio",
    title: "Stalci AI Studio",
    tag: "Sovereign AI",
    summary: "Fine-tune, evaluate, and orchestrate private LLM agent pipelines in zero-retention private VPC enclaves.",
    primaryLogo: "python",
    primaryAlt: "Python & Sovereign AI",
    metric: "< 18ms TTFT Stream",
    stack: [
      { name: "Python", slug: "python" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "LangChain", slug: "langchain" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    slug: "stalci-insight",
    title: "Stalci Insight",
    tag: "Data Fabric",
    summary: "Warehouse-native streaming analytics, pgvector query acceleration, and semantic layer orchestration for big data.",
    primaryLogo: "postgresql",
    primaryAlt: "PostgreSQL Data Fabric",
    metric: "8.4x Query Speedup",
    stack: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Redis", slug: "redis" },
      { name: "Next.js", slug: "nextdotjs" },
    ],
  },
  {
    slug: "stalci-shield",
    title: "Stalci Shield",
    tag: "Zero-Trust Mesh",
    summary: "Continuous security posture management, dynamic IAM policy pruning, and automated compliance verification.",
    primaryLogo: "cloudflare",
    primaryAlt: "Cloudflare & Zero Trust",
    metric: "100% Zero-Trust SLA",
    stack: [
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Vault", slug: "vault" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Prometheus", slug: "prometheus" },
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="border-t border-zinc-200/90 bg-white py-14 sm:py-20 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Our Products"
          title="Platforms We Build & Run Ourselves"
          subtitle="Four proprietary platforms born out of client engagements — now available as licensed enterprise software."
          tone="light"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 transition-all duration-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                {/* Top Row: Authentic Brand SVG Logo + Clean Monospace Tag Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/90 p-2.5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={`/icons/${p.primaryLogo}.svg`}
                      alt={p.primaryAlt}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-800 border border-zinc-200">
                    {p.tag}
                  </span>
                </div>

                {/* Title & Summary */}
                <h3 className="mt-4 text-base sm:text-lg font-bold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal line-clamp-2">
                  {p.summary}
                </p>

                {/* Real Tech SVG Icons Bar */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Stack</span>
                  <div className="flex items-center gap-1.5">
                    {p.stack.map((tech) => (
                      <div
                        key={tech.slug}
                        title={tech.name}
                        className="h-6 w-6 rounded-md bg-zinc-50 border border-zinc-200/80 p-1 flex items-center justify-center shadow-2xs"
                      >
                        <img
                          src={`/icons/${tech.slug}.svg`}
                          alt={tech.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Metric & Link */}
              <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                <div>
                  <span className="block text-[9.5px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                    Metric
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-950">
                    {p.metric}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 group-hover:underline">
                  View Specs
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
