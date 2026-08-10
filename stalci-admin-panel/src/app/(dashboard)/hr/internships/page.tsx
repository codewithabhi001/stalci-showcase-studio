"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInternships, issueInternshipCertificate } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  GraduationCap,
  Award,
  Calendar,
  DollarSign,
  UserCheck,
  Printer,
  Building,
} from "lucide-react";

export default function InternshipsPage() {
  const qc = useQueryClient();

  const { data: internships = [], isLoading } = useQuery({
    queryKey: ["internships"],
    queryFn: fetchInternships,
  });

  const certMut = useMutation({
    mutationFn: issueInternshipCertificate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
      toast.success("Internship completion certificate generated and marked issued");
    },
  });

  const handlePrintCertificate = (intern: any) => {
    const printWin = window.open("", "_blank", "width=900,height=650");
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Certificate of Internship - ${intern.employee?.name}</title>
          <style>
            @page { size: landscape A4; margin: 10mm; }
            body { font-family: 'Georgia', serif; color: #0F172A; text-align: center; padding: 40px; background: #FFFDF9; }
            .border-frame { border: 8px double #D89B5B; padding: 30px; height: calc(100% - 80px); position: relative; }
            .logo { font-family: 'Helvetica Neue', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #0B0E14; }
            .title { font-size: 32px; font-weight: bold; color: #D89B5B; margin-top: 20px; letter-spacing: 2px; }
            .subtitle { font-size: 16px; color: #64748B; margin-top: 5px; }
            .emp-name { font-size: 28px; font-weight: bold; color: #0B0E14; margin: 25px 0 10px 0; border-bottom: 2px solid #D89B5B; display: inline-block; padding: 0 40px 5px 40px; }
            .body-text { font-size: 16px; line-height: 1.8; max-width: 750px; margin: 0 auto; color: #334155; }
            .signatures { display: flex; justify-content: space-around; margin-top: 50px; }
            .sign-item { text-align: center; }
            .sign-line { border-top: 1px solid #64748B; width: 180px; margin-top: 5px; font-size: 12px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div class="border-frame">
            <div class="logo">STALCI GLOBAL TECHNOLOGIES</div>
            <div class="title">CERTIFICATE OF INTERNSHIP EXCELLENCE</div>
            <div class="subtitle">Awarded for Outstanding Engineering & Research Craftsmanship</div>

            <p style="margin-top: 20px; font-size: 15px;">This is proudly presented to</p>
            <div class="emp-name">${intern.employee?.name}</div>
            <p style="font-size: 13px; color: #64748B; margin-bottom: 20px;">Representing: ${intern.institute}</p>

            <div class="body-text">
              In recognition of successful completion of the research program as <strong>${intern.employee?.designation}</strong> from <strong>${new Date(intern.startDate).toLocaleDateString()}</strong> to <strong>${new Date(intern.endDate).toLocaleDateString()}</strong>. During their tenure, they architected and delivered the initiative: <em>"${intern.projectTitle}"</em> under the mentorship of <strong>${intern.mentorName}</strong>.
            </div>

            <div class="signatures">
              <div class="sign-item">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 26px;">${intern.mentorName}</div>
                <div class="sign-line">Research Mentor & Lead</div>
              </div>
              <div class="sign-item">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 26px;">Abhishek Kumar</div>
                <div class="sign-line">Founder & Managing Director</div>
              </div>
            </div>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
