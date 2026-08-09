"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { Badge } from "@/components/ui/badge";
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from "@/lib/api";

export default function InvoicesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["invoices"], queryFn: fetchInvoices });

  return (
    <CrudTable
      title="Invoices"
      description="Track billing, payment status and outstanding revenue."
      queryKey="invoices"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "clientName", label: "Client" },
        { key: "amount", label: "Amount", render: (v: number) => <span className="font-semibold text-ink">${Number(v ?? 0).toLocaleString()}</span> },
        { key: "status", label: "Status", render: (v: string) => <Badge tone={v === "PAID" ? "success" : v === "CANCELLED" ? "danger" : "warning"}>{v}</Badge> },
        { key: "dueDate", label: "Due Date", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      formFields={[
        { key: "clientName", label: "Client Name" },
        { key: "amount", label: "Amount", type: "number" },
        { key: "status", label: "Status", type: "select", options: ["PENDING", "PAID", "CANCELLED"] },
        { key: "dueDate", label: "Due Date", type: "date" },
      ]}
      onCreate={createInvoice}
      onUpdate={updateInvoice}
      onDelete={deleteInvoice}
    />
  );
}
