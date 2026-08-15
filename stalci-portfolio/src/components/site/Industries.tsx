import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { industries as staticIndustries, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { mapIndustry } from "@/lib/api-mapper";

interface TechIcon {
  name: string;
  slug: string;
}

interface IndustryMeta {
  standard: string;
  metric: string;
  primaryLogo: string;
  primaryAlt: string;
  techIcons: TechIcon[];
}

const INDUSTRY_METAS: Record<string, IndustryMeta> = {
  "fintech-banking": {
    standard: "PCI-DSS v4.0",
    metric: "5k TPS Sustained",
    primaryLogo: "stripe",
    primaryAlt: "Stripe & FinTech Core",
    techIcons: [
      { name: "Stripe", slug: "stripe" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Kubernetes", slug: "kubernetes" },
    ],
  },
  "healthcare": {
    standard: "HIPAA / HL7",
    metric: "100% HIPAA SLA",
    primaryLogo: "python",
    primaryAlt: "Python & FHIR",
    techIcons: [
      { name: "Python", slug: "python" },
      { name: "React", slug: "react" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Docker", slug: "docker" },
    ],
  },
  "retail": {
    standard: "Headless OMS",
    metric: "+22% Conversion",
    primaryLogo: "nextdotjs",
    primaryAlt: "Next.js Commerce",
    techIcons: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Redis", slug: "redis" },
      { name: "Snowflake", slug: "snowflake" },
      { name: "TypeScript", slug: "typescript" },
    ],
  },
  "education": {
    standard: "Adaptive AI",
    metric: "100k+ Concurrency",
    primaryLogo: "react",
    primaryAlt: "React LMS",
    techIcons: [
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
    ],
  },
  "manufacturing": {
    standard: "Industry 4.0",
    metric: "-25% Downtime",
    primaryLogo: "grafana",
    primaryAlt: "Grafana IIoT",
    techIcons: [
      { name: "Python", slug: "python" },
      { name: "Grafana", slug: "grafana" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
    ],
  },
  "logistics": {
    standard: "Live Telematics",
    metric: "+9% On-Time SLA",
    primaryLogo: "go",
    primaryAlt: "Go Telematics",
    techIcons: [
      { name: "Go", slug: "go" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "React", slug: "react" },
      { name: "Google Cloud", slug: "googlecloud" },
    ],
  },
  "proptech": {
    standard: "MLS / IDX",
    metric: "1h Sync Latency",
    primaryLogo: "elasticsearch",
    primaryAlt: "Elasticsearch IDX",
    techIcons: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Elasticsearch", slug: "elasticsearch" },
      { name: "Python", slug: "python" },
      { name: "TailwindCSS", slug: "tailwindcss" },
    ],
  },
  "travel": {
    standard: "GDS Connect",
    metric: "<500ms Response",
    primaryLogo: "redis",
    primaryAlt: "Redis GDS",
    techIcons: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Redis", slug: "redis" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Kubernetes", slug: "kubernetes" },
    ],
  },
  "media-telecom": {
    standard: "Low-Latency",
    metric: "<3s Start Time",
    primaryLogo: "cloudflare",
    primaryAlt: "Cloudflare Video",
    techIcons: [
      { name: "Go", slug: "go" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "React", slug: "react" },
    ],
  },
  "gaming": {
    standard: "Real-time State",
    metric: "<20ms Latency",
    primaryLogo: "rust",
    primaryAlt: "Rust Engine",
    techIcons: [
      { name: "Rust", slug: "rust" },
      { name: "Go", slug: "go" },
      { name: "Redis", slug: "redis" },
      { name: "Docker", slug: "docker" },
    ],
  },
};

const DEFAULT_META: IndustryMeta = {
  standard: "Enterprise Scale",
  metric: "99.99% Production SLA",
  primaryLogo: "typescript",
  primaryAlt: "Enterprise Tech",
  techIcons: [
    { name: "TypeScript", slug: "typescript" },
    { name: "React", slug: "react" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Docker", slug: "docker" },
  ],
};

export function Industries() {
  const gridRef = useStaggerReveal({ stagger: 0.04, y: 20 });

  const { data: apiIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  const industries: DetailEntry[] =
    apiIndustries && apiIndustries.length > 0 ? apiIndustries.map(mapIndustry) : staticIndustries;

  return (
    <section id="industries" className="border-t border-zinc-200/90 bg-white py-20 sm:py-28 text-black">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Industries & Domains"
          title="Domain Depth Across Global Sectors"
          subtitle="Reference architectures, zero-trust security frameworks, and compliance patterns proven in your market."
          tone="light"
        />

        <div ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => {
            const meta = INDUSTRY_METAS[i.slug] || DEFAULT_META;

            return (
              <Link
                key={i.slug}
                to="/industries/$slug"
                params={{ slug: i.slug }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 transition-all duration-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Authentic Brand SVG Logo + Clean Monospace Standard Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/90 p-2.5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <img
                        src={`/icons/${meta.primaryLogo}.svg`}
                        alt={meta.primaryAlt}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-800 border border-zinc-200">
                      {meta.standard}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {i.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal line-clamp-2">
                    {i.summary}
                  </p>

                  {/* Real Tech SVG Icons Bar */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Stack</span>
                    <div className="flex items-center gap-1.5">
                      {meta.techIcons.map((tech) => (
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

                {/* Footer Metric + Action Link */}
                <div className="mt-6 pt-3.5 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">Metric</span>
                    <span className="text-xs font-bold text-zinc-950 font-mono">{meta.metric}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:text-copper transition-colors">
                    <span>View Frameworks</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
