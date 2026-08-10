import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { SectionHeading } from "./Brand";
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Building,
  CheckCircle2,
  TrendingUp,
  X,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fallbackProjects = [
  {
    id: 1,
    title: "StalciOps Cloud Intelligence Platform",
    slug: "stalciops-cloud-intelligence",
    description: "Multi-cloud autonomous cost optimization and kubernetes telemetry engine.",
    fullDescription: "Architected and implemented a next-generation cloud infrastructure control plane that analyzes Kubernetes clusters, serverless workloads, and database egress across AWS, GCP, and Azure. Slashing cloud expenditure by 38% while guaranteeing 99.999% SLA.",
    category: "Cloud & Platform",
    client: { company: "TechCorp Global" },
    services: JSON.stringify(["Cloud Engineering", "AI & Agentic Systems", "DevOps & SRE"]),
    technologies: JSON.stringify(["Go", "Rust", "Kubernetes", "AWS EKS", "React", "Tailwind CSS"]),
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    liveUrl: "https://stalciops.demo.stalci.com",
    githubUrl: "https://github.com/stalci/stalciops-core",
    metrics: JSON.stringify([
      { label: "Cloud Cost", value: "-38%" },
      { label: "Query Latency", value: "4.2ms" },
      { label: "Cluster Uptime", value: "99.999%" },
    ]),
    clientFeedback: "Stalci transformed our entire infrastructure. The cost savings alone paid for the project in 4 months.",
    featured: true,
  },
  {
    id: 2,
    title: "Aegis Medical Triage AI & Telehealth Portal",
    slug: "aegis-medical-triage-ai",
    description: "HIPAA-compliant clinical LLM agent for patient symptom analysis and smart scheduling.",
    fullDescription: "Developed an end-to-end patient engagement platform equipped with a fine-tuned medical reasoning agent. Securely analyzes patient symptoms, correlates against medical history, and connects with specialists in under 60 seconds.",
    category: "AI & Machine Learning",
    client: { company: "Nexus Health Systems" },
    services: JSON.stringify(["AI & Agentic Systems", "Cyber Security", "Custom Software"]),
    technologies: JSON.stringify(["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL", "Docker"]),
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    liveUrl: "https://aegis-health.demo.stalci.com",
    githubUrl: "https://github.com/stalci/aegis-triage-agent",
    metrics: JSON.stringify([
      { label: "Wait Time", value: "-65%" },
      { label: "Concordance", value: "98.4%" },
      { label: "Patients", value: "250k+" },
    ]),
    clientFeedback: "The engineering rigor around data privacy and medical accuracy was truly unmatched.",
    featured: true,
  },
  {
    id: 3,
    title: "Nova Quantum Trading Engine & Analytics",
    slug: "nova-quantum-trading-engine",
    description: "Sub-millisecond order execution and real-time market risk forecasting engine.",
    fullDescription: "Engineered a low-latency distributed trading system with custom event-sourcing architecture, capable of processing 1.2M market events per second with sub-50-microsecond tick-to-trade latency.",
    category: "Enterprise SaaS",
    client: { company: "Nova FinTech Labs" },
    services: JSON.stringify(["Custom Software", "Data Engineering", "Cloud Engineering"]),
    technologies: JSON.stringify(["Rust", "C++", "Apache Kafka", "ClickHouse", "TypeScript"]),
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    liveUrl: "https://novatrade.demo.stalci.com",
    githubUrl: "https://github.com/stalci/nova-engine",
    metrics: JSON.stringify([
      { label: "Speed", value: "<42μs" },
      { label: "Events/sec", value: "1.2M+" },
      { label: "Daily Volume", value: "$840M" },
    ]),
    clientFeedback: "Stalci built an engine that outperforms our tier-1 investment bank competitors.",
    featured: true,
  },
  {
    id: 4,
    title: "Vanguard Cyber Resilience & Zero Trust Hub",
    slug: "vanguard-cyber-resilience-hub",
    description: "Automated continuous vulnerability management and biometric zero-trust identity mesh.",
    fullDescription: "Comprehensive cyber security posture orchestrator. Includes automated red-team simulations, continuous container image scanning, and zero-trust policy enforcement across distributed multi-region infrastructure.",
    category: "Cyber Security",
    client: { company: "TechCorp Global" },
    services: JSON.stringify(["Cyber Security", "Cloud Engineering", "24/7 Managed SRE"]),
    technologies: JSON.stringify(["Golang", "eBPF", "HashiCorp Vault", "Terraform", "React"]),
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
    liveUrl: "https://vanguard-sec.demo.stalci.com",
    githubUrl: "https://github.com/stalci/vanguard-mesh",
    metrics: JSON.stringify([
      { label: "Threat Detection", value: "<1s" },
      { label: "Vulnerabilities", value: "4.1k+" },
      { label: "Compliance", value: "100% SOC2" },
    ]),
    featured: true,
  },
];

