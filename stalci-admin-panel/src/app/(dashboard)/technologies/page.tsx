"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  Code2,
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  Sparkles,
  Layers,
} from "lucide-react";

export default function TechnologiesAdmin() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<any | null>(null);
  const [deletingTechId, setDeletingTechId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "Code",
    proficiency: 95,
    isFeatured: true,
    order: 0,
  });

  const { data: technologies = [], isLoading } = useQuery({
    queryKey: ["technologies"],
    queryFn: () => fetchTechnologies(),
  });

  const createMutation = useMutation({
    mutationFn: createTechnology,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast.success("Technology skill added");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to add technology"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateTechnology(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast.success("Technology skill updated");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update technology"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTechnology,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast.success("Technology skill deleted");
      setDeletingTechId(null);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete technology"),
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Frontend",
      icon: "Code",
      proficiency: 95,
      isFeatured: true,
      order: technologies.length + 1,
    });
    setEditingTech(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditingTech(t);
    setFormData({
      name: t.name || "",
      category: t.category || "Frontend",
      icon: t.icon || "Code",
      proficiency: t.proficiency || 90,
      isFeatured: Boolean(t.isFeatured),
      order: t.order || 0,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Technology name is required");
      return;
    }
    if (editingTech) {
      updateMutation.mutate({ id: editingTech.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Cloud & DevOps",
    "AI & Data",
    "Security & Database",
  ];

  const filteredTechnologies = technologies.filter((t: any) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Portfolio CMS</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Tech Stack & Skills</h1>
          <p className="mt-1 text-sm text-muted">
            Manage the dynamic technology radar and skill proficiency displayed on the landing page.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add Technology
        </Button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field pl-9"
          />
        </div>

        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                categoryFilter === cat
                  ? "bg-ink text-white"
                  : "bg-surface border border-line text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Technology Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTechnologies.map((t: any) => (
          <div
            key={t.id}
            className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-copper/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-canvas border border-line flex items-center justify-center text-copper font-bold text-xs">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-ink">{t.name}</h3>
                    <span className="text-[11px] text-muted">{t.category}</span>
                  </div>
                </div>
                {t.isFeatured && (
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                )}
              </div>

              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-ink">
                  <span className="text-muted">Mastery</span>
                  <span>{t.proficiency}%</span>
                </div>
                <div className="w-full bg-line rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-copper h-1.5 rounded-full"
                    style={{ width: `${t.proficiency}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
              <span className="text-[10px] text-muted font-mono">Order: #{t.order}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeletingTechId(t.id)}
                  className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTechnologies.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-muted">
            No technologies found for this filter.
          </div>
        )}
      </div>

      {/* Tech Form Drawer */}
      <Drawer
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTech ? "Edit Technology Skill" : "Add New Technology"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Technology Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. React 19 / Next.js 16"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="field"
              >
                {categories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="field"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-ink">Proficiency: {formData.proficiency}%</label>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
              className="w-full accent-copper cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-canvas border border-line">
            <input
              type="checkbox"
              id="techFeaturedCheck"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="h-4 w-4 accent-copper rounded"
            />
            <label htmlFor="techFeaturedCheck" className="text-xs font-semibold text-ink cursor-pointer">
              Show on Public Portfolio Tech Radar
            </label>
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingTech ? "Save Technology" : "Add Technology"}
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingTechId}
        onClose={() => setDeletingTechId(null)}
        onConfirm={() => deletingTechId && deleteMutation.mutate(deletingTechId)}
        title="Delete Technology Skill"
        description="Are you sure you want to remove this technology from the stack?"
        confirmText="Yes, Delete"
        danger
      />
    </div>
  );
}
