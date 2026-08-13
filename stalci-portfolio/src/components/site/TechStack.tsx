import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTechnologies } from "@/lib/api";
import { SectionHeading } from "./Brand";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Cloud,
  Brain,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const fallbackTechs = [
  {
    id: 1,
    name: "React 19 & Next.js 16",
    category: "Frontend",
    proficiency: 99,
    isFeatured: true,
    description: "Server components, streaming SSR, dynamic hydration, and micro-frontend architecture.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    badge: "Core Framework",
  },
  {
    id: 2,
    name: "TypeScript & JavaScript",
    category: "Frontend",
    proficiency: 99,
    isFeatured: true,
    description: "Strict type safety, generic utility structures, and modern async execution engines.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    badge: "Primary Language",
  },
  {
    id: 3,
    name: "Tailwind CSS & Radix UI",
    category: "Frontend",
    proficiency: 97,
    isFeatured: true,
    description: "Bespoke design systems, responsive flex layouts, and accessible UI component primitives.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    badge: "Styling Suite",
  },
  {
    id: 4,
    name: "Node.js & NestJS",
    category: "Backend",
    proficiency: 98,
    isFeatured: true,
    description: "Enterprise modular microservices, dependency injection, and REST/GraphQL gateways.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    badge: "Backend Core",
  },
  {
    id: 5,
    name: "Go (Golang)",
    category: "Backend",
    proficiency: 94,
    isFeatured: true,
    description: "High-concurrency microservices, lightweight goroutines, and memory efficiency.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    badge: "High Concurrency",
  },
  {
    id: 6,
    name: "Rust & WebAssembly",
    category: "Backend",
    proficiency: 91,
    isFeatured: true,
    description: "Sub-millisecond compute engines, zero-cost abstractions, and WASM web modules.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    badge: "Systems & WASM",
  },
  {
    id: 7,
    name: "Python & PyTorch",
    category: "AI & Data",
    proficiency: 96,
    isFeatured: true,
    description: "Deep learning model fine-tuning, tensor math algorithms, and inference pipelines.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    badge: "AI Inference",
  },
  {
    id: 8,
    name: "LangChain & Agentic LLMs",
    category: "AI & Data",
    proficiency: 95,
    isFeatured: true,
    description: "RAG vector retrieval, autonomous tool-calling agents, and structured outputs.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    badge: "LLM Orchestrator",
  },
  {
    id: 9,
    name: "PostgreSQL & pgvector",
    category: "Security & Database",
    proficiency: 98,
    isFeatured: true,
    description: "ACID compliance, schema migrations, indexing optimization, and pgvector embeddings.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    badge: "Primary RDBMS",
  },
  {
    id: 10,
    name: "Redis & Apache Kafka",
    category: "Security & Database",
    proficiency: 94,
    isFeatured: true,
    description: "Distributed pub/sub event streams, in-memory caching, and rate limiting.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    badge: "Caching & Queues",
  },
  {
    id: 11,
    name: "Kubernetes & Docker",
    category: "Cloud & DevOps",
    proficiency: 98,
    isFeatured: true,
    description: "Container orchestration, automated rolling deployments, and Helm cluster charts.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    badge: "Orchestration",
  },
  {
    id: 12,
    name: "AWS & Cloudflare",
    category: "Cloud & DevOps",
    proficiency: 97,
    isFeatured: true,
    description: "Multi-region edge infrastructure, serverless compute, and global S3 CDN routing.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    badge: "Cloud Infrastructure",
  },
  {
    id: 13,
    name: "Terraform & OpenTofu",
    category: "Cloud & DevOps",
    proficiency: 93,
    isFeatured: true,
    description: "Declarative cloud provisioning and immutable infrastructure state management.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    badge: "Infrastructure as Code",
  },
  {
    id: 14,
    name: "Zero-Trust & eBPF Security",
    category: "Security & Database",
    proficiency: 95,
    isFeatured: true,
    description: "Kernel-level observability, mTLS encryption, and SOC2 compliance monitoring.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    badge: "Kernel Observability",
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Cloud & DevOps",
  "AI & Data",
  "Security & Database",
];

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: apiTechs } = useQuery({
    queryKey: ["technologies", selectedCategory],
    queryFn: () => fetchTechnologies(selectedCategory),
  });

  const rawTechs = apiTechs && apiTechs.length > 0 ? apiTechs : fallbackTechs;

  // Deduplicate technologies strictly by unique name
  const uniqueTechMap = new Map<string, any>();
  rawTechs.forEach((t: any) => {
    if (!uniqueTechMap.has(t.name)) {
      const matchedFallback = fallbackTechs.find((f) => f.name === t.name);
      uniqueTechMap.set(t.name, {
        ...t,
        icon: t.icon && t.icon.startsWith("http") ? t.icon : matchedFallback?.icon || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg",
        badge: matchedFallback?.badge || t.category || "Core Tech",
        description: t.description || matchedFallback?.description || "Production toolchain engineered for enterprise reliability.",
      });
    }
  });

  const technologies = Array.from(uniqueTechMap.values());

  const filtered = technologies.filter((t: any) => {
    if (selectedCategory === "All") return true;
    return t.category === selectedCategory;
  });

  // Duplicate filtered cards for seamless continuous infinite marquee loop
  const marqueeCards = filtered.length > 0 ? [...filtered, ...filtered, ...filtered] : [];

  return (
    <section id="tech-stack" className="relative bg-[#FAFAFD] py-28 sm:py-36 overflow-hidden text-slate-900 border-t border-slate-200">
      {/* Decorative Light Theme Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[55rem] h-[28rem] bg-gradient-to-br from-amber-200/40 via-amber-100/30 to-blue-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-slate-200/60 via-slate-100/40 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Core Technology Radar"
          title="Battle-Tested Engineering Stack"
          subtitle="Explore our modern software toolchain flowing seamlessly across production ecosystems."
          tone="light"
        />

        {/* Light Mode KPI Highlights */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-amber-700">100%</span>
            <span className="block text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wider">Type-Safe TypeScript</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-amber-700">99.999%</span>
            <span className="block text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wider">Production SLA</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-amber-700">Multi-Cloud</span>
            <span className="block text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wider">AWS, GCP & Edge</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-amber-700">Zero-Trust</span>
            <span className="block text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wider">Security First</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const count = cat === "All" ? technologies.length : technologies.filter((t: any) => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/30 scale-105"
                    : "bg-white text-slate-700 border border-slate-200/90 hover:border-amber-500 hover:text-slate-900 shadow-2xs"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                    isSelected ? "bg-amber-500 text-slate-950 font-extrabold" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite Flow Marquee Track with Left & Right Edge Fade Overlay */}
      <div className="mt-14 relative w-full overflow-hidden">
        {/* Left Side Edge Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#FAFAFD] via-[#FAFAFD]/80 to-transparent pointer-events-none z-20" />
        
        {/* Right Side Edge Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#FAFAFD] via-[#FAFAFD]/80 to-transparent pointer-events-none z-20" />

        {/* Seamless Smooth Horizontal Motion Track */}
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: Math.max(20, marqueeCards.length * 2.8),
            repeat: Infinity,
          }}
          className="flex items-center gap-6 w-max py-4 px-4 hover:[animation-play-state:paused]"
        >
          {marqueeCards.map((t: any, idx: number) => {
            const proficiency = t.proficiency || 95;

            return (
              <motion.div
                key={`${t.name}-${idx}`}
                whileHover={{ scale: 1.03 }}
                className="group relative w-[320px] sm:w-[360px] shrink-0 rounded-3xl bg-white border border-slate-200/90 p-6 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:shadow-amber-900/10 hover:border-amber-500/60 transition-all duration-300 opacity-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      {/* SVG Logo Container */}
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 shadow-2xs flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors shrink-0">
                        <img
                          src={t.icon}
                          alt={`${t.name} logo`}
                          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                          {t.name}
                        </h4>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                          {t.category}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
                      <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {t.badge}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-600 font-normal line-clamp-3">
                    {t.description}
                  </p>
                </div>

                {/* Production Mastery Meter */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[11px] mb-2 font-mono">
                    <span className="text-slate-500 font-semibold">Production Mastery</span>
                    <span className="font-bold text-amber-700 font-mono text-xs">{proficiency}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                    <div
                      style={{ width: `${proficiency}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full shadow-xs"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
