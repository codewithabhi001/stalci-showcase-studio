import { Cpu, Bot, ShieldCheck, Database, Zap, Code, Terminal, Layers, Globe, Server } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Bot,
  Cloud: Server,
  Code,
  ShieldCheck,
  Database,
  Zap,
  Cpu,
  Terminal,
  Layers,
  Globe,
};

export function getLucideIcon(iconName?: string | null, defaultIcon = Cpu) {
  if (!iconName) return defaultIcon;
  return ICON_MAP[iconName] || defaultIcon;
}

export function parseJsonArray(input?: string | null): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [input];
  }
}

export function mapService(apiService: any) {
  const features = parseJsonArray(apiService.features);
  
  return {
    slug: apiService.slug,
    icon: getLucideIcon(apiService.icon, Cpu),
    title: apiService.name || apiService.title || "Service",
    tag: apiService.category || "Core Services",
    summary: apiService.shortDescription || apiService.description || "",
    overview: apiService.fullDescription || apiService.description || "",
    capabilities: features.length > 0 ? features : [apiService.description].filter(Boolean),
    deliverables: features.map(f => `Enterprise ${f}`),
    stack: apiService.technologies ? parseJsonArray(apiService.technologies) : ["TypeScript", "NestJS", "Next.js", "Docker"],
    outcomes: ["99.99% Availability", "Zero Downtime Deployments", "SOC2 Compliant Architecture"],
    price: apiService.price,
  };
}

export function mapProduct(apiProduct: any) {
  const features = parseJsonArray(apiProduct.features);

  return {
    slug: apiProduct.slug,
    icon: getLucideIcon(apiProduct.icon, Bot),
    title: apiProduct.name || apiProduct.title || "Product",
    tag: apiProduct.tag || "Enterprise Platform",
    summary: apiProduct.description || "",
    overview: apiProduct.description || "",
    capabilities: features.length > 0 ? features : [apiProduct.description].filter(Boolean),
    deliverables: ["Cloud Console Dashboard", "API Connectors", "24/7 Telemetry Alerting"],
    stack: ["Go", "React", "ClickHouse", "Kubernetes"],
    outcomes: ["-38% Cloud Cost Reduction", "Real-Time Incident Isolation", "Sub-second Query Speeds"],
    price: apiProduct.pricing,
  };
}

export function mapIndustry(apiIndustry: any) {
  const features = parseJsonArray(apiIndustry.features);

  return {
    slug: apiIndustry.slug,
    icon: getLucideIcon(apiIndustry.icon, ShieldCheck),
    title: apiIndustry.name || apiIndustry.title || "Industry",
    tag: "Target Domain",
    summary: apiIndustry.description || "",
    overview: apiIndustry.description || "",
    capabilities: features.length > 0 ? features : [apiIndustry.description].filter(Boolean),
    deliverables: ["Custom Compliance Framework", "Data Pipeline Connectors", "SLA Guarantees"],
    stack: ["PostgreSQL", "Kafka", "Python", "Rust"],
    outcomes: ["100% Audit Readiness", "Sub-50ms Processing Latency"],
  };
}
