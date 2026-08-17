import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Cpu, Layers } from "lucide-react";
import { SectionHeading, BadgePill } from "@/components/brand/Brand";
import { motion } from "framer-motion";
import { products as staticProducts, type DetailEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { mapProduct } from "@/lib/api-mapper";

export function Products() {
  const { data: apiProducts } = useQuery({
    queryKey: ["cms-products"],
    queryFn: fetchProducts,
  });

  const products: DetailEntry[] =
    apiProducts && apiProducts.length > 0
      ? apiProducts.map(mapProduct)
      : staticProducts;

  return (
    <section id="products" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Proprietary Accelerators"
          title="Enterprise Products & Platforms"
          subtitle="Battle-tested accelerators, RAG frameworks, and security suites that shorten delivery timelines by up to 60%."
        />

        {/* Products Stack Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative rounded-3xl bg-[#FAFAFC] border border-zinc-200/90 p-6 sm:p-8 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[10.5px] font-mono font-bold text-blue-700">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    <span>Enterprise Accelerator</span>
                  </span>

                  <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase tracking-wider">
                    Ready to Deploy
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                  {prod.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
                  {prod.summary}
                </p>

                {prod.highlights && prod.highlights.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {prod.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                <Link
                  to="/products/$slug"
                  params={{ slug: prod.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>Explore Platform Specs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <span className="text-[11px] font-mono text-zinc-500">
                  IP Ownership Included
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
