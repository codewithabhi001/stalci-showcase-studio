"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchServices, createService, updateService, deleteService } from "@/lib/api";

export default function ServicesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["services"], queryFn: fetchServices });

  return (
    <CrudTable
      title="Services Management"
      queryKey="services"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Service Name" },
        { key: "slug", label: "Slug", render: (v: string) => <code className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[12px] text-muted">{v}</code> },
        { key: "icon", label: "Icon" },
        { key: "createdAt", label: "Created", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      formFields={[
        { key: "name", label: "Service Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon Name" },
      ]}
      onCreate={createService}
      onUpdate={updateService}
      onDelete={deleteService}
    />
  );
}
