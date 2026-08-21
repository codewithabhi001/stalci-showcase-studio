import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SERVICES_DATA } from "@/data/site-data";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Engineering Practices & Services — STALCI" },
      {
        name: "description",
        content:
          "Explore STALCI's core engineering practices: Sovereign AI & ML, Multi-Cloud DevOps, Custom Software, High-Performance Mobile, Data Intelligence, and Zero-Trust Cybersecurity.",
      },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const servicesList = Object.values(SERVICES_DATA);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Core Engineering Practices
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Deterministic Software &amp; <br />
              <span className="text-zinc-400">Sovereign AI Systems</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              From air-gapped LLM orchestrators to multi-region cloud meshes and 120 FPS mobile platforms, we engineer mission-critical systems built for enterprise scale.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service, idx) => {
              const Icon = service.icon || Sparkles;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-7 flex flex-col justify-between hover:border-white/25 hover:bg-[#111115] transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        {service.tag}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {service.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {service.deliverables.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-300"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      SLA: 99.99% Uptime
                    </span>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors"
                    >
                      <span>Explore Practice</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
