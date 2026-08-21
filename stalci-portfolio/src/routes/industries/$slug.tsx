import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/common/DetailPage";
import { INDUSTRIES_DATA } from "@/data/site-data";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES_DATA[params.slug];
    if (!industry) {
      throw notFound();
    }
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.industry?.title || "Industry"} — STALCI` },
      {
        name: "description",
        content: loaderData?.industry?.summary || "STALCI Enterprise Industry Vertical Solutions.",
      },
    ],
  }),
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { industry } = Route.useLoaderData();
  const allIndustries = Object.values(INDUSTRIES_DATA);
  const related = allIndustries
    .filter((i) => i.slug !== industry.slug)
    .map((i) => ({
      slug: i.slug,
      title: i.title,
      tag: i.tag,
      summary: i.summary,
      overview: i.overview,
      icon: i.icon,
    }))
    .slice(0, 3);

  return (
    <DetailPage
      entry={{
        slug: industry.slug,
        title: industry.title,
        tag: industry.tag,
        summary: industry.summary,
        overview: industry.overview,
        icon: industry.icon,
        outcomes: industry.outcomes,
        capabilities: industry.capabilities,
        deliverables: industry.deliverables,
        tools: industry.compliance,
      }}
      backLabel="All Industry Solutions"
      backTo="/industries"
      related={related}
      relatedBase="/industries"
      relatedLabel="Explore Other Industry Verticals"
    />
  );
}
