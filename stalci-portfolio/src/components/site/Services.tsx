import { Link } from "@tanstack/react-router";
import {
  Code2,
  Smartphone,
  Cloud,
  Brain,
  ShieldCheck,
  Database,
  Workflow,
  Headphones,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { services as staticServices, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";
import { mapService } from "@/lib/api-mapper";

export function Services() {
  const gridRef = useStaggerReveal({ stagger: 0.06, y: 20 });

  const { data: apiServices } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const services: DetailEntry[] =
    apiServices && apiServices.length > 0 ? apiServices.map(mapService) : staticServices;

  return (
    <section id="services" className="relative bg-white py-24 sm:py-32 text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Core Practices"
          title="Engineered For Critical Scale"
          subtitle="Cross-functional engineering practices delivering deterministic architectures, high throughput, and zero-compromise security."
          tone="light"
        />

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const isFeatured = idx === 0 || idx === 3;

            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className={`group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-6 sm:p-8 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl hover:bg-white relative overflow-hidden ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] shadow-2xs group-hover:bg-[#9E6229] group-hover:text-white transition-colors">
                      <s.icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-[#9E6229] transition-colors leading-tight">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {s.summary}
                  </p>

                  {/* Featured Developer Widgets for Technical Caliber */}
                  {idx === 0 && (
                    <div className="mt-6 rounded-2xl bg-[#0B0F19] p-4 text-xs font-mono text-slate-200 border border-slate-800 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-[#F2CFAB]">
                          <Terminal className="h-3 w-3" /> server.ts &bull; High Concurrency
                        </span>
                        <span className="text-emerald-400 font-bold">100% Type-Safe</span>
                      </div>
                      <div className="space-y-1 text-slate-300">
                        <p className="text-purple-400">export const <span className="text-blue-300">appRouter</span> = createRouter()</p>
                        <p className="text-slate-400 pl-3">.mutation(<span className="text-emerald-300">'dispatchOrder'</span>, &#123;</p>
                        <p className="text-slate-400 pl-6">resolve: async (&#123; ctx &#125;) =&gt; await <span className="text-[#F2CFAB]">telemetryEngine</span>.record(ctx)</p>
                        <p className="text-slate-400 pl-3">&#125;);</p>
                      </div>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="mt-6 rounded-2xl bg-[#0B0F19] p-4 text-xs font-mono text-slate-200 border border-slate-800 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-[#F2CFAB]">
                          <Brain className="h-3 w-3" /> Neural Agentic Pipeline
                        </span>
                        <span className="text-emerald-400 font-bold">RAG Active</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Autonomous vector retrieval executing across 8,400+ domain nodes...</span>
                      </div>
                    </div>
                  )}

                  {/* Capabilities Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {s.capabilities?.slice(0, 3).map((c) => (
                      <span
                        key={c.title}
                        className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-mono text-slate-700 border border-slate-200 shadow-2xs font-medium"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4">
                  <span className="text-xs font-semibold text-slate-500 font-mono">Full practice specifications</span>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#9E6229] group-hover:text-slate-950 transition-colors">
                    <span>Explore Practice</span>
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
