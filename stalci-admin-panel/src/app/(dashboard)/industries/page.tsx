"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchIndustries, createIndustry, updateIndustry, deleteIndustry } from "@/lib/api";

export default function IndustriesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["industries"], queryFn: fetchIndustries });

  return (
    <CrudTable
      title="Industries Management"
      queryKey="industries"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Industry" },
        { key: "slug", label: "Slug", render: (v: string) => <code className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[12px] text-muted">{v}</code> },
        { key: "description", label: "Description" },
      ]}
      formFields={[
        { key: "name", label: "Industry Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "features", label: "Features (JSON)" },
      ]}
      onCreate={createIndustry}
      onUpdate={updateIndustry}
      onDelete={deleteIndustry}
    />
  );
}
