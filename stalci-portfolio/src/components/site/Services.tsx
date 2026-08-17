import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Cloud, Shield, Code2, Smartphone, CheckCircle2, ArrowUpRight, Activity, Zap, Server, Database } from "lucide-react";
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
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-[#0F1015] border border-zinc-800/80 flex items-center justify-center p-6 overflow-hidden shadow-inner group">
        <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-28 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-blue-500/80 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.5)] transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
            <span className="font-display font-black text-3xl text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              AI
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "web") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-[#0F1015] border border-zinc-800/80 flex items-center justify-center p-6 overflow-hidden shadow-inner group">
        <div className="absolute w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-32 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-indigo-500/80 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Code2 className="h-10 w-10 text-indigo-400" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-[#0F1015] border border-zinc-800/80 flex items-center justify-center p-6 overflow-hidden shadow-inner group">
        <div className="absolute w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-16 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-emerald-500/80 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Smartphone className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-[#0F1015] border border-zinc-800/80 flex items-center justify-center p-6 overflow-hidden shadow-inner group">
      <div className="absolute w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-24 w-28 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-purple-500/80 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
          <Cloud className="h-10 w-10 text-purple-400" />
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#000000] py-14 sm:py-20 text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── Header Section ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="flex justify-center">
            <BadgePill tone="dark" variant="gradient">
              <span className="font-semibold text-white">Engineered for Precision & Performance</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-[32px] font-bold text-white tracking-tight leading-[1.2]">
            Our Core <span className="font-extrabold text-copper-gradient">Development Services</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Most projects don't fit one box. We pull from AI/ML, web, mobile, UI/UX, QA, DevOps, and cybersecurity, and combine what your project actually needs. Nothing more.
          </p>
        </div>

        {/* ─── Core Services Cards Stack ─── */}
        <div className="mt-14 space-y-6">
          {fallbackServices.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-6 sm:p-8 shadow-sm hover:border-copper/40 hover:shadow-[0_0_30px_rgba(216,155,91,0.12)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left: 3D Visual Illustration Box */}
                <div className="lg:col-span-5 h-full">
                  <Service3DVisual type={service.visualType} />
                </div>

                {/* Right: Detailed Content Column */}
                <div className="lg:col-span-7 space-y-3.5">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-bold text-copper mt-0.5">
                      {service.tagline}
                    </p>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Projects Tag Row */}
                  <div>
                    <span className="block text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Projects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-medium text-neutral-300"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools We Use & Brand Logos */}
                  <div>
                    <p className="text-[11px] text-neutral-400 mb-2 font-normal">
                      {service.toolsText}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {service.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-neutral-200"
                        >
                          <img
                            src={`/icons/${tool.iconSlug}.svg`}
                            alt={tool.name}
                            className="h-3.5 w-3.5 object-contain invert opacity-90"
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
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-neutral-200 transition-colors shadow-xs"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
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