const categories = [
  "All",
  "AI & Machine Learning",
  "Cloud & Platform",
  "Enterprise SaaS",
  "Cyber Security",
];

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null);

  const { data: apiProjects } = useQuery({
    queryKey: ["portfolio-projects", selectedCategory],
    queryFn: () => fetchProjects(selectedCategory),
  });

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : fallbackProjects;

  const filtered = projects.filter((p: any) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative bg-[#080A0F] py-24 sm:py-32 overflow-hidden border-t border-white/10 text-white">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio & Case Studies"
          title="Engineered for Impact"
          subtitle="A showcase of mission-critical software, sovereign AI systems, and cloud architectures built and operated for global leaders."
          tone="dark"
        />

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-copper text-slate-950 font-bold shadow-lg shadow-amber-950/40 scale-105"
                  : "bg-white/[0.05] text-slate-300 border border-white/10 hover:border-copper/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((p: any, idx: number) => {
            let techList: string[] = [];
            try {
              techList = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies || [];
            } catch {
              techList = [];
            }

            let metricsList: { label: string; value: string }[] = [];
            try {
              metricsList = typeof p.metrics === "string" ? JSON.parse(p.metrics) : p.metrics || [];
            } catch {
              metricsList = [];
            }

            return (
              <motion.div
                key={p.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E131F] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-2xl hover:shadow-black/70"
              >
                {/* Project Image & Overlay */}
                <div className="relative h-60 w-full overflow-hidden bg-[#07090E]">
                  <img
                    src={p.imageUrl || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-[#0E131F]/30 to-transparent" />
                  
                  {/* Category & Client Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/80 text-copper border border-copper/40 backdrop-blur-md">
                      {p.category}
                    </span>
                    {p.client?.company && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/70 text-slate-200 border border-white/15 backdrop-blur-md flex items-center gap-1.5">
                        <Building className="h-3 w-3 text-copper" /> {p.client.company}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-copper transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Impact KPI Pills */}
                  {metricsList.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 bg-white/[0.02] rounded-xl px-3">
                      {metricsList.slice(0, 3).map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <span className="block font-mono text-sm font-bold text-copper">
                            {m.value}
                          </span>
                          <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techList.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.05] text-slate-200 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveCaseStudy(p)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:text-copper-soft transition-colors cursor-pointer"
                    >
                      Read Full Case Study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 hover:text-copper hover:border-copper/40 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        title="Private Sovereign Codebase - Protected under Enterprise Non-Disclosure Agreement (NDA)"
                      >
                        <CheckCircle2 className="h-3 w-3" /> Private Enterprise IP
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-2xl border border-copper/40 bg-[#0E131F] p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-copper/10 text-copper border border-copper/30">
                      {activeCaseStudy.category}
                    </span>
                    {activeCaseStudy.client?.company && (
                      <span className="text-xs text-slate-300">
                        Client: <strong className="text-white">{activeCaseStudy.client.company}</strong>
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {activeCaseStudy.title}
                  </h2>
                </div>

                <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-white/10 relative">
                  <img
                    src={activeCaseStudy.imageUrl}
                    alt={activeCaseStudy.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Narrative */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-copper mb-2">
                    Architecture & Executive Summary
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                    {activeCaseStudy.fullDescription || activeCaseStudy.description}
                  </p>
                </div>

                {/* Key Outcomes */}
                {activeCaseStudy.clientFeedback && (
                  <div className="p-4 rounded-xl bg-copper/10 border border-copper/20 italic text-sm text-copper-soft">
                    "{activeCaseStudy.clientFeedback}"
                  </div>
                )}

                {/* Tech & Links */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-3">
                    {activeCaseStudy.liveUrl && (
                      <a
                        href={activeCaseStudy.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold text-slate-950 bg-copper hover:bg-copper-soft transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Live Deployment
                      </a>
                    )}
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                      title="Private Sovereign Codebase - Governed by Enterprise Non-Disclosure Agreement"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Sovereign Codebase (Zero-Trust MSA)
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveCaseStudy(null)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
