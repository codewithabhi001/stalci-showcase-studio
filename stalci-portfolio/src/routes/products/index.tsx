import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PRODUCTS_DATA } from "@/data/site-data";
import { ArrowUpRight, Boxes, Check } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Accelerators & Products — STALCI" },
      {
        name: "description",
        content:
          "Internal accelerators born in production: Sovereign AI Studio, StalciOps Cloud Fabric, Design System Engine, and Security Compliance Suite.",
      },
    ],
  }),
  component: ProductsIndexPage,
});

function ProductsIndexPage() {
  const productsList = Object.values(PRODUCTS_DATA);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <Boxes className="h-3.5 w-3.5 text-blue-400" />
              Internal Accelerators
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Proprietary Frameworks <br />
              <span className="text-zinc-400">Born in Production</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Battle-tested software engines and infrastructure accelerators we engineered internally to compress sprint timelines and eliminate enterprise boilerplate.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {productsList.map((product, idx) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-7 flex flex-col justify-between hover:border-white/25 hover:bg-[#111115] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      {product.tag}
                    </span>
                    <span className="text-xs font-mono font-semibold text-zinc-400">
                      Benchmark: <strong className="text-white">{product.pricing}</strong>
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {product.name}
                  </h2>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {product.summary}
                  </p>

                  <div className="space-y-2 pt-2">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {product.stack.slice(0, 3).map((st) => (
                      <span key={st} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                        {st}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-blue-400 transition-colors"
                  >
                    <span>Architecture Specs</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
