"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchApplications,
  updateApplication,
  deleteApplication,
} from "@/lib/api";
import {
  Briefcase,
  Users,
  ExternalLink,
  Mail,
  Trash2,
  Eye,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
} from "lucide-react";

export default function JobsAdmin() {
  const [activeTab, setActiveTab] = useState<"roles" | "applications">("roles");
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [deletingAppId, setDeletingAppId] = useState<number | null>(null);
  const [emailTemplate, setEmailTemplate] = useState<"interview" | "offer" | "assessment" | "rejection">("interview");
  const qc = useQueryClient();

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    refetchInterval: 5000,
  });

  const updateAppMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateApplication(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      if (selectedCandidate && selectedCandidate.id === updated.id) {
        setSelectedCandidate(updated);
      }
      toast.success("Candidate status updated");
    },
  });

  const deleteAppMut = useMutation({
    mutationFn: (id: number) => deleteApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application deleted");
      setDeletingAppId(null);
      if (selectedCandidate?.id === deletingAppId) {
        setSelectedCandidate(null);
      }
    },
  });

  // Candidate Email Dispatcher with Pre-populated Templates
  const handleSendCandidateEmail = (app: any, type: string) => {
    let subject = "";
    let body = "";

    const roleName = app.job?.title || "Engineering Position";

    if (type === "interview") {
      subject = `STALCI Engineering — Technical Interview Invitation for ${roleName}`;
      body = `Dear ${app.applicantName},\n\nThank you for applying for the ${roleName} role at STALCI.\n\nOur engineering leads have reviewed your portfolio and background. We would like to invite you for a 45-minute technical discussion and systems architecture interview.\n\nPlease let us know your availability over the coming 3 business days.\n\nBest regards,\nAbhishek Kumar & STALCI Talent Team\nhttps://stalci.com`;
    } else if (type === "offer") {
      subject = `STALCI Career Offer — ${roleName}`;
      body = `Dear ${app.applicantName},\n\nOn behalf of STALCI Global Technologies, we are thrilled to extend an offer for the ${roleName} position!\n\nWe are impressed with your technical expertise and problem-solving depth. The formal compensation structure and start date documentation are attached.\n\nWelcome to STALCI!\n\nBest regards,\nAbhishek Kumar\nManaging Director & Founder\nSTALCI Global Technologies Inc.`;
    } else if (type === "assessment") {
      subject = `STALCI — Technical Take-Home Challenge for ${roleName}`;
      body = `Dear ${app.applicantName},\n\nAs the next step for the ${roleName} role, please review the attached architecture challenge. The objective is to design a high-throughput deterministic data pipeline.\n\nPlease submit your solution within 5 days.\n\nBest regards,\nSTALCI Engineering Team`;
    } else {
      subject = `STALCI Application Update — ${roleName}`;
      body = `Dear ${app.applicantName},\n\nThank you for your interest in joining STALCI. After careful consideration, we have decided to move forward with another candidate whose background more closely aligns with our immediate project requirements.\n\nWe will keep your resume on file for future engineering openings.\n\nBest regards,\nSTALCI Talent Operations`;
    }

    window.open(
      `mailto:${app.applicantEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Human Capital & Talent Operations</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">Talent Operations & Careers</h1>
          <p className="text-xs text-muted mt-1">
            Manage open engineering job roles and review candidate submissions in real time.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-line">
          <button
            onClick={() => setActiveTab("roles")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "roles"
                ? "bg-copper text-slate-950 shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Open Roles ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "applications"
                ? "bg-copper text-slate-950 shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Candidate Pipeline ({applications.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Open Roles */}
      {activeTab === "roles" ? (
        <CrudTable
          title="Open Engineering Roles"
          description="Publish and configure job listings displayed on the public /careers page."
          queryKey="jobs"
          data={jobs}
          isLoading={jobsLoading}
          columns={[
            { key: "title", label: "Position" },
            { key: "location", label: "Location" },
            { key: "type", label: "Type", render: (v: string) => <Badge tone="copper">{v}</Badge> },
            {
              key: "isActive",
              label: "Status",
              render: (v: boolean) => (
                <Badge tone={v ? "success" : "danger"}>{v ? "Active" : "Closed"}</Badge>
              ),
            },
            {
              key: "applications",
              label: "Applicants",
              render: (_: any, row: any) => (
                <span className="font-mono text-xs font-bold text-copper">
                  {row.applications?.length || 0} candidate(s)
                </span>
              ),
            },
          ]}
          formFields={[
            { key: "title", label: "Job Title" },
            { key: "location", label: "Location" },
            {
              key: "type",
              label: "Type",
              type: "select",
              options: ["Full-time", "Part-time", "Contract", "Internship"],
            },
            { key: "description", label: "Description", type: "textarea" },
            {
              key: "requirements",
              label: "Requirements (JSON array or bullets)",
              type: "textarea",
            },
            { key: "isActive", label: "Active & Accepting Candidates", type: "checkbox" },
          ]}
          onCreate={createJob}
          onUpdate={updateJob}
          onDelete={deleteJob}
        />
      ) : (
        /* Tab 2: Candidate Applications */
        <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
          <div className="p-5 border-b border-line flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink">Received Candidate Applications</h2>
              <p className="text-xs text-muted mt-0.5">
                Live applications submitted via the public careers portal.
              </p>
            </div>
            <span className="text-xs font-mono text-copper font-bold">
              {applications.length} Total Applicants
            </span>
          </div>

          <div className="overflow-x-auto scrollable-y">
            {appsLoading ? (
              <div className="p-12 text-center text-xs text-muted">Loading candidate pipeline...</div>
            ) : applications.length === 0 ? (
              <div className="p-12 text-center text-xs text-muted">No candidate applications received yet.</div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                    <th className="px-4 py-3.5">Candidate Name</th>
                    <th className="px-4 py-3.5">Target Role</th>
                    <th className="px-4 py-3.5">Resume / Portfolio</th>
                    <th className="px-4 py-3.5">Applied Date</th>
                    <th className="px-4 py-3.5">Pipeline Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {applications.map((app: any) => (
                    <tr
                      key={app.id}
                      className="hover:bg-surface-2/60 transition-colors cursor-pointer"
                      onClick={() => setSelectedCandidate(app)}
                    >
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-ink text-sm">{app.applicantName}</div>
                        <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3 text-copper" />
                          <span>{app.applicantEmail}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <Badge tone="copper">{app.job?.title || "Engineering Role"}</Badge>
                      </td>

                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `https://${app.resumeUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-line bg-canvas font-semibold text-copper hover:bg-copper/10 text-xs transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Resume / Link
                          </a>
                        ) : (
                          <span className="text-muted italic">None attached</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-muted font-mono text-[11px] whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status || "NEW"}
                          onChange={(e) =>
                            updateAppMut.mutate({ id: app.id, data: { status: e.target.value } })
                          }
                          className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs font-bold text-ink outline-none cursor-pointer"
                        >
                          <option value="NEW">NEW</option>
                          <option value="REVIEWING">REVIEWING</option>
                          <option value="INTERVIEW">INTERVIEW</option>
                          <option value="HIRED">HIRED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>

                      <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedCandidate(app)}
                            className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                            title="View & Schedule Interview"
                          >
                            <Eye className="h-3.5 w-3.5 text-copper" />
                          </button>

                          <button
                            onClick={() => handleSendCandidateEmail(app, "interview")}
                            className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                            title="Send Interview Invitation"
                          >
                            <Send className="h-3.5 w-3.5 text-blue-600" />
                          </button>

                          <button
                            onClick={() => setDeletingAppId(app.id)}
                            className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete candidate"
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
      )}

      {/* Candidate Pipeline Details & Email Dispatcher Drawer */}
      <Drawer
        open={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Candidate Profile & Interview Operations"
        description="Review candidate background, change pipeline stage, and send email communications."
        width="max-w-2xl"
        footer={
          selectedCandidate && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted">Pipeline Stage:</span>
                <select
                  value={selectedCandidate.status || "NEW"}
                  onChange={(e) =>
                    updateAppMut.mutate({
                      id: selectedCandidate.id,
                      data: { status: e.target.value },
                    })
                  }
                  className="rounded-xl border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink outline-none cursor-pointer"
                >
                  <option value="NEW">NEW</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="HIRED">HIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSendCandidateEmail(selectedCandidate, emailTemplate)}
                  className="text-xs font-bold gap-1.5 bg-copper text-slate-950 hover:bg-copper-soft"
                >
                  <Send className="h-3.5 w-3.5" /> Send {emailTemplate.toUpperCase()} Email
                </Button>
              </div>
            </div>
          )
        }
      >
        {selectedCandidate && (
          <div className="space-y-6">
            {/* Candidate Header Card */}
            <div className="rounded-2xl border border-line bg-surface-2 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">{selectedCandidate.applicantName}</h3>
                  <a
                    href={`mailto:${selectedCandidate.applicantEmail}`}
                    className="text-xs text-copper font-semibold hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="h-3.5 w-3.5" /> {selectedCandidate.applicantEmail}
                  </a>
                </div>

                <Badge tone="copper">
                  {selectedCandidate.job?.title || "Engineering Role"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-line text-xs">
                <div>
                  <span className="text-muted block text-[11px]">Applied Position</span>
                  <span className="font-bold text-ink">{selectedCandidate.job?.title || "Open Role"}</span>
                </div>
                <div>
                  <span className="text-muted block text-[11px]">Submission Date</span>
                  <span className="font-mono text-ink">
                    {new Date(selectedCandidate.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted block text-[11px]">Resume / Portfolio</span>
                  {selectedCandidate.resumeUrl ? (
                    <a
                      href={
                        selectedCandidate.resumeUrl.startsWith("http")
                          ? selectedCandidate.resumeUrl
                          : `https://${selectedCandidate.resumeUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-copper hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> View Portfolio
                    </a>
                  ) : (
                    <span className="text-muted italic">None</span>
                  )}
                </div>
              </div>
            </div>

            {/* Email Dispatcher Template Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-ink uppercase tracking-wider block">
                Quick Candidate Email Actions
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "interview", label: "Schedule Interview", icon: Calendar },
                  { id: "assessment", label: "Technical Challenge", icon: FileText },
                  { id: "offer", label: "Extend Job Offer", icon: Sparkles },
                  { id: "rejection", label: "Polite Rejection", icon: Clock },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = emailTemplate === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEmailTemplate(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? "border-copper bg-copper/10 text-copper-deep font-bold"
                          : "border-line bg-surface text-muted hover:text-ink hover:bg-surface-2"
                      }`}
                    >
                      <Icon className="h-4 w-4 mb-1 text-copper" />
                      <span className="text-xs block leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-muted">
                Clicking <strong>Send Email</strong> will open your email client with the tailored message addressed to{" "}
                <span className="text-ink font-semibold">{selectedCandidate.applicantEmail}</span>.
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deletingAppId}
        title="Delete Candidate Application?"
        message="This will remove the candidate's application submission from the talent database."
        loading={deleteAppMut.isPending}
        onCancel={() => setDeletingAppId(null)}
        onConfirm={() => deletingAppId && deleteAppMut.mutate(deletingAppId)}
      />
    </div>
  );
}
