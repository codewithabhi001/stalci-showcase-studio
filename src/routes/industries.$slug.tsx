import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/DetailPage";
import { industries, findEntry } from "@/lib/site-data";

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const entry = findEntry(industries, params.slug);
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
  const entry = findEntry(industries, slug);
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
