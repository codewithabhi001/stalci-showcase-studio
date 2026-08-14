import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { industries as staticIndustries, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { mapIndustry } from "@/lib/api-mapper";

export function Industries() {
  const gridRef = useStaggerReveal({ stagger: 0.05, y: 20 });

  const { data: apiIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  const industries: DetailEntry[] =
    apiIndustries && apiIndustries.length > 0 ? apiIndustries.map(mapIndustry) : staticIndustries;

  return (
    <section id="industries" className="relative bg-[#F8FAFC] py-24 sm:py-32 text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Industries & Domains"
          title="Domain Depth Across Global Sectors"
          subtitle="Reference architectures, zero-trust security frameworks, and compliance patterns proven in your market."
          tone="light"
        />

        <div ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl"
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] shadow-2xs group-hover:bg-[#9E6229] group-hover:text-white transition-colors">
                  <i.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-bold text-slate-950 group-hover:text-[#9E6229] transition-colors">
                  {i.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">{i.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#9E6229] group-hover:text-slate-950 transition-all duration-200">
                <span>View Architecture Frameworks</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
