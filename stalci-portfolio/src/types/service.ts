export type ServiceVisualType = "ai" | "web" | "mobile" | "cloud";

export interface ServiceTool {
  name: string;
  iconSlug: string;
}

export interface CoreService {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  projects: string[];
  toolsText: string;
  tools: ServiceTool[];
  visualType: ServiceVisualType;
  iconColor: string;
}
