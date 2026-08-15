import { motion } from "framer-motion";
import { SectionHeading } from "./Brand";
import { Sparkles, TrendingUp, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

export function StatsBento() {
  return (
    <section className="relative bg-[#FFFFFF] py-20 sm:py-28 text-black overflow-hidden border-t border-zinc-200/90">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        {/* ─── High-Contrast Obsidian Bento Telemetry Enclave (Reference Style) ─── */}
        <div className="relative rounded-3xl border border-zinc-800 bg-[#09090B] text-white p-6 sm:p-12 shadow-2xl overflow-hidden">
          
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          {/* Section Header */}
          <SectionHeading
            tone="dark"
            eyebrow="Verified Global Scale & Telemetry"
            title="The Engineering Precision Behind Our Dominance"
            subtitle="Built on deep systems architecture, in-house principal talent, and verified SLA performance across 700+ enterprise deployments."
          />

          {/* Bento Grid Layout */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 relative z-10">
            
            {/* Card 1: 700+ Projects */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between min-h-[160px] backdrop-blur-md hover:border-white/25 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Shipped Systems
                </span>
                <Globe className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="my-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  700+
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                Platforms delivered with 0 catastrophic outages across 50+ toolchains.
              </p>
            </motion.div>

            {/* Card 2: 120+ In-house Experts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between min-h-[160px] backdrop-blur-md hover:border-white/25 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Engineering Talent
                </span>
                <Cpu className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  120+
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                In-house principal architects & AI research engineers.
              </p>
            </motion.div>

            {/* Card 3: 24Mn+ End Users */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between min-h-[160px] backdrop-blur-md hover:border-white/25 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Global Reach
                </span>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <div className="my-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  24Mn+
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                End users served daily with 99.99% verified uptime.
              </p>
            </motion.div>

            {/* Card 4: 99.4% Client Retention */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="lg:col-span-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between min-h-[160px] backdrop-blur-md hover:border-white/25 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Client Retention Rate
                </span>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  99.4%
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                Multi-year enterprise partnerships with zero vendor lock-in and 100% IP ownership.
              </p>
            </motion.div>

            {/* Card 5: < 14ms Edge Latency */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="lg:col-span-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between min-h-[160px] backdrop-blur-md hover:border-white/25 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Global P99 Edge Latency
                </span>
                <TrendingUp className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="my-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  &lt; 14.2ms
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                Sub-millisecond cold starts and distributed edge caching across 280+ global PoPs.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
