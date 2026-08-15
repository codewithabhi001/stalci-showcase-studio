import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Cloud, Shield, Code2, Smartphone, Palette, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { motion } from "framer-motion";

interface ServiceStory {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  projects: string[];
  tools: { name: string; iconSlug: string }[];
  visualType: "web" | "mobile" | "ai" | "cloud" | "security" | "uiux";
  bgTone: string;
  reverse: boolean;
}

const serviceStories: ServiceStory[] = [
  {
    slug: "software-engineering",
    eyebrow: "FULL-STACK PLATFORMS",
    title: "Launch High-Concurrency Web Platforms With Ease",
    tagline: "React 19, Next.js 16, TypeScript & Microservices",
    description:
      "Web applications engineered to withstand petabyte-scale loads without degradation. From SaaS operational hubs to headless e-commerce architectures, every platform is type-safe and optimized for Core Web Vitals.",
    projects: ["SaaS Operations Portals", "Enterprise B2B Platforms", "High-Volume Marketplaces"],
    tools: [
      { name: "React", iconSlug: "react" },
      { name: "Next.js", iconSlug: "nextdotjs" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "Node.js", iconSlug: "nodedotjs" },
      { name: "Tailwind", iconSlug: "tailwindcss" },
    ],
    visualType: "web",
    bgTone: "bg-[#F4F6FB]",
    reverse: false,
  },
  {
    slug: "ai-services",
    eyebrow: "SOVEREIGN AI & AGENTS",
    title: "Comprehensive Cognitive Systems Grounded in Your Data",
    tagline: "Private VPC LLMs, Vector Retrieval & Autonomous Workflows",
    description:
      "Deploy deterministic retrieval-augmented generation (RAG) architectures and autonomous agents in zero-data retention enclaves. Built on local CUDA tensor embeddings and continuous evaluation pipelines.",
    projects: ["Private RAG Vector Mesh", "Autonomous Agent Squads", "Predictive Analytics"],
    tools: [
      { name: "Python", iconSlug: "python" },
      { name: "PyTorch", iconSlug: "pytorch" },
      { name: "LangChain", iconSlug: "langchain" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
    ],
    visualType: "ai",
    bgTone: "bg-[#F0F7F4]",
    reverse: true,
  },
  {
    slug: "cloud-devops",
    eyebrow: "CLOUD & RESILIENCE",
    title: "Zero-Downtime Multi-Region Cloud & SRE Infrastructure",
    tagline: "Declarative Terraform IaC, Kubernetes & 24/7 Observability",
    description:
      "Eliminate single points of failure with multi-AZ container topologies, automated blue/green canary deployments, kernel-level eBPF tracing, and FinOps cost right-sizing.",
    projects: ["Multi-Region Kubernetes EKS", "Automated Canary Deployments", "FinOps Governance"],
    tools: [
      { name: "AWS", iconSlug: "aws" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Terraform", iconSlug: "terraform" },
      { name: "Cloudflare", iconSlug: "cloudflare" },
      { name: "Docker", iconSlug: "docker" },
    ],
    visualType: "cloud",
    bgTone: "bg-[#FFF9F2]",
    reverse: false,
  },
  {
    slug: "mobility",
    eyebrow: "MOBILE & EDGE",
    title: "Native & Cross-Platform Mobile Engineering",
    tagline: "iOS Swift, Android Kotlin, React Native & Flutter",
    description:
      "60–120 FPS fluid mobile user experiences engineered for global app store deployment. Offline-first synchronization, biometric hardware auth, and background telemetry.",
    projects: ["FinTech Wallets", "On-Demand Service Apps", "Enterprise Field Tools"],
    tools: [
      { name: "Swift", iconSlug: "swift" },
      { name: "Kotlin", iconSlug: "kotlin" },
      { name: "React Native", iconSlug: "react" },
      { name: "Flutter", iconSlug: "flutter" },
    ],
    visualType: "mobile",
    bgTone: "bg-[#FAF5FF]",
    reverse: true,
  },
];

function StoryVisual({ type }: { type: ServiceStory["visualType"] }) {
  if (type === "web") {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] rounded-2xl bg-white p-5 border border-zinc-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 font-semibold">app.stalci.io</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-auto py-2">
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 block">TTFB Latency</span>
            <span className="text-sm font-bold text-zinc-950">&lt; 18ms</span>
          </div>
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 block">Core Vitals</span>
            <span className="text-sm font-bold text-emerald-600">100 / 100</span>
          </div>
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 block">Concurrency</span>
            <span className="text-sm font-bold text-zinc-950">50k+ Req/s</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2.5 border-t border-zinc-100">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Type-Safe SSR
          </span>
          <span>Next.js 16 Edge</span>
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] rounded-2xl bg-white p-5 border border-zinc-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" /> Sovereign RAG VPC Enclave
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Zero Retention</span>
        </div>

        <div className="space-y-2 my-auto py-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
            <span className="text-zinc-600 font-medium">Vector Embedding Speed</span>
            <span className="font-mono font-bold text-zinc-950">14.2ms / Batch</span>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
            <span className="text-zinc-600 font-medium">Cosine Similarity Match</span>
            <span className="font-mono font-bold text-emerald-600">0.968 (pgvector)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2.5 border-t border-zinc-100">
          <span className="text-zinc-950 font-bold">PyTorch 2.x CUDA</span>
          <span>FastAPI Engine</span>
        </div>
      </div>
    );
  }

  if (type === "cloud") {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] rounded-2xl bg-white p-5 border border-zinc-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
            <Cloud className="h-3.5 w-3.5 text-zinc-600" /> Multi-Region Pods
          </span>
          <span className="text-[10px] font-mono text-emerald-600 font-bold">99.99% Uptime</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-auto py-2">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500">US-East Primary</span>
            <span className="text-xs font-bold text-zinc-950 block">48 Active Replicas</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500">EU-West Mirror</span>
            <span className="text-xs font-bold text-zinc-950 block">Failover Ready</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2.5 border-t border-zinc-100">
          <span>Terraform Automated</span>
          <span className="text-zinc-950 font-bold">Zero-Downtime</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] rounded-2xl bg-white p-5 border border-zinc-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5 text-zinc-600" /> Native Mobile Runtime
        </span>
        <span className="text-[10px] font-mono text-zinc-500">iOS & Android</span>
      </div>

      <div className="flex items-center justify-center my-auto py-3">
        <div className="w-40 rounded-2xl bg-zinc-50 border border-zinc-200 p-3 space-y-2 shadow-2xs">
          <div className="h-3 w-16 bg-zinc-200 rounded-full" />
          <div className="h-12 w-full bg-white rounded-xl border border-zinc-200/80 flex items-center justify-center text-xs font-bold text-zinc-950">
            60–120 FPS
          </div>
          <div className="h-2 w-24 bg-zinc-200 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2.5 border-t border-zinc-100">
        <span>Swift 6 & Kotlin</span>
        <span className="text-zinc-950 font-bold">Offline-First</span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#FFFFFF] py-20 sm:py-28 text-black border-t border-zinc-200/90">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        <SectionHeading
          eyebrow="What We Build & Deliver"
          title="Enterprise Engineering Practices Tailored for Scale"
          subtitle="Specialized cross-functional engineering pods operating under one disciplined delivery standard."
          tone="light"
        />

        {/* ─── Alternating 2-Column Storytelling Blocks (Replo Style) ─── */}
        <div className="mt-16 space-y-12 sm:space-y-16">
          {serviceStories.map((story, idx) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className={`rounded-3xl border border-zinc-200/90 p-6 sm:p-10 ${story.bgTone} shadow-xs hover:border-zinc-400 hover:shadow-md transition-all duration-300`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                story.reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
              }`}>
                
                {/* Narrative Column */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                      {story.eyebrow}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-[28px] font-bold text-zinc-950 tracking-tight leading-snug">
                      {story.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-zinc-700">
                      {story.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
                      {story.description}
                    </p>
                  </div>

                  {/* Project tags */}
                  <div>
                    <span className="block text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-950 mb-1.5">
                      Workloads
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {story.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded-full border border-zinc-200/90 bg-white px-3 py-0.5 text-[11px] font-medium text-zinc-800 shadow-2xs"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toolchain Logos */}
                  <div>
                    <span className="block text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-950 mb-1">
                      Toolchain
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {story.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-800 shadow-2xs"
                        >
                          <img
                            src={`/icons/${tool.iconSlug}.svg`}
                            alt={tool.name}
                            className="h-3.5 w-3.5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <span>{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-2">
                    <Link
                      to="/services/$slug"
                      params={{ slug: story.slug }}
                      className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors shadow-xs"
                    >
                      <span>Explore Capability</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* UI Mockup Column */}
                <div className="lg:col-span-6 h-full">
                  <StoryVisual type={story.visualType} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
