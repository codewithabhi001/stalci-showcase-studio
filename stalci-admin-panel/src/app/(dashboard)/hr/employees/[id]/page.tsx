"use client";
import { use } from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployeeById,
  toggleOnboardingTask,
  updateEmployee,
  createEmployeeDocument,
  deleteEmployeeDocument,
} from "@/lib/api";
import { useRbac } from "@/lib/rbac-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Laptop,
  GraduationCap,
  TrendingUp,
  FileText,
  History,
  ArrowLeft,
  Award,
  AlertCircle,
  ExternalLink,
  FileCode,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  Upload,
  FolderCheck,
  CreditCard,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { Drawer } from "@/components/ui/drawer";

export default function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const employeeId = Number(resolvedParams.id);
  const qc = useQueryClient();
  const { currentRole } = useRbac();
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "onboarding" | "attendance" | "payroll" | "history" | "performance" | "assets"
  >("overview");

  const [isBankOpen, setIsBankOpen] = useState(false);
  const [bankFormData, setBankFormData] = useState({
    bankName: "",
    bankAccount: "",
    ifscSwift: "",
    accountHolderName: "",
    bankBranch: "",
    accountType: "Salary Account",
    taxIdPanSsn: "",
    pfUanNumber: "",
    personalEmail: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [isDocOpen, setIsDocOpen] = useState(false);
  const [docFormData, setDocFormData] = useState({
    documentType: "BANK_PROOF",
    documentName: "",
    documentUrl: "",
    notes: "",
  });

  const { data: emp, isLoading } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => fetchEmployeeById(employeeId),
  });

  const toggleTaskMut = useMutation({
    mutationFn: ({ taskId, isCompleted }: { taskId: number; isCompleted: boolean }) =>
      toggleOnboardingTask(taskId, isCompleted),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee", employeeId] });
      toast.success("Onboarding task updated");
    },
  });

  const updateBankMut = useMutation({
    mutationFn: (data: any) => updateEmployee(employeeId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee", employeeId] });
      toast.success("Banking, tax & emergency contact details updated");
      setIsBankOpen(false);
    },
  });

  const addDocMut = useMutation({
    mutationFn: (data: any) => createEmployeeDocument(employeeId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee", employeeId] });
      toast.success("Employee document uploaded successfully");
      setIsDocOpen(false);
      setDocFormData({ documentType: "BANK_PROOF", documentName: "", documentUrl: "", notes: "" });
    },
  });

  const deleteDocMut = useMutation({
    mutationFn: (docId: number) => deleteEmployeeDocument(docId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee", employeeId] });
      toast.success("Document removed");
    },
  });

  if (isLoading) {
    return <div className="p-12 text-center text-xs text-muted">Loading 360° Employee Profile...</div>;
  }

  if (!emp) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-ink">Employee not found</h2>
        <Link href="/hr/employees" className="text-xs text-copper underline">
          ← Back to Employee Directory
        </Link>
      </div>
    );
  }

  const skillsList: string[] = emp.skills
    ? typeof emp.skills === "string"
      ? emp.skills.startsWith("[")
        ? JSON.parse(emp.skills)
        : emp.skills.split(",").map((s: string) => s.trim())
      : emp.skills
    : [];

  const completedTasks = emp.onboardingTasks?.filter((t: any) => t.isCompleted).length || 0;
  const totalTasks = emp.onboardingTasks?.length || 0;
  const onboardingPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/hr/employees"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Workforce Directory
        </Link>
      </div>

      {/* Header Profile Card */}
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-500 to-copper text-[#080A0F] flex items-center justify-center font-extrabold text-2xl shadow-lg border border-white/20 shrink-0">
              {emp.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-ink tracking-tight">{emp.name}</h1>
                <Badge tone="copper" className="font-mono text-xs">
                  {emp.employeeCode}
                </Badge>
                <Badge
                  tone={
                    emp.status === "ACTIVE"
                      ? "success"
                      : emp.status === "ONBOARDING"
                      ? "info"
                      : emp.status === "NOTICE_PERIOD"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {emp.status}
                </Badge>
              </div>

              <p className="text-sm font-semibold text-copper mt-1 flex items-center gap-2">
                <span>{emp.designation}</span>
                <span>•</span>
                <span className="text-muted">{emp.department?.name || "General Engineering"}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-copper" /> {emp.email}
                </span>
                {emp.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-copper" /> {emp.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-copper" /> Joined {new Date(emp.joiningDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {currentRole !== "RECRUITER" && (
            <div className="rounded-2xl border border-line bg-canvas p-4 text-right shrink-0">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                Annual Remuneration (CTC)
              </span>
              <div className="text-2xl font-extrabold text-ink font-mono mt-0.5">
                ${emp.salaryCtc?.toLocaleString()}
              </div>
              <span className="text-[10px] text-muted block mt-1">Monthly ~${Math.round((emp.salaryCtc || 0) / 12).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Quick Action Document Dispatch Toolbar */}
        <div className="mt-6 pt-5 border-t border-line flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-bold text-ink">Employee Quick Document & Certificate Actions:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/hr/letters"
              className="px-3 py-1.5 rounded-xl border border-line bg-canvas hover:bg-copper/10 text-xs font-bold text-copper flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileCode className="h-3.5 w-3.5" /> Issue HR Letter / Cert
            </Link>
            <Link
              href="/hr/internships"
              className="px-3 py-1.5 rounded-xl border border-line bg-canvas hover:bg-copper/10 text-xs font-bold text-copper flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="h-3.5 w-3.5" /> Issue Internship Cert
            </Link>
            <Link
              href="/hr/payroll"
              className="px-3 py-1.5 rounded-xl border border-line bg-canvas hover:bg-copper/10 text-xs font-bold text-copper flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <DollarSign className="h-3.5 w-3.5" /> View Payslips & Salary
            </Link>
            <Link
              href="/hr/exits"
              className="px-3 py-1.5 rounded-xl border border-line bg-canvas hover:bg-copper/10 text-xs font-bold text-copper flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Exit & F&F Clearance
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-t border-line pt-4 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Credentials", icon: User },
            { id: "documents", label: `Document Vault (${emp.documents?.length || 0})`, icon: FolderCheck },
            { id: "onboarding", label: `Onboarding (${onboardingPct}%)`, icon: CheckCircle2 },
            { id: "attendance", label: "Attendance & Leaves", icon: Clock },
            ...(currentRole !== "RECRUITER" ? [{ id: "payroll", label: "Payroll & Payslips", icon: DollarSign }] : []),
            { id: "history", label: "Career & History", icon: History },
            { id: "performance", label: "KPI & Performance", icon: TrendingUp },
            { id: "assets", label: "Assigned Assets", icon: Laptop },
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-copper text-[#080A0F] shadow-sm"
                  : "text-muted hover:text-ink hover:bg-surface-2"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Technical Skills & Expertise */}
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-3">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <Award className="h-4 w-4 text-copper" />
                Technical Competencies & Practice Areas
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-canvas border border-line text-ink font-mono text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency & Personal Details */}
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-copper" />
                Emergency Contact & Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted font-bold block">Personal Email</span>
                  <span className="text-ink font-mono">{emp.personalEmail || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted font-bold block">Work Location</span>
                  <span className="text-ink">{emp.workLocation}</span>
                </div>
                <div>
                  <span className="text-muted font-bold block">Emergency Contact Person</span>
                  <span className="text-ink font-semibold">{emp.emergencyContactName || "Not Recorded"}</span>
                </div>
                <div>
                  <span className="text-muted font-bold block">Emergency Contact Phone</span>
                  <span className="text-ink font-mono">{emp.emergencyContactPhone || "Not Recorded"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banking & Statutory Tax Details */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-copper" />
                  Banking & Statutory Account Details
                </h3>
                <button
                  onClick={() => {
                    setBankFormData({
                      bankName: emp.bankName || "",
                      bankAccount: emp.bankAccount || "",
                      ifscSwift: emp.ifscSwift || "",
                      accountHolderName: emp.accountHolderName || emp.name || "",
                      bankBranch: emp.bankBranch || "",
                      accountType: emp.accountType || "Salary Account",
                      taxIdPanSsn: emp.taxIdPanSsn || "",
                      pfUanNumber: emp.pfUanNumber || "",
                      personalEmail: emp.personalEmail || "",
                      emergencyContactName: emp.emergencyContactName || "",
                      emergencyContactPhone: emp.emergencyContactPhone || "",
                    });
                    setIsBankOpen(true);
                  }}
                  className="p-1.5 rounded-lg border border-line text-muted hover:text-ink transition-colors cursor-pointer"
                  title="Edit Bank & Tax Details"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted block font-bold">Banking Institution</span>
                  <span className="text-ink font-semibold">{emp.bankName || "Not Provided"}</span>
                  {emp.bankBranch && <span className="text-[11px] text-muted block">Branch: {emp.bankBranch}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted block font-bold">Account Holder</span>
                    <span className="text-ink font-semibold">{emp.accountHolderName || emp.name}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">Account Type</span>
                    <span className="text-ink font-semibold">{emp.accountType || "Salary Account"}</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted block font-bold">Account Number / IBAN</span>
                  <span className="text-ink font-mono font-bold">{emp.bankAccount || "Not Recorded"}</span>
                </div>
                <div>
                  <span className="text-muted block font-bold">IFSC / SWIFT / Routing Code</span>
                  <span className="text-ink font-mono font-semibold">{emp.ifscSwift || "Not Recorded"}</span>
                </div>
                <div className="pt-2 border-t border-line grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted block font-bold">PAN / SSN / Tax ID</span>
                    <span className="text-ink font-mono font-bold">{emp.taxIdPanSsn || "TAX-8492019"}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">PF / UAN Number</span>
                    <span className="text-ink font-mono font-bold">{emp.pfUanNumber || "PF-10098234"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Probation Status */}
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-2">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <Calendar className="h-4 w-4 text-copper" />
                Probation Status
              </h3>
              <p className="text-xs text-muted">
                Status: <strong className="text-ink">{emp.probationStatus || "CONFIRMED"}</strong>
              </p>
              {emp.probationEndDate && (
                <p className="text-xs text-muted">
                  End Date: {new Date(emp.probationEndDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. DOCUMENT VAULT */}
      {activeTab === "documents" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-4">
            <div>
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <FolderCheck className="h-4 w-4 text-copper" />
                Employee Document Vault & Statutory Attachments
              </h3>
              <p className="text-xs text-muted">Official tax cards, bank passbooks, offer letters, NDAs, and salary statements.</p>
            </div>
            <Button
              onClick={() => setIsDocOpen(true)}
              className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" /> Upload New Document
            </Button>
          </div>

          {!emp.documents || emp.documents.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FolderCheck className="h-10 w-10 text-muted mx-auto opacity-50" />
              <p className="text-xs text-muted font-semibold">No statutory documents uploaded yet for {emp.name}.</p>
              <Button
                variant="secondary"
                onClick={() => setIsDocOpen(true)}
                className="text-xs gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Attach Bank Passbook / Tax Form
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emp.documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-line bg-canvas p-4 space-y-3 relative group hover:border-copper/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-copper/10 text-copper flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink line-clamp-1">{doc.fileName}</h4>
                        <Badge tone="copper" className="text-[10px] mt-0.5">
                          {doc.documentType}
                        </Badge>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteDocMut.mutate(doc.id)}
                      disabled={deleteDocMut.isPending}
                      className="p-1.5 text-muted hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {doc.notes && <p className="text-[11px] text-muted line-clamp-2">{doc.notes}</p>}

                  <div className="pt-3 border-t border-line flex items-center justify-between text-[11px] text-muted font-mono">
                    <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    {doc.fileUrl ? (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-copper hover:underline font-bold flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> View / Download
                      </a>
                    ) : (
                      <span className="text-emerald-600 font-bold">Verified On File</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. ONBOARDING */}
      {activeTab === "onboarding" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h3 className="text-sm font-bold text-ink">Employee Onboarding Checklist</h3>
              <p className="text-xs text-muted">Track statutory document verification, hardware distribution, and team introductions.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-ink">{completedTasks} of {totalTasks} Completed</span>
              <div className="h-2 w-36 rounded-full bg-surface-2 mt-1 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${onboardingPct}%` }} />
              </div>
            </div>
          </div>

          <div className="divide-y divide-line">
            {emp.onboardingTasks?.map((task: any) => (
              <div key={task.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) =>
                      toggleTaskMut.mutate({ taskId: task.id, isCompleted: e.target.checked })
                    }
                    className="h-4 w-4 accent-copper cursor-pointer"
                  />
                  <div>
                    <h4 className={`text-xs font-bold ${task.isCompleted ? "line-through text-muted" : "text-ink"}`}>
                      {task.taskName}
                    </h4>
                    <span className="text-[10px] text-muted font-mono">{task.category}</span>
                  </div>
                </div>

                <Badge tone={task.isCompleted ? "success" : "neutral"}>
                  {task.isCompleted ? "Completed" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. ATTENDANCE & LEAVES */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
            <h3 className="text-sm font-bold text-ink">Recent Attendance Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-muted uppercase text-[10px] font-bold">
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Check-In Time</th>
                    <th className="py-2.5">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {emp.attendances?.slice(0, 10).map((att: any) => (
                    <tr key={att.id}>
                      <td className="py-3 font-mono">{new Date(att.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        <Badge tone={att.status === "PRESENT" ? "success" : att.status === "WFH" ? "info" : "neutral"}>
                          {att.status}
                        </Badge>
                      </td>
                      <td className="py-3 font-mono text-muted">{att.checkInTime ? new Date(att.checkInTime).toLocaleTimeString() : "--"}</td>
                      <td className="py-3 text-muted">{att.notes || "Standard shift"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
            <h3 className="text-sm font-bold text-ink">Leave & Time-Off History</h3>
            <div className="divide-y divide-line">
              {emp.leaveRequests?.map((leave: any) => (
                <div key={leave.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-ink">{leave.leaveType} Leave ({leave.daysCount} Days)</h4>
                    <p className="text-[11px] text-muted font-mono">
                      {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted mt-1">Reason: {leave.reason}</p>
                  </div>
                  <Badge tone={leave.status === "APPROVED" ? "success" : leave.status === "REJECTED" ? "danger" : "warning"}>
                    {leave.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. PAYROLL */}
      {activeTab === "payroll" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <h3 className="text-sm font-bold text-ink">Monthly Payslip & Disbursal History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-muted uppercase text-[10px] font-bold">
                  <th className="py-2.5">Period</th>
                  <th className="py-2.5">Basic</th>
                  <th className="py-2.5">HRA & Allowances</th>
                  <th className="py-2.5">Tax Deductions</th>
                  <th className="py-2.5">Net Disbursed</th>
                  <th className="py-2.5">Reference</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {emp.payrollRecords?.map((pay: any) => (
                  <tr key={pay.id}>
                    <td className="py-3 font-bold text-ink">{pay.month} {pay.year}</td>
                    <td className="py-3 font-mono">${pay.basicSalary?.toLocaleString()}</td>
                    <td className="py-3 font-mono">${((pay.hra || 0) + (pay.allowances || 0))?.toLocaleString()}</td>
                    <td className="py-3 font-mono text-red-600">-${pay.taxDeductions?.toLocaleString()}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">${pay.netSalary?.toLocaleString()}</td>
                    <td className="py-3 font-mono text-[10px] text-muted">{pay.referenceNumber}</td>
                    <td className="py-3"><Badge tone="success">{pay.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. CAREER HISTORY */}
      {activeTab === "history" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <h3 className="text-sm font-bold text-ink">Promotion, Transfer & Compensation Timeline</h3>
          <div className="divide-y divide-line">
            {emp.historyRecords?.length === 0 ? (
              <p className="text-xs text-muted py-4">No historical revisions recorded yet.</p>
            ) : (
              emp.historyRecords?.map((h: any) => (
                <div key={h.id} className="py-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-ink">{h.previousDesignation} → {h.newDesignation}</strong>
                    <span className="font-mono text-muted">{new Date(h.effectiveDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted">
                    Remuneration: ${h.previousSalary?.toLocaleString()} → <strong className="text-emerald-400">${h.newSalary?.toLocaleString()}</strong>
                  </p>
                  <p className="text-xs text-muted">Rationale: {h.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. PERFORMANCE */}
      {activeTab === "performance" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <h3 className="text-sm font-bold text-ink">Performance Reviews & KPI Appraisals</h3>
          <div className="space-y-4">
            {emp.performanceReviews?.map((rev: any) => (
              <div key={rev.id} className="rounded-xl border border-line bg-canvas p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-sm">Review Cycle: {rev.reviewPeriod}</span>
                  <Badge tone="copper">Rating: {rev.rating} / 5 Stars</Badge>
                </div>
                <p className="text-muted"><strong>KPI Goals:</strong> {rev.goalsKpi}</p>
                <p className="text-ink"><strong>Manager Feedback:</strong> {rev.managerFeedback}</p>
                {rev.salaryRevisionRecommendation && (
                  <p className="text-emerald-600 font-semibold">
                    Recommendation: {rev.salaryRevisionRecommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 7. ASSETS */}
      {activeTab === "assets" && (
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <h3 className="text-sm font-bold text-ink">Assigned IT & Hardware Inventory</h3>
          <div className="divide-y divide-line">
            {emp.assignedAssets?.map((asset: any) => (
              <div key={asset.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-ink">{asset.name}</h4>
                  <p className="text-[11px] font-mono text-muted">Serial: {asset.serialNumber} • Condition: {asset.condition}</p>
                </div>
                <Badge tone="info">Assigned</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Bank Account & Statutory Tax Details Drawer */}
      <Drawer
        open={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        title={`Update Bank Account & Statutory Tax Details: ${emp.name}`}
        description="Enter banking institution, account holder, IBAN/Account Number, IFSC/SWIFT code, PAN/SSN/Tax ID, PF/UAN Number, and emergency contact details."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsBankOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                updateBankMut.mutate(bankFormData);
              }}
              disabled={updateBankMut.isPending}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Save Bank & Statutory Details
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Banking Institution Name</label>
              <input
                type="text"
                placeholder="e.g. JPMorgan Chase & Co. / HDFC Bank"
                value={bankFormData.bankName}
                onChange={(e) => setBankFormData({ ...bankFormData, bankName: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Bank Branch Name</label>
              <input
                type="text"
                placeholder="e.g. Financial District Branch / London EC1"
                value={bankFormData.bankBranch}
                onChange={(e) => setBankFormData({ ...bankFormData, bankBranch: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Account Holder Name</label>
              <input
                type="text"
                placeholder="e.g. Full Legal Name as on Bank"
                value={bankFormData.accountHolderName}
                onChange={(e) => setBankFormData({ ...bankFormData, accountHolderName: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Account Classification Type</label>
              <select
                value={bankFormData.accountType}
                onChange={(e) => setBankFormData({ ...bankFormData, accountType: e.target.value })}
                className="field text-xs font-semibold"
              >
                <option value="Salary Account">Salary Account</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Checking Account">Checking Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Account Number / IBAN</label>
              <input
                type="text"
                placeholder="e.g. 94820194820194"
                value={bankFormData.bankAccount}
                onChange={(e) => setBankFormData({ ...bankFormData, bankAccount: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">IFSC / SWIFT / Routing Code</label>
              <input
                type="text"
                placeholder="e.g. CHASUS33 / HDFC0000123"
                value={bankFormData.ifscSwift}
                onChange={(e) => setBankFormData({ ...bankFormData, ifscSwift: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-line">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">PAN / SSN / National Tax ID</label>
              <input
                type="text"
                placeholder="e.g. ABCDE1234F / 948-29-1049"
                value={bankFormData.taxIdPanSsn}
                onChange={(e) => setBankFormData({ ...bankFormData, taxIdPanSsn: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Provident Fund (PF / UAN Number)</label>
              <input
                type="text"
                placeholder="e.g. 100982348912"
                value={bankFormData.pfUanNumber}
                onChange={(e) => setBankFormData({ ...bankFormData, pfUanNumber: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Personal Email Address</label>
            <input
              type="email"
              placeholder="e.g. employee.personal@gmail.com"
              value={bankFormData.personalEmail}
              onChange={(e) => setBankFormData({ ...bankFormData, personalEmail: e.target.value })}
              className="field font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-line">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Emergency Contact Person</label>
              <input
                type="text"
                placeholder="e.g. Sarah Vance (Spouse)"
                value={bankFormData.emergencyContactName}
                onChange={(e) => setBankFormData({ ...bankFormData, emergencyContactName: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Emergency Phone Number</label>
              <input
                type="text"
                placeholder="e.g. +1 (415) 555-9081"
                value={bankFormData.emergencyContactPhone}
                onChange={(e) => setBankFormData({ ...bankFormData, emergencyContactPhone: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>
        </form>
      </Drawer>

      {/* Upload Document Drawer */}
      <Drawer
        open={isDocOpen}
        onClose={() => setIsDocOpen(false)}
        title={`Upload Statutory Document: ${emp.name}`}
        description="Attach official bank passbook proof, tax cards (PAN/SSN/W4), signed NDAs, offer letters, or certificates."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsDocOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                addDocMut.mutate(docFormData);
              }}
              disabled={addDocMut.isPending || !docFormData.documentName}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Upload & Verify Document
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Document Category / Type</label>
            <select
              value={docFormData.documentType}
              onChange={(e) => setDocFormData({ ...docFormData, documentType: e.target.value })}
              className="field text-xs font-bold"
            >
              <option value="BANK_PROOF">Bank Passbook / Voided Cheque Proof</option>
              <option value="TAX_FORM">Tax Card / PAN Card / W-4 Form</option>
              <option value="ID_PROOF">Government Identity Proof / Passport</option>
              <option value="OFFER_LETTER">Employment Offer Letter</option>
              <option value="NDA">Non-Disclosure Agreement (NDA)</option>
              <option value="SALARY_SLIP">Prior Salary Slip / Proof of Income</option>
              <option value="EXPERIENCE_LETTER">Relieving & Experience Certificate</option>
              <option value="CERTIFICATE">Technical / Academic Certificate</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Document File Name / Title</label>
            <input
              type="text"
              placeholder="e.g. Voided_Cheque_JPMorgan_2026.pdf"
              value={docFormData.documentName}
              onChange={(e) => setDocFormData({ ...docFormData, documentName: e.target.value })}
              className="field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">File URL / Attachment Pointer</label>
            <input
              type="text"
              placeholder="e.g. https://storage.stalci.com/docs/emp-892/voided-cheque.pdf"
              value={docFormData.documentUrl}
              onChange={(e) => setDocFormData({ ...docFormData, documentUrl: e.target.value })}
              className="field font-mono text-xs"
            />
            <span className="text-[11px] text-muted block mt-1">
              Leave blank to auto-generate secure internal document link.
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Verification Remarks / Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Verified by HR Finance on 10 Aug 2026."
              value={docFormData.notes}
              onChange={(e) => setDocFormData({ ...docFormData, notes: e.target.value })}
              className="field text-xs"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
