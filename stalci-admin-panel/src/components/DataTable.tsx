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

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditItem(null);
    setFormData({});
  };

  const openCreate = () => {
    setEditItem(null);
    setFormData({});
    setDrawerOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    const fd: any = {};
    formFields?.forEach((f) => {
      let val = item[f.key] ?? "";
      if (f.type === "date" && val) {
        const d = new Date(val);
        val = isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
      }
      fd[f.key] = val;
    });
    setFormData(fd);
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    formFields?.forEach((f) => {
      if (f.type === "number") payload[f.key] = formData[f.key] ? parseFloat(formData[f.key]) : 0;
    });
    if (editItem) updateMut.mutate({ id: editItem.id, data: payload });
    else createMut.mutate(payload);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = !q
      ? data
      : data.filter((row) => columns.some((c) => String(row[c.key] ?? "").toLowerCase().includes(q)));

    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, columns, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const saving = createMut.isPending || updateMut.isPending;

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="mt-1.5 text-[26px] font-semibold leading-tight text-ink">{entity}</h1>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted">
            {description ?? `Create, edit and organise ${entity.toLowerCase()} shown across the Stalci portfolio.`}
          </p>
        </div>
        {onCreate && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            New {entity.replace(/s$/, "")}
          </Button>
        )}
      </div>

      {/* Toolbar + table */}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${entity.toLowerCase()}…`}
              aria-label={`Search ${entity}`}
              className="field pl-9"
            />
          </div>
          <div className="flex items-center gap-3 text-[13px] text-muted">
            <span className="hidden sm:inline">
              {isLoading ? "Loading…" : `${filtered.length} record${filtered.length === 1 ? "" : "s"}`}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
              className="field h-9 w-auto py-0 text-[13px]"
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
            title={search ? "No matching records" : `No ${entity.toLowerCase()} yet`}
            message={
              search
                ? "Try a different search term or clear the filter to see everything."
                : `Once you add ${entity.toLowerCase()}, they will appear here and sync to the live site.`
            }
            action={
              search ? (
                <Button variant="secondary" size="sm" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              ) : onCreate ? (
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-4 w-4" /> Add the first one
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  {columns.map((c) => (
                    <th key={c.key} className="px-5 py-3">
                      <button
                        onClick={() => toggleSort(c.key)}
                        className="eyebrow inline-flex items-center gap-1.5 hover:text-ink-2"
                      >
                        {c.label}
                        <ArrowUpDown className={`h-3 w-3 ${sortKey === c.key ? "text-copper" : "opacity-40"}`} />
                      </button>
                    </th>
                  ))}
                  <th className="eyebrow px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paged.map((item: any) => (
                  <tr key={item.id} className="group transition-colors hover:bg-surface-2">
                    {columns.map((c) => (
                      <td key={c.key} className="max-w-[320px] truncate px-5 py-3.5 text-[13.5px] text-ink-2">
                        {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                        {onUpdate && formFields && (
                          <IconButton label="Edit" onClick={() => openEdit(item)}>
                            <Pencil className="h-4 w-4" />
                          </IconButton>
                        )}
                        <IconButton label="Delete" tone="danger" onClick={() => setPendingDelete(item)}>
                          <Trash2 className="h-4 w-4" />
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
          <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
            <p className="text-[13px] text-muted">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="secondary" size="sm" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <Button variant="secondary" size="sm" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit drawer */}
      {formFields && (
        <Drawer
          open={drawerOpen}
          onClose={closeDrawer}
          title={`${editItem ? "Edit" : "New"} ${entity.replace(/s$/, "")}`}
          description={editItem ? "Update the details and save your changes." : "Fill in the details to publish a new record."}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={closeDrawer} type="button">
                Cancel
              </Button>
              <Button type="submit" form="datatable-form" loading={saving}>
                {editItem ? "Save changes" : "Create"}
              </Button>
            </div>
          }
        >
          <form id="datatable-form" onSubmit={handleSubmit} className="space-y-5">
            {formFields.map((f) => (
              <div key={f.key}>
                <label htmlFor={`f-${f.key}`} className="mb-1.5 block text-[13px] font-semibold text-ink-2">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    id={`f-${f.key}`}
                    rows={6}
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="field resize-y"
                  />
                ) : f.type === "select" ? (
                  <select
                    id={`f-${f.key}`}
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="field"
                  >
                    <option value="">Select…</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "checkbox" ? (
                  <label className="flex items-center gap-2.5 py-1 text-[13px] text-ink-2">
                    <input
                      id={`f-${f.key}`}
                      type="checkbox"
                      checked={!!formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.checked })}
                      className="h-4 w-4 accent-[var(--color-copper)]"
                    />
                    Active / published
                  </label>
                ) : (
                  <input
                    id={`f-${f.key}`}
                    type={f.type || "text"}
                    step={f.type === "number" ? "any" : undefined}
                    value={formData[f.key] ?? ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="field"
                  />
                )}
                {f.help && <p className="mt-1.5 text-xs text-faint">{f.help}</p>}
              </div>
            ))}
          </form>
        </Drawer>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete this ${entity.replace(/s$/, "").toLowerCase()}?`}
        message="This action is permanent and will immediately remove the record from the live site."
        loading={deleteMut.isPending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteMut.mutate(pendingDelete.id)}
      />
    </div>
  );
}
