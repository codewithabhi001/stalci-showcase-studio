import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/DetailPage";
import { industries as staticIndustries, findEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { mapIndustry } from "@/lib/api-mapper";

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const entry = findEntry(staticIndustries, params.slug);
    const title = entry ? `${entry.title} — STALCI Industry Expertise` : "Industry — STALCI";
    const description = entry?.summary ?? "Industry expertise by STALCI.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => <div className="p-20 text-center">Industry not found</div>,
});

function IndustryDetail() {
  const { slug } = Route.useParams();

  const { data: apiIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  const industries = apiIndustries && apiIndustries.length > 0
    ? apiIndustries.map(mapIndustry)
    : staticIndustries;

  const entry = industries.find((s) => s.slug === slug);
  if (!entry) throw notFound();

  return (
    <DetailPage
      entry={entry}
      backLabel="All industries"
      backTo="/#industries"
      related={industries.filter((s) => s.slug !== slug).slice(0, 3)}
      relatedBase="/industries"
      relatedLabel="Other industries"
    />
  );
}
