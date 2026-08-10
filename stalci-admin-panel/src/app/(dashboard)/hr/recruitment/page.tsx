"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCandidates,
  createCandidate,
  updateCandidate,
  convertCandidateToEmployee,
  fetchDepartments,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  UserPlus,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  CheckCircle2,
  ExternalLink,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function RecruitmentPipelinePage() {
  const qc = useQueryClient();
  const [stageFilter, setStageFilter] = useState("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [convertCandidate, setConvertCandidate] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentCompany: "",
    experienceYrs: 4,
    skills: "",
    stage: "APPLIED",
    rating: 5,
    interviewDate: "",
    interviewer: "Abhishek Kumar",
    notes: "",
  });

  const [convertData, setConvertData] = useState({
    departmentId: "",
    designation: "",
    salaryCtc: 160000,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const { data: candidates = [], isLoading } = useQuery({
    queryKey: ["candidates", stageFilter],
    queryFn: () => fetchCandidates(stageFilter),
  });

  const createMut = useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Candidate added to hiring pipeline");
      setIsCreateOpen(false);
    },
  });

  const updateStageMut = useMutation({
    mutationFn: ({ id, stage }: { id: number; stage: string }) =>
      updateCandidate(id, { stage }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Candidate stage updated");
    },
  });

  const convertMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      convertCandidateToEmployee(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidates"] });
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Candidate successfully converted into active employee with onboarding tasks!");
      setConvertCandidate(null);
    },
  });

  const handleOpenConvert = (cand: any) => {
    setConvertCandidate(cand);
    setConvertData({
      departmentId: departments[0]?.id ? String(departments[0].id) : "",
      designation: cand.skills?.includes("Go") ? "Staff Distributed Systems Engineer" : "Senior Software Engineer",
      salaryCtc: 175000,
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMut.mutate(formData);
  };

  const handleConvertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertCandidate) return;
    convertMut.mutate({
      id: convertCandidate.id,
      data: {
        departmentId: Number(convertData.departmentId),
        designation: convertData.designation,
        salaryCtc: Number(convertData.salaryCtc),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Talent Acquisition</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Recruitment & Hiring Pipeline
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage candidates across screening, technical challenges, interview rounds, and 1-click employee conversion.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Add Candidate
        </Button>
      </div>

      {/* Stage Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "ALL", label: "All Applicants" },
          { id: "APPLIED", label: "New Applied" },
          { id: "SCREENING", label: "Screening" },
          { id: "INTERVIEW_SCHEDULED", label: "Interviewing" },
          { id: "OFFER_EXTENDED", label: "Offer Extended" },
          { id: "HIRED", label: "Hired (Converted)" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setStageFilter(s.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              stageFilter === s.id
                ? "bg-copper text-slate-950 shadow-sm"
                : "bg-surface border border-line text-muted hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Candidate Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">Loading pipeline candidates...</div>
        ) : candidates.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">No candidates in this stage.</div>
        ) : (
          candidates.map((cand: any) => (
            <div
              key={cand.id}
              className="rounded-2xl border border-line bg-surface p-5 space-y-4 hover:border-copper/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-ink">{cand.name}</h3>
                    <p className="text-[11px] text-muted">{cand.currentCompany || "Independent Specialist"}</p>
                  </div>
                  <Badge
                    tone={
                      cand.stage === "HIRED"
                        ? "success"
                        : cand.stage === "OFFER_EXTENDED"
                        ? "copper"
                        : cand.stage === "INTERVIEW_SCHEDULED"
                        ? "info"
                        : "neutral"
                    }
                  >
                    {cand.stage}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-copper shrink-0" />
                    <span className="font-mono text-[11px] truncate">{cand.email}</span>
                  </div>
                  {cand.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-copper shrink-0" />
                      <span className="font-mono text-[11px]">{cand.phone}</span>
                    </div>
                  )}
                  {cand.interviewDate && (
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <Calendar className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>Interview: {new Date(cand.interviewDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {cand.skills && (
                  <div className="pt-2 border-t border-line">
                    <span className="text-[10px] text-muted font-bold block mb-1">SKILLS</span>
                    <p className="text-[11px] text-slate-700 leading-snug line-clamp-2">{cand.skills}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-line flex items-center justify-between gap-2">
                <select
                  value={cand.stage}
                  onChange={(e) => updateStageMut.mutate({ id: cand.id, stage: e.target.value })}
                  className="field text-xs py-1 px-2 h-8"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="SCREENING">Screening</option>
                  <option value="INTERVIEW_SCHEDULED">Interview</option>
                  <option value="OFFER_EXTENDED">Offer</option>
                  <option value="HIRED">Hired</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                {!cand.convertedToEmp ? (
                  <Button
                    onClick={() => handleOpenConvert(cand)}
                    className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white gap-1"
                  >
                    <UserCheck className="h-3.5 w-3.5" /> Convert to Employee
                  </Button>
                ) : (
                  <Link
                    href={`/hr/employees/${cand.convertedEmpId}`}
                    className="h-8 px-3 rounded-lg border border-line bg-canvas text-xs font-bold text-copper hover:bg-copper/10 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Employee Profile</span> <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Convert Candidate Modal Drawer */}
      <Drawer
        open={!!convertCandidate}
        onClose={() => setConvertCandidate(null)}
        title={`Convert Candidate to Employee: ${convertCandidate?.name}`}
        description="Automatically provisions Employee ID code, assigns department, initializes onboarding tasks, and creates corporate profile."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConvertCandidate(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleConvertSubmit}
              disabled={convertMut.isPending}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Confirm & Generate Employee Roster
            </Button>
          </div>
        }
      >
        <form onSubmit={handleConvertSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Target Department *</label>
            <select
              value={convertData.departmentId}
              onChange={(e) => setConvertData({ ...convertData, departmentId: e.target.value })}
              className="field"
            >
              {departments.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Official Designation *</label>
            <input
              type="text"
              required
              value={convertData.designation}
              onChange={(e) => setConvertData({ ...convertData, designation: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Annual CTC ($ USD) *</label>
            <input
              type="number"
              required
              value={convertData.salaryCtc}
              onChange={(e) => setConvertData({ ...convertData, salaryCtc: Number(e.target.value) })}
              className="field font-mono font-bold"
            />
          </div>
        </form>
      </Drawer>

      {/* Add Candidate Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Applicant to Pipeline"
        description="Ingest candidate profile, contact information, and initial screening notes."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createMut.isPending || !formData.name || !formData.email}
              className="bg-copper text-slate-950 font-bold"
            >
              Add to Pipeline
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Candidate Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Key Technical Skills</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="field"
              placeholder="e.g. Go, Rust, Kubernetes, Raft"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
