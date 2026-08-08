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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-ink-black" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h1>
        {onCreate && (
          <button
            onClick={openCreate}
            className="px-5 py-3 rounded-2xl font-semibold text-sm text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-sm"
            style={{ background: "var(--color-copper)" }}
          >
            + Add New
          </button>
        )}
      </div>

      {/* Modal Form */}
      {showForm && formFields && (
        <div className="fixed inset-0 bg-ink-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper-white rounded-[20px] p-8 space-y-6 shadow-2xl border border-mist-gray"
            style={{ boxShadow: "var(--shadow-modal)" }}
          >
            <h2 className="text-xl font-semibold text-ink-black" style={{ fontFamily: "var(--font-display)" }}>
              {editItem ? "Edit" : "Create"} {title.replace(" Management", "")}
            </h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {formFields.map((f) => (
                <div key={f.key}>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2 text-driftwood">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={formData[f.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none border border-bone focus:border-copper transition-colors"
                      rows={4}
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={formData[f.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none border border-bone focus:border-copper transition-colors bg-white"
                    >
                      <option value="">Select...</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "number" ? (
                    <input
                      type="number"
                      step="any"
                      value={formData[f.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.key]: parseFloat(e.target.value) })}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none border border-bone focus:border-copper transition-colors"
                    />
                  ) : f.type === "checkbox" ? (
                    <div className="flex items-center gap-2 py-2">
                      <input
                        type="checkbox"
                        checked={!!formData[f.key]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.checked })}
                        className="w-5 h-5 rounded border-bone text-copper focus:ring-copper"
                      />
                      <span className="text-sm text-warm-stone font-medium">Yes, active / published</span>
                    </div>
                  ) : (
                    <input
                      type={f.type || "text"}
                      value={formData[f.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none border border-bone focus:border-copper transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2 border-t border-mist-gray">
              <button
                type="submit"
                disabled={createMut.isPending || updateMut.isPending}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm text-white hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
                style={{ background: "var(--color-copper)" }}
              >
                {createMut.isPending || updateMut.isPending ? "Saving..." : editItem ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3.5 rounded-2xl font-semibold text-sm text-warm-stone border border-mist-gray hover:bg-cream-canvas transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Surface */}
      <div className="bg-paper-white rounded-[20px] p-6 border border-mist-gray" style={{ boxShadow: "var(--shadow-card)" }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--color-copper)" }} />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center py-16 text-driftwood">No records found. Click "Add New" to create one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-mist-gray">
                  {columns.map((c) => (
                    <th key={c.key} className="pb-4 pr-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">
                      {c.label}
                    </th>
                  ))}
                  <th className="pb-4 text-right text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-gray/40">
                {data.map((item: any) => (
                  <tr key={item.id} className="group hover:bg-cream-canvas/50 transition-colors">
                    {columns.map((c) => (
                      <td key={c.key} className="py-4 pr-4 text-sm text-ironwood font-medium">
                        {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="py-4 text-right space-x-4">
                      {onUpdate && formFields && (
                        <button
                          onClick={() => openEdit(item)}
                          className="text-xs font-semibold text-warm-stone hover:text-copper transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm("Delete this item?")) deleteMut.mutate(item.id);
                        }}
                        className="text-xs font-semibold text-warm-stone hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
