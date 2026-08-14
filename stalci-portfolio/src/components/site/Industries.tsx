import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { industries as staticIndustries, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { mapIndustry } from "@/lib/api-mapper";

export function Industries() {
  const gridRef = useStaggerReveal({ stagger: 0.04, y: 20 });

  const { data: apiIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  const industries: DetailEntry[] =
    apiIndustries && apiIndustries.length > 0 ? apiIndustries.map(mapIndustry) : staticIndustries;

  return (
    <section id="industries" className="border-t border-slate-200/80 bg-white py-20 sm:py-28 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Industries & Domains"
          title="Domain Depth Across Global Sectors"
          subtitle="Reference architectures, zero-trust security frameworks, and compliance patterns proven in your market."
          tone="light"
        />

        <div ref={gridRef} className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 transition-all duration-200 hover:border-slate-400 hover:shadow-xs"
            >
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
                  <i.icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 text-xs sm:text-sm font-bold text-slate-900">
                  {i.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{i.summary}</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-900 group-hover:underline">
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
