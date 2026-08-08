"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchPages, createPage, updatePage, deletePage } from "@/lib/api";

export default function PagesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["pages"], queryFn: fetchPages });

  return (
    <CrudTable
      title="Pages Management"
      queryKey="pages"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug", render: (v: string) => <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)" }}>{v}</code> },
        { key: "published", label: "Status", render: (v: boolean) => <span className="px-2 py-1 text-xs rounded-full" style={{ background: v ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: v ? "#22c55e" : "#ef4444" }}>{v ? "Published" : "Draft"}</span> },
        { key: "createdAt", label: "Created", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      formFields={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      onCreate={createPage}
      onUpdate={updatePage}
      onDelete={deletePage}
    />
  );
}
