"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  fetchPages,
  createPage,
  updatePage,
  deletePage,
} from "@/lib/api";
import {
  FileText,
  ExternalLink,
  Edit2,
  Plus,
  Trash2,
  Heading,
  List,
  Bold,
  Eye,
  CheckCircle2,
} from "lucide-react";

export default function PagesAdmin() {
  const qc = useQueryClient();
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<"edit" | "preview">("edit");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    published: true,
  });

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: fetchPages,
  });

  const createMut = useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page created");
      setIsDrawerOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updatePage(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page content updated and published to live portfolio");
      setIsDrawerOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pages"] });
      toast.success("Page deleted");
      setDeletingId(null);
    },
  });

  const handleOpenEdit = (page: any) => {
    setEditingPage(page);
    setFormData({
      title: page.title || "",
      slug: page.slug || "",
      content: page.content || "",
      published: Boolean(page.published),
    });
    setPreviewTab("edit");
    setIsDrawerOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingPage(null);
    setFormData({
      title: "",
      slug: "",
      content: `### 1. Introduction & Overview\nEnter the policy terms here...\n\n### 2. Key Terms & Standards\n- Specification point 1\n- Specification point 2`,
      published: true,
    });
    setPreviewTab("edit");
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      updateMut.mutate({ id: editingPage.id, data: formData });
    } else {
      createMut.mutate(formData);
    }
  };

  // Helper toolbar actions for markdown
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + `\n${prefix}New Section${suffix}\nDescription text goes here...`,
    }));
  };

  const getPageLiveUrl = (slug: string) => {
    if (slug === "terms") return "http://localhost:8080/terms";
    if (slug === "privacy-policy") return "http://localhost:8080/privacy-policy";
    return `http://localhost:8080/${slug}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Content Management System</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">Site Pages CMS</h1>
          <p className="text-xs text-muted mt-1">
            Author and edit legal compliance documents, Terms & Conditions, Privacy Policy, and company pages.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="text-xs font-bold gap-1.5 bg-copper text-slate-950 hover:bg-copper-soft shadow-sm">
          <Plus className="h-4 w-4" /> Create New Page
        </Button>
      </div>

      {/* Pages Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading CMS pages...</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Page Title</th>
                  <th className="px-5 py-3.5">Route Slug</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Live Portfolio View</th>
                  <th className="px-5 py-3.5">Last Updated</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pages.map((p: any) => (
                  <tr key={p.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-copper shrink-0" />
                        <span>{p.title}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-muted text-xs">
                      <code className="rounded-md bg-canvas px-2 py-1 border border-line">
                        /{p.slug}
                      </code>
                    </td>

                    <td className="px-5 py-4">
                      <Badge tone={p.published ? "success" : "neutral"}>
                        {p.published ? "Live & Published" : "Draft"}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <a
                        href={getPageLiveUrl(p.slug)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-canvas text-xs font-semibold text-copper hover:bg-copper/10 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> View Live Page ↗
                      </a>
                    </td>

                    <td className="px-5 py-4 font-mono text-[11px] text-muted whitespace-nowrap">
                      {new Date(p.updatedAt || p.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="Edit page content"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-copper" />
                        </button>
                        <button
                          onClick={() => setDeletingId(p.id)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete page"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Visual Page Editor Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingPage ? `Edit: ${editingPage.title}` : "Create New CMS Page"}
        description="Format sections with ### Section Title, paragraphs, and bullet points."
        width="max-w-3xl"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={updateMut.isPending || createMut.isPending || !formData.title || !formData.slug}
              className="bg-copper text-slate-950 font-bold"
            >
              {editingPage ? "Save & Publish Changes" : "Create Page"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Page Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="field"
                placeholder="e.g. Terms & Conditions — STALCI Enterprise"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Route Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="field font-mono"
                placeholder="e.g. terms or privacy-policy"
              />
            </div>
          </div>

          {/* Editor Mode Switcher & Quick Insert Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-line">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertMarkdown("### ")}
                className="px-2.5 py-1 rounded-lg border border-line bg-surface-2 hover:bg-canvas text-xs font-semibold text-ink flex items-center gap-1 cursor-pointer"
                title="Insert Section Header"
              >
                <Heading className="h-3 w-3 text-copper" />
                <span>+ Section</span>
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("- ")}
                className="px-2.5 py-1 rounded-lg border border-line bg-surface-2 hover:bg-canvas text-xs font-semibold text-ink flex items-center gap-1 cursor-pointer"
                title="Insert Bullet Point"
              >
                <List className="h-3 w-3 text-copper" />
                <span>+ Bullet</span>
              </button>
            </div>

            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg border border-line text-xs">
              <button
                type="button"
                onClick={() => setPreviewTab("edit")}
                className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                  previewTab === "edit" ? "bg-copper text-slate-950" : "text-muted hover:text-ink"
                }`}
              >
                Markdown Editor
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("preview")}
                className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                  previewTab === "preview" ? "bg-copper text-slate-950" : "text-muted hover:text-ink"
                }`}
              >
                Live Preview
              </button>
            </div>
          </div>

          {/* Content Area / Preview */}
          {previewTab === "edit" ? (
            <div>
              <textarea
                rows={14}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="field font-mono text-xs leading-relaxed"
                placeholder="### 1. Section Title\nDetailed content paragraph...\n\n- Bullet point 1\n- Bullet point 2"
              />
              <p className="text-[11px] text-muted mt-1">
                Tip: Start each major section with <code className="text-copper">### Section Title</code>. Lines starting with <code className="text-copper">-</code> become bullet points.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-canvas p-4 max-h-[380px] overflow-y-auto space-y-4 text-xs">
              {formData.content.split(/\n(?=###?\s+)/g).map((blk, idx) => {
                const lines = blk.trim().split("\n").filter(Boolean);
                const title = lines[0]?.replace(/^###?\s+/, "") || "Section";
                const rest = lines.slice(1);
                return (
                  <div key={idx} className="rounded-lg border border-line bg-surface p-3.5 space-y-2">
                    <h4 className="font-bold text-ink text-sm flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                      {title}
                    </h4>
                    <div className="text-muted leading-relaxed whitespace-pre-wrap">
                      {rest.join("\n")}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="pagePub"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 accent-copper"
            />
            <label htmlFor="pagePub" className="text-xs font-semibold text-ink cursor-pointer">
              Publish & enable page immediately on live portfolio
            </label>
          </div>
        </form>
      </Drawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingId}
        title="Delete CMS Page?"
        message="This action will permanently delete the page from the database and public routes."
        loading={deleteMut.isPending}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMut.mutate(deletingId)}
      />
    </div>
  );
}
