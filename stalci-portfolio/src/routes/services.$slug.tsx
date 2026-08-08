import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/DetailPage";
import { services as staticServices, findEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";
import { mapService } from "@/lib/api-mapper";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const entry = findEntry(staticServices, params.slug);
    const title = entry ? `${entry.title} — STALCI IT Services` : "Service — STALCI";
    const description = entry?.summary ?? "Enterprise IT services by STALCI.";
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
  component: ServiceDetail,
  notFoundComponent: () => <div className="p-20 text-center">Service not found</div>,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  
  const { data: apiServices } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const services = apiServices && apiServices.length > 0
    ? apiServices.map(mapService)
    : staticServices;

  const entry = services.find((s) => s.slug === slug);
  if (!entry) throw notFound();

  return (
    <DetailPage
      entry={entry}
      backLabel="All services"
      backTo="/#services"
      related={services.filter((s) => s.slug !== slug).slice(0, 3)}
      relatedBase="/services"
      relatedLabel="Other services"
    />
  );
}
