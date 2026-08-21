import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchTechnologies } from "@/lib/api";
import { BadgePill } from "./Brand";
import { TechIcon } from "./TechIcon";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Server, 
  Smartphone,
  Globe,
  ArrowRight
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  iconSlug: string;
  tag: string;
  desc: string;
  spec: string;
}

const techDirectory: TechItem[] = [
  // AI & Neural
  { name: "PyTorch", category: "AI & Neural", iconSlug: "pytorch", tag: "Deep Learning", spec: "CUDA 12.4", desc: "Tensor compute & custom fine-tuned LLM architectures" },
  { name: "Python", category: "AI & Neural", iconSlug: "python", tag: "AI Runtimes", spec: "v3.12 LTS", desc: "LangChain agents, embeddings & vector search pipelines" },
  { name: "TensorFlow", category: "AI & Neural", iconSlug: "tensorflow", tag: "ML Engine", spec: "Edge Inference", desc: "High-throughput edge model inference & production pipelines" },
  { name: "Hugging Face", category: "AI & Neural", iconSlug: "huggingface", tag: "Model Hub", spec: "Quantization", desc: "Open-weights quantization & domain-specific adaptation" },

  // Full-Stack Web
  { name: "TypeScript", category: "Full-Stack Web", iconSlug: "typescript", tag: "Type System", spec: "100% AST Safe", desc: "Compile-time type safety & end-to-end schema validation" },
  { name: "React 19", category: "Full-Stack Web", iconSlug: "react", tag: "UI Framework", spec: "Server Actions", desc: "Server components, streaming SSR & concurrent rendering" },
  { name: "Next.js 16", category: "Full-Stack Web", iconSlug: "nextdotjs", tag: "Edge Web", spec: "<50ms TTFB", desc: "Edge middleware, dynamic ISR & streaming routes" },
  { name: "Node.js", category: "Full-Stack Web", iconSlug: "nodedotjs", tag: "Runtime", spec: "Async I/O", desc: "High-concurrency async event-driven microservices" },
  { name: "Tailwind CSS", category: "Full-Stack Web", iconSlug: "tailwindcss", tag: "Design Tokens", spec: "0-Runtime", desc: "Zero-runtime responsive component design systems" },
  { name: "PostgreSQL", category: "Full-Stack Web", iconSlug: "postgresql", tag: "Database", spec: "pgvector ACID", desc: "ACID transactions & pgvector similarity embeddings" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud & DevOps", iconSlug: "aws", tag: "Cloud Fabric", spec: "Multi-AZ", desc: "Multi-AZ EKS, RDS Aurora, Serverless & S3 infrastructure" },
  { name: "Google Cloud", category: "Cloud & DevOps", iconSlug: "googlecloud", tag: "AI Cloud", spec: "TPU Pods", desc: "BigQuery analytics, Kubernetes engine & TPU pods" },
  { name: "Kubernetes", category: "Cloud & DevOps", iconSlug: "kubernetes", tag: "Auto Canary", spec: "Auto Canary", desc: "Automated blue/green zero-downtime cluster rollouts" },
  { name: "Docker", category: "Cloud & DevOps", iconSlug: "docker", tag: "Containers", spec: "Multi-Arch", desc: "Lightweight reproducible multi-stage image builds" },
  { name: "Terraform", category: "Cloud & DevOps", iconSlug: "terraform", tag: "IaC", spec: "Immutable", desc: "Declarative multi-cloud provisioning & immutable infra" },
  { name: "Redis", category: "Cloud & DevOps", iconSlug: "redis", tag: "Cache & Mesh", spec: "<1ms Cache", desc: "Sub-millisecond in-memory caching & distributed locks" },

  // Native Mobile
  { name: "Swift", category: "Native Mobile", iconSlug: "swift", tag: "Apple Native", spec: "120 FPS Metal", desc: "Native 120 FPS SwiftUI, SwiftData & Metal shaders" },
  { name: "Kotlin", category: "Native Mobile", iconSlug: "kotlin", tag: "Android Native", spec: "Compose KMP", desc: "Jetpack Compose & Kotlin Multiplatform shared logic" },
  { name: "React Native", category: "Native Mobile", iconSlug: "react", tag: "Cross-Platform", spec: "Native Bridge", desc: "High-performance native mobile apps with shared core" },
  { name: "Flutter", category: "Native Mobile", iconSlug: "flutter", tag: "Multiplatform", spec: "Skia Engine", desc: "Pixel-perfect multiplatform mobile UI applications" },
];

const categories = ["All Systems", "AI & Neural", "Full-Stack Web", "Cloud & DevOps", "Native Mobile"] as const;

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All Systems");
  const [selectedTech, setSelectedTech] = useState<TechItem>(techDirectory[0]);

  const { data: remoteTechnologies } = useQuery({
    queryKey: ["technologies"],
    queryFn: () => fetchTechnologies(),
  });

  const displayList: TechItem[] = remoteTechnologies && remoteTechnologies.length > 0
    ? remoteTechnologies.map((t: any) => ({
        name: t.name,
        category: t.category,
        iconSlug: t.icon || t.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
        tag: t.category,
        spec: `${t.proficiency || 90}% Proficiency`,
        desc: t.description || `${t.name} framework integrated in production architectures.`,
      }))
    : techDirectory;

  const filteredTech = activeCategory === "All Systems"
    ? displayList
    : displayList.filter(t => t.category === activeCategory);

  return (
    <section id="tech-stack" className="relative bg-[#FFFFFF] py-16 sm:py-24 text-zinc-950 isolate overflow-hidden border-t border-zinc-200/90">
      
      {/* Clean Subtle Grid Mesh */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section (Clean Typography, Zero Emojis) ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="text-[10.5px] sm:text-[11.5px] font-mono text-zinc-900 font-semibold">
                Architecture &amp; Toolchains
              </span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[36px] font-bold text-zinc-950 tracking-tight leading-[1.18]">
            Our Production-Grade Technology Ecosystem
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-xl mx-auto">
            We don't chase hype. We architect mission-critical software using strictly typed, high-throughput, battle-tested modern toolchains.
          </p>
        </div>

        {/* ─── Minimalist Category Filter Bar ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white font-bold shadow-xs"
                    : "bg-[#F8FAFC] text-zinc-700 border border-zinc-200/90 hover:border-zinc-400 hover:text-black shadow-2xs"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ─── Clean Structured Ecosystem Cluster Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {filteredTech.map((tech) => {
            const isSelected = selectedTech.name === tech.name;

            return (
              <div
                key={tech.name}
                onClick={() => setSelectedTech(tech)}
                className={`relative rounded-2xl p-3.5 sm:p-4 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? "bg-white border-zinc-950 shadow-md ring-1 ring-zinc-950/10"
                    : "bg-[#FAFAFC] border-zinc-200/90 hover:border-zinc-300 hover:bg-white hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-xl bg-white border border-zinc-200/80 p-1.5 flex items-center justify-center shadow-2xs">
                    <TechIcon name={tech.name} slug={tech.iconSlug} size={22} />
                  </div>
                  <span className="text-[9.5px] font-mono text-zinc-600 bg-zinc-100/80 border border-zinc-200/60 px-2 py-0.5 rounded-full font-medium">
                    {tech.tag}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-[13px] font-bold text-zinc-950 font-display">
                      {tech.name}
                    </h3>
                    <span className="text-[9.5px] font-mono text-zinc-500 font-semibold">
                      {tech.spec}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Clean Architecture Assurance Strip (Bottom, Zero Emojis) ─── */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-zinc-200/90 bg-[#FAFAFC] p-4 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 font-mono shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-950" />
            <span className="text-zinc-900 font-medium">100% Production Grade Architecture Standard</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-zinc-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-zinc-950" />
              <span>Sub-50ms P99 TTFB</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-zinc-950" />
              <span>SOC 2 Ready</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-zinc-950" />
              <span>Zero-Trust SLAs</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
