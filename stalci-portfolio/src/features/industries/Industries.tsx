import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/brand/Brand";
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
    metric: "Sub-10ms Ledger",
    primaryLogo: "/icons/react.svg",
    primaryAlt: "React logo",
    techIcons: [
      { name: "TypeScript", slug: "typescript" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
    ],
  },
  "healthcare-lifesciences": {
    standard: "HIPAA Compliant",
    metric: "HL7 / FHIR Native",
    primaryLogo: "/icons/python.svg",
    primaryAlt: "Python logo",
    techIcons: [
      { name: "Python", slug: "python" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Docker", slug: "docker" },
      { name: "AWS", slug: "aws" },
    ],
  },
  "ecommerce-retail": {
    standard: "Global Headless",
    metric: "100k+ Req/Sec",
    primaryLogo: "/icons/nextdotjs.svg",
    primaryAlt: "Next.js logo",
    techIcons: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Cloudflare", slug: "cloudflare" },
    ],
  },
  "logistics-supply-chain": {
    standard: "Real-time Telemetry",
    metric: "Sub-100ms Geofence",
    primaryLogo: "/icons/go.svg",
    primaryAlt: "Go logo",
    techIcons: [
      { name: "Go", slug: "go" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Apache Kafka", slug: "apachekafka" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  "energy-cleantech": {
    standard: "ISO 50001",
    metric: "Micro-Grid IoT",
    primaryLogo: "/icons/python.svg",
    primaryAlt: "Python logo",
    techIcons: [
      { name: "Python", slug: "python" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "Docker", slug: "docker" },
      { name: "Grafana", slug: "grafana" },
    ],
  },
  "public-sector": {
    standard: "FedRAMP Ready",
    metric: "Air-Gapped Sovereign",
    primaryLogo: "/icons/rust.svg",
    primaryAlt: "Rust logo",
    techIcons: [
      { name: "Rust", slug: "rust" },
      { name: "Go", slug: "go" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
    ],
  },
};

export function Industries() {
  const containerRef = useStaggerReveal(".industry-card");

  const { data: apiIndustries } = useQuery({
    queryKey: ["cms-industries"],
    queryFn: fetchIndustries,
  });

  const industries: DetailEntry[] =
    apiIndustries && apiIndustries.length > 0
      ? apiIndustries.map(mapIndustry)
      : staticIndustries;

  return (
    <section id="industries" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Specialized Domain Mastery"
          title="Engineered For High-Stakes Industries"
          subtitle="Deep domain experience across regulated sectors, legacy integrations, and mission-critical compliance standards."
        />

        {/* Dynamic Responsive Grid */}
        <div
          ref={containerRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((ind) => {
            const meta = INDUSTRY_METAS[ind.slug] || {
              standard: "Enterprise Grade",
              metric: "High Velocity",
              primaryLogo: "/icons/react.svg",
              primaryAlt: "React logo",
              techIcons: [
                { name: "TypeScript", slug: "typescript" },
                { name: "Next.js", slug: "nextdotjs" },
              ],
            };

            return (
              <div
                key={ind.slug}
                className="industry-card group relative rounded-3xl bg-[#FAFAFC] border border-zinc-200/90 p-6 sm:p-7 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Accent Top Border Highlight on Hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Primary Stack Logo & Standard Pill */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-zinc-200/90 shadow-2xs p-2.5 group-hover:border-zinc-300 transition-colors">
                      <img
                        src={meta.primaryLogo}
                        alt={meta.primaryAlt}
                        width={28}
                        height={28}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200/80 px-3 py-1 text-[10.5px] font-mono font-bold text-zinc-800 shadow-2xs">
                      {meta.standard}
                    </span>
                  </div>

                  {/* Industry Title & Short Description */}
                  <h3 className="font-display text-lg font-bold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {ind.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal line-clamp-3">
                    {ind.summary}
                  </p>

                  {/* Sub-Tech Tool Badges */}
                  <div className="mt-5 flex flex-wrap items-center gap-1.5 pt-1">
                    {meta.techIcons.map((tool) => (
                      <span
                        key={tool.slug}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-200/80 bg-white px-2 py-0.5 text-[10px] font-mono text-zinc-700 shadow-2xs"
                      >
                        <img
                          src={`/icons/${tool.slug}.svg`}
                          alt={tool.name}
                          width={12}
                          height={12}
                          className="h-3 w-3 object-contain opacity-80"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <span>{tool.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Action Link & Metric */}
                <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs">
                  <Link
                    to="/industries/$slug"
                    params={{ slug: ind.slug }}
                    className="inline-flex items-center gap-1.5 font-bold text-zinc-900 group-hover:text-black transition-colors"
                  >
                    <span>Domain Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <span className="font-mono text-[10.5px] font-semibold text-zinc-500">
                    {meta.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
