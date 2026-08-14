import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { products as staticProducts, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { mapProduct } from "@/lib/api-mapper";

export function Products() {
  const gridRef = useStaggerReveal({ stagger: 0.06, y: 24 });

  const { data: apiProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products: DetailEntry[] =
    apiProducts && apiProducts.length > 0 ? apiProducts.map(mapProduct) : staticProducts;

  return (
    <section id="products" className="bg-[#080B12] py-20 sm:py-28 text-white border-t border-white/10">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Platforms We Build & Run Ourselves"
          subtitle="Four products born out of client engagements — now available as licensed platforms."
          tone="dark"
        />

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2">
          {products.map((p, idx) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E1320] p-5 sm:p-6 transition-all duration-200 hover:border-white/25 hover:bg-[#121827]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#161E30] border border-white/10 text-white">
                    <p.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {p.tag}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{p.summary}</p>

                {/* Inline mockups */}
                {idx === 0 && (
                  <div className="mt-4 rounded-xl bg-[#080B12] p-3 border border-white/10 text-[10px] text-slate-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                      <span className="font-bold text-white text-[9px] uppercase tracking-wider">
                        Multi-Cloud Billing
                      </span>
                      <span className="text-[9px] text-emerald-400 font-bold">-35% Saved</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-slate-400">
                        <span>AWS EKS Cluster</span>
                        <span className="text-white font-mono">$1,420/mo</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>GCP BigQuery Datasets</span>
                        <span className="text-white font-mono">$840/mo</span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 1 && (
                  <div className="mt-4 rounded-xl bg-[#080B12] p-3 border border-white/10 text-[10px] text-slate-300 space-y-1.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">
                        Zero-Trust Mesh
                      </span>
                      <span className="text-[9px] font-bold text-emerald-400">Enforced</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-slate-200">12,400 IAM Policies validated</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[11px] text-slate-400">Explore platform features</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                  View Specs
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
