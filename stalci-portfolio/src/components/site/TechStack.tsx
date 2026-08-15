import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Brand";
import { Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  label: string;
  category: "Languages" | "Frameworks and SDKs" | "Cloud and Backend" | "Dev Tools";
  iconSlug: string;
  proficiency: number;
  description: string;
  badge: string;
}

const techItems: TechItem[] = [
  // ─── Languages ───
  {
    name: "JavaScript",
    label: "JavaScript",
    category: "Languages",
    iconSlug: "typescript",
    proficiency: 99,
    description: "Modern ESNext asynchronous runtime, event loop optimization, and web standards.",
    badge: "Primary Web",
  },
  {
    name: "TypeScript",
    label: "TypeScript",
    category: "Languages",
    iconSlug: "typescript",
    proficiency: 99,
    description: "Strict static typing, compile-time validation, generic utilities, and enterprise scale.",
    badge: "Core Language",
  },
  {
    name: "Kotlin",
    label: "Kotlin",
    category: "Languages",
    iconSlug: "kotlin",
    proficiency: 96,
    description: "Modern Android application engineering, coroutines, and type-safe multiplatform code.",
    badge: "Native Mobile",
  },
  {
    name: "Swift",
    label: "Swift",
    category: "Languages",
    iconSlug: "swift",
    proficiency: 96,
    description: "High-performance iOS ecosystem, SwiftUI, Combine reactive flows, and Metal GPU shaders.",
    badge: "Apple Ecosystem",
  },
  {
    name: "Python",
    label: "Python",
    category: "Languages",
    iconSlug: "python",
    proficiency: 98,
    description: "AI/ML pipelines, PyTorch tensor models, LangChain agentic systems, and FastAPI microservices.",
    badge: "AI & Systems",
  },
  {
    name: "Go (Golang)",
    label: "Go",
    category: "Languages",
    iconSlug: "go",
    proficiency: 94,
    description: "High-throughput microservices, concurrent goroutines, and sub-millisecond network gateways.",
    badge: "High Concurrency",
  },
  {
    name: "Rust",
    label: "Rust",
    category: "Languages",
    iconSlug: "rust",
    proficiency: 92,
    description: "Memory-safe systems programming, WebAssembly binaries, and zero-cost abstractions.",
    badge: "Systems & WASM",
  },

  // ─── Frameworks and SDKs ───
  {
    name: "React 19",
    label: "React",
    category: "Frameworks and SDKs",
    iconSlug: "react",
    proficiency: 99,
    description: "Server components, concurrent rendering, dynamic hydration, and state primitives.",
    badge: "Core Frontend",
  },
  {
    name: "Next.js 16",
    label: "Next.js",
    category: "Frameworks and SDKs",
    iconSlug: "nextdotjs",
    proficiency: 99,
    description: "Streaming SSR, edge middleware, nested layouts, and Core Web Vitals optimization.",
    badge: "Production Web",
  },
  {
    name: "React Native",
    label: "React Native",
    category: "Frameworks and SDKs",
    iconSlug: "react",
    proficiency: 98,
    description: "Cross-platform mobile apps with native UI bridges and 60fps smooth gestures.",
    badge: "Cross-Platform",
  },
  {
    name: "Flutter",
    label: "Flutter",
    category: "Frameworks and SDKs",
    iconSlug: "flutter",
    proficiency: 94,
    description: "Pixel-perfect compiled mobile and desktop UI powered by Dart and Skia canvas.",
    badge: "Multi-Platform",
  },
  {
    name: "NestJS",
    label: "NestJS",
    category: "Frameworks and SDKs",
    iconSlug: "nestjs",
    proficiency: 97,
    description: "Enterprise modular backend architecture, dependency injection, and gRPC microservices.",
    badge: "Backend Core",
  },
  {
    name: "Tailwind CSS",
    label: "Tailwind CSS",
    category: "Frameworks and SDKs",
    iconSlug: "tailwindcss",
    proficiency: 99,
    description: "Utility-first design tokens, responsive layouts, and accessible component themes.",
    badge: "Styling Suite",
  },
  {
    name: "Node.js",
    label: "Node.js",
    category: "Frameworks and SDKs",
    iconSlug: "nodedotjs",
    proficiency: 98,
    description: "V8-powered asynchronous server runtime, high-concurrency event loops, and streaming APIs.",
    badge: "Server Runtime",
  },

  // ─── Cloud and Backend ───
  {
    name: "AWS",
    label: "AWS Cloud",
    category: "Cloud and Backend",
    iconSlug: "googlecloud",
    proficiency: 98,
    description: "Multi-region VPCs, ECS/EKS clusters, serverless Lambda, and S3 global distribution.",
    badge: "Cloud Infra",
  },
  {
    name: "Kubernetes",
    label: "Kubernetes",
    category: "Cloud and Backend",
    iconSlug: "kubernetes",
    proficiency: 97,
    description: "Automated container orchestration, blue/green rollouts, and multi-cloud Helm deployments.",
    badge: "Orchestration",
  },
  {
    name: "Docker",
    label: "Docker",
    category: "Cloud and Backend",
    iconSlug: "docker",
    proficiency: 99,
    description: "Deterministic container environments, multi-stage builds, and microservice packaging.",
    badge: "Containers",
  },
  {
    name: "Terraform",
    label: "Terraform",
    category: "Cloud and Backend",
    iconSlug: "terraform",
    proficiency: 95,
    description: "Declarative Infrastructure as Code (IaC) and immutable cloud state management.",
    badge: "IaC Automation",
  },
  {
    name: "PostgreSQL",
    label: "PostgreSQL",
    category: "Cloud and Backend",
    iconSlug: "postgresql",
    proficiency: 98,
    description: "ACID compliance, pgvector embeddings, complex indexing, and high-volume transactions.",
    badge: "Primary RDBMS",
  },
  {
    name: "Redis",
    label: "Redis",
    category: "Cloud and Backend",
    iconSlug: "redis",
    proficiency: 96,
    description: "In-memory caching, distributed locks, rate-limiting, and Pub/Sub message channels.",
    badge: "Fast Cache",
  },
  {
    name: "Apache Kafka",
    label: "Kafka",
    category: "Cloud and Backend",
    iconSlug: "apachekafka",
    proficiency: 94,
    description: "Distributed high-throughput event streaming, log compaction, and event-driven pipelines.",
    badge: "Event Streaming",
  },

  // ─── Dev Tools ───
  {
    name: "GitHub Actions",
    label: "CI/CD Actions",
    category: "Dev Tools",
    iconSlug: "githubactions",
    proficiency: 98,
    description: "Automated linting, unit/integration testing, security scanning, and container deployments.",
    badge: "CI/CD Pipeline",
  },
  {
    name: "LangChain",
    label: "LangChain",
    category: "Dev Tools",
    iconSlug: "langchain",
    proficiency: 96,
    description: "Autonomous LLM tool orchestration, RAG retrieval agents, and vector store connectors.",
    badge: "AI Agentic",
  },
  {
    name: "Cloudflare",
    label: "Cloudflare",
    category: "Dev Tools",
    iconSlug: "cloudflare",
    proficiency: 97,
    description: "Global edge CDN, DDoS mitigation, WAF security rules, and Workers serverless execution.",
    badge: "Edge & WAF",
  },
  {
    name: "Figma",
    label: "Figma",
    category: "Dev Tools",
    iconSlug: "figma",
    proficiency: 98,
    description: "Collaborative design systems, interactive prototypes, and auto-layout UI specifications.",
    badge: "UI/UX Design",
  },
  {
    name: "Prometheus",
    label: "Prometheus",
    category: "Dev Tools",
    iconSlug: "prometheus",
    proficiency: 95,
    description: "Real-time metrics scraping, alert rules, service level telemetry, and uptime monitoring.",
    badge: "Observability",
  },
  {
    name: "HashiCorp Vault",
    label: "Vault",
    category: "Dev Tools",
    iconSlug: "vault",
    proficiency: 95,
    description: "Centralized secrets encryption, dynamic certificate leasing, and identity verification.",
    badge: "Zero-Trust",
  },
];

