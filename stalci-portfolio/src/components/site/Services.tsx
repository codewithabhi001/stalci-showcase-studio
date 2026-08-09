import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
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

  // Map backend services, falling back to static services if API is empty/loading
  const services: DetailEntry[] = apiServices && apiServices.length > 0
    ? apiServices.map(mapService)
    : staticServices;

  return (
    <section id="services" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="IT services, end to end"
          subtitle="Eight practices under one delivery standard. Engage a single team or an entire programme."
        />

        <div ref={staggerRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            // Determine column span class based on index for the bento layout
            let colSpanClass = "col-span-1";
            let isLarge = false;
            
            if (idx === 0) { // Software Engineering
              colSpanClass = "lg:col-span-2 md:col-span-2 col-span-1";
              isLarge = true;
            } else if (idx === 3) { // AI Services
              colSpanClass = "lg:col-span-2 md:col-span-2 col-span-1";
              isLarge = true;
            } else if (idx === 7) { // Managed Services
              colSpanClass = "lg:col-span-2 md:col-span-2 col-span-1";
              isLarge = true;
            }

            return (
              <div key={s.slug} className={`contents ${colSpanClass}`}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={`group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ${colSpanClass}`}
                >
                  {isLarge ? (
                    <div className="grid gap-6 md:grid-cols-2 items-center h-full w-full">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                            <s.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.6} />
                          </span>
                          <h3 className="mt-5 text-base font-semibold leading-snug">{s.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-copper-deep">
                          Learn more
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      {/* Right-hand side custom mockups for large cards */}
                      {idx === 0 && (
                        <div className="rounded-xl bg-ink/95 p-4 font-mono text-[10px] leading-normal text-on-ink-muted/80 border border-white/5 shadow-inner">
                          <div className="flex gap-1.5 mb-2.5 border-b border-white/5 pb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500/60" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                            <span className="w-2 h-2 rounded-full bg-green-500/60" />
                            <span className="ml-2 text-[9px] text-white/30">api.ts</span>
                          </div>
                          <span className="text-copper">const</span> server = <span className="text-blue-400">new</span> <span className="text-emerald-400">StalciServer</span>();<br/>
                          <span className="text-copper">await</span> server.<span className="text-purple-400">bootstrap</span>({`{`}<br/>
                          &nbsp;&nbsp;port: <span className="text-orange-400">8080</span>,<br/>
                          &nbsp;&nbsp;security: <span className="text-blue-400">true</span>,<br/>
                          &nbsp;&nbsp;scale: <span className="text-emerald-400">"infinite"</span><br/>
                          {`}`});<br/>
                          <span className="text-emerald-400/90">// Bootstrapped in 14ms ✅</span>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="space-y-2.5 rounded-xl bg-muted p-4 border border-border/60 text-[10px]">
                          <div className="flex items-center justify-between border-b border-border pb-1.5 mb-0.5">
                            <span className="font-semibold text-copper-deep text-[9px] uppercase tracking-wider">AI Assistant</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <div className="rounded-lg bg-card border border-border/40 p-2 max-w-[85%] text-[10px] text-muted-foreground shadow-sm">
                            "Optimize cloud cost analytics"
                          </div>
                          <div className="rounded-xl bg-ink p-2 ml-auto max-w-[90%] text-[10px] text-on-ink border border-white/5 shadow-md">
                            <span className="text-copper font-semibold">StalciAgent:</span> Aggregating 10k ledger entries. Real-time cost control active.
                          </div>
                        </div>
                      )}

                      {idx === 7 && (
                        <div className="rounded-xl bg-muted p-4 border border-border/60 text-[10px] space-y-2.5">
                          <div className="flex items-center justify-between border-b border-border pb-1.5">
                            <span className="font-semibold text-[9px] uppercase tracking-wider text-muted-foreground">Active Telemetry</span>
                            <span className="text-[9px] font-semibold text-copper-deep">SLA: 99.99%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="bg-card border border-border/40 p-2 rounded-lg text-center">
                              <span className="block text-muted-foreground text-[8px] uppercase">Response</span>
                              <span className="font-bold text-copper-deep text-xs mt-0.5 block">&lt; 15 min</span>
                            </div>
                            <div className="bg-card border border-border/40 p-2 rounded-lg text-center">
                              <span className="block text-muted-foreground text-[8px] uppercase">NOC Status</span>
                              <span className="font-bold text-emerald-500 text-xs mt-0.5 block">Healthy</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                          <s.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.6} />
                        </span>
                        <h3 className="mt-5 text-base font-semibold leading-snug">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                      </div>

                      {/* Small inline mockups for standard column cards */}
                      {idx === 2 && ( // Cloud & DevOps
                        <div className="mt-5 flex justify-around items-center rounded-xl bg-muted/80 p-3 border border-border/50 shadow-inner text-[9px]">
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-muted-foreground/80 uppercase">IaC</span>
                            <span className="mt-1 inline-flex h-4 px-1 items-center justify-center rounded bg-copper/10 border border-copper/20 text-[8px] font-semibold text-copper">+12</span>
                          </div>
                          <span className="h-px w-6 border-t border-dashed border-border/80" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-muted-foreground/80 uppercase">Clusters</span>
                            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <span className="h-px w-6 border-t border-dashed border-border/80" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-muted-foreground/80 uppercase">SLA</span>
                            <span className="mt-1 inline-flex h-4 px-1 items-center justify-center rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-semibold text-blue-500">100%</span>
                          </div>
                        </div>
                      )}

                      {idx === 4 && ( // Security
                        <div className="mt-5 space-y-1.5 rounded-xl bg-emerald-500/[0.02] p-2.5 border border-emerald-500/10 text-[9px]">
                          <div className="flex items-center justify-between text-emerald-800 font-semibold">
                            <span>SOC 2 Compliance</span>
                            <span className="text-emerald-600 font-bold">Passed</span>
                          </div>
                          <div className="w-full bg-border/40 rounded-full h-1 overflow-hidden">
                            <div className="bg-emerald-500 h-1 rounded-full" style={{ width: "100%" }} />
                          </div>
                        </div>
                      )}

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-copper-deep">
                        Learn more
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  )}
                </Link>

                {/* Inject custom Call to Action card at index 6 (before the last service item) */}
                {idx === 6 && (
                  <div className="group flex flex-col justify-between rounded-2xl border border-dashed border-copper/30 bg-copper/[0.01] p-6 hover:bg-copper/[0.03] transition-all duration-300 col-span-1">
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-copper/10">
                        <Sparkles className="h-5 w-5 text-copper-deep" />
                      </span>
                      <h3 className="mt-5 text-base font-semibold leading-snug">Need a Custom Team?</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        We assemble custom engineering pods and dedicate senior architects for unique enterprise projects.
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-copper-deep hover:underline"
                    >
                      Talk to an architect
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
