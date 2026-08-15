import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Brand";
import { Sparkles, ShieldCheck } from "lucide-react";

export interface TechItem {
  name: string;
  label: string;
  category: "Languages" | "Frameworks and SDKs" | "Cloud and Backend" | "Dev Tools";
  iconSlug: string;
  proficiency: number;
  description: string;
  badge: string;
  useCase: string;
}

export const techItems: TechItem[] = [
  // ─── Languages (8 items) ───
  {
    name: "JavaScript",
    label: "JavaScript",
    category: "Languages",
    iconSlug: "javascript",
    proficiency: 99,
    description: "Modern ESNext asynchronous runtime, event loop profiling, and universal browser web standards.",
    badge: "Web Standard",
    useCase: "Enterprise web platforms, node runtimes, and client hydration",
  },
  {
    name: "TypeScript",
    label: "TypeScript",
    category: "Languages",
    iconSlug: "typescript",
    proficiency: 99,
    description: "Strict static typing, compile-time contract validation, generic utilities, and enterprise scale.",
    badge: "Core Enterprise",
    useCase: "Type-safe full-stack platforms, client SDKs, and API schemas",
  },
  {
    name: "Python",
    label: "Python",
    category: "Languages",
    iconSlug: "python",
    proficiency: 98,
    description: "AI/ML pipelines, PyTorch tensor models, LangChain agentic systems, and FastAPI microservices.",
    badge: "AI & Systems",
    useCase: "Sovereign LLMs, RAG retrieval pipelines, and quantitative engines",
  },
  {
    name: "Go (Golang)",
    label: "Go",
    category: "Languages",
    iconSlug: "go",
    proficiency: 96,
    description: "High-throughput concurrent microservices, sub-millisecond network routers, and low-footprint daemons.",
    badge: "High Concurrency",
    useCase: "Distributed backend engines, streaming proxies, and telemetry daemons",
  },
  {
    name: "Rust",
    label: "Rust",
    category: "Languages",
    iconSlug: "rust",
    proficiency: 94,
    description: "Memory-safe systems programming with zero-cost abstractions, WebAssembly binaries, and kernel speed.",
    badge: "Systems & WASM",
    useCase: "Cryptographic enclaves, low-latency financial systems, and WASM compute",
  },
  {
    name: "Kotlin",
    label: "Kotlin",
    category: "Languages",
    iconSlug: "kotlin",
    proficiency: 96,
    description: "Modern Android ecosystem engineering, coroutine-based concurrency, and type-safe Kotlin Multiplatform.",
    badge: "Native Mobile",
    useCase: "Enterprise Android applications and shared multiplatform logic",
  },
  {
    name: "Swift",
    label: "Swift",
    category: "Languages",
    iconSlug: "swift",
    proficiency: 96,
    description: "High-performance Apple platforms, SwiftUI reactive state, Combine pipelines, and Metal shaders.",
    badge: "Apple Ecosystem",
    useCase: "iOS, macOS, and iPadOS mission-critical client interfaces",
  },
  {
    name: "GraphQL / SQL",
    label: "GraphQL",
    category: "Languages",
    iconSlug: "graphql",
    proficiency: 97,
    description: "Declarative schema-driven data graphs, typed queries, and real-time subscription synchronization.",
    badge: "Data Query Mesh",
    useCase: "Unified multi-service API layers and single-roundtrip client queries",
  },

  // ─── Frameworks and SDKs (8 items) ───
  {
    name: "React 19",
    label: "React",
    category: "Frameworks and SDKs",
    iconSlug: "react",
    proficiency: 99,
    description: "Server components, concurrent rendering, dynamic hydration, and state primitives.",
    badge: "Frontend Core",
    useCase: "Enterprise dashboards, customer portals, and high-DPI web apps",
  },
  {
    name: "Next.js 16",
    label: "Next.js",
    category: "Frameworks and SDKs",
    iconSlug: "nextdotjs",
    proficiency: 99,
    description: "Streaming SSR, edge middleware, nested layouts, and Core Web Vitals optimization.",
    badge: "Full-Stack Web",
    useCase: "High-traffic public web applications and global platforms",
  },
  {
    name: "Node.js",
    label: "Node.js",
    category: "Frameworks and SDKs",
    iconSlug: "nodedotjs",
    proficiency: 98,
    description: "V8-powered asynchronous server runtime, high-concurrency event loops, and streaming APIs.",
    badge: "Server Runtime",
    useCase: "Real-time socket servers, microservices, and file ingestion",
  },
  {
    name: "NestJS",
    label: "NestJS",
    category: "Frameworks and SDKs",
    iconSlug: "nestjs",
    proficiency: 97,
    description: "Enterprise modular backend architecture, dependency injection, and gRPC microservices.",
    badge: "Enterprise Backend",
    useCase: "Banking backends, microservice meshes, and modular architectures",
  },
  {
    name: "React Native",
    label: "React Native",
    category: "Frameworks and SDKs",
    iconSlug: "react",
    proficiency: 98,
    description: "Cross-platform mobile apps with native UI bridges and 60fps smooth touch gestures.",
    badge: "Cross-Platform",
    useCase: "Universal mobile applications across iOS and Android stores",
  },
  {
    name: "Flutter",
    label: "Flutter",
    category: "Frameworks and SDKs",
    iconSlug: "flutter",
    proficiency: 95,
    description: "Pixel-perfect compiled mobile and desktop UI powered by Dart and Skia canvas.",
    badge: "Multi-Platform",
    useCase: "Bespoke kiosk systems, embedded screens, and mobile apps",
  },
  {
    name: "Tailwind CSS",
    label: "Tailwind CSS",
    category: "Frameworks and SDKs",
    iconSlug: "tailwindcss",
    proficiency: 99,
    description: "Utility-first design tokens, responsive layouts, and accessible component themes.",
    badge: "Design Tokens",
    useCase: "Consistent design systems, dark/light themes, and UI components",
  },
  {
    name: "SvelteKit",
    label: "Svelte",
    category: "Frameworks and SDKs",
    iconSlug: "svelte",
    proficiency: 94,
    description: "Compiler-based reactive UI without virtual DOM overhead, tiny JS bundle footprint, and raw speed.",
    badge: "Zero-V-DOM",
    useCase: "Ultra-lightweight embedded web widgets and high-frequency live tickers",
  },

  // ─── Cloud and Backend (8 items) ───
  {
    name: "Amazon Web Services",
    label: "AWS Cloud",
    category: "Cloud and Backend",
    iconSlug: "aws",
    proficiency: 98,
    description: "Multi-region VPCs, ECS/EKS clusters, serverless Lambda, and S3 global distribution.",
    badge: "Cloud Foundation",
    useCase: "Global enterprise cloud infrastructure and disaster-recovery topologies",
  },
  {
    name: "Google Cloud",
    label: "Google Cloud",
    category: "Cloud and Backend",
    iconSlug: "googlecloud",
    proficiency: 97,
    description: "GKE Autopilot clusters, BigQuery data warehouses, Vertex AI endpoints, and global networks.",
    badge: "AI & Cloud",
    useCase: "Petabyte-scale analytics, AI model hosting, and container clusters",
  },
  {
    name: "Kubernetes",
    label: "Kubernetes",
    category: "Cloud and Backend",
    iconSlug: "kubernetes",
    proficiency: 98,
    description: "Automated container orchestration, blue/green rollouts, and multi-cloud Helm deployments.",
    badge: "Orchestration",
    useCase: "Self-healing microservice clusters across hybrid and multi-cloud providers",
  },
  {
    name: "Docker",
    label: "Docker",
    category: "Cloud and Backend",
    iconSlug: "docker",
    proficiency: 99,
    description: "Deterministic container environments, multi-stage builds, and microservice packaging.",
    badge: "Containers",
    useCase: "Application packaging, local developer parity, and CI environments",
  },
  {
    name: "Terraform",
    label: "Terraform",
    category: "Cloud and Backend",
    iconSlug: "terraform",
    proficiency: 96,
    description: "Declarative Infrastructure as Code (IaC) and immutable cloud state management.",
    badge: "IaC Automation",
    useCase: "Automated multi-environment cloud provisioning and security guardrails",
  },
  {
    name: "PostgreSQL",
    label: "PostgreSQL",
    category: "Cloud and Backend",
    iconSlug: "postgresql",
    proficiency: 99,
    description: "ACID compliance, pgvector embeddings, complex indexing, and high-volume transactions.",
    badge: "Primary RDBMS",
    useCase: "Core transactional enterprise database and semantic search embeddings",
  },
  {
    name: "Redis",
    label: "Redis",
    category: "Cloud and Backend",
    iconSlug: "redis",
    proficiency: 98,
    description: "In-memory caching, distributed locks, rate-limiting, and Pub/Sub message channels.",
    badge: "In-Memory Store",
    useCase: "High-throughput session storage, cache acceleration, and job queues",
  },
  {
    name: "Apache Kafka",
    label: "Kafka",
    category: "Cloud and Backend",
    iconSlug: "apachekafka",
    proficiency: 95,
    description: "Distributed high-throughput event streaming, log compaction, and event-driven pipelines.",
    badge: "Event Streaming",
    useCase: "Financial transaction logs, telemetry pipelines, and async event buses",
  },

  // ─── Dev Tools (8 items) ───
  {
    name: "PyTorch",
    label: "PyTorch",
    category: "Dev Tools",
    iconSlug: "pytorch",
    proficiency: 96,
    description: "Deep learning tensor computation, dynamic autograd graphs, and GPU CUDA acceleration.",
    badge: "Deep Learning",
    useCase: "Custom sovereign model fine-tuning and predictive machine learning models",
  },
  {
    name: "LangChain",
    label: "LangChain",
    category: "Dev Tools",
    iconSlug: "langchain",
    proficiency: 96,
    description: "Autonomous LLM tool orchestration, RAG retrieval agents, and vector store connectors.",
    badge: "Agentic AI",
    useCase: "Autonomous enterprise assistant workflows and private document intelligence",
  },
  {
    name: "Ollama",
    label: "Ollama",
    category: "Dev Tools",
    iconSlug: "ollama",
    proficiency: 95,
    description: "Local sovereign LLM inference execution, GGUF quantization, and private VPC model hosting.",
    badge: "Local Inference",
    useCase: "Zero-leakage on-premises AI inference for banking and healthcare data",
  },
  {
    name: "Cloudflare",
    label: "Cloudflare",
    category: "Dev Tools",
    iconSlug: "cloudflare",
    proficiency: 98,
    description: "Global edge CDN, DDoS mitigation, WAF security rules, and Workers serverless execution.",
    badge: "Edge Security",
    useCase: "Zero-Trust edge routing, bot protection, and sub-10ms static delivery",
  },
  {
    name: "GitHub Actions",
    label: "CI/CD Actions",
    category: "Dev Tools",
    iconSlug: "githubactions",
    proficiency: 98,
    description: "Automated linting, unit/integration testing, security scanning, and container deployments.",
    badge: "CI/CD Pipeline",
    useCase: "Continuous integration, static security analysis, and deployment automation",
  },
  {
    name: "Prometheus",
    label: "Prometheus",
    category: "Dev Tools",
    iconSlug: "prometheus",
    proficiency: 96,
    description: "Real-time metrics scraping, alert rules, service level telemetry, and uptime monitoring.",
    badge: "Observability",
    useCase: "Production SLA tracking, latency tracing, and automated anomaly alerting",
  },
  {
    name: "HashiCorp Vault",
    label: "Vault",
    category: "Dev Tools",
    iconSlug: "vault",
    proficiency: 95,
    description: "Centralized secrets encryption, dynamic certificate leasing, and identity verification.",
    badge: "Zero-Trust",
    useCase: "Encrypted credential lifecycle and SOC 2 secret management compliance",
  },
  {
    name: "Figma",
    label: "Figma",
    category: "Dev Tools",
    iconSlug: "figma",
    proficiency: 98,
    description: "Collaborative design systems, interactive prototypes, and auto-layout UI specifications.",
    badge: "UI/UX Design",
    useCase: "Design token specification and high-fidelity product prototyping",
  },
];

