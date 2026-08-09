import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { products as staticProducts, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { mapProduct } from "@/lib/api-mapper";

export function Products() {
  const gridRef = useStaggerReveal({ stagger: 0.08, y: 30 });

  const { data: apiProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Map backend products, falling back to static products if API is empty/loading
  const products: DetailEntry[] = apiProducts && apiProducts.length > 0
    ? apiProducts.map(mapProduct)
    : staticProducts;

  return (
    <section id="products" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Platforms we build and run ourselves"
          subtitle="Four products born out of client engagements — now available as licensed platforms."
        />

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2">
          {products.map((p, idx) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-lg hover:shadow-black/[0.02]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
                    <p.icon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper-deep">
                  {p.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>

                {/* Custom inline mockups based on product index */}
                {idx === 0 && ( // StalciOps
                  <div className="mt-5 rounded-xl bg-ink p-4 border border-white/5 text-[10px] text-on-ink-muted/80 shadow-md">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                      <span className="font-semibold text-white text-[9px] uppercase tracking-wider">Multi-Cloud Billing</span>
                      <span className="text-[9px] text-emerald-400 font-bold">-35% Saved</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right text-[8px] font-mono">AWS</span>
                        <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-copper h-1.5 rounded-full" style={{ width: "65%" }} />
                        </div>
                        <span className="w-8 text-[8px] text-right font-bold text-white">$4.2k</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right text-[8px] font-mono">Azure</span>
                        <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-copper-soft h-1.5 rounded-full" style={{ width: "45%" }} />
                        </div>
                        <span className="w-8 text-[8px] text-right font-bold text-white">$2.8k</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right text-[8px] font-mono">GCP</span>
                        <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-copper-deep h-1.5 rounded-full" style={{ width: "25%" }} />
                        </div>
                        <span className="w-8 text-[8px] text-right font-bold text-white">$1.1k</span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 1 && ( // Stalci AI Studio
                  <div className="mt-5 rounded-xl bg-muted p-4 border border-border/60 text-[10px] space-y-2.5">
                    <div className="flex items-center justify-between border-b border-border pb-1.5">
                      <span className="font-semibold text-muted-foreground text-[8px] uppercase tracking-wider">Agent Sandbox</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-lg bg-card border border-border/40 text-[9px]">
                        <span className="font-bold text-copper-deep text-[7px] block uppercase tracking-wider">System Prompt</span>
                        "Embed document verification nodes and force citations..."
                      </div>
                      <div className="p-2 rounded-lg bg-ink text-on-ink border border-white/5 text-[9px] flex items-center justify-between">
                        <span>Guardrail Evaluation</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-500">100% Safe</span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 2 && ( // Stalci Insight
                  <div className="mt-5 rounded-xl bg-muted p-4 border border-border/60 text-[10px] space-y-2.5">
                    <div className="flex items-center justify-between border-b border-border pb-1.5">
                      <span className="font-semibold text-muted-foreground text-[8px] uppercase tracking-wider">Query Latency</span>
                      <span className="text-[9px] font-mono text-copper-deep">Avg: 18ms</span>
                    </div>
                    <div className="flex items-end justify-between h-12 pt-2 px-2 bg-card rounded-lg border border-border/40">
                      <div className="w-3 bg-copper/20 rounded-t h-4" />
                      <div className="w-3 bg-copper/30 rounded-t h-7" />
                      <div className="w-3 bg-copper/40 rounded-t h-5" />
                      <div className="w-3 bg-copper/60 rounded-t h-9" />
                      <div className="w-3 bg-copper/80 rounded-t h-11" />
                      <div className="w-3 bg-copper rounded-t h-12" />
                    </div>
                  </div>
                )}

                {idx === 3 && ( // Stalci Shield
                  <div className="mt-5 rounded-xl bg-ink p-4 border border-white/5 text-[10px] text-on-ink-muted/80 shadow-md">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5">
                      <span className="font-semibold text-white text-[9px] uppercase tracking-wider">Posture Scanner</span>
                      <span className="text-[8px] text-emerald-400 font-mono">Daily check complete</span>
                    </div>
                    <ul className="space-y-1.5 text-[8.5px]">
                      <li className="flex items-center gap-2">
                        <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/10 text-[7px] text-emerald-400 font-bold border border-emerald-500/20">✓</span>
                        <span>ISO 27001 controls verified</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/10 text-[7px] text-emerald-400 font-bold border border-emerald-500/20">✓</span>
                        <span>SOC 2 Type II audit trail compiled</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {p.capabilities.slice(0, 3).map((c) => (
                  <li
                    key={c.title}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {c.title}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
