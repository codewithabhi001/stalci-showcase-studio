"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOfferLetters,
  createOfferLetter,
  sendOfferLetter,
  fetchCandidates,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  FileText,
  Plus,
  Send,
  Printer,
  Calendar,
  DollarSign,
  Building,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";

export default function OffersPage() {
  const qc = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingOffer, setViewingOffer] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    candidateId: "",
    candidateName: "",
    candidateEmail: "",
    designation: "Senior Cloud Platform Engineer",
    departmentName: "Cloud Infrastructure & SRE",
    salaryCtc: 190000,
    joiningDate: "2026-09-01",
    probationMonths: 3,
    workLocation: "San Francisco, CA / Hybrid",
    terms: "Master Employment Agreement with full health benefits, 401(k) matching, and annual equity grant.",
  });

  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => fetchCandidates(),
  });

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: fetchOfferLetters,
  });

  const createMut = useMutation({
    mutationFn: createOfferLetter,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["offers"] });
      toast.success("Offer letter generated");
      setIsCreateOpen(false);
    },
  });

  const sendMut = useMutation({
    mutationFn: sendOfferLetter,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["offers"] });
      toast.success("Offer letter dispatched to candidate email");
    },
  });

  const handleCandidateSelect = (candIdStr: string) => {
    const cand = candidates.find((c: any) => String(c.id) === candIdStr);
    if (cand) {
      setFormData({
        ...formData,
        candidateId: String(cand.id),
        candidateName: cand.name,
        candidateEmail: cand.email,
      });
    }
  };

  const handlePrintOffer = (offer: any) => {
    const printWin = window.open("", "_blank", "width=850,height=1000");
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Offer Letter - ${offer.candidateName}</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0F172A; line-height: 1.6; padding: 20px; }
            .header { border-bottom: 2px solid #D89B5B; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #0B0E14; }
            .title { font-size: 18px; font-weight: bold; color: #D89B5B; margin-top: 15px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 8px 12px; border: 1px solid #E2E8F0; font-size: 14px; }
            .details-table td.label { font-weight: bold; background: #F8FAFC; width: 35%; }
            .signature { margin-top: 50px; display: flex; justify-content: space-between; }
            .sign-box { border-top: 1px solid #000; padding-top: 8px; width: 200px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">STALCI GLOBAL TECHNOLOGIES</div>
            <div style="font-size: 12px; color: #64748B;">Ref: ST-OFFER-2026-${offer.id}</div>
          </div>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>To,<br><strong>${offer.candidateName}</strong><br>${offer.candidateEmail}</p>
          <div class="title">OFFICIAL LETTER OF EMPLOYMENT OFFER</div>
          <p>Dear ${offer.candidateName},</p>
          <p>We are thrilled to formally offer you the position of <strong>${offer.designation}</strong> in the <strong>${offer.departmentName}</strong> at STALCI Global Technologies Inc.</p>
          
          <table class="details-table">
            <tr><td class="label">Designation</td><td>${offer.designation}</td></tr>
            <tr><td class="label">Department</td><td>${offer.departmentName}</td></tr>
            <tr><td class="label">Annual Remuneration (CTC)</td><td><strong>USD $${offer.salaryCtc?.toLocaleString()}</strong></td></tr>
            <tr><td class="label">Effective Joining Date</td><td>${new Date(offer.joiningDate).toLocaleDateString()}</td></tr>
            <tr><td class="label">Probationary Period</td><td>${offer.probationMonths} Months</td></tr>
            <tr><td class="label">Work Location</td><td>${offer.workLocation}</td></tr>
          </table>

          <p>${offer.terms || "Standard Master Services Agreement terms and zero-trust data confidentiality apply."}</p>

          <div class="signature">
            <div class="sign-box">
              <strong>Abhishek Kumar</strong><br>Founder & Managing Director<br>STALCI Global Technologies
            </div>
            <div class="sign-box">
              <strong>${offer.candidateName}</strong><br>Candidate Acceptance Signature
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
          <span className="eyebrow text-copper">Talent Offers</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Offer Letters & Compensation Proposals
          </h1>
          <p className="text-xs text-muted mt-1">
            Generate formal employment contracts, print A4 offer letters, and track candidate dispatch statuses.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Create Offer Letter
        </Button>
      </div>

      {/* Offers List */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading offer letters...</div>
          ) : offers.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">No offer letters generated yet.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Candidate</th>
                  <th className="px-5 py-3.5">Proposed Role</th>
                  <th className="px-5 py-3.5">Department</th>
                  <th className="px-5 py-3.5">Annual CTC</th>
                  <th className="px-5 py-3.5">Joining Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {offers.map((offer: any) => (
                  <tr key={offer.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div>{offer.candidateName}</div>
                      <div className="text-[10px] font-mono text-muted">{offer.candidateEmail}</div>
                    </td>

                    <td className="px-5 py-4 font-semibold text-ink">{offer.designation}</td>
                    <td className="px-5 py-4 text-muted">{offer.departmentName}</td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-600">
                      ${offer.salaryCtc?.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 font-mono text-muted">
                      {new Date(offer.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        tone={
                          offer.status === "ACCEPTED"
                            ? "success"
                            : offer.status === "SENT"
                            ? "copper"
                            : "neutral"
                        }
                      >
                        {offer.status}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePrintOffer(offer)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="Print A4 Offer Letter"
                        >
                          <Printer className="h-3.5 w-3.5 text-copper" />
                        </button>
                        {offer.status === "DRAFT" && (
                          <button
                            onClick={() => sendMut.mutate(offer.id)}
                            className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                            title="Mark as Sent to Candidate"
                          >
                            <Send className="h-3.5 w-3.5 text-blue-500" />
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

      {/* Create Offer Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Draft Formal Offer Letter"
        description="Specify compensation, department, target start date, and terms of employment."
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
              disabled={createMut.isPending || !formData.candidateName}
              className="bg-copper text-slate-950 font-bold"
            >
              Generate Offer Letter
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Select Candidate from Pipeline</label>
            <select
              value={formData.candidateId}
              onChange={(e) => handleCandidateSelect(e.target.value)}
              className="field"
            >
              <option value="">-- Choose Candidate --</option>
              {candidates.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Candidate Name *</label>
              <input
                type="text"
                required
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Candidate Email *</label>
              <input
                type="email"
                required
                value={formData.candidateEmail}
                onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Designation *</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Annual CTC ($ USD) *</label>
              <input
                type="number"
                required
                value={formData.salaryCtc}
                onChange={(e) => setFormData({ ...formData, salaryCtc: Number(e.target.value) })}
                className="field font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Effective Joining Date *</label>
            <input
              type="date"
              required
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="field font-mono"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
