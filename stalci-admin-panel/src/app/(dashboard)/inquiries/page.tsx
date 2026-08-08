"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchInquiries, updateInquiry, deleteInquiry } from "@/lib/api";

export default function InquiriesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["inquiries"], queryFn: fetchInquiries });

  const statusColors: Record<string, { bg: string; color: string }> = {
    NEW: { bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
    IN_PROGRESS: { bg: "rgba(234,179,8,0.1)", color: "#eab308" },
    RESOLVED: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
  };

  return (
    <CrudTable
      title="Client Inquiries"
      queryKey="inquiries"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "message", label: "Message", render: (v: string) => <span className="truncate block max-w-xs">{v}</span> },
        { key: "status", label: "Status", render: (v: string) => { const s = statusColors[v] || statusColors.NEW; return <span className="px-2 py-1 text-xs rounded-full" style={{ background: s.bg, color: s.color }}>{v}</span>; } },
        { key: "createdAt", label: "Received", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      formFields={[
        { key: "status", label: "Status", type: "select", options: ["NEW", "IN_PROGRESS", "RESOLVED"] },
      ]}
      onUpdate={updateInquiry}
      onDelete={deleteInquiry}
    />
  );
}
