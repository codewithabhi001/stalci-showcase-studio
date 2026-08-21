import type { LucideIcon } from "lucide-react";

export interface ToolItem {
  name: string;
  iconSlug?: string;
}

export interface MetricOutcome {
  label: string;
  value: string;
}

export interface CapabilityItem {
  title: string;
  copy?: string;
  description?: string;
}

export interface ServiceEntry {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  overview: string;
  tag: string;
  icon?: LucideIcon | any;
  outcomes: MetricOutcome[];
  capabilities: CapabilityItem[];
  deliverables: string[];
  tools: (string | ToolItem)[];
  projects: string[];
  visualType?: "ai" | "web" | "mobile" | "cloud" | "data" | "security";
}

export interface ProductEntry {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  overview: string;
  pricing: string;
  icon: string;
  outcomes: MetricOutcome[];
  features: string[];
  capabilities: CapabilityItem[];
  deliverables: string[];
  stack: string[];
}

export interface IndustryEntry {
  slug: string;
  title: string;
  tagline: string;
  tag: string;
  summary: string;
  overview: string;
  icon?: LucideIcon | any;
  outcomes: MetricOutcome[];
  challenges: string[];
  solutions: string[];
  capabilities: CapabilityItem[];
  deliverables: string[];
  compliance: string[];
}

export interface ProjectEntry {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  architecture: string;
  image: string;
  category: string;
  impactMetrics: MetricOutcome[];
  outcomes: MetricOutcome[];
  capabilities: CapabilityItem[];
  deliverables: string[];
  stack: string[];
  featured?: boolean;
}

export interface BlogPostEntry {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  image: string;
}

export interface TestimonialEntry {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
  verified: boolean;
}

export interface JobEntry {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

export interface DetailEntry {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  overview: string;
  icon?: any;
  outcomes?: MetricOutcome[];
  capabilities?: CapabilityItem[];
  deliverables?: string[];
  tools?: (string | ToolItem)[];
  stack?: string[];
}
