"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  fetchInquiries,
  updateInquiry,
  deleteInquiry,
  createInquiry,
} from "@/lib/api";
import {
  MessageSquare,
  Search,
  Mail,
  Building,
  DollarSign,
  Briefcase,
  Eye,
  Trash2,
  Send,
  Copy,
  Calendar,
  CheckCircle2,
  Plus,
} from "lucide-react";

export default function InquiriesPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI & Agentic Systems",
    budget: "$50,000 - $100,000",
    message: "",
    status: "NEW",
  });

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
    refetchInterval: 5000,
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateInquiry(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
      if (selectedInquiry && selectedInquiry.id === updated.id) {
        setSelectedInquiry(updated);
      }
      toast.success("Inquiry status updated");
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Inquiry deleted");
      setDeletingId(null);
      if (selectedInquiry?.id === deletingId) {
        setSelectedInquiry(null);
      }
    },
  });

  const createMut = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Inquiry recorded");
      setIsCreateOpen(false);
      setNewForm({
        name: "",
        email: "",
        company: "",
        service: "AI & Agentic Systems",
        budget: "$50,000 - $100,000",
        message: "",
        status: "NEW",
      });
    },
  });

  const filtered = inquiries.filter((inq: any) => {
    const matchesSearch =
      (inq.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (inq.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (inq.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (inq.message || "").toLowerCase().includes(search.toLowerCase()) ||
      (inq.service || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReplyEmail = (inquiry: any) => {
    const subject = encodeURIComponent(
      `Re: STALCI Technical Consultation — ${inquiry.service || "Project Inquiry"}`
    );
    const body = encodeURIComponent(
      `Dear ${inquiry.name},\n\nThank you for reaching out to STALCI regarding ${
        inquiry.service || "your engineering requirements"
      }.\n\nOur principal architecture team has reviewed your specifications: "${
        inquiry.message
      }"\n\nWe would welcome the opportunity to schedule a 30-minute technical discovery session to review architectural topology, timelines, and milestones.\n\nBest regards,\nSTALCI Client Operations\nhttps://stalci.com`
    );
    window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleCopyMessage = (msg: string) => {
    navigator.clipboard.writeText(msg);
    toast.success("Inquiry message copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Client Relationship Management</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">Client Inquiries & Leads</h1>
          <p className="text-xs text-muted mt-1">
            Incoming prospective project briefs, enterprise leads, and consultation requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-bold gap-1.5 bg-copper text-slate-950 hover:bg-copper-soft shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Inquiry Lead
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            placeholder="Search leads by name, email, company, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-line bg-surface text-xs text-ink outline-none focus:border-copper transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-line">
          {["ALL", "NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-copper text-slate-950 shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading client inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">
              <MessageSquare className="h-8 w-8 text-faint mx-auto mb-2" />
              <p className="font-semibold text-ink">No inquiries match your filter criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-4 py-3.5">Lead / Contact</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Service Requested</th>
                  <th className="px-4 py-3.5">Budget</th>
                  <th className="px-4 py-3.5">Message Snippet</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Received</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((inq: any) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-surface-2/70 transition-colors cursor-pointer"
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-ink text-sm">{inq.name}</div>
                      <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3 text-copper" />
                        <span className="hover:underline">{inq.email}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-medium text-ink">
                      {inq.company ? (
                        <span className="flex items-center gap-1.5">
                          <Building className="h-3 w-3 text-muted" />
                          {inq.company}
                        </span>
                      ) : (
                        <span className="text-muted italic">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge tone="copper">{inq.service || "General Inquiry"}</Badge>
                    </td>

                    <td className="px-4 py-3.5 font-mono font-semibold text-ink">
                      {inq.budget || "Custom"}
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="truncate text-ink-2">{inq.message}</p>
                    </td>

                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status || "NEW"}
                        onChange={(e) =>
                          updateMut.mutate({ id: inq.id, data: { status: e.target.value } })
                        }
                        className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs font-bold text-ink outline-none cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[11px] text-muted whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="View Inquiry Details"
                        >
                          <Eye className="h-3.5 w-3.5 text-copper" />
                        </button>

                        <button
                          onClick={() => handleReplyEmail(inq)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="Reply via Email"
                        >
                          <Send className="h-3.5 w-3.5 text-blue-600" />
                        </button>

                        <button
                          onClick={() => setDeletingId(inq.id)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Lead"
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

      {/* Dedicated View Inquiry Details Modal */}
      <Drawer
        open={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title="Client Inquiry Details"
        description="Comprehensive client requirement brief and communication actions."
        width="max-w-2xl"
        footer={
          selectedInquiry && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted">Status:</span>
                <select
                  value={selectedInquiry.status || "NEW"}
                  onChange={(e) =>
                    updateMut.mutate({
                      id: selectedInquiry.id,
                      data: { status: e.target.value },
                    })
                  }
                  className="rounded-xl border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink outline-none cursor-pointer"
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleCopyMessage(selectedInquiry.message)}
                  className="text-xs gap-1.5"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy Message
                </Button>

                <Button
                  onClick={() => handleReplyEmail(selectedInquiry)}
                  className="text-xs gap-1.5 bg-copper text-slate-950 hover:bg-copper-soft font-bold"
                >
                  <Send className="h-3.5 w-3.5" /> Reply to Client
                </Button>
              </div>
            </div>
          )
        }
      >
        {selectedInquiry && (
          <div className="space-y-6">
            {/* Lead Summary Card */}
            <div className="rounded-2xl border border-line bg-surface-2 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">{selectedInquiry.name}</h3>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-xs text-copper font-semibold hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="h-3.5 w-3.5" /> {selectedInquiry.email}
                  </a>
                </div>

                <Badge
                  tone={
                    selectedInquiry.status === "RESOLVED"
                      ? "success"
                      : selectedInquiry.status === "IN_PROGRESS"
                      ? "warning"
                      : "info"
                  }
                >
                  {selectedInquiry.status || "NEW"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-line text-xs">
                <div>
                  <span className="text-muted block text-[11px]">Company</span>
                  <span className="font-bold text-ink">
                    {selectedInquiry.company || "Direct Individual"}
                  </span>
                </div>
                <div>
                  <span className="text-muted block text-[11px]">Requested Service</span>
                  <span className="font-bold text-copper">{selectedInquiry.service || "General"}</span>
                </div>
                <div>
                  <span className="text-muted block text-[11px]">Estimated Budget</span>
                  <span className="font-bold text-emerald-700 font-mono">
                    {selectedInquiry.budget || "Flexible / Not Stated"}
                  </span>
                </div>
              </div>
            </div>

            {/* Complete Message */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">
                  Full Project Brief & Message
                </label>
                <button
                  onClick={() => handleCopyMessage(selectedInquiry.message)}
                  className="text-[11px] font-semibold text-copper hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5 text-sm text-ink-2 leading-relaxed whitespace-pre-wrap font-sans shadow-xs">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-line font-mono">
              <span>Inquiry ID: #{selectedInquiry.id}</span>
              <span>
                Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </Drawer>

      {/* Manual Create Lead Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Record New Client Inquiry"
        description="Add an incoming client requirement or phone consultation."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => createMut.mutate(newForm)}
              disabled={createMut.isPending || !newForm.name || !newForm.email || !newForm.message}
              className="bg-copper text-slate-950 font-bold"
            >
              Save Inquiry Lead
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={newForm.name}
              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
              className="field"
              placeholder="e.g. Sarah Jenkins"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={newForm.email}
              onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
              className="field"
              placeholder="sarah@techcorp.io"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Company</label>
            <input
              type="text"
              value={newForm.company}
              onChange={(e) => setNewForm({ ...newForm, company: e.target.value })}
              className="field"
              placeholder="TechCorp Global"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Service Area</label>
              <select
                value={newForm.service}
                onChange={(e) => setNewForm({ ...newForm, service: e.target.value })}
                className="field"
              >
                <option value="AI & Agentic Systems">AI & Agentic Systems</option>
                <option value="Cloud & Platform Engineering">Cloud & Platform Engineering</option>
                <option value="Cyber Security & Compliance">Cyber Security & Compliance</option>
                <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                <option value="Data Infrastructure">Data Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Budget Tier</label>
              <select
                value={newForm.budget}
                onChange={(e) => setNewForm({ ...newForm, budget: e.target.value })}
                className="field"
              >
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                <option value="$250,000+">$250,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Project Brief / Message *</label>
            <textarea
              rows={5}
              required
              value={newForm.message}
              onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
              className="field resize-none"
              placeholder="Describe requirements, timelines, technical dependencies..."
            />
          </div>
        </form>
      </Drawer>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deletingId}
        title="Delete this client inquiry?"
        message="This action will permanently delete this lead record from the CRM database."
        loading={deleteMut.isPending}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMut.mutate(deletingId)}
      />
    </div>
  );
}
