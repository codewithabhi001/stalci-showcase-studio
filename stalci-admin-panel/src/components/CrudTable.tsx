"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface CrudTableProps {
  title: string;
  queryKey: string;
  data: any[];
  columns: Column[];
  isLoading: boolean;
  onDelete: (id: number) => Promise<any>;
  formFields?: { key: string; label: string; type?: string; options?: string[] }[];
  onCreate?: (data: any) => Promise<any>;
  onUpdate?: (id: number, data: any) => Promise<any>;
}

export default function CrudTable({ title, queryKey, data, columns, isLoading, onDelete, formFields, onCreate, onUpdate }: CrudTableProps) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const deleteMut = useMutation({
    mutationFn: (id: number) => onDelete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const createMut = useMutation({
    mutationFn: (data: any) => onCreate!(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); setShowForm(false); setFormData({}); },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => onUpdate!(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); setEditItem(null); setFormData({}); setShowForm(false); },
  });

  const openCreate = () => { setEditItem(null); setFormData({}); setShowForm(true); };
  const openEdit = (item: any) => {
    setEditItem(item);
    const fd: any = {};
    formFields?.forEach((f) => { fd[f.key] = item[f.key] ?? ""; });
    setFormData(fd);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateMut.mutate({ id: editItem.id, data: formData });
    } else {
      createMut.mutate(formData);
    }
  };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{title}</h1>
        {onCreate && (
          <button onClick={openCreate} className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: "var(--gradient-copper)", color: "var(--ink)" }}>
            + Add New
          </button>
        )}
      </div>

      {/* Modal Form */}
      {showForm && formFields && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl p-8 space-y-5" style={{ background: "var(--ink-soft)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{editItem ? "Edit" : "Create"} {title.replace(" Management", "")}</h2>
            {formFields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea value={formData[f.key] || ""} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2" style={{ background: "rgba(255,255,255,0.05)", color: "white", borderColor: "rgba(255,255,255,0.1)", border: "1px solid", ringColor: "var(--copper)" }} rows={4} />
                ) : f.type === "select" ? (
                  <select value={formData[f.key] || ""} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <option value="">Select...</option>
                    {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "number" ? (
                  <input type="number" step="any" value={formData[f.key] || ""} onChange={(e) => setFormData({ ...formData, [f.key]: parseFloat(e.target.value) })} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }} />
                ) : f.type === "checkbox" ? (
                  <input type="checkbox" checked={!!formData[f.key]} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.checked })} className="w-5 h-5 rounded" />
                ) : (
                  <input type={f.type || "text"} value={formData[f.key] || ""} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }} />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={createMut.isPending || updateMut.isPending} className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all" style={{ background: "var(--gradient-copper)", color: "var(--ink)" }}>
                {createMut.isPending || updateMut.isPending ? "Saving..." : editItem ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl p-6 overflow-hidden" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--copper)", borderTopColor: "transparent" }} />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center py-16" style={{ color: "rgba(255,255,255,0.3)" }}>No records found. Click "Add New" to create one.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {columns.map((c) => (
                  <th key={c.key} className="pb-3 pr-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</th>
                ))}
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id} className="group transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  {columns.map((c) => (
                    <td key={c.key} className="py-4 pr-4 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="py-4 text-right space-x-3">
                    {onUpdate && formFields && (
                      <button onClick={() => openEdit(item)} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--copper)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Edit</button>
                    )}
                    <button onClick={() => { if (confirm("Delete this item?")) deleteMut.mutate(item.id); }} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
