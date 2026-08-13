"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
  fetchClientById,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Globe,
  Building,
  DollarSign,
  FolderKanban,
  Receipt,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from "lucide-react";

export default function ClientsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    website: "",
    avatarUrl: "",
    status: "ACTIVE",
    notes: "",
  });

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: clientDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["client", selectedClientId],
    queryFn: () => fetchClientById(selectedClientId!),
    enabled: !!selectedClientId,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Client account created successfully");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to create client"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", selectedClientId] });
      toast.success("Client account updated");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update client"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Client deleted");
      if (selectedClientId === deletingClientId) setSelectedClientId(null);
      setDeletingClientId(null);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete client"),
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      website: "",
      avatarUrl: "",
      status: "ACTIVE",
      notes: "",
    });
    setEditingClient(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingClient(client);
    setFormData({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      address: client.address || "",
      website: client.website || "",
      avatarUrl: client.avatarUrl || "",
      status: client.status || "ACTIVE",
      notes: client.notes || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredClients = clients.filter((c: any) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalClientsCount = clients.length;
  const activeClientsCount = clients.filter((c: any) => c.status === "ACTIVE").length;
  const totalBilled = clients.reduce((acc: number, c: any) => acc + (c.totalBilled || 0), 0);
  const totalPending = clients.reduce((acc: number, c: any) => acc + (c.totalPending || 0), 0);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">CRM & Business</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Client Accounts</h1>
          <p className="mt-1 text-sm text-muted">
            Manage enterprise clients, linked projects, and invoicing history.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add New Client
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Total Accounts</span>
          <p className="mt-2 text-2xl font-bold text-ink">{totalClientsCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Active Engagements</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600">{activeClientsCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Cumulative Billed</span>
          <p className="mt-2 text-2xl font-bold text-ink">${totalBilled.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Outstanding Balance</span>
          <p className="mt-2 text-2xl font-bold text-amber-600">${totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field pl-9"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {["ALL", "ACTIVE", "INACTIVE", "LEAD", "ONBOARDING"].map((st) => (
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

      {/* Clients Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-line text-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3.5">Client & Company</th>
                <th className="px-5 py-3.5">Contact Info</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Active Projects</th>
                <th className="px-5 py-3.5">Total Billed</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredClients.map((c: any) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedClientId(c.id)}
                  className="hover:bg-canvas/60 transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {c.avatarUrl ? (
                        <img
                          src={c.avatarUrl}
                          alt={c.name}
                          className="h-10 w-10 rounded-full object-cover border border-line"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-copper-wash text-copper-deep font-bold flex items-center justify-center border border-copper/20 text-sm">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-ink text-sm group-hover:text-copper transition-colors">
                          {c.name}
                        </div>
                        <div className="text-muted text-[11px] flex items-center gap-1 mt-0.5">
                          <Building className="h-3 w-3" />
                          {c.company || "Independent"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-1 text-muted text-[11px]">
                      <div className="flex items-center gap-1.5 text-ink">
                        <Mail className="h-3 w-3 text-muted" /> {c.email}
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-muted" /> {c.phone}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      tone={
                        c.status === "ACTIVE"
                          ? "success"
                          : c.status === "LEAD"
                          ? "info"
                          : c.status === "ONBOARDING"
                          ? "warn"
                          : "neutral"
                      }
                    >
                      {c.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 font-semibold text-ink">
                      <FolderKanban className="h-3.5 w-3.5 text-copper" />
                      {c.activeProjectsCount || c.projects?.length || 0} Projects
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-mono font-bold text-ink">
                      ${Number(c.totalBilled || 0).toLocaleString()}
                    </div>
                    {c.totalPending > 0 && (
                      <div className="text-[10px] text-amber-600 font-medium">
                        ${Number(c.totalPending).toLocaleString()} pending
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => handleOpenEdit(c, e)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                        title="Edit client"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingClientId(c.id)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete client"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedClientId(c.id)}
                        className="p-1.5 rounded-lg border border-line text-muted hover:text-copper hover:bg-copper-wash transition-colors"
                        title="View profile drawer"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredClients.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    No client accounts match the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Slide-over Drawer */}
      <Drawer
        open={!!selectedClientId}
        onClose={() => setSelectedClientId(null)}
        title="Client Profile & Engagements"
        width="w-full max-w-2xl"
      >
        {detailsLoading ? (
          <div className="space-y-4 py-8">
            <div className="h-16 rounded-xl bg-line animate-pulse" />
            <div className="h-32 rounded-xl bg-line animate-pulse" />
          </div>
        ) : clientDetails ? (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="p-5 rounded-2xl bg-canvas border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {clientDetails.avatarUrl ? (
                  <img
                    src={clientDetails.avatarUrl}
                    alt={clientDetails.name}
                    className="h-14 w-14 rounded-full object-cover border border-line shadow-xs"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-copper-wash text-copper-deep font-bold flex items-center justify-center border border-copper/20 text-xl">
                    {clientDetails.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-ink">{clientDetails.name}</h3>
                  <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                    <Building className="h-3.5 w-3.5" />
                    {clientDetails.company || "Independent Client"}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge tone={clientDetails.status === "ACTIVE" ? "success" : "neutral"}>
                      {clientDetails.status}
                    </Badge>
                    {clientDetails.website && (
                      <a
                        href={clientDetails.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-copper-deep hover:underline flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" /> Website ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={() => handleOpenEdit(clientDetails)}
                className="text-xs gap-1.5"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-surface border border-line">
                <span className="text-muted block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-semibold text-ink mt-0.5 block">{clientDetails.email}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-line">
                <span className="text-muted block text-[10px] uppercase font-bold">Phone</span>
                <span className="font-semibold text-ink mt-0.5 block">{clientDetails.phone || "Not provided"}</span>
              </div>
              {clientDetails.address && (
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-surface border border-line">
                  <span className="text-muted block text-[10px] uppercase font-bold">Billing Address</span>
                  <span className="font-semibold text-ink mt-0.5 block">{clientDetails.address}</span>
                </div>
              )}
              {clientDetails.notes && (
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-surface border border-line">
                  <span className="text-muted block text-[10px] uppercase font-bold">Client Notes</span>
                  <p className="text-ink-2 mt-0.5">{clientDetails.notes}</p>
                </div>
              )}
            </div>

            {/* Linked Projects */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <FolderKanban className="h-4 w-4 text-copper" />
                  Linked Projects ({clientDetails.projects?.length || 0})
                </h4>
                <Link href="/projects" className="text-xs font-semibold text-copper-deep hover:underline">
                  Manage Projects
                </Link>
              </div>

              <div className="space-y-2">
                {clientDetails.projects?.map((p: any) => (
                  <div key={p.id} className="p-3 rounded-xl bg-surface border border-line flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-ink">{p.title}</span>
                        <Badge tone={p.status === "COMPLETED" ? "success" : "warn"}>
                          {p.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted mt-0.5">{p.category} • Budget: ${Number(p.budget || 0).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-ink">{p.progress}%</span>
                      <div className="w-16 bg-line rounded-full h-1 mt-1 overflow-hidden">
                        <div className="bg-copper h-1 rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                {(!clientDetails.projects || clientDetails.projects.length === 0) && (
                  <p className="text-xs text-muted py-4 text-center">No projects assigned yet.</p>
                )}
              </div>
            </div>

            {/* Linked Invoices */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Receipt className="h-4 w-4 text-copper" />
                  Billing & Invoices ({clientDetails.invoices?.length || 0})
                </h4>
                <Link href="/invoices" className="text-xs font-semibold text-copper-deep hover:underline">
                  Invoicing Center
                </Link>
              </div>

              <div className="space-y-2">
                {clientDetails.invoices?.map((inv: any) => (
                  <div key={inv.id} className="p-3 rounded-xl bg-surface border border-line flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-ink">{inv.invoiceNumber}</span>
                        <Badge tone={inv.status === "PAID" ? "success" : "warn"}>
                          {inv.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted mt-0.5">Due {new Date(inv.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="font-mono font-bold text-xs text-ink">
                      ${Number(inv.total || 0).toLocaleString()}
                    </div>
                  </div>
                ))}
                {(!clientDetails.invoices || clientDetails.invoices.length === 0) && (
                  <p className="text-xs text-muted py-4 text-center">No invoices issued for this client yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      {/* Create / Edit Client Modal */}
      <Drawer
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingClient ? "Edit Client Account" : "Add New Client"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Client Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Company Name</label>
              <input
                type="text"
                placeholder="e.g. TechCorp Global"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="s.jenkins@techcorp.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (415) 555-0192"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Website URL</label>
              <input
                type="text"
                placeholder="https://techcorp.io or /client"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="field"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="LEAD">LEAD</option>
                <option value="ONBOARDING">ONBOARDING</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Avatar / Photo URL</label>
            <input
              type="text"
              placeholder="/avatars/client.jpg or https://images.unsplash..."
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Billing Address</label>
            <input
              type="text"
              placeholder="100 Montgomery St, San Francisco, CA 94104"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Internal Notes</label>
            <textarea
              rows={3}
              placeholder="Important account notes, contract terms..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="field resize-none"
            />
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingClient ? "Save Changes" : "Create Account"}
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingClientId}
        onClose={() => setDeletingClientId(null)}
        onConfirm={() => deletingClientId && deleteMutation.mutate(deletingClientId)}
        title="Delete Client Account"
        description="Are you sure you want to delete this client? This action will remove all client records and detach any linked projects or invoices."
        confirmText="Yes, Delete Client"
        danger
      />
    </div>
  );
}
