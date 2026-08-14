import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Cloud, Shield } from "lucide-react";
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
      { name: "AWS", iconSlug: "googlecloud" },
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
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-between border border-white/10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-slate-400">App.tsx</span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center py-4">
          <div className="h-20 w-24 rounded-xl bg-[#141A26] border border-white/15 shadow-md flex items-center justify-center">
            <span className="font-mono text-2xl font-bold text-white tracking-wider">
              &lt;/&gt;
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            100/100 Vitals
          </span>
          <span>Next.js 16</span>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-center items-center border border-white/10 shadow-sm overflow-hidden">
        <div className="relative w-32 h-48 rounded-[20px] bg-[#141A26] border border-white/15 p-2 flex flex-col justify-between shadow-md">
          <div className="mx-auto w-10 h-2 rounded-full bg-black/60" />
          <div className="space-y-1.5 p-1 my-auto">
            <div className="h-4 w-full rounded bg-white/5" />
            <div className="h-10 w-full rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-blue-500/20 border border-blue-400/40" />
            </div>
            <div className="h-3 w-full rounded bg-white/5" />
          </div>
          <div className="mx-auto w-10 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    );
  }

  if (type === "uiux") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-center items-center border border-white/10 shadow-sm overflow-hidden">
        <div className="relative w-36 h-40 flex flex-col justify-center items-center">
          <div className="absolute top-2 w-32 h-16 rounded-xl bg-[#141A26] border border-white/5 opacity-50 transform -rotate-3" />
          <div className="relative w-36 rounded-xl bg-[#182030] border border-white/15 p-3 space-y-2 shadow-md">
            <div className="flex justify-between items-center border-b border-white/10 pb-1">
              <span className="h-1.5 w-8 bg-slate-300 rounded-full" />
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full" />
            <div className="h-1.5 w-2/3 bg-slate-400/40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-center items-center border border-white/10 shadow-sm overflow-hidden">
        <div className="h-24 w-24 rounded-2xl bg-[#141A26] border border-white/15 flex flex-col items-center justify-center shadow-md">
          <Cpu className="h-9 w-9 text-slate-200" strokeWidth={1.5} />
          <span className="mt-1 text-[8.5px] font-mono font-bold text-slate-400">AI CORE</span>
        </div>
      </div>
    );
  }

  if (type === "cloud") {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-center items-center border border-white/10 shadow-sm overflow-hidden">
        <div className="h-24 w-28 rounded-2xl bg-[#141A26] border border-white/15 flex flex-col items-center justify-center shadow-md">
          <Cloud className="h-9 w-9 text-slate-200" strokeWidth={1.5} />
          <span className="mt-1 text-[8.5px] font-mono font-bold text-slate-400">MULTI-CLOUD</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[250px] rounded-2xl bg-[#0B0D14] p-5 flex flex-col justify-center items-center border border-white/10 shadow-sm overflow-hidden">
      <div className="h-24 w-24 rounded-2xl bg-[#141A26] border border-white/15 flex flex-col items-center justify-center shadow-md">
        <Shield className="h-9 w-9 text-slate-200" strokeWidth={1.5} />
        <span className="mt-1 text-[8.5px] font-mono font-bold text-slate-400">ZERO TRUST</span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#FFFFFF] py-20 sm:py-28 text-slate-900 border-t border-slate-200/80">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What We Build & Deliver"
          title="Enterprise IT Services, End-to-End"
          subtitle="Specialized engineering practices under one unified delivery standard. Engage a single pod or an entire digital programme."
          tone="light"
        />

        <div className="mt-14 space-y-8 sm:space-y-10">
          {serviceItems.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:border-slate-400/60 hover:shadow-md transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left Visual Box (lg:col-span-5) */}
                <div className="lg:col-span-5 h-full">
                  <ServiceVisual type={service.visualType} />
                </div>

                {/* Right Narrative (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  
                  {/* Titles */}
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {service.title}
                    </h3>
                    <h4 className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-700">
                      {service.tagline}
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Projects */}
                  <div>
                    <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Projects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-[11px] font-medium text-slate-700"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools We Use */}
                  <div>
                    <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                      Tools We use
                    </span>
                    <p className="text-[11px] text-slate-500 mb-2.5">
                      {service.toolsSubtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {service.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-800 shadow-2xs"
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
                  <div className="pt-1">
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <span>Explore More</span>
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
