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

  const products: DetailEntry[] =
    apiProducts && apiProducts.length > 0 ? apiProducts.map(mapProduct) : staticProducts;

  return (
    <section id="products" className="bg-[#080A0F] py-24 sm:py-32 text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Platforms we build and run ourselves"
          subtitle="Four products born out of client engagements — now available as licensed platforms."
          tone="dark"
        />

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2">
          {products.map((p, idx) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E131F] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-2xl hover:shadow-black/70"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-white/10">
                    <p.icon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white group-hover:text-copper transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-copper">
                  {p.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.summary}</p>

                {/* Custom inline mockups */}
                {idx === 0 && (
                  <div className="mt-5 rounded-xl bg-[#07090E] p-4 border border-white/10 text-[10px] text-slate-300 shadow-md">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <span className="font-bold text-white text-[9px] uppercase tracking-wider">
                        Multi-Cloud Billing
                      </span>
                      <span className="text-[9px] text-emerald-400 font-bold">-35% Saved</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-slate-400">
                        <span>AWS EKS Cluster (us-east-1)</span>
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
                  <div className="mt-5 rounded-xl bg-[#07090E] p-4 border border-white/10 text-[10px] text-slate-300 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">
                        Zero-Trust Mesh
                      </span>
                      <span className="text-[9px] font-bold text-emerald-400">Enforced</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] text-slate-200">12,400 IAM Policies validated</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-semibold text-slate-400">Explore platform features</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-copper">
                  View Specs
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
