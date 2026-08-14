import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTechnologies } from "@/lib/api";
import { SectionHeading } from "./Brand";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Cpu, Database, Cloud, Terminal, CheckCircle2 } from "lucide-react";

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

const architectureLayers = [
  { layer: "01. Presentation Edge", stack: "Next.js 16 • React 19 • Tailwind CSS • WebAssembly", latency: "<15ms", icon: Layers },
  { layer: "02. API Gateway & Auth", stack: "NestJS • Go Gateway • GraphQL • OAuth2 / JWT", latency: "<8ms", icon: Terminal },
  { layer: "03. Sovereign AI & Inference", stack: "PyTorch • vLLM • LangChain • Ray Vector Index", latency: "<45ms", icon: Cpu },
  { layer: "04. High-Throughput Data Layer", stack: "PostgreSQL • pgvector • Apache Kafka • Redis", latency: "<2ms", icon: Database },
  { layer: "05. Multi-Cloud Mesh & SRE", stack: "Kubernetes • Terraform • AWS • Cloudflare WAF", latency: "99.999% SLA", icon: Cloud },
];

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: apiTechs } = useQuery({
    queryKey: ["technologies"],
    queryFn: fetchTechnologies,
  });

  const allTechs = apiTechs && apiTechs.length > 0 ? apiTechs : fallbackTechs;

  const filteredTechs = allTechs.filter((t: any) => {
    if (activeCategory === "All") return true;
    return t.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const row1 = filteredTechs.slice(0, Math.ceil(filteredTechs.length / 2));
  const row2 = filteredTechs.slice(Math.ceil(filteredTechs.length / 2));

  return (
    <section id="tech-stack" className="relative bg-white py-24 sm:py-32 overflow-hidden text-slate-900 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Core Technologies"
          title="Enterprise Architecture Stack"
          subtitle="Battle-tested open-source and cloud-native frameworks engineered for zero-downtime scalability."
          tone="light"
        />

        {/* Visual Architecture Pipeline Stack Diagram */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9E6229] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> End-to-End Enterprise Architecture Pipeline
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified 5-Tier Architecture
            </span>
          </div>

          <div className="space-y-3">
            {architectureLayers.map((l, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#D89B5B]/80 transition-all gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                    <l.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">{l.layer}</h4>
                    <p className="text-xs font-mono text-slate-600 mt-0.5">{l.stack}</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-black text-[#9E6229] bg-[#FDF6ED] px-3 py-1 rounded-lg border border-[#EED7BF] shrink-0 self-end sm:self-auto">
                  {l.latency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? allTechs.length
                : allTechs.filter((t: any) => t.category?.toLowerCase() === cat.toLowerCase()).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-[#F8FAFC] text-slate-700 border border-slate-200 hover:border-[#D89B5B] hover:text-slate-950"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected ? "bg-[#D89B5B] text-slate-950 font-bold" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite Marquee Tickers in Luxury Light Mode */}
      <div className="mt-14 relative w-full space-y-5 overflow-hidden select-none">
        
        {/* Row 1 (Left Scrolling) */}
        <div className="animate-marquee-left flex gap-4">
          {[...row1, ...row1, ...row1].map((t: any, idx: number) => (
            <div
              key={`r1-${idx}`}
              className="flex-shrink-0 w-72 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-5 shadow-2xs transition-all duration-300 hover:border-[#D89B5B]/80 hover:shadow-lg hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <img src={t.icon} alt={t.name} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950 truncate max-w-[130px]">{t.name}</h4>
                    <span className="text-[10px] font-mono text-[#9E6229] font-bold uppercase">{t.badge || t.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#9E6229] bg-[#FDF6ED] px-2 py-0.5 rounded-md border border-[#EED7BF]">
                  {t.proficiency}%
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">{t.description}</p>
              
              {/* Mastery Level Bar */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#D89B5B] to-[#9E6229]"
                  style={{ width: `${t.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 (Right Scrolling) */}
        <div className="animate-marquee-right flex gap-4">
          {[...row2, ...row2, ...row2].map((t: any, idx: number) => (
            <div
              key={`r2-${idx}`}
              className="flex-shrink-0 w-72 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-5 shadow-2xs transition-all duration-300 hover:border-[#D89B5B]/80 hover:shadow-lg hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <img src={t.icon} alt={t.name} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950 truncate max-w-[130px]">{t.name}</h4>
                    <span className="text-[10px] font-mono text-[#9E6229] font-bold uppercase">{t.badge || t.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#9E6229] bg-[#FDF6ED] px-2 py-0.5 rounded-md border border-[#EED7BF]">
                  {t.proficiency}%
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">{t.description}</p>
              
              {/* Mastery Level Bar */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#D89B5B] to-[#9E6229]"
                  style={{ width: `${t.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* KPI Stats Bar */}
      <div className="mx-auto max-w-5xl px-5 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
          <div className="text-center p-2">
            <span className="block font-display text-2xl font-black text-[#9E6229]">100%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono mt-0.5">Strict Type Safety</span>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <span className="block font-display text-2xl font-black text-[#9E6229]">99.999%</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono mt-0.5">Production SLA</span>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <span className="block font-display text-2xl font-black text-[#9E6229]">&lt; 15ms</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono mt-0.5">Edge P99 Latency</span>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <span className="block font-display text-2xl font-black text-[#9E6229]">SOC 2</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono mt-0.5">Certified Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
