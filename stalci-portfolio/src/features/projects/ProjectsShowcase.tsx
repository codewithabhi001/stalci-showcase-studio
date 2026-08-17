import { SectionHeading } from "@/components/brand/Brand";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { useProjectsQuery } from "@/hooks/queries/useProjectsQuery";
import { useUIStore } from "@/store/useUIStore";

export function ProjectsShowcase() {
  const { data: projects = [] } = useProjectsQuery();
  const selectedCategory = useUIStore((state) => state.selectedProjectCategory);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="bg-white py-14 sm:py-20 text-slate-900 border-t border-slate-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Proven Track Record"
          title="Explore Our Featured Case Studies"
          subtitle="We are proud of the mobile and web platforms we deliver. Here is a glimpse of the real results and architecture for businesses."
        />

        <ProjectFilters projects={projects} />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>

      <CaseStudyModal />
    </section>
  );
}
