"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPerformanceReviews,
  fetchTrainings,
  createPerformanceReview,
  updatePerformanceReview,
  createTraining,
  updateTraining,
  fetchEmployees,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  TrendingUp,
  GraduationCap,
  Star,
  Plus,
  Calendar,
  CheckCircle2,
  Award,
  Pencil,
} from "lucide-react";

export default function PerformanceTrainingPage() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<"performance" | "training">("performance");
  const [isRevOpen, setIsRevOpen] = useState(false);
  const [isTrainOpen, setIsTrainOpen] = useState(false);
  const [editingRev, setEditingRev] = useState<any | null>(null);
  const [editingTrain, setEditingTrain] = useState<any | null>(null);

  const [revData, setRevData] = useState({
    employeeId: "",
    reviewerId: "",
    reviewPeriod: "Q3 2026",
    rating: 5,
    goalsKpi: "",
    managerFeedback: "",
    promotionRecommendation: "",
  });

  const [trainData, setTrainData] = useState({
    employeeId: "",
    courseTitle: "",
    trainer: "",
    skillsLearned: "",
    startDate: new Date().toISOString().split("T")[0],
    completionDate: "",
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: reviews = [], isLoading: revLoading } = useQuery({
    queryKey: ["performance-reviews"],
    queryFn: () => fetchPerformanceReviews(),
  });

  const { data: trainings = [], isLoading: trainLoading } = useQuery({
    queryKey: ["trainings"],
    queryFn: () => fetchTrainings(),
  });

  const revMut = useMutation({
    mutationFn: createPerformanceReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["performance-reviews"] });
      toast.success("Performance review submitted");
      setIsRevOpen(false);
    },
  });

  const updateRevMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updatePerformanceReview(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["performance-reviews"] });
      toast.success("Performance appraisal updated");
      setEditingRev(null);
    },
  });

  const trainMut = useMutation({
    mutationFn: createTraining,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trainings"] });
      toast.success("Training program enrolled");
      setIsTrainOpen(false);
    },
  });

  const updateTrainMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateTraining(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trainings"] });
      toast.success("Training record updated");
      setEditingTrain(null);
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Excellence & Growth</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Performance Reviews & Upskilling Programs
          </h1>
          <p className="text-xs text-muted mt-1">
            Conduct 360° KPI evaluations, track promotion recommendations, and manage continuous technical training.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "performance" ? (
            <Button onClick={() => setIsRevOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
              <Star className="h-4 w-4" /> Submit Performance Review
            </Button>
          ) : (
            <Button onClick={() => setIsTrainOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Enroll in Training
            </Button>
          )}
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("performance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "performance"
              ? "bg-copper text-slate-950 shadow-sm"
              : "bg-surface border border-line text-muted hover:text-ink"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> Performance Reviews & KPIs
        </button>
        <button
          onClick={() => setActiveTab("training")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "training"
              ? "bg-copper text-slate-950 shadow-sm"
              : "bg-surface border border-line text-muted hover:text-ink"
          }`}
        >
          <GraduationCap className="h-4 w-4" /> Technical Training & Certifications
        </button>
      </div>

      {/* VIEW: 1. PERFORMANCE */}
      {activeTab === "performance" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {revLoading ? (
            <div className="col-span-full p-12 text-center text-xs text-muted">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="col-span-full p-12 text-center text-xs text-muted">No reviews recorded yet.</div>
          ) : (
            reviews.map((rev: any) => (
              <div key={rev.id} className="rounded-2xl border border-line bg-surface p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-ink">{rev.employee?.name}</h3>
                    <p className="text-[11px] text-muted">{rev.employee?.designation} • {rev.employee?.department?.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingRev(rev)}
                      className="p-1.5 rounded-lg border border-line text-muted hover:text-ink transition-colors cursor-pointer"
                      title="Edit Review Details"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <Badge tone="copper" className="font-bold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {rev.rating} / 5
                    </Badge>
                  </div>
                </div>

                <div className="text-xs space-y-2 pt-2 border-t border-line">
                  <p className="text-muted"><strong className="text-ink">Review Period:</strong> {rev.reviewPeriod}</p>
                  <p className="text-slate-700 leading-relaxed"><strong className="text-ink">Goals:</strong> {rev.goalsKpi}</p>
                  <p className="text-slate-700 leading-relaxed"><strong className="text-ink">Feedback:</strong> {rev.managerFeedback}</p>
                  {rev.promotionRecommendation && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                      <strong>Recommendation:</strong> {rev.promotionRecommendation}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* VIEW: 2. TRAINING */}
      {activeTab === "training" && (
        <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollable-y">
            {trainLoading ? (
              <div className="p-12 text-center text-xs text-muted">Loading trainings...</div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                    <th className="px-5 py-3.5">Employee</th>
                    <th className="px-5 py-3.5">Course / Certification</th>
                    <th className="px-5 py-3.5">Trainer / Provider</th>
                    <th className="px-5 py-3.5">Skills Learned</th>
                    <th className="px-5 py-3.5">Timeline</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {trainings.map((t: any) => (
                    <tr key={t.id} className="hover:bg-surface-2/60 transition-colors">
                      <td className="px-5 py-4 font-bold text-ink">{t.employee?.name}</td>
                      <td className="px-5 py-4 font-semibold text-copper">{t.courseTitle}</td>
                      <td className="px-5 py-4 text-muted">{t.trainer || "STALCI Academy"}</td>
                      <td className="px-5 py-4 text-slate-700 font-mono text-[11px]">{t.skillsLearned || "Architecture"}</td>
                      <td className="px-5 py-4 font-mono text-muted text-xs">
                        {new Date(t.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <Badge tone={t.completionDate ? "success" : "warning"}>
                          {t.completionDate ? "Completed" : "In Progress"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setEditingTrain(t)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-ink transition-colors cursor-pointer"
                          title="Edit Training Program"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Create Review Drawer */}
      <Drawer
        open={isRevOpen}
        onClose={() => setIsRevOpen(false)}
        title="Submit KPI & Performance Review"
        description="Record comprehensive quarterly/annual review and promotion advice."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsRevOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                revMut.mutate(revData);
              }}
              disabled={revMut.isPending || !revData.employeeId}
              className="bg-copper text-slate-950 font-bold"
            >
              Submit Review
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Employee *</label>
            <select
              value={revData.employeeId}
              onChange={(e) => setRevData({ ...revData, employeeId: e.target.value })}
              className="field"
            >
              <option value="">-- Choose Employee --</option>
              {employees.map((e: any) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.employeeCode})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Review Cycle</label>
              <input
                type="text"
                value={revData.reviewPeriod}
                onChange={(e) => setRevData({ ...revData, reviewPeriod: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={revData.rating}
                onChange={(e) => setRevData({ ...revData, rating: Number(e.target.value) })}
                className="field font-bold"
              >
                <option value={5}>5 - Outstanding Excellence</option>
                <option value={4}>4 - Exceeds Expectations</option>
                <option value={3}>3 - Meets Standard</option>
                <option value={2}>2 - Needs Development</option>
                <option value={1}>1 - Unsatisfactory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Manager Feedback & Evaluation *</label>
            <textarea
              rows={3}
              required
              value={revData.managerFeedback}
              onChange={(e) => setRevData({ ...revData, managerFeedback: e.target.value })}
              className="field text-xs"
            />
          </div>
        </form>
      </Drawer>

      {/* Create Training Drawer */}
      <Drawer
        open={isTrainOpen}
        onClose={() => setIsTrainOpen(false)}
        title="Enroll Employee in Technical Training"
        description="Assign courses, skill objectives, and certifications."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsTrainOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                trainMut.mutate(trainData);
              }}
              disabled={trainMut.isPending || !trainData.employeeId}
              className="bg-copper text-slate-950 font-bold"
            >
              Confirm Enrollment
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Employee *</label>
            <select
              value={trainData.employeeId}
              onChange={(e) => setTrainData({ ...trainData, employeeId: e.target.value })}
              className="field"
            >
              <option value="">-- Choose Employee --</option>
              {employees.map((e: any) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.employeeCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Course Title *</label>
            <input
              type="text"
              required
              value={trainData.courseTitle}
              onChange={(e) => setTrainData({ ...trainData, courseTitle: e.target.value })}
              className="field"
            />
          </div>
        </form>
      </Drawer>

      {/* Edit Review Drawer */}
      <Drawer
        open={!!editingRev}
        onClose={() => setEditingRev(null)}
        title={`Edit Performance Appraisal: ${editingRev?.employee?.name || "Employee"}`}
        description="Update rating, key goals & KPIs, manager feedback, and promotion recommendation."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingRev(null)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                editingRev && updateRevMut.mutate({ id: editingRev.id, data: editingRev });
              }}
              disabled={updateRevMut.isPending || !editingRev?.reviewPeriod}
              className="bg-copper text-slate-950 font-bold"
            >
              Save Appraisal Changes
            </Button>
          </div>
        }
      >
        {editingRev && (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Review Period *</label>
                <input
                  type="text"
                  value={editingRev.reviewPeriod || "Q3 2026"}
                  onChange={(e) => setEditingRev({ ...editingRev, reviewPeriod: e.target.value })}
                  className="field"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Overall Rating (1 - 5 Stars) *</label>
                <select
                  value={editingRev.rating || 5}
                  onChange={(e) => setEditingRev({ ...editingRev, rating: Number(e.target.value) })}
                  className="field font-bold text-copper"
                >
                  <option value={5}>5 Stars - Exceptional</option>
                  <option value={4}>4 Stars - Exceeds Expectations</option>
                  <option value={3}>3 Stars - Meets Expectations</option>
                  <option value={2}>2 Stars - Needs Improvement</option>
                  <option value={1}>1 Star - Unsatisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Goals & Key Performance Indicators (KPIs)</label>
              <textarea
                rows={3}
                value={editingRev.goalsKpi || ""}
                onChange={(e) => setEditingRev({ ...editingRev, goalsKpi: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Manager Appraisal Feedback</label>
              <textarea
                rows={3}
                value={editingRev.managerFeedback || ""}
                onChange={(e) => setEditingRev({ ...editingRev, managerFeedback: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Promotion / Transfer Recommendation</label>
              <input
                type="text"
                placeholder="e.g. Recommended for Senior Engineer promotion in Q4"
                value={editingRev.promotionRecommendation || ""}
                onChange={(e) => setEditingRev({ ...editingRev, promotionRecommendation: e.target.value })}
                className="field"
              />
            </div>
          </form>
        )}
      </Drawer>

      {/* Edit Training Drawer */}
      <Drawer
        open={!!editingTrain}
        onClose={() => setEditingTrain(null)}
        title={`Edit Training Program: ${editingTrain?.courseTitle}`}
        description="Update course title, instructor, skills learned, and completion timeline."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingTrain(null)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                editingTrain && updateTrainMut.mutate({ id: editingTrain.id, data: editingTrain });
              }}
              disabled={updateTrainMut.isPending || !editingTrain?.courseTitle}
              className="bg-copper text-slate-950 font-bold"
            >
              Save Training Updates
            </Button>
          </div>
        }
      >
        {editingTrain && (
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Course Title *</label>
              <input
                type="text"
                value={editingTrain.courseTitle || ""}
                onChange={(e) => setEditingTrain({ ...editingTrain, courseTitle: e.target.value })}
                className="field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Trainer / Academy Provider</label>
                <input
                  type="text"
                  value={editingTrain.trainer || "STALCI Academy"}
                  onChange={(e) => setEditingTrain({ ...editingTrain, trainer: e.target.value })}
                  className="field"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Key Skills Taught</label>
                <input
                  type="text"
                  value={editingTrain.skillsLearned || ""}
                  onChange={(e) => setEditingTrain({ ...editingTrain, skillsLearned: e.target.value })}
                  className="field"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingTrain.startDate ? new Date(editingTrain.startDate).toISOString().split("T")[0] : ""}
                  onChange={(e) => setEditingTrain({ ...editingTrain, startDate: e.target.value })}
                  className="field"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Completion Date (Leave blank if ongoing)</label>
                <input
                  type="date"
                  value={editingTrain.completionDate ? new Date(editingTrain.completionDate).toISOString().split("T")[0] : ""}
                  onChange={(e) => setEditingTrain({ ...editingTrain, completionDate: e.target.value })}
                  className="field"
                />
              </div>
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
}
