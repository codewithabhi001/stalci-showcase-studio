"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { Badge } from "@/components/ui/badge";
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
        { key: "slug", label: "Slug", render: (v: string) => <code className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[12px] text-muted">{v}</code> },
        { key: "published", label: "Status", render: (v: boolean) => <Badge tone={v ? "success" : "neutral"}>{v ? "Published" : "Draft"}</Badge> },
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
