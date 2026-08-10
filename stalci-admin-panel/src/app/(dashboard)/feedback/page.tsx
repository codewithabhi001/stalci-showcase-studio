"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFeedbacks, createFeedback, updateFeedback, deleteFeedback } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  Star,
  Eye,
  Pencil,
  Trash2,
  Plus,
  MessageSquare,
  Building,
  CheckCircle2,
  Quote,
} from "lucide-react";

export default function FeedbackAdmin() {
  const qc = useQueryClient();
  const [viewingFeedback, setViewingFeedback] = useState<any | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comments: "",
  });

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  const createMut = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Client feedback review added");
      setIsCreateOpen(false);
      setFormData({ name: "", rating: 5, comments: "" });
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateFeedback(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Client feedback updated");
      setEditingFeedback(null);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Client feedback deleted");
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Client Testimonials</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Client Reviews & Enterprise Feedback
          </h1>
          <p className="text-xs text-muted mt-1">
            Review, edit, and organize client ratings and testimonials published across the STALCI portfolio.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Client Review
        </Button>
      </div>

      {/* Reviews Roster Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading client reviews...</div>
          ) : feedbacks.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">No client feedback reviews recorded yet.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Client / Partner</th>
                  <th className="px-5 py-3.5">Rating</th>
                  <th className="px-5 py-3.5">Review / Comments</th>
                  <th className="px-5 py-3.5">Received Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {feedbacks.map((item: any) => (
                  <tr key={item.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-copper/10 border border-copper/30 text-copper flex items-center justify-center font-bold text-xs shrink-0">
                          {(item.name || "A").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-ink">{item.name || "Anonymous Partner"}</div>
                          <div className="text-[10px] text-muted">Verified Enterprise Client</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-700 max-w-md">
                      <p className="line-clamp-2 text-xs leading-relaxed">{item.comments}</p>
                    </td>

                    <td className="px-5 py-4 font-mono text-muted text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingFeedback(item)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="View Full Testimonial Modal"
                        >
                          <Eye className="h-3.5 w-3.5 text-copper" />
                        </button>

                        <button
                          onClick={() => setEditingFeedback(item)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-ink transition-colors cursor-pointer"
                          title="Edit Review Details"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => deleteMut.mutate(item.id)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Review"
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

      {/* 👁️ View Full Review Modal */}
      <Drawer
        open={!!viewingFeedback}
        onClose={() => setViewingFeedback(null)}
        title="Client Testimonial & Review Details"
        description="Full verified review submitted by client partner."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setViewingFeedback(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                const f = viewingFeedback;
                setViewingFeedback(null);
                setEditingFeedback(f);
              }}
              className="bg-copper text-slate-950 font-bold"
            >
              Edit Testimonial
            </Button>
          </div>
        }
      >
        {viewingFeedback && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-copper text-slate-950 font-extrabold text-lg flex items-center justify-center shadow-sm">
                  {(viewingFeedback.name || "A").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{viewingFeedback.name || "Anonymous Partner"}</h3>
                  <Badge tone="success" className="text-[10px] font-mono mt-0.5">
                    Verified Enterprise Client
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  {Array.from({ length: viewingFeedback.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-copper mt-1 block">
                  {viewingFeedback.rating || 5} Out of 5 Stars
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-canvas p-5 relative">
              <Quote className="h-8 w-8 text-copper/20 absolute top-4 right-4" />
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
                Client Testimonial Statement
              </span>
              <p className="text-sm text-ink leading-relaxed italic font-serif">
                "{viewingFeedback.comments}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-line p-3 bg-surface">
                <span className="text-muted text-[10px] block">Received Date</span>
                <span className="font-mono font-bold text-ink mt-0.5 block">
                  {new Date(viewingFeedback.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="rounded-xl border border-line p-3 bg-surface">
                <span className="text-muted text-[10px] block">Publishing Status</span>
                <span className="font-bold text-emerald-600 mt-0.5 block">
                  Published to Live Portfolio
                </span>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* ✏️ Edit Review Drawer */}
      <Drawer
        open={!!editingFeedback}
        onClose={() => setEditingFeedback(null)}
        title={`Edit Client Feedback: ${editingFeedback?.name}`}
        description="Update client name, rating, and review statement."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingFeedback(null)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                editingFeedback && updateMut.mutate({ id: editingFeedback.id, data: editingFeedback });
              }}
              disabled={updateMut.isPending || !editingFeedback?.name}
              className="bg-copper text-slate-950 font-bold"
            >
              Save Changes
            </Button>
          </div>
        }
      >
        {editingFeedback && (
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Client / Partner Name *</label>
              <input
                type="text"
                value={editingFeedback.name || ""}
                onChange={(e) => setEditingFeedback({ ...editingFeedback, name: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Star Rating (1 - 5 Stars) *</label>
              <select
                value={editingFeedback.rating || 5}
                onChange={(e) => setEditingFeedback({ ...editingFeedback, rating: Number(e.target.value) })}
                className="field font-bold text-copper"
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Good</option>
                <option value={2}>2 Stars - Fair</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Review / Feedback Comments *</label>
              <textarea
                rows={4}
                value={editingFeedback.comments || ""}
                onChange={(e) => setEditingFeedback({ ...editingFeedback, comments: e.target.value })}
                className="field text-xs"
              />
            </div>
          </form>
        )}
      </Drawer>

      {/* ➕ Create Review Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Client Feedback"
        description="Catalog client ratings and testimonial reviews."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                createMut.mutate(formData);
              }}
              disabled={createMut.isPending || !formData.name || !formData.comments}
              className="bg-copper text-slate-950 font-bold"
            >
              Submit Feedback
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Client / Partner Company Name *</label>
            <input
              type="text"
              placeholder="e.g. AbhiNextGen IT & Solutions"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Rating Score *</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="field font-bold text-copper"
            >
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Good</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={1}>1 Star - Poor</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Testimonial Statement *</label>
            <textarea
              rows={4}
              placeholder="Working with the STALCI engineering team was a great experience..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="field text-xs"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
