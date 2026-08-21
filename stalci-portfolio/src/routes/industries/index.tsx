import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { INDUSTRIES_DATA } from "@/data/site-data";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industry Verticals — STALCI" },
      {
        name: "description",
        content:
          "Specialized domain software architectures for FinTech & Banking, HealthTech & Life Sciences, E-Commerce, Logistics, and Energy.",
      },
    ],
  }),
  component: IndustriesIndexPage,
});

function IndustriesIndexPage() {
  const industriesList = Object.values(INDUSTRIES_DATA);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <Building2 className="h-3.5 w-3.5 text-indigo-400" />
              Domain Solutions
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Industry Vertical <br />
              <span className="text-zinc-400">Software Solutions</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Domain-specific software engineering adhering to regulatory compliance standards (PCI-DSS, HIPAA, SOC 2, ISO 27001) for high-stakes industries.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {industriesList.map((industry, idx) => {
              const Icon = industry.icon || Building2;
              return (
                <motion.div
                  key={industry.slug}
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
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                        {industry.tag}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {industry.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {industry.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {industry.compliance.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-mono text-zinc-300"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      Domain Compliant
                    </span>
                    <Link
                      to="/industries/$slug"
                      params={{ slug: industry.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-indigo-400 transition-colors"
                    >
                      <span>Industry Architecture</span>
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
