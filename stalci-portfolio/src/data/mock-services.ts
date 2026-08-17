import { CoreService } from "@/types/service";

export const fallbackServices: CoreService[] = [
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
    iconColor: "text-purple-600",
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
    iconColor: "text-indigo-600",
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
    iconColor: "text-emerald-600",
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
    iconColor: "text-sky-600",
  },
];
