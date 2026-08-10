import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { services as staticServices, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";
import { mapService } from "@/lib/api-mapper";

export function Services() {
  const staggerRef = useStaggerReveal({ stagger: 0.06, y: 30 });

  const { data: apiServices } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const services: DetailEntry[] =
    apiServices && apiServices.length > 0 ? apiServices.map(mapService) : staticServices;

  return (
    <section id="services" className="bg-white py-24 sm:py-32 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Enterprise IT Services, End-to-End"
          subtitle="Eight specialized engineering practices under one unified delivery standard. Engage a single squad or an entire digital programme."
          tone="light"
        />

        <div ref={staggerRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            let colSpanClass = "col-span-1";
            let isLarge = false;

            if (idx === 0 || idx === 3 || idx === 7) {
              colSpanClass = "lg:col-span-2 md:col-span-2 col-span-1";
              isLarge = true;
            }

            return (
              <div key={s.slug} className={`contents ${colSpanClass}`}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={`group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/70 hover:shadow-xl hover:shadow-slate-200/50 ${colSpanClass}`}
                >
                  {isLarge ? (
                    <div className="grid gap-6 md:grid-cols-2 items-center h-full w-full">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-amber-700 shadow-xs">
                            <s.icon className="h-5 w-5" strokeWidth={1.8} />
                          </span>
                          <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
                          Explore Practice
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      {/* Right-hand side custom mockups */}
                      {idx === 0 && (
                        <div className="rounded-xl bg-[#0B0D13] p-4 font-mono text-[10px] leading-normal text-slate-300 border border-white/10 shadow-lg">
                          <div className="flex gap-1.5 mb-2.5 border-b border-white/10 pb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                            <span className="w-2 h-2 rounded-full bg-green-500/80" />
                            <span className="ml-2 text-[9px] text-slate-400">api.ts</span>
                          </div>
                          <span className="text-amber-400">const</span> server ={" "}
                          <span className="text-blue-400">new</span> <span className="text-emerald-400">StalciServer</span>();
                          <br />
                          <span className="text-amber-400">await</span> server.
                          <span className="text-purple-400">bootstrap</span>({`{`}
                          <br />
                          &nbsp;&nbsp;port: <span className="text-orange-400">8080</span>,<br />
                          &nbsp;&nbsp;security: <span className="text-blue-400">true</span>,<br />
                          &nbsp;&nbsp;scale: <span className="text-emerald-400">"infinite"</span>
                          <br />
                          {`}`});<br />
                          <span className="text-emerald-400">// Bootstrapped in 14ms ✅</span>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="space-y-2.5 rounded-xl bg-[#0B0D13] p-4 border border-white/10 text-[10px] shadow-lg">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-0.5">
                            <span className="font-bold text-amber-400 text-[9px] uppercase tracking-wider">
                              AI Intelligence Engine
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <div className="rounded-lg bg-white/5 border border-white/10 p-2 max-w-[85%] text-[10px] text-slate-300">
                            "Optimize multi-region database queries"
                          </div>
                          <div className="rounded-xl bg-black/60 p-2 ml-auto max-w-[90%] text-[10px] text-white border border-white/10">
                            <span className="text-amber-400 font-bold">StalciAgent:</span> Re-indexed 450k records. Latency reduced to 3.2ms.
                          </div>
                        </div>
                      )}

                      {idx === 7 && (
                        <div className="rounded-xl bg-[#0B0D13] p-4 border border-white/10 text-[10px] space-y-2.5 shadow-lg">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">
                              Active Telemetry
                            </span>
                            <span className="text-[9px] font-bold text-amber-400">SLA: 99.99%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                              <span className="block text-slate-400 text-[8px] uppercase">Response</span>
                              <span className="font-bold text-amber-400 text-xs mt-0.5 block">&lt; 15 min</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                              <span className="block text-slate-400 text-[8px] uppercase">NOC Status</span>
                              <span className="font-bold text-emerald-400 text-xs mt-0.5 block">Healthy</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-amber-700 shadow-xs">
                          <s.icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                      </div>

                      {idx === 2 && (
                        <div className="mt-5 flex justify-around items-center rounded-xl bg-[#0B0D13] p-3 border border-white/10 text-[9px]">
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-400 uppercase">IaC</span>
                            <span className="mt-1 inline-flex h-4 px-1.5 items-center justify-center rounded bg-amber-500/20 border border-amber-500/30 text-[8px] font-bold text-amber-400">
                              +18
                            </span>
                          </div>
                          <span className="h-px w-6 border-t border-dashed border-white/20" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-400 uppercase">Clusters</span>
                            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <span className="h-px w-6 border-t border-dashed border-white/20" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-400 uppercase">Uptime</span>
                            <span className="mt-1 inline-flex h-4 px-1.5 items-center justify-center rounded bg-blue-500/20 border border-blue-500/30 text-[8px] font-bold text-blue-400">
                              100%
                            </span>
                          </div>
                        </div>
                      )}

                      {idx === 4 && (
                        <div className="mt-5 space-y-1.5 rounded-xl bg-[#0B0D13] p-2.5 border border-white/10 text-[9px]">
                          <div className="flex items-center justify-between text-emerald-400 font-bold">
                            <span>SOC 2 Compliance</span>
                            <span className="text-emerald-300">Passed</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                            <div className="bg-emerald-500 h-1 rounded-full" style={{ width: "100%" }} />
                          </div>
                        </div>
                      )}

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
                        Explore Practice
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
