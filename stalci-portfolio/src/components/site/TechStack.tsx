import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTechnologies } from "@/lib/api";
import { SectionHeading } from "./Brand";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Cloud,
  Brain,
  ShieldCheck,
  Zap,
} from "lucide-react";

const fallbackTechs = [
  { id: 1, name: "React 19 & Next.js 16", category: "Frontend", proficiency: 98, isFeatured: true },
  { id: 2, name: "TypeScript & JavaScript", category: "Frontend", proficiency: 99, isFeatured: true },
  { id: 3, name: "Tailwind CSS & Radix UI", category: "Frontend", proficiency: 96, isFeatured: true },
  { id: 4, name: "Node.js & NestJS", category: "Backend", proficiency: 97, isFeatured: true },
  { id: 5, name: "Go (Golang)", category: "Backend", proficiency: 92, isFeatured: true },
  { id: 6, name: "Rust & WebAssembly", category: "Backend", proficiency: 90, isFeatured: true },
  { id: 7, name: "Python & PyTorch", category: "AI & Data", proficiency: 95, isFeatured: true },
  { id: 8, name: "LangChain & Agentic LLMs", category: "AI & Data", proficiency: 94, isFeatured: true },
  { id: 9, name: "PostgreSQL & pgvector", category: "Security & Database", proficiency: 96, isFeatured: true },
  { id: 10, name: "Redis & Apache Kafka", category: "Security & Database", proficiency: 93, isFeatured: true },
  { id: 11, name: "Kubernetes & Docker", category: "Cloud & DevOps", proficiency: 98, isFeatured: true },
  { id: 12, name: "AWS, GCP & Cloudflare", category: "Cloud & DevOps", proficiency: 97, isFeatured: true },
  { id: 13, name: "Terraform & OpenTofu", category: "Cloud & DevOps", proficiency: 91, isFeatured: true },
  { id: 14, name: "Zero-Trust & eBPF Security", category: "Security & Database", proficiency: 94, isFeatured: true },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Cloud & DevOps",
  "AI & Data",
  "Security & Database",
];

const categoryIcons: Record<string, typeof Code> = {
  Frontend: Code,
  Backend: Server,
  "Cloud & DevOps": Cloud,
  "AI & Data": Brain,
  "Security & Database": ShieldCheck,
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: apiTechs } = useQuery({
    queryKey: ["technologies", selectedCategory],
    queryFn: () => fetchTechnologies(selectedCategory),
  });

  const technologies = apiTechs && apiTechs.length > 0 ? apiTechs : fallbackTechs;

  const filtered = technologies.filter((t: any) => {
    if (selectedCategory === "All") return true;
    return t.category === selectedCategory;
  });

  return (
    <section id="tech-stack" className="relative bg-[#F8FAFC] py-24 sm:py-32 overflow-hidden border-t border-slate-200 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Core Technology Radar"
          title="Battle-Tested Engineering Stack"
          subtitle="We engineer across modern, memory-safe, and high-concurrency toolchains designed for zero downtime."
          tone="light"
        />

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white font-bold shadow-md shadow-amber-900/20 scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-amber-500 hover:text-slate-900 shadow-2xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((t: any, idx: number) => {
            const Icon = categoryIcons[t.category] || Code;
            return (
              <motion.div
                key={t.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 8) * 0.04 }}
                className="group relative rounded-2xl bg-white p-5 border border-slate-200/90 shadow-sm hover:border-amber-500/70 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                        {t.name}
                      </h4>
                      <span className="text-[11px] font-medium text-slate-500">{t.category}</span>
                    </div>
                  </div>
                  {t.isFeatured && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      <Zap className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                      Core
                    </span>
                  )}
                </div>

                {/* Proficiency Meter */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[11px] mb-1.5 font-mono">
                    <span className="text-slate-500 font-medium">Production Mastery</span>
                    <span className="font-bold text-amber-700">{t.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
