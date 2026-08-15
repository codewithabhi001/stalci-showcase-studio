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
  Code2,
  Sparkles,
  Award,
  CheckCircle2,
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
      name: "Master Relieving & Experience Certificate",
      type: "EXPERIENCE_LETTER",
      subject: "Relieving Order and Service Certificate",
      bodyTemplate: `<div style="padding: 20px; font-family: sans-serif; line-height: 1.8;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D89B5B; padding-bottom: 15px; margin-bottom: 25px;">
    <div>
      <h2 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #0B0E14;">STALCI GLOBAL TECHNOLOGIES</h2>
      <span style="font-size: 11px; color: #64748B;">550 Howard Street, San Francisco, CA 94105</span>
    </div>
    <div style="font-family: monospace; font-size: 11px; color: #D89B5B;">Ref: ST-CERT-2026-REL</div>
  </div>

  <h3 style="text-align: center; color: #D89B5B; font-size: 16px; margin: 20px 0; text-transform: uppercase;">Relieving Order & Experience Certificate</h3>

  <p>To Whom It May Concern,</p>

  <p>This certifies that <strong>{{employeeName}}</strong> (Employee ID: <code>{{employeeCode}}</code>) served with STALCI Global Technologies Inc. as <strong>{{designation}}</strong> in the <strong>{{departmentName}}</strong> department from <strong>{{joiningDate}}</strong> to <strong>{{lastWorkingDay}}</strong>.</p>

  <p>During their tenure with us, they demonstrated exceptional craftsmanship, technical innovation, and professional integrity. All organizational duties and IT hardware clearances have been fully discharged.</p>

  <p>We wish <strong>{{employeeName}}</strong> continued success in all future professional endeavors.</p>

  <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #0F172A;">Abhishek Kumar</div>
      <div style="border-top: 1px solid #000; width: 180px; margin-top: 4px; font-size: 11px; padding-top: 4px;">
        <strong>Managing Director</strong><br>STALCI Global Technologies
      </div>
    </div>
    <div style="border: 2px dashed #D89B5B; border-radius: 50%; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 9px; font-weight: bold; color: #D89B5B; transform: rotate(-10deg);">
      STALCI<br>OFFICIAL<br>SEAL
    </div>
  </div>
</div>`,
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

  const handleInsertTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      bodyTemplate: prev.bodyTemplate + ` ${tag} `,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTpl) {
      updateMut.mutate({ id: editingTpl.id, data: formData });
    } else {
      createMut.mutate(formData);
    }
  };

  const handlePrintTemplate = (tpl: any) => {
    const printWin = window.open("", "_blank", "width=850,height=1000");
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Document - ${tpl.name}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0F172A; line-height: 1.6; padding: 20px; font-size: 13px; }
          </style>
        </head>
        <body>
          ${tpl.bodyTemplate
            .replace(/\{\{candidateName\}\}/g, "Alexander Wright")
            .replace(/\{\{employeeName\}\}/g, "Sophia Chen")
            .replace(/\{\{employeeCode\}\}/g, "ST-EMP-002")
            .replace(/\{\{designation\}\}/g, "Staff Distributed Systems Engineer")
            .replace(/\{\{departmentName\}\}/g, "Backend Systems & Cloud")
            .replace(/\{\{salaryCtc\}\}/g, "175,000")
            .replace(/\{\{joiningDate\}\}/g, "January 15, 2024")
            .replace(/\{\{lastWorkingDay\}\}/g, "August 30, 2026")
            .replace(/\{\{workLocation\}\}/g, "San Francisco, CA / Remote")
            .replace(/\{\{probationMonths\}\}/g, "3")}
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Document Templating</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Rich HR Letter & Certificate Template Editor
          </h1>
          <p className="text-xs text-muted mt-1">
            Build and edit corporate HTML/CSS letterheads: Offer letters, Relieving orders, Experience certificates, and Promotions with live preview.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="bg-copper text-[#080A0F] font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Create Letter Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">Loading templates...</div>
        ) : templates.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">No templates created yet.</div>
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
                  <p className="text-xs text-muted font-mono truncate">{tpl.subject || "Official Document"}</p>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-line text-[11px] text-muted line-clamp-4 leading-relaxed font-mono">
                  {tpl.bodyTemplate.replace(/<[^>]*>?/gm, "")}
                </div>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewTpl(tpl)}
                    className="px-2.5 py-1 rounded-lg border border-line bg-surface hover:bg-canvas text-xs font-bold text-copper flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </button>
                  <button
                    onClick={() => handlePrintTemplate(tpl)}
                    className="p-1 rounded-lg border border-line text-ink hover:bg-canvas cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="h-3.5 w-3.5 text-copper" />
                  </button>
                </div>

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

      {/* Live Preview Modal */}
      {previewTpl && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-copper" /> Template Preview: {previewTpl.name}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handlePrintTemplate(previewTpl)}
                  className="bg-copper text-[#080A0F] font-bold text-xs gap-1"
                >
                  <Printer className="h-3.5 w-3.5" /> Print A4 Document
                </Button>
                <button
                  onClick={() => setPreviewTpl(null)}
                  className="text-xs text-muted hover:text-ink font-bold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div
              className="p-8 rounded-xl bg-white border border-line text-xs text-slate-900 shadow-inner"
              dangerouslySetInnerHTML={{
                __html: previewTpl.bodyTemplate
                  .replace(/\{\{candidateName\}\}/g, "Alexander Wright")
                  .replace(/\{\{employeeName\}\}/g, "Sophia Chen")
                  .replace(/\{\{employeeCode\}\}/g, "ST-EMP-002")
                  .replace(/\{\{designation\}\}/g, "Staff Distributed Systems Engineer")
                  .replace(/\{\{departmentName\}\}/g, "Backend Systems & Cloud")
                  .replace(/\{\{salaryCtc\}\}/g, "175,000")
                  .replace(/\{\{joiningDate\}\}/g, "January 15, 2024")
                  .replace(/\{\{lastWorkingDay\}\}/g, "August 30, 2026")
                  .replace(/\{\{workLocation\}\}/g, "San Francisco, CA / Remote")
                  .replace(/\{\{probationMonths\}\}/g, "3"),
              }}
            />
          </div>
        </div>
      )}

      {/* Edit / Create Rich Template Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingTpl ? `Edit Template: ${editingTpl.name}` : "Create HR Letter Template"}
        description="Insert dynamic variable tags below to auto-inject employee details into your document."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMut.isPending || updateMut.isPending || !formData.name}
              className="bg-copper text-[#080A0F] font-bold"
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
              placeholder="e.g. Official Employment Verification Certificate"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Document Category</label>
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
              <label className="text-xs font-bold text-ink block mb-1">Subject Line</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="field"
                placeholder="e.g. Official Relieving Order & Service Certificate"
              />
            </div>
          </div>

          {/* Quick Variable Tag Insertion Toolbar */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-ink block">Quick Insert Dynamic Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                "{{employeeName}}",
                "{{employeeCode}}",
                "{{designation}}",
                "{{departmentName}}",
                "{{salaryCtc}}",
                "{{joiningDate}}",
                "{{lastWorkingDay}}",
                "{{workLocation}}",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleInsertTag(tag)}
                  className="px-2 py-0.5 rounded-lg border border-line bg-canvas hover:bg-copper/20 text-ink font-mono text-[10px] font-semibold cursor-pointer"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">HTML Body Content *</label>
            <textarea
              rows={12}
              required
              value={formData.bodyTemplate}
              onChange={(e) => setFormData({ ...formData, bodyTemplate: e.target.value })}
              className="field font-mono text-xs leading-relaxed"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
