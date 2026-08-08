"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api";

export default function ProductsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  return (
    <CrudTable
      title="Products Management"
      queryKey="products"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Product" },
        { key: "slug", label: "Slug", render: (v: string) => <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)" }}>{v}</code> },
        { key: "pricing", label: "Pricing" },
        { key: "createdAt", label: "Created", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      formFields={[
        { key: "name", label: "Product Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "pricing", label: "Pricing" },
      ]}
      onCreate={createProduct}
      onUpdate={updateProduct}
      onDelete={deleteProduct}
    />
  );
}
