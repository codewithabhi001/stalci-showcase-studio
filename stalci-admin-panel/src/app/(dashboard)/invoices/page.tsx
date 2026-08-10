"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchInvoices,
  fetchClients,
  fetchProjects,
  fetchInvoiceTemplates,
  createInvoice,
  updateInvoice,
  duplicateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import { InvoicePreviewModal } from "@/components/InvoicePreviewModal";
import {
  Receipt,
  Plus,
  Search,
  Printer,
  Copy,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Building,
  DollarSign,
  Layers,
  ArrowRight,
  Send,
  Mail,
} from "lucide-react";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export default function InvoicesAdmin() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any | null>(null);
  const [previewingInvoice, setPreviewingInvoice] = useState<any | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientId: "",
    projectId: "",
    templateId: "",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: "PENDING",
    currency: "USD",
    discount: 0,
    taxRate: 0,
    notes: "Payment is due within 30 days of invoice date. Electronic transfer preferred.",
    terms: "Net 30 Days. Late fees of 1.5% apply to past due balances.",
    paymentDetails: "Wire Transfer: Silicon Valley Bank • Routing: 12100024 • Acct: ****8921",
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "Sprint Milestone Engineering & Architecture", quantity: 1, unitPrice: 25000, amount: 25000 },
  ]);

  // Queries
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoices(),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const { data: templates = [] } = useQuery({
    queryKey: ["invoice-templates"],
    queryFn: fetchInvoiceTemplates,
  });

  // Calculate Subtotals
  const calculatedSubtotal = lineItems.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
  const discountVal = Number(formData.discount) || 0;
  const taxRateVal = Number(formData.taxRate) || 0;
  const calculatedTaxAmount = Math.max(0, calculatedSubtotal - discountVal) * (taxRateVal / 100);
  const calculatedTotal = Math.max(0, calculatedSubtotal - discountVal + calculatedTaxAmount);

  // Line item handlers
  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems];
    const item = { ...updated[index], [field]: value };
    if (field === "quantity" || field === "unitPrice") {
      const q = field === "quantity" ? Number(value) : item.quantity;
      const p = field === "unitPrice" ? Number(value) : item.unitPrice;
      item.amount = q * p;
    }
    updated[index] = item;
    setLineItems(updated);
  };

  const addItemRow = () => {
    setLineItems([
      ...lineItems,
      { description: "Additional Scope / Service", quantity: 1, unitPrice: 5000, amount: 5000 },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (lineItems.length <= 1) {
      toast.error("Invoice must contain at least one line item");
      return;
    }
    setLineItems(lineItems.filter((_, idx) => idx !== index));
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Invoice created successfully");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to create invoice"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Invoice updated");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update invoice"),
  });

  const duplicateMutation = useMutation({
    mutationFn: duplicateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Invoice duplicated as draft");
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateInvoiceStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Invoice status updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Invoice deleted");
      setDeletingInvoiceId(null);
    },
  });

  const resetForm = () => {
    const nextInvNumber = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`;
    setFormData({
      invoiceNumber: nextInvNumber,
      clientId: clients[0]?.id ? String(clients[0].id) : "",
      projectId: "",
      templateId: templates[0]?.id ? String(templates[0].id) : "",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      status: "PENDING",
      currency: "USD",
      discount: 0,
      taxRate: 0,
      notes: "Payment is due within 30 days of invoice date. Electronic transfer preferred.",
      terms: "Net 30 Days. Late fees of 1.5% apply to past due balances.",
      paymentDetails: "Wire Transfer: Silicon Valley Bank • Routing: 12100024 • Acct: ****8921",
    });
    setLineItems([
      { description: "Sprint Milestone Engineering & Architecture", quantity: 1, unitPrice: 25000, amount: 25000 },
    ]);
    setEditingInvoice(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (inv: any) => {
    setEditingInvoice(inv);
    setFormData({
      invoiceNumber: inv.invoiceNumber || "",
      clientId: inv.clientId ? String(inv.clientId) : "",
      projectId: inv.projectId ? String(inv.projectId) : "",
      templateId: inv.templateId ? String(inv.templateId) : "",
      issueDate: inv.issueDate ? new Date(inv.issueDate).toISOString().slice(0, 10) : "",
      dueDate: inv.dueDate ? new Date(inv.dueDate).toISOString().slice(0, 10) : "",
      status: inv.status || "PENDING",
      currency: inv.currency || "USD",
      discount: inv.discount || 0,
      taxRate: inv.taxRate || 0,
      notes: inv.notes || "",
      terms: inv.terms || "",
      paymentDetails: inv.paymentDetails || "",
    });

    if (inv.items && inv.items.length > 0) {
      setLineItems(
        inv.items.map((it: any) => ({
          description: it.description,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          amount: it.amount,
        }))
      );
    } else {
      setLineItems([
        { description: "General Software Delivery", quantity: 1, unitPrice: inv.total || 0, amount: inv.total || 0 },
      ]);
    }

    setIsFormOpen(true);
  };

  const handleQuickSend = (inv: any) => {
    const client = inv.client || {};
    const sym = inv.currency === "EUR" ? "€" : inv.currency === "GBP" ? "£" : "$";
    const subject = encodeURIComponent(`Invoice ${inv.invoiceNumber} from STALCI Technologies`);
    const body = encodeURIComponent(
      `Dear ${client.name || client.company || "Client"},\n\nPlease find your billing statement for invoice ${
        inv.invoiceNumber
      } with a total due of ${sym}${Number(inv.total || 0).toLocaleString()} ${inv.currency || "USD"}.\n\nDue Date: ${new Date(
        inv.dueDate || Date.now()
      ).toLocaleDateString()}\n\nPayment Details: ${
        inv.paymentDetails || "SWIFT Wire Transfer / Silicon Valley Bank"
      }\n\nThank you for partnering with STALCI.\n\nBest regards,\nSTALCI Billing Operations`
    );

    window.open(`mailto:${client.email || ""}?subject=${subject}&body=${body}`, "_blank");
    toast.success("Opened email client with invoice details!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId) {
      toast.error("Please select a client for this invoice");
      return;
    }

    const payload = {
      ...formData,
      subtotal: calculatedSubtotal,
      taxAmount: calculatedTaxAmount,
      total: calculatedTotal,
      items: lineItems,
    };

    if (editingInvoice) {
      updateMutation.mutate({ id: editingInvoice.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredInvoices = invoices.filter((inv: any) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.client?.company && inv.client.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inv.client?.name && inv.client.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoiced = invoices.reduce((acc: number, i: any) => acc + (Number(i.total) || 0), 0);
  const totalPaid = invoices.filter((i: any) => i.status === "PAID").reduce((acc: number, i: any) => acc + (Number(i.total) || 0), 0);
  const totalPending = invoices.filter((i: any) => i.status === "PENDING" || i.status === "SENT").reduce((acc: number, i: any) => acc + (Number(i.total) || 0), 0);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Finance & Billing</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Invoicing & Statements</h1>
          <p className="mt-1 text-sm text-muted">
            Create itemized invoices, switch between HTML templates, preview, print, and track settlements.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Create New Invoice
        </Button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Total Invoiced</span>
          <p className="mt-2 text-2xl font-bold text-ink">${totalInvoiced.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Collected Revenue</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Awaiting Payment</span>
          <p className="mt-2 text-2xl font-bold text-amber-600">${totalPending.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Active Invoices</span>
          <p className="mt-2 text-2xl font-bold text-ink">{invoices.length}</p>
        </div>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search by invoice # or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field pl-9"
          />
        </div>

        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {["ALL", "PENDING", "SENT", "PAID", "OVERDUE", "DRAFT", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                statusFilter === st
                  ? "bg-ink text-white"
                  : "bg-surface border border-line text-muted hover:text-ink"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-line text-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Client Account</th>
                <th className="px-5 py-3.5">Project</th>
                <th className="px-5 py-3.5">Amount Due</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Due Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredInvoices.map((inv: any) => (
                <tr key={inv.id} className="hover:bg-canvas/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-ink">{inv.invoiceNumber}</span>
                      {inv.template?.name && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-canvas border border-line text-muted">
                          {inv.template.layoutType || "MODERN"}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-ink text-sm">
                      {inv.client?.company || inv.client?.name || "Client"}
                    </div>
                    <div className="text-muted text-[11px] mt-0.5">{inv.client?.email}</div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-ink-2">
                      {inv.project?.title || "Direct Billing"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-mono font-bold text-sm text-ink">
                      {inv.currency === "EUR" ? "€" : inv.currency === "GBP" ? "£" : "$"}
                      {Number(inv.total || 0).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted block">
                      {inv.items?.length || 1} line item(s)
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={inv.status}
                      onChange={(e) =>
                        statusMutation.mutate({ id: inv.id, status: e.target.value })
                      }
                      className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                        inv.status === "PAID"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : inv.status === "SENT"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : inv.status === "PENDING"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-50 text-slate-800 border-slate-200"
                      }`}
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="SENT">SENT</option>
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="OVERDUE">OVERDUE</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-mono text-xs text-ink">
                      {new Date(inv.dueDate).toLocaleDateString()}
                    </div>
                    <span className="text-[10px] text-muted">
                      Issued: {new Date(inv.issueDate || inv.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewingInvoice(inv)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-copper hover:bg-copper-wash transition-colors"
                        title="Live Interactive Invoice Preview & Print"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleQuickSend(inv)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-copper-deep hover:bg-copper-wash transition-colors"
                        title="Send Invoice to Client via Email"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateMutation.mutate(inv.id)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                        title="Duplicate Invoice"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(inv)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                        title="Edit Invoice"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingInvoiceId(inv.id)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvoices.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No invoice records found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Featured Invoice Creator & Editor Drawer */}
      <Drawer
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingInvoice ? "Edit Invoice" : "Create New Itemized Invoice"}
        width="w-full max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Invoice Number *</label>
              <input
                type="text"
                required
                placeholder="INV-2026-005"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Client Account *</label>
              <select
                required
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="field"
              >
                <option value="">-- Select Client --</option>
                {clients.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.company ? `${c.company} (${c.name})` : c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Linked Project</label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="field"
              >
                <option value="">-- Optional Project Link --</option>
                {projects.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Template Style</label>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                className="field text-xs"
              >
                <option value="">Default (Modern)</option>
                {templates.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="field text-xs font-mono"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Issue Date</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="field text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="field text-xs"
              />
            </div>
          </div>

          {/* Dynamic Itemized Table */}
          <div className="p-4 rounded-xl bg-canvas border border-line space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Receipt className="h-4 w-4 text-copper" />
                Line Items & Deliverables
              </h4>
              <Button type="button" variant="secondary" onClick={addItemRow} className="text-xs h-7 gap-1">
                <Plus className="h-3 w-3" /> Add Item
              </Button>
            </div>

            <div className="space-y-2">
              {lineItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Description of service / deliverable"
                    value={item.description}
                    onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                    className="field flex-1 text-xs"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                    className="field w-16 text-xs text-center"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                    className="field w-28 text-xs font-mono"
                  />
                  <div className="w-28 text-right font-mono font-bold text-xs text-ink self-center">
                    ${Number(item.amount || 0).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    className="p-2 text-muted hover:text-red-500 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Calculations Summary */}
            <div className="pt-3 border-t border-line flex flex-col items-end gap-1.5 text-xs">
              <div className="flex justify-between w-64 text-muted">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-ink">${calculatedSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between w-64 gap-2">
                <span className="text-muted">Discount ($):</span>
                <input
                  type="number"
                  min="0"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  className="field w-24 h-7 text-xs font-mono text-right"
                />
              </div>
              <div className="flex items-center justify-between w-64 gap-2">
                <span className="text-muted">Tax Rate (%):</span>
                <input
                  type="number"
                  min="0"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                  className="field w-24 h-7 text-xs font-mono text-right"
                />
              </div>
              <div className="flex justify-between w-64 pt-2 border-t border-line text-sm font-bold text-ink">
                <span>Total Amount:</span>
                <span className="font-mono text-copper-deep">${calculatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Payment Instructions</label>
              <textarea
                rows={2}
                value={formData.paymentDetails}
                onChange={(e) => setFormData({ ...formData, paymentDetails: e.target.value })}
                className="field text-xs font-mono resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Notes & Terms</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="field text-xs resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingInvoice ? "Save Invoice Changes" : "Create & Issue Invoice"}
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Live Preview Modal */}
      {previewingInvoice && (
        <InvoicePreviewModal
          invoice={previewingInvoice}
          templates={templates}
          open={!!previewingInvoice}
          onClose={() => setPreviewingInvoice(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingInvoiceId}
        onClose={() => setDeletingInvoiceId(null)}
        onConfirm={() => deletingInvoiceId && deleteMutation.mutate(deletingInvoiceId)}
        title="Delete Invoice"
        description="Are you sure you want to permanently delete this invoice record? All line items and tracking data will be removed."
        confirmText="Yes, Delete Invoice"
        danger
      />
    </div>
  );
}
