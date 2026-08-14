import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { products as staticProducts, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { mapProduct } from "@/lib/api-mapper";

export function Products() {
  const gridRef = useStaggerReveal({ stagger: 0.08, y: 20 });

  const { data: apiProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products: DetailEntry[] =
    apiProducts && apiProducts.length > 0 ? apiProducts.map(mapProduct) : staticProducts;

  return (
    <section id="products" className="relative bg-white py-24 sm:py-32 text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Proprietary Platforms"
          title="Engineered & Maintained In-House"
          subtitle="Battle-tested platforms born out of enterprise client engagements — now available as high-performance licensed software suites."
          tone="light"
        />

        <div ref={gridRef} className="mt-14 grid gap-6 sm:grid-cols-2">
          {products.map((p, idx) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-7 sm:p-9 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl hover:bg-white"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] group-hover:bg-[#9E6229] group-hover:text-white transition-colors shadow-2xs">
                    <p.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-[#9E6229] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {p.summary}
                </p>

                {/* Technical preview widgets */}
                {idx === 0 && (
                  <div className="mt-6 rounded-2xl bg-[#0B0F19] p-4 border border-slate-800 text-xs text-slate-300 shadow-inner font-mono">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px]">
                      <span className="font-bold text-[#F2CFAB] uppercase tracking-wider">
                        FinOps Multi-Cloud Billing
                      </span>
                      <span className="text-emerald-400 font-bold">-38% Optimized</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-400">
                        <span>AWS EKS Multi-AZ Cluster</span>
                        <span className="text-white font-bold">$1,420/mo</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>GCP BigQuery Data Lake</span>
                        <span className="text-white font-bold">$840/mo</span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 1 && (
                  <div className="mt-6 rounded-2xl bg-[#0B0F19] p-4 border border-slate-800 text-xs text-slate-300 space-y-2.5 font-mono shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-[#F2CFAB]">
                        Zero-Trust Mesh Telemetry
                      </span>
                      <span className="font-bold text-emerald-400">Active & Shielded</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>14,800 micro-segmentation policies enforced</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4">
                <span className="text-xs font-semibold text-slate-500 font-mono">Platform architecture & specs</span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#9E6229] group-hover:text-slate-950 transition-colors">
                  <span>View Specifications</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
