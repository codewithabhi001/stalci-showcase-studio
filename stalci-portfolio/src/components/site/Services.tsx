import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BadgePill } from "./Brand";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";

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
    title: "Sovereign AI & ML Development",
    tagline: "INTELLIGENCE, ENGINEERED FOR PRIVACY & SCALE.",
    description:
      "We engineer custom domain-specific AI models, private LLM agents, and high-performance vector retrieval pipelines within isolated private cloud enclaves with zero data leakage.",
    projects: ["Private RAG Vector Engines", "Autonomous Agent Swarms", "Domain Model Fine-Tuning"],
    toolsText: "Python, PyTorch, LangChain, pgvector, and vLLM.",
    tools: [
      { name: "Python", iconSlug: "python" },
      { name: "PyTorch", iconSlug: "pytorch" },
      { name: "LangChain", iconSlug: "langchain" },
    ],
    visualType: "ai",
  },
  {
    slug: "software-engineering",
    title: "Enterprise Web & Platform Engineering",
    tagline: "ULTRA-FAST, RESILIENT WEB SYSTEMS.",
    description:
      "Mission-critical web applications built on React 19, Next.js 16, and strictly typed TypeScript. High-throughput SaaS dashboards, financial portals, and high-volume B2B systems.",
    projects: ["Multi-Tenant SaaS", "B2B Wholesale Portals", "Real-Time Trading Engines"],
    toolsText: "React 19, Next.js 16, TypeScript, Node.js, and Tailwind CSS.",
    tools: [
      { name: "React", iconSlug: "react" },
      { name: "Next.js", iconSlug: "nextdotjs" },
      { name: "TypeScript", iconSlug: "typescript" },
    ],
    visualType: "web",
  },
  {
    slug: "mobility",
    title: "High-Performance Mobile Platforms",
    tagline: "NATIVE 120 FPS FLUIDITY, EVERYWHERE.",
    description:
      "iOS and Android applications engineered for fluid 120 FPS responsiveness, offline-first SQLite sync, biometric security hardware enclaves, and enterprise BLE integrations.",
    projects: ["Biometric FinTech Apps", "Offline Field Logistics", "On-Demand Mobility"],
    toolsText: "Swift, Kotlin, React Native, and WebSockets.",
    tools: [
      { name: "Swift", iconSlug: "swift" },
      { name: "Kotlin", iconSlug: "kotlin" },
      { name: "React Native", iconSlug: "react" },
    ],
    visualType: "mobile",
  },
  {
    slug: "cloud-devops",
    title: "Multi-Cloud & Zero-Trust DevOps",
    tagline: "DETERMINISTIC 99.99% AVAILABILITY.",
    description:
      "Automated multi-region cloud architecture, declarative Terraform infrastructure-as-code, zero-downtime blue/green deployments, and continuous cloud cost optimization.",
    projects: ["Kubernetes EKS Clusters", "Automated Blue/Green CI/CD", "FinOps Cloud Cost Pruning"],
    toolsText: "AWS, Kubernetes, Terraform, and Cloudflare.",
    tools: [
      { name: "AWS", iconSlug: "aws" },
      { name: "Kubernetes", iconSlug: "kubernetes" },
      { name: "Terraform", iconSlug: "terraform" },
    ],
    visualType: "cloud",
  },
];

function ServiceVisualImage({ type }: { type: CoreService["visualType"] }) {
  let imagePath = "";
  let imageAlt = "";
  
  if (type === "ai") {
    imagePath = "/images/services/ai_core.jpg";
    imageAlt = "Sovereign AI & ML Engineering";
  } else if (type === "web") {
    imagePath = "/images/services/web_platform.jpg";
    imageAlt = "Enterprise Web & Platform Engineering";
  } else if (type === "mobile") {
    imagePath = "/images/services/mobile_platform.jpg";
    imageAlt = "High-Performance Mobile Platforms";
  } else {
    imagePath = "/images/services/cloud_platform.jpg";
    imageAlt = "Multi-Cloud & Zero-Trust DevOps";
  }

  return (
    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-200/90 shadow-2xs bg-zinc-100 group-hover:border-zinc-300 transition-colors duration-300">
      <img
        src={imagePath}
        alt={imageAlt}
        className="w-full h-full object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export function Services() {
  const { data: apiServices } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  // Always enrich and enforce the 4 flagship pillars with proper visual assets and capabilities
  const servicesList: CoreService[] = fallbackServices.map((fallback) => {
    const matchingApi = apiServices?.find(
      (s: any) =>
        s.slug === fallback.slug ||
        s.title?.toLowerCase().includes(fallback.visualType) ||
        (fallback.visualType === "ai" && s.title?.toLowerCase().includes("ai")) ||
        (fallback.visualType === "web" && s.title?.toLowerCase().includes("software")) ||
        (fallback.visualType === "mobile" && s.title?.toLowerCase().includes("mobile")) ||
        (fallback.visualType === "cloud" && s.title?.toLowerCase().includes("cloud"))
    );

    if (!matchingApi) return fallback;

    return {
      ...fallback,
      title: matchingApi.title || fallback.title,
      description: matchingApi.description || fallback.description,
      tagline: matchingApi.tagline ? matchingApi.tagline.toUpperCase() : fallback.tagline,
      projects:
        Array.isArray(matchingApi.projects) && matchingApi.projects.length > 0
          ? matchingApi.projects
          : fallback.projects,
      tools:
        Array.isArray(matchingApi.tools) && matchingApi.tools.length > 0
          ? matchingApi.tools
          : fallback.tools,
    };
  });

  return (
    <section id="services" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative isolate overflow-hidden">
      {/* Subtle Background SVG Grid */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#F4F6FB_1px,transparent_1px),linear-gradient(to_bottom,#F4F6FB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-80" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-12">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Engineered for Precision &amp; Scale</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[32px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Our Core <span className="font-extrabold text-black">Development Practices</span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Sovereign AI, cloud architectures, native mobile apps, and enterprise platforms engineered to production standard.
          </p>
        </div>

        {/* ─── Standard 4-Column Grid (Image 1 Quality Guaranteed) ─── */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-2xl border border-zinc-200/90 bg-[#FAFAFC] p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-3.5">
                {/* Visual Image */}
                <ServiceVisualImage type={service.visualType} />

                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                    {service.tagline}
                  </span>
                  <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-zinc-950 tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Delivered Capabilities */}
                {service.projects && Array.isArray(service.projects) && service.projects.length > 0 && (
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1">
                      {service.projects.slice(0, 3).map((proj) => (
                        <span
                          key={proj}
                          className="rounded-md border border-zinc-200/80 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-700 shadow-2xs"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row */}
              <div className="mt-4 pt-3.5 border-t border-zinc-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {(service.tools || []).slice(0, 3).map((t) => (
                    <div
                      key={t.name || t.iconSlug}
                      title={t.name}
                      className="h-5 w-5 rounded bg-white border border-zinc-200 p-0.5 flex items-center justify-center shadow-2xs"
                    >
                      <img
                        src={`/icons/${t.iconSlug || t.name?.toLowerCase()}.svg`}
                        alt={t.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                </div>

                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 group-hover:text-blue-600 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
