import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/common/DetailPage";
import { PROJECTS_DATA } from "@/data/site-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS_DATA[params.slug];
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project?.title || "Case Study"} — STALCI` },
      {
        name: "description",
        content: loaderData?.project?.summary || "STALCI Production Case Study.",
      },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const allProjects = Object.values(PROJECTS_DATA);
  const related = allProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      tag: p.category,
      summary: p.summary,
      overview: p.overview,
    }))
    .slice(0, 2);

  return (
    <DetailPage
      entry={{
        slug: project.slug,
        title: project.title,
        tag: `${project.category} • ${project.client}`,
        summary: project.summary,
        overview: `${project.overview}\n\nChallenge: ${project.challenge}\n\nSolution & Architecture: ${project.solution} ${project.architecture}`,
        outcomes: project.impactMetrics,
        capabilities: project.capabilities,
        deliverables: project.deliverables,
        stack: project.stack,
      }}
      backLabel="All Case Studies"
      backTo="/projects"
      related={related}
      relatedBase="/projects"
      relatedLabel="Read Other Production Case Studies"
    />
  );
}
