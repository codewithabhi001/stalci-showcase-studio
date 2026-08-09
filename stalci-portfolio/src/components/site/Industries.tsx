import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { industries as staticIndustries, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { mapIndustry } from "@/lib/api-mapper";

export function Industries() {
  const gridRef = useStaggerReveal({ stagger: 0.05, y: 24 });

  const { data: apiIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  // Map backend industries, falling back to static industries if API is empty/loading
  const industries: DetailEntry[] = apiIndustries && apiIndustries.length > 0
    ? apiIndustries.map(mapIndustry)
    : staticIndustries;

  return (
    <section id="industries" className="border-y border-border bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Domain depth across twelve sectors"
          subtitle="Reference architectures and compliance patterns we've already proven in your market."
        />

        <div
          ref={gridRef}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/40 hover:shadow-sm"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/60 group-hover:bg-accent transition-colors">
                  <i.icon className="h-4.5 w-4.5 text-copper-deep" strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-copper transition-colors">
                  {i.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{i.summary}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-copper-deep opacity-0 group-hover:opacity-100 transition-all duration-300">
                View sectors
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
