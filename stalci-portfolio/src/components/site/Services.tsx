import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Cloud, Shield, Code2, Smartphone, CheckCircle2, ArrowUpRight, Activity, Zap, Server, Database, Sparkles } from "lucide-react";
import { SectionHeading, BadgePill } from "./Brand";
import { motion } from "framer-motion";

interface CoreService {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  projects: string[];
  toolsText: string;
  tools: { name: string; iconSlug: string }[];
  visualType: "ai" | "web" | "mobile" | "cloud";
}

const fallbackServices: CoreService[] = [
  {
    slug: "ai-services",
    title: "AI & ML Development",
    tagline: "Intelligence, Engineered.",
    description:
      "We help you turn your data into something useful. Predictive models that catch issues early, computer vision that sees what humans miss, and LLM agents that handle the boring parts.",
    projects: ["Predictive Analytics Dashboards", "NLP-driven Chatbots", "AI Agents"],
    toolsText: "We build with tools your team can hire for and maintain: Python, PyTorch, LangChain, and PostgreSQL.",
    tools: [
      { name: "Python", iconSlug: "python" },
      { name: "PyTorch", iconSlug: "pytorch" },
      { name: "LangChain", iconSlug: "langchain" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
    ],
    visualType: "ai",
  },
  {
    slug: "software-engineering",
    title: "Web Development",
    tagline: "Web Excellence, Delivered.",
    description:
      "Web apps that hold up under real traffic. We build on React, Next.js, and Node.js. SaaS dashboards, headless storefronts, internal portals, the works.",
    projects: ["SaaS Platforms", "Enterprise ERPs", "Headless E-commerce Stores"],
    toolsText: "We build with tools your team can hire for and maintain: React, Next.js, TypeScript, Node.js, and Tailwind.",
    tools: [
      { name: "React", iconSlug: "react" },
      { name: "Next.js", iconSlug: "nextdotjs" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "Node.js", iconSlug: "nodedotjs" },
      { name: "Tailwind", iconSlug: "tailwindcss" },
    ],
    visualType: "web",
  },
  {
    slug: "mobility",
    title: "Mobile App Development",
    tagline: "Native Performance, Everywhere.",
    description:
      "iOS and Android apps that feel instant. 60–120 FPS fluid animations, offline synchronization, hardware biometric authentication, and smooth app store deployment.",
    projects: ["FinTech Wallets", "On-Demand Delivery Apps", "Health & Wellness Portals"],
    toolsText: "We build with tools your team can hire for and maintain: Swift, Kotlin, React Native, and Flutter.",
    tools: [
      { name: "Swift", iconSlug: "swift" },
      { name: "Kotlin", iconSlug: "kotlin" },
      { name: "React Native", iconSlug: "react" },
      { name: "Flutter", iconSlug: "flutter" },
    ],
    visualType: "mobile",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Architecture",
    tagline: "Zero-Downtime Resilience.",
    description:
      "Multi-region cloud orchestration with automated blue/green deployments, declarative Terraform infrastructure-as-code, and 24/7 proactive monitoring.",
    projects: ["Multi-Region Kubernetes EKS", "Automated Canary Deployments", "FinOps Governance"],
    toolsText: "We build with tools your team can hire for and maintain: AWS, GCP, Kubernetes, Docker, and Terraform.",
    tools: [
      { name: "AWS", iconSlug: "aws" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Terraform", iconSlug: "terraform" },
      { name: "Cloudflare", iconSlug: "cloudflare" },
      { name: "Docker", iconSlug: "docker" },
    ],
    visualType: "cloud",
  },
];

function Service3DVisual({ type }: { type: CoreService["visualType"] }) {
  if (type === "ai") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-blue-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-28 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-900 to-slate-950 border-2 border-blue-400/80 flex items-center justify-center shadow-[0_15px_30px_rgba(0,82,255,0.4)] transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
            <Cpu className="h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-blue-300 uppercase tracking-widest">
            Autonomous AI Engines
          </span>
        </div>
      </div>
    );
  }

  if (type === "web") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-indigo-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="absolute w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-32 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-900 to-slate-950 border-2 border-indigo-400/80 flex items-center justify-center shadow-[0_15px_30px_rgba(99,102,241,0.4)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Code2 className="h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-widest">
            High-Scale Web Systems
          </span>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border border-emerald-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="absolute w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-900 to-slate-950 border-2 border-emerald-400/80 flex items-center justify-center shadow-[0_15px_30px_rgba(16,185,129,0.4)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Smartphone className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-widest">
            Native Mobile Ecosystems
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 border border-purple-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
      <div className="absolute w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-24 w-28 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-900 to-slate-950 border-2 border-purple-400/80 flex items-center justify-center shadow-[0_15px_30px_rgba(168,85,247,0.4)] transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
          <Cloud className="h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
        <span className="mt-3 text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest">
          Sovereign Cloud &amp; SRE
        </span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <Zap className="h-3.5 w-3.5 text-blue-600 mr-1.5" />
              <span className="font-semibold text-slate-900">Engineered for Precision &amp; Performance</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            Our Core <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Development Practices</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Most projects don't fit one box. We pull from AI/ML, web, mobile, UI/UX, QA, DevOps, and cybersecurity, and combine what your project actually needs. Nothing more.
          </p>
        </div>

        {/* ─── Core Services Cards Stack ─── */}
        <div className="mt-16 space-y-8">
          {fallbackServices.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/40 to-slate-100/30 p-6 sm:p-9 shadow-sm hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5"
            >
              {/* Top Gradient Hover Line */}
              <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left: Visual Illustration Box */}
                <div className="lg:col-span-5 h-full">
                  <Service3DVisual type={service.visualType} />
                </div>

                {/* Right: Detailed Content Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-bold text-blue-600 mt-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                      {service.tagline}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Projects Tag Row */}
                  <div>
                    <span className="block text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Deliverables
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.projects.map((proj) => (
                        <span
                          key={proj}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[11px] font-mono font-semibold text-blue-800 shadow-2xs"
                        >
                          <CheckCircle2 className="h-3 w-3 text-blue-600" />
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools We Use & Brand Logos */}
                  <div>
                    <p className="text-[11px] text-slate-500 mb-2 font-normal">
                      {service.toolsText}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {service.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-800 shadow-2xs hover:border-blue-400 transition-colors"
                        >
                          <img
                            src={`/icons/${tool.iconSlug}.svg`}
                            alt={tool.name}
                            className="h-3.5 w-3.5 object-contain opacity-90"
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
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors shadow-md group/btn"
                    >
                      <span>Explore Practice</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
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

