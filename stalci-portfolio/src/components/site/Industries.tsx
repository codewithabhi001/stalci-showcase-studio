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

  const industries: DetailEntry[] =
    apiIndustries && apiIndustries.length > 0 ? apiIndustries.map(mapIndustry) : staticIndustries;

  return (
    <section id="industries" className="border-t border-slate-200 bg-white py-24 sm:py-32 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Industries & Domains"
          title="Domain Depth Across Global Sectors"
          subtitle="Reference architectures, zero-trust security frameworks, and compliance patterns proven in your market."
          tone="light"
        />

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-lg"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-amber-700 shadow-2xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <i.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {i.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{i.summary}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                View Frameworks
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
