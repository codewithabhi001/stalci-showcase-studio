"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInternships, issueInternshipCertificate, deleteInternship, fetchEmployees, createInternship } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  GraduationCap,
  Award,
  Calendar,
  DollarSign,
  UserCheck,
  Printer,
  Building,
  Trash2,
  Plus,
} from "lucide-react";

export default function InternshipsPage() {
  const qc = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    institute: "",
    mentorName: "",
    projectTitle: "",
    stipend: 3500,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    performanceNotes: "",
  });

  const { data: internships = [], isLoading } = useQuery({
    queryKey: ["internships"],
    queryFn: fetchInternships,
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const createMut = useMutation({
    mutationFn: createInternship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
      toast.success("Internship fellowship enrolled successfully");
      setIsCreateOpen(false);
      setFormData({
        employeeId: "",
        institute: "",
        mentorName: "",
        projectTitle: "",
        stipend: 3500,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        performanceNotes: "",
      });
    },
  });

  const certMut = useMutation({
    mutationFn: issueInternshipCertificate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
      toast.success("Internship completion certificate generated and marked issued");
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteInternship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
      toast.success("Internship record deleted");
    },
  });

  const handlePrintCertificate = (intern: any) => {
    const printWin = window.open("", "_blank", "width=900,height=650");
    if (!printWin) return;

    const certCode = `ST-CERT-2026-${String(intern.id).padStart(4, "0")}`;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Certificate of Internship - ${intern.employee?.name}</title>
          <style>
            @page { size: landscape A4; margin: 0; }
            body { font-family: 'Playfair Display', Georgia, serif; color: #0F172A; text-align: center; margin: 0; padding: 30px; background: #FAF8F5; }
            .outer-frame { border: 12px double #D89B5B; padding: 25px; background: #FFFDF9; box-shadow: inset 0 0 20px rgba(216, 155, 91, 0.15); height: calc(100vh - 120px); box-sizing: border-box; position: relative; }
            .corner-dec { position: absolute; width: 40px; height: 40px; border: 3px solid #D89B5B; }
            .top-left { top: 10px; left: 10px; border-right: none; border-bottom: none; }
            .top-right { top: 10px; right: 10px; border-left: none; border-bottom: none; }
            .bottom-left { bottom: 10px; left: 10px; border-right: none; border-top: none; }
            .bottom-right { bottom: 10px; right: 10px; border-left: none; border-top: none; }
            
            .header-mark { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; }
            .logo-text { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 4px; color: #0B0E14; }
            .title { font-size: 30px; font-weight: 700; color: #B47838; margin-top: 10px; letter-spacing: 3px; text-transform: uppercase; }
            .subtitle { font-family: 'Inter', sans-serif; font-size: 13px; color: #64748B; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
            
            .present-text { font-family: 'Inter', sans-serif; font-size: 14px; color: #475569; margin-top: 25px; }
            .emp-name { font-size: 32px; font-weight: 700; color: #0B0E14; margin: 15px 0 5px 0; border-bottom: 2px solid #D89B5B; display: inline-block; padding: 0 40px 6px 40px; }
            .institute { font-family: 'Inter', sans-serif; font-size: 12px; color: #64748B; font-weight: 600; }
            
            .body-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.8; max-width: 720px; margin: 20px auto 0 auto; color: #334155; }
            .body-text strong { color: #0B0E14; }
            
            .signatures { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 45px; padding: 0 40px; }
            .sign-item { text-align: center; }
            .sign-line { border-top: 1px solid #94A3B8; width: 180px; margin-top: 4px; font-size: 11px; font-family: 'Inter', sans-serif; font-weight: 600; color: #475569; padding-top: 4px; }
            
            .gold-seal { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #F5C082 0%, #D89B5B 50%, #9E6229 100%); display: flex; flex-column; align-items: center; justify-content: center; color: #FFF; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(158, 98, 41, 0.3); transform: rotate(-5deg); margin: 0 auto; }
            .cert-code { position: absolute; bottom: 15px; right: 20px; font-family: monospace; font-size: 10px; color: #94A3B8; }
          </style>
        </head>
        <body>
          <div class="outer-frame">
            <div class="corner-dec top-left"></div>
            <div class="corner-dec top-right"></div>
            <div class="corner-dec bottom-left"></div>
            <div class="corner-dec bottom-right"></div>

            <div class="header-mark">
              <svg width="32" height="32" viewBox="0 0 120 120">
                <path d="M 60 22 L 88 38 L 74 46 L 46 30 Z" fill="#D89B5B" />
                <path d="M 32 46 L 74 46 L 88 54 L 46 70 L 32 62 Z" fill="#B47838" />
                <path d="M 46 70 L 74 86 L 60 98 L 32 82 Z" fill="#D89B5B" />
              </svg>
              <span class="logo-text">STALCI GLOBAL TECHNOLOGIES</span>
            </div>

            <div class="title">Certificate of Excellence</div>
            <div class="subtitle">Awarded for Outstanding Engineering & Research Fellowships</div>

            <div class="present-text">This is proudly presented to</div>
            <div class="emp-name">${intern.employee?.name}</div>
            <div class="institute">Academic Institution: ${intern.institute}</div>

            <div class="body-text">
              For successful completion of the research internship as <strong>${intern.employee?.designation}</strong> from <strong>${new Date(intern.startDate).toLocaleDateString()}</strong> to <strong>${new Date(intern.endDate).toLocaleDateString()}</strong>. During their fellowship, they architected and delivered: <em>"${intern.projectTitle}"</em> under the guidance of mentor <strong>${intern.mentorName}</strong>.
            </div>

            <div class="signatures">
              <div class="sign-item">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1E293B;">${intern.mentorName}</div>
                <div class="sign-line">Research Mentor & Lead</div>
              </div>

              <div class="gold-seal">
                OFFICIAL<br>STALCI<br>SEAL
              </div>

              <div class="sign-item">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1E293B;">Managing Director</div>
                <div class="sign-line">STALCI Global Technologies</div>
              </div>
            </div>

            <div class="cert-code">Verification Code: ${certCode}</div>
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Talent Development</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Internship Programs & Research Fellowships
          </h1>
          <p className="text-xs text-muted mt-1">
            Track student researchers, academic institutes, mentorship assignments, stipends, and certificate issuance.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Enroll Intern / Fellowship
        </Button>
      </div>

      {/* Internships Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading internships...</div>
          ) : internships.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">No internship records found.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Intern</th>
                  <th className="px-5 py-3.5">Academic Institute</th>
                  <th className="px-5 py-3.5">Project Title</th>
                  <th className="px-5 py-3.5">Mentor</th>
                  <th className="px-5 py-3.5">Stipend</th>
                  <th className="px-5 py-3.5">Duration</th>
                  <th className="px-5 py-3.5">Certificate</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {internships.map((intern: any) => (
                  <tr key={intern.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div>{intern.employee?.name}</div>
                      <div className="text-[10px] font-mono text-muted">{intern.employee?.employeeCode}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{intern.institute}</td>
                    <td className="px-5 py-4 text-ink font-medium max-w-xs">{intern.projectTitle}</td>
                    <td className="px-5 py-4 text-copper font-semibold">{intern.mentorName}</td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-600">${intern.stipend?.toLocaleString()} / mo</td>
                    <td className="px-5 py-4 font-mono text-muted text-xs">
                      {new Date(intern.startDate).toLocaleDateString()} - {new Date(intern.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={intern.certificateIssued ? "success" : "neutral"}>
                        {intern.certificateIssued ? "Issued" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePrintCertificate(intern)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold text-xs text-copper"
                          title="Generate & Print Certificate"
                        >
                          <Printer className="h-3.5 w-3.5" /> Certificate
                        </button>
                        {!intern.certificateIssued && (
                          <button
                            onClick={() => certMut.mutate(intern.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                            title="Mark Certificate as Issued"
                          >
                            <Award className="h-3.5 w-3.5" /> Mark Issued
                          </button>
                        )}
                        <button
                          onClick={() => deleteMut.mutate(intern.id)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Internship Record"
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

      {/* Enroll Intern / Fellowship Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Enroll Intern & Research Fellowship"
        description="Specify academic institute, research project title, mentor assignment, stipend, and fellowship duration."
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
              disabled={createMut.isPending || !formData.employeeId || !formData.projectTitle}
              className="bg-copper text-slate-950 font-bold"
            >
              Enroll Intern Fellowship
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Select Employee / Intern Roster *</label>
            <select
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="field"
            >
              <option value="">-- Choose Employee / Intern --</option>
              {employees.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.employeeCode} - {emp.designation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Academic Institute / University *</label>
            <input
              type="text"
              placeholder="e.g. Stanford University (Computer Science)"
              value={formData.institute}
              onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Research Project Title *</label>
            <input
              type="text"
              placeholder="e.g. Sovereign Context Scaling & Attention Compression"
              value={formData.projectTitle}
              onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Assigned Mentor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Elena Rostova"
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Monthly Stipend ($ USD)</label>
              <input
                type="number"
                placeholder="3500"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Fellowship Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Fellowship End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Performance & Mentor Evaluation Notes</label>
            <textarea
              rows={3}
              placeholder="Demonstrates exceptional mathematical intuition and efficient PyTorch CUDA kernel implementation..."
              value={formData.performanceNotes}
              onChange={(e) => setFormData({ ...formData, performanceNotes: e.target.value })}
              className="field"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
