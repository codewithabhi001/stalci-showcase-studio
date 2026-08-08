"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from "@/lib/api";

export default function InvoicesAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["invoices"], queryFn: fetchInvoices });

  const statusColors: Record<string, { bg: string; color: string }> = {
    PENDING: { bg: "rgba(234,179,8,0.1)", color: "#eab308" },
    PAID: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
    CANCELLED: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
  };

  return (
    <CrudTable
      title="Invoices Management"
      queryKey="invoices"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "clientName", label: "Client" },
        { key: "amount", label: "Amount", render: (v: number) => <span style={{ color: "var(--copper)" }}>${v.toLocaleString()}</span> },
        { key: "status", label: "Status", render: (v: string) => { const s = statusColors[v] || statusColors.PENDING; return <span className="px-2 py-1 text-xs rounded-full" style={{ background: s.bg, color: s.color }}>{v}</span>; } },
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
