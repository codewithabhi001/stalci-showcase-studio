import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/common/DetailPage";
import { PRODUCTS_DATA } from "@/data/site-data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS_DATA[params.slug];
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product?.name || "Product"} — STALCI` },
      {
        name: "description",
        content: loaderData?.product?.summary || "STALCI Production Accelerator Product Specs.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const allProducts = Object.values(PRODUCTS_DATA);
  const related = allProducts
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({
      slug: p.slug,
      title: p.name,
      tag: p.tag,
      summary: p.summary,
      overview: p.overview,
    }))
    .slice(0, 2);

  return (
    <DetailPage
      entry={{
        slug: product.slug,
        title: product.name,
        tag: product.tag,
        summary: product.summary,
        overview: product.overview,
        outcomes: product.outcomes,
        capabilities: product.capabilities,
        deliverables: product.deliverables,
        stack: product.stack,
      }}
      backLabel="All Accelerators"
      backTo="/products"
      related={related}
      relatedBase="/products"
      relatedLabel="Explore Other Accelerators"
    />
  );
}
