export type ProjectCategory = "All" | "Mobile Apps" | "Web Platforms" | "Enterprise IT" | "AI Systems";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  category: "Mobile Apps" | "Web Platforms" | "Enterprise IT" | "AI Systems";
  summary: string;
  fullDescription: string;
  imageUrl: string;
  liveUrl?: string;
  metrics: ProjectMetric[];
  technologies: string[];
  clientFeedback?: string;
}
