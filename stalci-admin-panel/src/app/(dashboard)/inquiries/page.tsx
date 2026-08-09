"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { Badge } from "@/components/ui/badge";
import { fetchInquiries, updateInquiry, deleteInquiry } from "@/lib/api";

export default function InquiriesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["inquiries"], queryFn: fetchInquiries });

  return (
    <CrudTable
      title="Client Inquiries"
      description="Incoming leads and contact requests from the public site."
      queryKey="inquiries"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "message", label: "Message", render: (v: string) => <span className="truncate block max-w-xs">{v}</span> },
        { key: "status", label: "Status", render: (v: string) => <Badge tone={v === "RESOLVED" ? "success" : v === "IN_PROGRESS" ? "warning" : "info"}>{v}</Badge> },
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
