import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Cloud, Shield, Code2, Smartphone, Palette } from "lucide-react";
import { SectionHeading } from "./Brand";
import { motion } from "framer-motion";

interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  projects: string[];
  toolsSubtitle: string;
  tools: { name: string; iconSlug: string }[];
  visualType: "code" | "mobile" | "uiux" | "ai" | "cloud" | "security";
}

const serviceItems: ServiceItem[] = [
  {
    slug: "software-engineering",
    title: "Web Development",
    tagline: "Web Excellence, Delivered.",
    description:
      "Web apps that hold up under real traffic. We build on React, Next.js, and Node.js. SaaS dashboards, headless storefronts, internal portals, the works.",
    projects: ["SaaS Platforms", "Enterprise ERPs", "Headless E-commerce Stores"],
    toolsSubtitle: "Stacks that pass Core Web Vitals on day one and scale when you grow.",
    tools: [
      { name: "React", iconSlug: "react" },
      { name: "Next.js", iconSlug: "nextdotjs" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "Python", iconSlug: "python" },
      { name: "Tailwind CSS", iconSlug: "tailwindcss" },
    ],
    visualType: "code",
  },
  {
    slug: "mobility",
    title: "Mobile App Development",
    tagline: "Innovation, in Hand.",
    description:
      "iOS, Android, or both. We pick the right approach (Swift, Kotlin, Flutter, or React Native) based on what your product actually needs, not what's trending.",
    projects: ["On-Demand Service Apps", "FinTech Wallets", "HealthTech Companion Apps"],
    toolsSubtitle: "The right toolchain for the job, native or cross-platform.",
    tools: [
      { name: "iOS (Swift)", iconSlug: "swift" },
      { name: "Android (Kotlin)", iconSlug: "kotlin" },
      { name: "Flutter", iconSlug: "flutter" },
      { name: "React Native", iconSlug: "react" },
    ],
    visualType: "mobile",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Designing",
    tagline: "Design That Solves.",
    description:
      "Design that gets out of the way. We start with user research, build prototypes you can click through, and ship design systems your team can extend.",
    projects: ["User Journey Mapping", "Interactive Prototypes", "Design Systems"],
    toolsSubtitle: "World-class tools for wireframes, design tokens, and developer handoff.",
    tools: [
      { name: "Figma", iconSlug: "figma" },
      { name: "Tailwind", iconSlug: "tailwindcss" },
      { name: "Vite", iconSlug: "vite" },
      { name: "TypeScript", iconSlug: "typescript" },
    ],
    visualType: "uiux",
  },
  {
    slug: "ai-services",
    title: "AI & Cognitive Systems",
    tagline: "Intelligence, Grounded & Scaled.",
    description:
      "Generative AI, RAG architectures, and autonomous agentic workflows grounded in your proprietary data with verified evaluation harnesses.",
    projects: ["Agentic LLM Workflows", "Enterprise RAG Pipelines", "Predictive ML Engines"],
    toolsSubtitle: "High-performance inference engines and vector retrieval.",
    tools: [
      { name: "Python", iconSlug: "python" },
      { name: "PyTorch", iconSlug: "pytorch" },
      { name: "LangChain", iconSlug: "langchain" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
    ],
    visualType: "ai",
  },
  {
    slug: "cloud-devops",
    title: "Cloud Infrastructure & SRE",
    tagline: "Resilience at Global Scale.",
    description:
      "Zero-downtime multi-region cloud architectures, declarative Terraform IaC, automated CI/CD pipelines, and proactive SRE monitoring.",
    projects: ["Multi-Region Clusters", "Kubernetes Platforms", "FinOps Cloud Optimization"],
    toolsSubtitle: "Enterprise cloud platforms and declarative infrastructure.",
    tools: [
      { name: "AWS", iconSlug: "aws" },
      { name: "Docker", iconSlug: "docker" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Terraform", iconSlug: "terraform" },
      { name: "Cloudflare", iconSlug: "cloudflare" },
    ],
    visualType: "cloud",
  },
  {
    slug: "cyber-security",
    title: "Zero-Trust Cybersecurity",
    tagline: "Hardened Security & Compliance.",
    description:
      "Identity-first security perimeters, automated SOC 2 compliance evidence collection, offensive red teaming, and kernel eBPF monitoring.",
    projects: ["Zero-Trust Perimeters", "SOC 2 & ISO 27001", "Penetration Testing"],
    toolsSubtitle: "Kernel-level observability and automated compliance tooling.",
    tools: [
      { name: "Vault", iconSlug: "vault" },
      { name: "Cloudflare", iconSlug: "cloudflare" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Prometheus", iconSlug: "prometheus" },
    ],
    visualType: "security",
  },
];

function ServiceVisual({ type }: { type: ServiceItem["visualType"] }) {
  if (type === "code") {
    return (
      <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-between border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 font-semibold">App.tsx</span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center py-4">
          <div className="h-16 w-20 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center">
            <Code2 className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 pt-2 border-t border-zinc-200/80">
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            100/100 Core Vitals
          </span>
          <span className="text-zinc-500">React 19 / Next.js 16</span>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-center items-center border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center justify-center">
          <Smartphone className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
          <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600">iOS & Android</span>
        </div>
      </div>
    );
  }

  if (type === "uiux") {
    return (
      <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-center items-center border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center justify-center">
          <Palette className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
          <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600">Design System</span>
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-center items-center border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center justify-center">
          <Cpu className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
          <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600">AI Core</span>
        </div>
      </div>
    );
  }

  if (type === "cloud") {
    return (
      <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-center items-center border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center justify-center">
          <Cloud className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
          <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600">Multi-Cloud</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[200px] sm:min-h-[230px] rounded-2xl bg-[#FAFAFC] p-5 flex flex-col justify-center items-center border border-zinc-200/90 shadow-2xs overflow-hidden">
      <div className="h-20 w-20 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center justify-center">
        <Shield className="h-8 w-8 text-zinc-950" strokeWidth={1.8} />
        <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600">Zero-Trust</span>
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
          title="Enterprise IT Services, End-to-End"
          subtitle="Specialized engineering practices under one unified delivery standard. Engage a single pod or an entire digital programme."
          tone="light"
        />

        <div className="mt-14 space-y-6 sm:space-y-8">
          {serviceItems.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-3xl border border-zinc-200/90 bg-[#FFFFFF] p-6 sm:p-8 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left Visual Box (lg:col-span-4) */}
                <div className="lg:col-span-4 h-full">
                  <ServiceVisual type={service.visualType} />
                </div>

                {/* Right Narrative (lg:col-span-8) */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  
                  {/* Titles */}
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                      {service.title}
                    </h3>
                    <h4 className="mt-0.5 text-xs sm:text-sm font-semibold text-copper">
                      {service.tagline}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Projects */}
                  <div>
                    <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-950 mb-1.5">
                      Projects & Workloads
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded-full border border-zinc-200 bg-[#FAFAFC] px-3 py-0.5 text-[11px] font-medium text-zinc-700"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools We Use */}
                  <div>
                    <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-950 mb-1">
                      Toolchain
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {service.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-[#FAFAFC] px-2.5 py-1 text-[11px] font-medium text-zinc-800 shadow-2xs"
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

                  {/* Button */}
                  <div className="pt-2">
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-xs"
                    >
                      <span>Explore Capability</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
