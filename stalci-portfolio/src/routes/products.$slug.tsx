import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/DetailPage";
import { products as staticProducts, findEntry } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { mapProduct } from "@/lib/api-mapper";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const entry = findEntry(staticProducts, params.slug);
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

  const { data: apiProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = apiProducts && apiProducts.length > 0
    ? apiProducts.map(mapProduct)
    : staticProducts;

  const entry = products.find((s) => s.slug === slug);
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