const categories = [
  "Languages",
  "Frameworks and SDKs",
  "Cloud and Backend",
  "Dev Tools",
] as const;

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  const [selectedTech, setSelectedTech] = useState<TechItem>(techItems[0]);

  const filteredItems = techItems.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="relative bg-white py-14 sm:py-20 overflow-hidden text-black border-t border-zinc-200/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Advanced Tech Portfolio"
          title="Using The Right Tools For Powerful Results"
          subtitle="We pick the right stack for your specific project requirements and ensure maximum performance."
        />

        {/* Category Pill Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                    ? "bg-black text-white font-bold shadow-sm"
                    : "bg-[#FAFAFC] text-zinc-700 border border-zinc-200/90 hover:border-zinc-400 hover:text-black shadow-2xs"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Clean Symmetric 4x2 Tech Grid ─── */}
        <div className="mt-12 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-items-center"
              >
                {filteredItems.map((tech) => {
                  const isSelected = selectedTech?.name === tech.name;

                  return (
                    <button
                      key={tech.name}
                      onClick={() => setSelectedTech(tech)}
                      className={`group relative w-full h-32 sm:h-34 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-white border-2 border-black shadow-md scale-[1.02] ring-2 ring-black/5"
                          : "bg-[#FAFAFC] border border-zinc-200/90 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-xs"
                      }`}
                    >
                      {/* Authentic Brand SVG Logo */}
                      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white border border-zinc-200/80 p-2 flex items-center justify-center mb-2 shadow-2xs group-hover:border-zinc-300">
                        <img
                          src={`/icons/${tech.iconSlug}.svg`}
                          alt={`${tech.name} logo`}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>

                      {/* Label & Badge */}
                      <span className="text-xs sm:text-[13px] font-bold text-zinc-950 tracking-tight text-center leading-tight">
                        {tech.label}
                      </span>

                      <span className="mt-1 text-[10px] font-mono text-zinc-500 tracking-tight text-center truncate max-w-full">
                        {tech.badge}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Active Tool Spotlight Drawer ─── */}
          {selectedTech && (
            <motion.div
              key={selectedTech.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-8 w-full max-w-3xl rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-6 sm:p-7 shadow-xs relative text-black"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-200 p-2.5 flex items-center justify-center shrink-0 shadow-2xs">
                    <img
                      src={`/icons/${selectedTech.iconSlug}.svg`}
                      alt={selectedTech.name}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-lg font-bold text-zinc-950 leading-tight">
                        {selectedTech.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {selectedTech.badge}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">
                      Category: {selectedTech.category}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 bg-white border border-zinc-200 text-xs font-mono font-bold text-zinc-950 self-start sm:self-auto shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 text-copper" />
                  <span>{selectedTech.proficiency}% Production Grade</span>
                </span>
              </div>

              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
                {selectedTech.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-white border border-zinc-200/80 text-xs flex items-center gap-2">
                <span className="font-bold text-zinc-950 font-mono">Use Case:</span>
                <span className="text-zinc-600">{selectedTech.useCase}</span>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
