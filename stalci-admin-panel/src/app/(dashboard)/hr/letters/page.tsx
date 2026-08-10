"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLetterTemplates,
  createLetterTemplate,
  updateLetterTemplate,
  deleteLetterTemplate,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  FileCode,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Printer,
  Copy,
} from "lucide-react";

export default function LetterTemplatesPage() {
  const qc = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTpl, setEditingTpl] = useState<any | null>(null);
  const [previewTpl, setPreviewTpl] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "EXPERIENCE_LETTER",
    subject: "",
    bodyTemplate: "",
  });

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["letter-templates"],
    queryFn: fetchLetterTemplates,
  });

  const createMut = useMutation({
    mutationFn: createLetterTemplate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letter-templates"] });
      toast.success("HR Letter template created");
      setIsDrawerOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateLetterTemplate(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letter-templates"] });
      toast.success("HR Letter template updated");
      setIsDrawerOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteLetterTemplate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letter-templates"] });
      toast.success("Template deleted");
    },
  });

  const handleOpenCreate = () => {
    setEditingTpl(null);
    setFormData({
      name: "Standard Employment Verification Certificate",
      type: "EMPLOYMENT_CERTIFICATE",
      subject: "Certificate of Active Employment — STALCI",
      bodyTemplate: `<p>This certifies that <strong>{{employeeName}}</strong> (Employee ID: {{employeeCode}}) is a full-time employee with STALCI Global Technologies Inc. holding the title of <strong>{{designation}}</strong> within our <strong>{{departmentName}}</strong> since {{joiningDate}}.</p>`,
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (tpl: any) => {
    setEditingTpl(tpl);
    setFormData({
      name: tpl.name,
      type: tpl.type,
      subject: tpl.subject,
      bodyTemplate: tpl.bodyTemplate,
    });
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTpl) {
      updateMut.mutate({ id: editingTpl.id, data: formData });
    } else {
      createMut.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Document Templating</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            HR Letter & Certificate Templates Engine
          </h1>
          <p className="text-xs text-muted mt-1">
            Author and customize official corporate letterheads: Offer letters, Relieving orders, Experience certificates, and Promotions.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Create Letter Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">Loading templates...</div>
        ) : (
          templates.map((tpl: any) => (
            <div
              key={tpl.id}
              className="rounded-2xl border border-line bg-surface p-5 space-y-4 hover:border-copper/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <Badge tone="copper" className="font-mono text-[10px]">
                    {tpl.type}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-ink">{tpl.name}</h3>
                  <p className="text-xs text-muted font-mono truncate">{tpl.subject}</p>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-line text-[11px] text-slate-600 line-clamp-4 leading-relaxed font-mono">
                  {tpl.bodyTemplate.replace(/<[^>]*>?/gm, "")}
                </div>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                <button
                  onClick={() => setPreviewTpl(tpl)}
                  className="px-2.5 py-1 rounded-lg border border-line bg-surface hover:bg-canvas text-xs font-bold text-copper flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" /> Preview
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(tpl)}
                    className="p-1.5 rounded-lg border border-line text-muted hover:text-ink cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteMut.mutate(tpl.id)}
                    className="p-1.5 text-muted hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {previewTpl && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm">Template Preview: {previewTpl.name}</h3>
              <button
                onClick={() => setPreviewTpl(null)}
                className="text-xs text-muted hover:text-ink font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div
              className="p-6 rounded-xl bg-canvas border border-line text-xs text-slate-800 space-y-3 font-serif leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: previewTpl.bodyTemplate
                  .replace(/\{\{candidateName\}\}/g, "Alexander Wright")
                  .replace(/\{\{employeeName\}\}/g, "Sophia Chen")
                  .replace(/\{\{designation\}\}/g, "Lead Full-Stack Product Engineer")
                  .replace(/\{\{departmentName\}\}/g, "Product Engineering & Design")
                  .replace(/\{\{salaryCtc\}\}/g, "175,000")
                  .replace(/\{\{joiningDate\}\}/g, "January 10, 2025")
                  .replace(/\{\{workLocation\}\}/g, "San Francisco, CA / Remote")
                  .replace(/\{\{probationMonths\}\}/g, "3"),
              }}
            />

            <div className="flex justify-end pt-2">
              <Button onClick={() => setPreviewTpl(null)} className="bg-copper text-slate-950 font-bold text-xs">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingTpl ? `Edit: ${editingTpl.name}` : "Create HR Letter Template"}
        description="Placeholders supported: {{employeeName}}, {{designation}}, {{departmentName}}, {{salaryCtc}}, {{joiningDate}}."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMut.isPending || updateMut.isPending || !formData.name}
              className="bg-copper text-slate-950 font-bold"
            >
              Save Template
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Template Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Document Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="field font-mono"
              >
                <option value="OFFER_LETTER">OFFER_LETTER</option>
                <option value="INTERNSHIP_CERTIFICATE">INTERNSHIP_CERTIFICATE</option>
                <option value="EXPERIENCE_LETTER">EXPERIENCE_LETTER</option>
                <option value="RELIEVING_LETTER">RELIEVING_LETTER</option>
                <option value="PROMOTION_LETTER">PROMOTION_LETTER</option>
                <option value="EMPLOYMENT_CERTIFICATE">EMPLOYMENT_CERTIFICATE</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Email / Subject Line</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">HTML Body Template *</label>
            <textarea
              rows={8}
              required
              value={formData.bodyTemplate}
              onChange={(e) => setFormData({ ...formData, bodyTemplate: e.target.value })}
              className="field font-mono text-xs"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
