"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchInvoiceTemplates,
  createInvoiceTemplate,
  updateInvoiceTemplate,
  deleteInvoiceTemplate,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import { InvoicePreviewModal } from "@/components/InvoicePreviewModal";
import {
  FileCode,
  Plus,
  Eye,
  CheckCircle2,
  Edit2,
  Trash2,
  Sparkles,
  Palette,
  Check,
} from "lucide-react";

export default function InvoiceTemplatesPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<number | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    layoutType: "MODERN",
    primaryColor: "#D89B5B",
    headerText: "INVOICE / BILLING STATEMENT",
    footerNotes: "Thank you for partnering with STALCI.",
    isDefault: false,
    isActive: true,
  });

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["invoice-templates"],
    queryFn: fetchInvoiceTemplates,
  });

  const createMutation = useMutation({
    mutationFn: createInvoiceTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast.success("Invoice template created");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to create template"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateInvoiceTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast.success("Invoice template updated");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update template"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInvoiceTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast.success("Invoice template deleted");
      setDeletingTemplateId(null);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete template"),
  });

  const setDefaultMutation = useMutation({
    mutationFn: (id: number) => updateInvoiceTemplate(id, { isDefault: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast.success("Default template updated");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      layoutType: "MODERN",
      primaryColor: "#D89B5B",
      headerText: "INVOICE / BILLING STATEMENT",
      footerNotes: "Thank you for partnering with STALCI.",
      isDefault: false,
      isActive: true,
    });
    setEditingTemplate(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tpl: any) => {
    setEditingTemplate(tpl);
    setFormData({
      name: tpl.name || "",
      slug: tpl.slug || "",
      description: tpl.description || "",
      layoutType: tpl.layoutType || "MODERN",
      primaryColor: tpl.primaryColor || "#D89B5B",
      headerText: tpl.headerText || "INVOICE",
      footerNotes: tpl.footerNotes || "",
      isDefault: Boolean(tpl.isDefault),
      isActive: Boolean(tpl.isActive),
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Template name is required");
      return;
    }
    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const sampleMockInvoice = {
    invoiceNumber: "INV-2026-SAMPLE",
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "PAID",
    currency: "USD",
    subtotal: 75000,
    discount: 0,
    taxRate: 8.5,
    taxAmount: 6375,
    total: 81375,
    client: {
      name: "Acme Corporation",
      company: "Acme Enterprises Inc.",
      email: "billing@acme.com",
      address: "100 Innovation Way, Suite 400, New York, NY",
    },
    items: [
      { description: "Multi-Cloud Kubernetes Architecture & FinOps Optimization", quantity: 1, unitPrice: 45000, amount: 45000 },
      { description: "Zero-Trust Mesh & Identity Modernization Programme", quantity: 1, unitPrice: 30000, amount: 30000 },
    ],
    notes: "Payment received in full. Thank you for your enterprise partnership.",
    paymentDetails: "SWIFT Wire Transfer • Silicon Valley Bank",
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Finance & Design</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Invoice Templates</h1>
          <p className="mt-1 text-sm text-muted">
            Manage HTML/CSS billing templates. Customize themes, header banners, and brand accents.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl: any) => {
          const isModern = tpl.slug === "modern-clean" || tpl.layoutType === "MODERN";
          const isMinimal = tpl.slug === "minimalist-slate" || tpl.layoutType === "MINIMAL";
          const isCorporate = tpl.slug === "corporate-navy" || tpl.layoutType === "CORPORATE";
          const isLuxury = tpl.slug === "luxury-obsidian-gold" || tpl.layoutType === "PREMIUM";

          return (
            <div
              key={tpl.id}
              className={`rounded-2xl border bg-surface p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                tpl.isDefault ? "border-copper ring-1 ring-copper/30" : "border-line"
              }`}
            >
              <div>
                {/* Visual Thumbnail representation */}
                <div
                  onClick={() => setPreviewTemplate(tpl)}
                  className={`h-40 rounded-xl border p-4 mb-4 cursor-pointer relative overflow-hidden flex flex-col justify-between transition-transform hover:scale-[1.01] ${
                    isLuxury
                      ? "bg-[#0E131F] border-amber-500/30 text-white"
                      : isCorporate
                      ? "bg-slate-50 border-blue-200 text-slate-800"
                      : isMinimal
                      ? "bg-white border-slate-300 text-slate-900 font-mono"
                      : "bg-surface-2 border-line text-ink"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-5 w-5 rounded font-bold text-[9px] flex items-center justify-center"
                        style={{
                          backgroundColor: tpl.primaryColor || "#D89B5B",
                          color: "#fff",
                        }}
                      >
                        ST
                      </div>
                      <span className="text-[10px] font-bold tracking-tight">STALCI</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest font-mono opacity-60">
                      {tpl.layoutType}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-1.5 w-24 rounded bg-current opacity-20" />
                    <div className="h-1.5 w-16 rounded bg-current opacity-10" />
                  </div>

                  <div className="flex justify-between items-center text-[9px] pt-2 border-t border-current/10">
                    <span className="font-mono">INV-2026</span>
                    <span className="font-mono font-bold" style={{ color: tpl.primaryColor || "#D89B5B" }}>
                      $81,375.00
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-ink/0 hover:bg-ink/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="bg-ink/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Live Preview
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                      {tpl.name}
                      {tpl.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-copper-wash text-copper-deep border border-copper/20">
                          Default
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{tpl.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-4 w-4 rounded-full border border-line"
                    style={{ backgroundColor: tpl.primaryColor || "#D89B5B" }}
                    title={`Accent: ${tpl.primaryColor}`}
                  />
                  <span className="text-[11px] text-muted font-mono">{tpl.primaryColor}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {!tpl.isDefault && (
                    <button
                      onClick={() => setDefaultMutation.mutate(tpl.id)}
                      className="px-2 py-1 rounded-lg text-[11px] font-semibold text-muted hover:text-ink hover:bg-canvas transition-colors border border-line"
                      title="Set as system default"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEdit(tpl)}
                    className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                    title="Edit template settings"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  {!tpl.isDefault && (
                    <button
                      onClick={() => setDeletingTemplateId(tpl.id)}
                      className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete template"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Template Form Drawer */}
      <Drawer
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTemplate ? "Edit Invoice Template" : "Add New Invoice Template"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Template Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern Clean (Copper Glow)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Layout Type</label>
              <select
                value={formData.layoutType}
                onChange={(e) => setFormData({ ...formData, layoutType: e.target.value })}
                className="field"
              >
                <option value="MODERN">MODERN</option>
                <option value="MINIMAL">MINIMAL</option>
                <option value="CORPORATE">CORPORATE</option>
                <option value="PREMIUM">PREMIUM (LUXURY)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Primary Color Accent</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-9 w-12 rounded-lg border border-line p-0.5 cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="field flex-1 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief explanation of when to use this template..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="field resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Header Title Banner</label>
            <input
              type="text"
              placeholder="INVOICE / BILLING STATEMENT"
              value={formData.headerText}
              onChange={(e) => setFormData({ ...formData, headerText: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Default Footer Note</label>
            <textarea
              rows={2}
              placeholder="Thank you for partnering with STALCI. Net 30 terms apply."
              value={formData.footerNotes}
              onChange={(e) => setFormData({ ...formData, footerNotes: e.target.value })}
              className="field resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-canvas border border-line">
            <input
              type="checkbox"
              id="tplDefaultCheck"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="h-4 w-4 accent-copper rounded"
            />
            <label htmlFor="tplDefaultCheck" className="text-xs font-semibold text-ink cursor-pointer">
              Set as system default template for newly created invoices
            </label>
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingTemplate ? "Save Template" : "Create Template"}
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Live Sample Preview Modal */}
      {previewTemplate && (
        <InvoicePreviewModal
          invoice={{ ...sampleMockInvoice, template: previewTemplate }}
          templates={templates}
          open={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingTemplateId}
        onClose={() => setDeletingTemplateId(null)}
        onConfirm={() => deletingTemplateId && deleteMutation.mutate(deletingTemplateId)}
        title="Delete Invoice Template"
        description="Are you sure you want to delete this template? Invoices assigned to this template will fall back to the system default."
        confirmText="Yes, Delete Template"
        danger
      />
    </div>
  );
}
