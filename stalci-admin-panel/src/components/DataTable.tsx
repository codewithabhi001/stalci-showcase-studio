"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight, ArrowUpDown, Inbox } from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState, TableSkeleton } from "@/components/ui/states";
import { useToast } from "@/components/ui/toast";

export interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

export interface FormField {
  key: string;
  label: string;
  type?: string;
  options?: string[];
  help?: string;
}

export interface DataTableProps {
  title: string;
  description?: string;
  queryKey: string;
  data: any[];
  columns: Column[];
  isLoading: boolean;
  onDelete: (id: number) => Promise<any>;
  formFields?: FormField[];
  onCreate?: (data: any) => Promise<any>;
  onUpdate?: (id: number, data: any) => Promise<any>;
  pageSize?: number;
}

const PAGE_SIZES = [10, 25, 50];

export default function DataTable({
  title,
  description,
  queryKey,
  data,
  columns,
  isLoading,
  onDelete,
  formFields,
  onCreate,
  onUpdate,
  pageSize: initialPageSize = 10,
}: DataTableProps) {
  const qc = useQueryClient();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [pendingDelete, setPendingDelete] = useState<any>(null);

  const entity = title.replace(/ (Management|Admin)$/i, "");
  
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  useEffect(() => {
    if (isNew && onCreate && !drawerOpen) {
      openCreate();
    }
  }, [isNew, onCreate]);

  const invalidate = () => qc.invalidateQueries({ queryKey: [queryKey] });

  const deleteMut = useMutation({
    mutationFn: (id: number) => onDelete(id),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast({ title: `${entity} deleted`, variant: "success" });
    },
    onError: (e: any) => toast({ title: "Delete failed", description: e?.message ?? "Please try again.", variant: "error" }),
  });

  const createMut = useMutation({
    mutationFn: (d: any) => onCreate!(d),
    onSuccess: () => {
      invalidate();
      closeDrawer();
      toast({ title: `${entity} created`, variant: "success" });
    },
    onError: (e: any) => toast({ title: "Create failed", description: e?.message ?? "Please try again.", variant: "error" }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => onUpdate!(id, data),
    onSuccess: () => {
      invalidate();
      closeDrawer();
      toast({ title: `${entity} updated`, variant: "success" });
    },
    onError: (e: any) => toast({ title: "Update failed", description: e?.message ?? "Please try again.", variant: "error" }),
  });

  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];
    let res = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter((item) =>
        columns.some((c) => {
          const val = item[c.key];
          if (val == null) return false;
          return String(val).toLowerCase().includes(q);
        })
      );
    }

    if (sortKey) {
      res.sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];
        if (va == null && vb == null) return 0;
        if (va == null) return 1;
        if (vb == null) return -1;
        if (typeof va === "number" && typeof vb === "number") {
          return sortDir === "asc" ? va - vb : vb - va;
        }
        return sortDir === "asc"
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
    }

    return res;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else {
        setSortKey(null);
        setSortDir("asc");
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const openCreate = () => {
    setEditItem(null);
    const initial: any = {};
    formFields?.forEach((f) => {
      initial[f.key] = f.type === "number" ? 0 : f.type === "json" ? "[]" : f.type === "select" && f.options ? f.options[0] : "";
    });
    setFormData(initial);
    setDrawerOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    const initial: any = {};
    formFields?.forEach((f) => {
      const val = item[f.key];
      if (f.type === "json" && typeof val === "object") {
        initial[f.key] = JSON.stringify(val, null, 2);
      } else {
        initial[f.key] = val ?? "";
      }
    });
    setFormData(initial);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditItem(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    formFields?.forEach((f) => {
      if (f.type === "number") {
        payload[f.key] = Number(payload[f.key]) || 0;
      } else if (f.type === "json") {
        try {
          payload[f.key] = typeof payload[f.key] === "string" ? JSON.parse(payload[f.key]) : payload[f.key];
        } catch {
          // keep as string if invalid JSON
        }
      }
    });

    if (editItem) {
      updateMut.mutate({ id: editItem.id, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-display">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-500 font-normal">
              {description}
            </p>
          )}
        </div>
        {onCreate && formFields && (
          <Button onClick={openCreate} variant="primary">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            New {entity.replace(/s$/, "")}
          </Button>
        )}
      </div>

      {/* Toolbar + Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-2xs">
        <div className="flex flex-col gap-3 border-b border-zinc-200/80 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between bg-zinc-50/50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${entity.toLowerCase()}…`}
              aria-label={`Search ${entity}`}
              className="field pl-8.5 pr-8 h-9 text-xs"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-950"
              >
                ×
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="hidden sm:inline font-mono text-[11px]">
              {isLoading ? "Loading records…" : `Showing ${paged.length} of ${filtered.length} entries`}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
              className="field h-8.5 w-auto py-0 text-xs font-mono"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} / page
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={pageSize > 10 ? 8 : 6} cols={columns.length} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={search ? "No matching records found" : `No ${entity.toLowerCase()} available`}
            message={
              search
                ? "Try adjusting your search criteria or clear the query filter."
                : `Once you add ${entity.toLowerCase()}, they will appear here and sync across the live portfolio.`
            }
            action={
              search ? (
                <Button variant="secondary" size="sm" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              ) : onCreate ? (
                <Button size="sm" variant="primary" onClick={openCreate}>
                  <Plus className="h-4 w-4" /> Add the first one
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-surface-2/60">
                  {columns.map((c) => (
                    <th key={c.key} className="px-5 py-3">
                      <button
                        onClick={() => toggleSort(c.key)}
                        className="eyebrow inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors cursor-pointer text-[10px]"
                      >
                        {c.label}
                        <ArrowUpDown className={`h-3 w-3 ${sortKey === c.key ? "text-purple-600" : "opacity-30"}`} />
                      </button>
                    </th>
                  ))}
                  <th className="eyebrow px-5 py-3 text-right text-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paged.map((item: any) => (
                  <tr key={item.id} className="group transition-colors hover:bg-purple-50/30">
                    {columns.map((c) => (
                      <td key={c.key} className="max-w-[320px] truncate px-5 py-3.5 text-xs text-ink-2 font-medium font-sans">
                        {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                        {onUpdate && formFields && (
                          <IconButton label="Edit" onClick={() => openEdit(item)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </IconButton>
                        )}
                        <IconButton label="Delete" tone="danger" onClick={() => setPendingDelete(item)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-line px-5 py-3 bg-surface-2/40">
            <p className="text-xs text-muted font-mono">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </Button>
              <Button variant="secondary" size="sm" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Drawer */}
      {formFields && (
        <Drawer
          open={drawerOpen}
          onClose={closeDrawer}
          title={`${editItem ? "Edit" : "New"} ${entity.replace(/s$/, "")}`}
          description={editItem ? "Update the record parameters and save your changes." : "Fill in the details below to publish a new record to the live portfolio."}
          footer={
            <div className="flex justify-end gap-2.5">
              <Button variant="secondary" onClick={closeDrawer} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={createMut.isPending || updateMut.isPending}
                type="submit"
              >
                {editItem ? "Save Changes" : `Create ${entity.replace(/s$/, "")}`}
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-950 font-sans">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    placeholder={`Enter ${f.label.toLowerCase()}…`}
                    className="field font-sans"
                    rows={4}
                  />
                ) : f.type === "select" && f.options ? (
                  <select
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="field font-sans text-xs"
                  >
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : f.type === "json" ? (
                  <textarea
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    placeholder="[] or {}"
                    className="field font-mono text-xs"
                    rows={4}
                  />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    placeholder={`Enter ${f.label.toLowerCase()}…`}
                    className="field font-sans text-xs"
                  />
                )}
                {f.help && <p className="text-[11px] text-zinc-500 font-mono">{f.help}</p>}
              </div>
            ))}
          </form>
        </Drawer>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteMut.mutate(pendingDelete.id)}
        loading={deleteMut.isPending}
        title={`Delete ${entity}?`}
        description={`Are you sure you want to delete this record? This action cannot be undone.`}
        confirmText="Delete permanently"
        danger
      />
    </div>
  );
}
