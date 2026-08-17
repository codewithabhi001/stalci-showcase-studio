import { motion } from "framer-motion";
import { BadgePill } from "@/components/brand/Brand";

export function StatsBento() {
  return (
    <section className="bg-white py-14 sm:py-20 text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-slate-900">⚡ Global Operations at Scale</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            Engineering Studio <span className="font-extrabold text-slate-900">By The Numbers</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="block font-mono text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                700+
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">Shipped Enterprise Systems</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                From high-frequency trade routers to sovereign AI RAG nodes across 50+ toolchains.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-500">
              Coverage: 25+ Countries Worldwide
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="block font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                120+
              </span>
              <h3 className="mt-2 text-base font-bold text-white">Senior Staff Specialists</h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed font-normal">
                Dedicated senior squad allocation with zero junior handoffs or vendor lock-in.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400">
              Seniority: Staff &amp; Principal Architects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="block font-mono text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                &lt; 12ms
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">Average Global API Latency</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                Edge-cached edge workers, GraphQL data meshes, and sub-millisecond database queries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-500">
              Infrastructure: Multi-Cloud Edge CDN
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
