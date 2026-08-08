import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/DetailPage";
import { products, findEntry } from "@/lib/site-data";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const entry = findEntry(products, params.slug);
    const title = entry ? `${entry.title} — STALCI Products` : "Product — STALCI";
    const description = entry?.summary ?? "Products engineered by STALCI.";
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
  component: ProductDetail,
  notFoundComponent: () => <div className="p-20 text-center">Product not found</div>,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const entry = findEntry(products, slug);
  if (!entry) throw notFound();

  return (
    <DetailPage
      entry={entry}
      backLabel="All products"
      backTo="/#products"
      related={products.filter((s) => s.slug !== slug).slice(0, 3)}
      relatedBase="/products"
      relatedLabel="Other products"
    />
  );
}
