import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { CaseStudyItem } from "@/types/project";
import { featuredCaseStudies } from "@/data/mock-projects";

export function useProjectsQuery() {
  return useQuery<CaseStudyItem[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const apiProjects = await fetchProjects();
      if (!apiProjects || apiProjects.length === 0) {
        return featuredCaseStudies;
      }

      return apiProjects.map((p: any) => {
        let metricsArr = [];
        try {
          metricsArr = typeof p.metrics === "string" ? JSON.parse(p.metrics) : p.metrics || [];
        } catch {
          metricsArr = [{ label: "Progress", value: `${p.progress || 100}%` }];
        }

        let techArr = [];
        try {
          techArr = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies || [];
        } catch {
          techArr = ["TypeScript", "Next.js", "PostgreSQL"];
        }

        return {
          id: String(p.id || p.slug),
          title: p.title,
          client: p.client?.company || p.client?.name || "Enterprise Client",
          category: p.category?.includes("Mobile")
            ? "Mobile Apps"
            : p.category?.includes("AI")
            ? "AI Systems"
            : "Web Platforms",
          summary: p.description || "",
          fullDescription: p.fullDescription || p.description || "",
          imageUrl:
            p.imageUrl || "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80",
          liveUrl: p.liveUrl,
          metrics: metricsArr,
          technologies: techArr,
          clientFeedback: p.clientFeedback,
        };
      });
    },
    initialData: featuredCaseStudies,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
