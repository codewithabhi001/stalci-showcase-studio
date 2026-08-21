import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/common/DetailPage";
import { SERVICES_DATA } from "@/data/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES_DATA[params.slug];
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service?.title || "Service"} — STALCI` },
      {
        name: "description",
        content: loaderData?.service?.summary || "STALCI Enterprise Engineering Services.",
      },
    ],
  }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const allServices = Object.values(SERVICES_DATA);
  const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <DetailPage
      entry={service}
      backLabel="All Services"
      backTo="/services"
      related={related}
      relatedBase="/services"
      relatedLabel="Explore Other Core Practices"
    />
  );
}
