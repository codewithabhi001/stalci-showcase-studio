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
        { key: "slug", label: "Slug", render: (v: string) => <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)" }}>{v}</code> },
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