const categories = [
  "Languages",
  "Frameworks and SDKs",
  "Cloud and Backend",
  "Dev Tools",
] as const;

const isDarkIcon = (slug: string) =>
  ["nextdotjs", "ollama", "vercel", "vault", "apachekafka", "expo"].includes(slug);

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  const [selectedTech, setSelectedTech] = useState<TechItem>(techItems[0]);

  const filteredItems = techItems.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="relative bg-[#FAFAFC] py-24 sm:py-32 overflow-hidden text-slate-900 border-t border-slate-200/80">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Advanced Tech Portfolio"
          title="Using The Right Tools For Powerful Results"
          subtitle="We pick the right stack for your specific project requirements and ensure maximum performance."
        />

        {/* Category Pill Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstOfCat = techItems.find((t) => t.category === cat);
                  if (firstOfCat) setSelectedTech(firstOfCat);
                }}
                className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white font-bold shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-2xs"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Honeycomb Grid */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center">
          
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full"
              >
                {filteredItems.map((tech, idx) => {
                  const isSelected = selectedTech?.name === tech.name;

                  return (
                    <motion.button
                      key={tech.name}
                      onClick={() => setSelectedTech(tech)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      className={`relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-white border-2 border-slate-900 shadow-md scale-105"
                          : "bg-white border border-slate-200/90 shadow-2xs hover:border-slate-400 hover:shadow-xs"
                      }`}
                    >
                      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center mb-1.5">
                        <img
                          src={`/icons/${tech.iconSlug}.svg`}
                          alt={`${tech.name} logo`}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>

                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-800 tracking-tight text-center leading-tight">
                        {tech.label}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Active Tool Spotlight Drawer */}
          {selectedTech && (
            <motion.div
              key={selectedTech.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-10 w-full max-w-xl rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden text-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={`/icons/${selectedTech.iconSlug}.svg`}
                      alt={selectedTech.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-slate-950 leading-tight">
                      {selectedTech.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      {selectedTech.badge} &bull; {selectedTech.category}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                  <Sparkles className="h-3 w-3 text-copper" />
                  {selectedTech.proficiency}% Production Grade
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {selectedTech.description}
              </p>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>Production SLA Readiness</span>
                  <span className="font-semibold text-slate-900">{selectedTech.proficiency}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${selectedTech.proficiency}%` }}
                    className="h-full bg-copper rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
