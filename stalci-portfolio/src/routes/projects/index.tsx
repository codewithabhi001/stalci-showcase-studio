import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PROJECTS_DATA } from "@/data/site-data";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case Studies & Production Work — STALCI" },
      {
        name: "description",
        content:
          "Explore verified production case studies from STALCI: Sovereign AI Banking enclaves, multi-region Kubernetes deployments, real-time patient telemetry, and fleet routing.",
      },
    ],
  }),
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  const projectsList = Object.values(PROJECTS_DATA);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <FolderGit2 className="h-3.5 w-3.5 text-copper" />
              Verified Case Studies
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Production Code in <br />
              <span className="text-zinc-400">High-Stakes Environments</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Empirical proof of our engineering velocity and architectural precision across sovereign AI, cloud infrastructure, healthtech telemetry, and global logistics platforms.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {projectsList.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-7 flex flex-col justify-between hover:border-white/25 hover:bg-[#111115] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.client}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
                        <div className="text-base font-bold font-mono text-white">{metric.value}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.stack.slice(0, 4).map((st) => (
                      <span key={st} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                        {st}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors"
                  >
                    <span>Read Full Case Study</span>
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
