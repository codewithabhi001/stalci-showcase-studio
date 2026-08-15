"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPayroll,
  runMonthlyPayroll,
  updatePayrollRecord,
  disbursePayroll,
  createManualPayrollRecord,
  fetchEmployees,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  DollarSign,
  Printer,
  Play,
  Calendar,
  CheckCircle2,
  Building,
  FileText,
  Edit2,
  Send,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Plus,
  Search,
  Filter,
  UploadCloud,
  Check,
} from "lucide-react";

export default function PayrollPage() {
  const qc = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingPay, setEditingPay] = useState<any | null>(null);
  const [disbursingPay, setDisbursingPay] = useState<any | null>(null);
  const [disburseWireRef, setDisburseWireRef] = useState("");
  const [disburseReceiptUrl, setDisburseReceiptUrl] = useState("");

  const [isManualOpen, setIsManualOpen] = useState(false);
  const [manualFormData, setManualFormData] = useState({
    employeeId: "",
    month: "August",
    year: 2026,
    basicSalary: 6000,
    hra: 3600,
    allowances: 2400,
    bonus: 1000,
    deductions: 200,
    taxDeductions: 1800,
    paymentMode: "Direct Wire",
    referenceNumber: "",
    status: "PAID",
    paymentReceiptUrl: "",
  });

  const [editFormData, setEditFormData] = useState({
    basicSalary: 0,
    hra: 0,
    allowances: 0,
    bonus: 0,
    deductions: 0,
    taxDeductions: 0,
    paymentMode: "Direct Wire",
    referenceNumber: "",
    status: "PROCESSED",
  });

  const { data: employeesList = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: payrollList = [], isLoading } = useQuery({
    queryKey: ["payroll", selectedMonth, selectedYear],
    queryFn: () => fetchPayroll({ month: selectedMonth, year: selectedYear }),
  });

  const runMut = useMutation({
    mutationFn: runMonthlyPayroll,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["payroll"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success(data.message || "Monthly payroll generated successfully");
    },
  });

  const manualPayMut = useMutation({
    mutationFn: createManualPayrollRecord,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payroll"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Manual payroll record issued & recorded successfully");
      setIsManualOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updatePayrollRecord(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payroll"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Payroll record updated successfully");
      setEditingPay(null);
    },
  });

  const disburseMut = useMutation({
    mutationFn: (id: number) =>
      disbursePayroll(id, {
        paymentMode: disbursingPay?.paymentMode || "Direct Wire",
        referenceNumber: disburseWireRef,
        paymentReceiptUrl: disburseReceiptUrl || undefined,
        disbursedBy: "HR Management Console",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payroll"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Salary funds disbursed to employee bank account & status set to PAID");
      setDisbursingPay(null);
    },
  });

  const handleOpenEdit = (pay: any) => {
    setEditingPay(pay);
    setEditFormData({
      basicSalary: pay.basicSalary || 0,
      hra: pay.hra || 0,
      allowances: pay.allowances || 0,
      bonus: pay.bonus || 0,
      deductions: pay.deductions || 0,
      taxDeductions: pay.taxDeductions || 0,
      paymentMode: pay.paymentMode || "Direct Wire",
      referenceNumber: pay.referenceNumber || "",
      status: pay.status || "PROCESSED",
    });
  };

  const totalGross = payrollList.reduce(
    (acc: number, curr: any) => acc + (curr.basicSalary + curr.hra + curr.allowances + (curr.bonus || 0)),
    0
  );
  const totalNet = payrollList.reduce((acc: number, curr: any) => acc + (curr.netSalary || 0), 0);
  const totalTax = payrollList.reduce((acc: number, curr: any) => acc + (curr.taxDeductions || 0), 0);

  const handlePrintPayslip = (pay: any) => {
    const printWin = window.open("", "_blank", "width=850,height=1000");
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Payslip - ${pay.employee?.name} (${pay.month} ${pay.year})</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0F172A; line-height: 1.5; padding: 20px; font-size: 13px; }
            .header { border-bottom: 2px solid #D89B5B; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #0B0E14; }
            .title { font-size: 16px; font-weight: bold; color: #D89B5B; text-align: center; margin: 15px 0; }
            .emp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; }
            .emp-item strong { color: #64748B; font-size: 11px; display: block; }
            .salary-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .salary-table th, .salary-table td { padding: 10px 14px; border: 1px solid #E2E8F0; }
            .salary-table th { background: #F8FAFC; text-align: left; font-weight: bold; }
            .net-box { background: #F8FAFC; border: 2px solid #D89B5B; padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: bold; margin-top: 15px; }
            .footer-sig { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
            .stamp-box { border: 2px dashed #D89B5B; padding: 10px; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 9px; font-weight: bold; color: #D89B5B; transform: rotate(-10deg); }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">STALCI GLOBAL TECHNOLOGIES</div>
            <div>
              <strong>PAYSLIP FOR ${pay.month.toUpperCase()} ${pay.year}</strong><br>
              <span style="font-family: monospace; color: #64748B;">Ref: ${pay.referenceNumber || "ST-PAY-001"}</span>
            </div>
          </div>

          <div class="emp-grid">
            <div class="emp-item"><strong>Employee Name</strong>${pay.employee?.name}</div>
            <div class="emp-item"><strong>Employee ID Code</strong>${pay.employee?.employeeCode}</div>
            <div class="emp-item"><strong>Designation</strong>${pay.employee?.designation}</div>
            <div class="emp-item"><strong>Department</strong>${pay.employee?.department?.name || "Engineering"}</div>
            <div class="emp-item"><strong>Bank Account</strong>${pay.employee?.bankAccount || "Not Recorded"} (${pay.employee?.bankName || "Corporate Account"})</div>
            <div class="emp-item"><strong>Disbursal Mode</strong>${pay.paymentMode || "Direct Corporate Wire Transfer"}</div>
          </div>

          <table class="salary-table">
            <thead>
              <tr>
                <th>Earnings Component</th>
                <th style="text-align: right;">Amount (USD)</th>
                <th>Deductions Component</th>
                <th style="text-align: right;">Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td style="text-align: right;">$${pay.basicSalary?.toLocaleString()}</td>
                <td>Federal Income Tax Withholding</td>
                <td style="text-align: right;">$${pay.taxDeductions?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>House Rent Allowance (HRA)</td>
                <td style="text-align: right;">$${pay.hra?.toLocaleString()}</td>
                <td>Statutory Benefits & Insurance</td>
                <td style="text-align: right;">$0.00</td>
              </tr>
              <tr>
                <td>Special Engineering Allowances</td>
                <td style="text-align: right;">$${pay.allowances?.toLocaleString()}</td>
                <td>Other Adjustments</td>
                <td style="text-align: right;">$${pay.deductions?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Performance Bonus & Incentives</td>
                <td style="text-align: right;">$${pay.bonus?.toLocaleString()}</td>
                <td>-</td>
                <td style="text-align: right;">-</td>
              </tr>
              <tr style="font-weight: bold; background: #FAFAFA;">
                <td>Total Gross Earnings</td>
                <td style="text-align: right;">$${(pay.basicSalary + pay.hra + pay.allowances + (pay.bonus || 0))?.toLocaleString()}</td>
                <td>Total Deductions</td>
                <td style="text-align: right;">$${(pay.taxDeductions + (pay.deductions || 0))?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="net-box">
            <span>NET DISBURSED SALARY:</span>
            <span style="color: #059669; font-size: 20px;">$${pay.netSalary?.toLocaleString()} USD</span>
          </div>

          <div class="footer-sig">
            <div>
              <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #1E293B;">Managing Director</div>
              <div style="border-top: 1px solid #94A3B8; width: 180px; margin-top: 4px; font-size: 11px; padding-top: 4px;">
                <strong>Managing Director</strong><br>STALCI Global Technologies
              </div>
            </div>
            <div class="stamp-box">
              STALCI<br>CORPORATE<br>SEAL<br>2026
            </div>
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  const filteredPayroll = payrollList.filter((pay: any) => {
    const matchesStatus = statusFilter === "ALL" || pay.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      pay.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.employee?.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Payroll & Compensation</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Payroll Runner & Salary Disbursal Console
          </h1>
          <p className="text-xs text-muted mt-1">
            Automated monthly salary calculation from employee base CTC, custom manual payments, gross-to-net tax withholdings, and printable payslips.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => {
              if (employeesList.length > 0) {
                setManualFormData({
                  ...manualFormData,
                  employeeId: employeesList[0].id.toString(),
                  month: selectedMonth,
                  year: selectedYear,
                  referenceNumber: `WIRE-STALCI-${selectedYear}-${Math.floor(100000 + Math.random() * 900000)}`,
                });
              }
              setIsManualOpen(true);
            }}
            variant="secondary"
            className="text-xs font-bold gap-1.5 border border-line"
          >
            <Plus className="h-4 w-4 text-copper" /> Issue Manual Custom Payment
          </Button>
          <Button
            onClick={() => runMut.mutate({ month: selectedMonth, year: selectedYear })}
            disabled={runMut.isPending}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-1.5 shadow-sm"
          >
            <Play className="h-4 w-4" /> Run Payroll for {selectedMonth} {selectedYear}
          </Button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-line bg-surface p-4 space-y-1">
          <span className="text-[11px] font-bold text-muted uppercase">Gross Run Total</span>
          <div className="text-xl font-extrabold text-ink font-mono">${totalGross.toLocaleString()}</div>
          <span className="text-[10px] text-muted">Base Earnings + Allowances</span>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4 space-y-1">
          <span className="text-[11px] font-bold text-muted uppercase">Total Net Disbursed</span>
          <div className="text-xl font-extrabold text-emerald-600 font-mono">${totalNet.toLocaleString()}</div>
          <span className="text-[10px] text-muted">Net Bank Wires</span>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4 space-y-1">
          <span className="text-[11px] font-bold text-muted uppercase">Tax Withheld</span>
          <div className="text-xl font-extrabold text-red-600 font-mono">${totalTax.toLocaleString()}</div>
          <span className="text-[10px] text-muted">15% Federal / State Standard</span>
        </div>
      </div>

      {/* Informational Guidance Banner */}
      <div className="rounded-2xl border border-copper/30 bg-surface-2 p-4 text-xs text-muted flex items-start gap-3">
        <HelpCircle className="h-4 w-4 text-copper shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-ink block">How Payroll Calculation & Disbursal Works:</span>
          <p>
            Employee monthly salaries are calculated from their official annual compensation (<strong>CTC</strong>) in the Workforce Directory.
            You can click <strong>"Run Payroll"</strong> for automatic generation or <strong>"Issue Manual Custom Payment"</strong> to disburse specific individual month/stipend payments.
            Use <strong>"Disburse"</strong> on any pending row to record the bank transaction wire reference and attach payment receipts.
          </p>
        </div>
      </div>

      {/* Toolbar: Search, Filters, Month/Year Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-line">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search employee or wire ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="field pl-9 text-xs font-semibold w-56"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-ink">Cycle:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="field text-xs w-auto font-bold"
            >
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="field text-xs w-auto font-mono"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {["ALL", "PAID", "PROCESSED", "HOLD", "DRAFT"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-copper text-[#080A0F] shadow-sm"
                  : "text-muted hover:text-ink hover:bg-canvas"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Payroll Records Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading payroll records...</div>
          ) : filteredPayroll.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted space-y-2">
              <p>No payroll records match the selected filters for {selectedMonth} {selectedYear}.</p>
              <Button
                variant="secondary"
                onClick={() => runMut.mutate({ month: selectedMonth, year: selectedYear })}
                className="text-xs font-bold gap-1.5"
              >
                <Play className="h-3.5 w-3.5" /> Run Automated Payroll for {selectedMonth}
              </Button>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-5 py-3.5">Basic</th>
                  <th className="px-5 py-3.5">HRA & Allowances</th>
                  <th className="px-5 py-3.5">Bonus</th>
                  <th className="px-5 py-3.5">Tax Withholding</th>
                  <th className="px-5 py-3.5">Net Disbursed</th>
                  <th className="px-5 py-3.5">Payment Wire Ref</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredPayroll.map((pay: any) => (
                  <tr key={pay.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div>{pay.employee?.name}</div>
                      <div className="text-[10px] font-mono text-muted">{pay.employee?.employeeCode} • {pay.employee?.designation}</div>
                    </td>
                    <td className="px-5 py-4 font-mono">${pay.basicSalary?.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono">${((pay.hra || 0) + (pay.allowances || 0))?.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-amber-600">${pay.bonus?.toLocaleString() || 0}</td>
                    <td className="px-5 py-4 font-mono text-red-600">-${pay.taxDeductions?.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-600 text-sm">
                      ${pay.netSalary?.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 font-mono text-[10px] text-muted">
                      {pay.referenceNumber || "Pending Wire"}
                      {pay.paymentReceiptUrl && (
                        <a
                          href={pay.paymentReceiptUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-copper hover:underline font-bold block mt-0.5 text-[9px]"
                        >
                          View Receipt
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={pay.status === "PAID" ? "success" : pay.status === "HOLD" ? "danger" : "warning"}>
                        {pay.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(pay)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="Edit Salary Components"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-copper" />
                        </button>
                        {pay.status !== "PAID" ? (
                          <button
                            onClick={() => {
                              setDisburseWireRef(pay.referenceNumber || `WIRE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
                              setDisburseReceiptUrl(pay.paymentReceiptUrl || "");
                              setDisbursingPay(pay);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1 text-xs shadow-sm"
                            title="Disburse Funds Now"
                          >
                            <Send className="h-3.5 w-3.5" /> Disburse
                          </button>
                        ) : (
                          <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 text-[10px] font-extrabold flex items-center gap-1">
                            <Check className="h-3 w-3" /> Disbursed
                          </span>
                        )}
                        <button
                          onClick={() => handlePrintPayslip(pay)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold text-xs text-copper"
                          title="Print Official Payslip"
                        >
                          <Printer className="h-3.5 w-3.5" /> Payslip
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

      {/* Edit Salary Drawer */}
      <Drawer
        open={!!editingPay}
        onClose={() => setEditingPay(null)}
        title={`Edit Monthly Salary: ${editingPay?.employee?.name}`}
        description="Adjust monthly salary breakdown, bonuses, deductions, and payment status."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingPay(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                editingPay &&
                updateMut.mutate({ id: editingPay.id, data: editFormData })
              }
              disabled={updateMut.isPending}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Save Salary Adjustment
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Basic Salary ($ USD)</label>
              <input
                type="number"
                value={editFormData.basicSalary}
                onChange={(e) => setEditFormData({ ...editFormData, basicSalary: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">House Rent Allowance (HRA)</label>
              <input
                type="number"
                value={editFormData.hra}
                onChange={(e) => setEditFormData({ ...editFormData, hra: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Special Allowances ($ USD)</label>
              <input
                type="number"
                value={editFormData.allowances}
                onChange={(e) => setEditFormData({ ...editFormData, allowances: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Performance Bonus ($ USD)</label>
              <input
                type="number"
                value={editFormData.bonus}
                onChange={(e) => setEditFormData({ ...editFormData, bonus: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Tax Withholding ($ USD)</label>
              <input
                type="number"
                value={editFormData.taxDeductions}
                onChange={(e) => setEditFormData({ ...editFormData, taxDeductions: Number(e.target.value) })}
                className="field font-mono text-red-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Other Deductions ($ USD)</label>
              <input
                type="number"
                value={editFormData.deductions}
                onChange={(e) => setEditFormData({ ...editFormData, deductions: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Disbursal Payment Mode</label>
              <select
                value={editFormData.paymentMode}
                onChange={(e) => setEditFormData({ ...editFormData, paymentMode: e.target.value })}
                className="field font-mono text-xs"
              >
                <option value="Direct Wire">Direct Wire Transfer</option>
                <option value="Direct Deposit">Direct Deposit (ACH)</option>
                <option value="Corporate Cheque">Corporate Cheque</option>
                <option value="Cash / Manual">Cash / Manual Disbursal</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Status</label>
              <select
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className="field font-mono text-xs font-bold text-ink"
              >
                <option value="PAID">PAID</option>
                <option value="PROCESSED">PROCESSED</option>
                <option value="HOLD">HOLD</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Wire / Bank Reference Code</label>
            <input
              type="text"
              value={editFormData.referenceNumber}
              onChange={(e) => setEditFormData({ ...editFormData, referenceNumber: e.target.value })}
              className="field font-mono text-xs"
              placeholder="e.g. WIRE-CHASE-2026-9812"
            />
          </div>
        </form>
      </Drawer>

      {/* Disburse Salary Modal */}
      <Drawer
        open={!!disbursingPay}
        onClose={() => setDisbursingPay(null)}
        title={`Disburse Monthly Salary: ${disbursingPay?.employee?.name}`}
        description="Verify net payable amount, corporate bank wire reference code, attach payment receipt, and execute bank disbursal."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDisbursingPay(null)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                disbursingPay && disburseMut.mutate(disbursingPay.id);
              }}
              disabled={disburseMut.isPending}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-1.5"
            >
              <Send className="h-4 w-4" /> Confirm & Execute Disbursal
            </Button>
          </div>
        }
      >
        {disbursingPay && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Net Salary Payable Amount
              </span>
              <div className="text-3xl font-extrabold text-emerald-700 font-mono">
                ${disbursingPay.netSalary?.toLocaleString()} USD
              </div>
              <p className="text-xs text-emerald-800">
                Period: <strong>{disbursingPay.month} {disbursingPay.year}</strong> • Code: <strong>{disbursingPay.employee?.employeeCode}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs border-t border-line pt-4">
              <div className="flex justify-between">
                <span className="text-muted">Employee Name:</span>
                <span className="font-bold text-ink">{disbursingPay.employee?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Designation:</span>
                <span className="font-semibold text-ink">{disbursingPay.employee?.designation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Banking Institution:</span>
                <span className="font-semibold text-ink">{disbursingPay.employee?.bankName || "JPMorgan Chase & Co."}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Account Number:</span>
                <span className="font-mono font-bold text-ink">{disbursingPay.employee?.bankAccount || "94820194820194"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">SWIFT / Routing:</span>
                <span className="font-mono font-bold text-ink">{disbursingPay.employee?.ifscSwift || "CHASUS33"}</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-line pt-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Generated Bank Wire Reference Code</label>
                <input
                  type="text"
                  value={disburseWireRef}
                  onChange={(e) => setDisburseWireRef(e.target.value)}
                  className="field font-mono font-bold text-emerald-700 bg-canvas"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-ink block mb-1">Payment Receipt / Bank Proof URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://receipts.stalci.com/wire-2026-9812.pdf"
                  value={disburseReceiptUrl}
                  onChange={(e) => setDisburseReceiptUrl(e.target.value)}
                  className="field font-mono text-xs"
                />
                <span className="text-[11px] text-muted block mt-1">
                  Attach bank payment confirmation receipt to lock with official employee payslip.
                </span>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Manual Custom Monthly Payroll Issue Drawer */}
      <Drawer
        open={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        title="Issue Custom Manual Monthly Payroll / Stipend"
        description="Select employee, target month/year, earnings, tax withholdings, and execute custom salary credit."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsManualOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                manualPayMut.mutate(manualFormData);
              }}
              disabled={manualPayMut.isPending || !manualFormData.employeeId}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-1.5"
            >
              <Send className="h-4 w-4" /> Issue & Disburse Manual Payment
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Target Employee</label>
            <select
              value={manualFormData.employeeId}
              onChange={(e) => setManualFormData({ ...manualFormData, employeeId: e.target.value })}
              className="field text-xs font-bold text-ink"
            >
              {employeesList.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.employeeCode}) - {emp.designation} [CTC: ${emp.salaryCtc?.toLocaleString()}]
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Payroll Cycle Month</label>
              <select
                value={manualFormData.month}
                onChange={(e) => setManualFormData({ ...manualFormData, month: e.target.value })}
                className="field text-xs font-bold"
              >
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Year</label>
              <select
                value={manualFormData.year}
                onChange={(e) => setManualFormData({ ...manualFormData, year: Number(e.target.value) })}
                className="field text-xs font-mono"
              >
                <option value={2026}>2026</option>
                <option value={2025}>2025</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Basic Salary ($ USD)</label>
              <input
                type="number"
                value={manualFormData.basicSalary}
                onChange={(e) => setManualFormData({ ...manualFormData, basicSalary: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">House Rent Allowance (HRA)</label>
              <input
                type="number"
                value={manualFormData.hra}
                onChange={(e) => setManualFormData({ ...manualFormData, hra: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Special Allowances ($ USD)</label>
              <input
                type="number"
                value={manualFormData.allowances}
                onChange={(e) => setManualFormData({ ...manualFormData, allowances: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Performance Bonus / Stipend ($ USD)</label>
              <input
                type="number"
                value={manualFormData.bonus}
                onChange={(e) => setManualFormData({ ...manualFormData, bonus: Number(e.target.value) })}
                className="field font-mono text-amber-600 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Tax Withholding ($ USD)</label>
              <input
                type="number"
                value={manualFormData.taxDeductions}
                onChange={(e) => setManualFormData({ ...manualFormData, taxDeductions: Number(e.target.value) })}
                className="field font-mono text-red-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Other Deductions ($ USD)</label>
              <input
                type="number"
                value={manualFormData.deductions}
                onChange={(e) => setManualFormData({ ...manualFormData, deductions: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Payment Disbursal Mode</label>
              <select
                value={manualFormData.paymentMode}
                onChange={(e) => setManualFormData({ ...manualFormData, paymentMode: e.target.value })}
                className="field text-xs font-semibold"
              >
                <option value="Direct Wire">Direct Wire Transfer</option>
                <option value="Direct Deposit">Direct Deposit (ACH)</option>
                <option value="Corporate Cheque">Corporate Cheque</option>
                <option value="Cash / Manual">Cash / Manual Disbursal</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Disbursal Status</label>
              <select
                value={manualFormData.status}
                onChange={(e) => setManualFormData({ ...manualFormData, status: e.target.value })}
                className="field text-xs font-bold"
              >
                <option value="PAID">PAID (Disbursed Immediately)</option>
                <option value="PROCESSED">PROCESSED (Pending Wire)</option>
                <option value="HOLD">HOLD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Wire Reference Code</label>
            <input
              type="text"
              value={manualFormData.referenceNumber}
              onChange={(e) => setManualFormData({ ...manualFormData, referenceNumber: e.target.value })}
              className="field font-mono text-xs"
              placeholder="e.g. WIRE-STALCI-2026-98104"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Payment Receipt / Bank Proof Link</label>
            <input
              type="text"
              placeholder="e.g. https://receipts.stalci.com/wire-2026-manual.pdf"
              value={manualFormData.paymentReceiptUrl}
              onChange={(e) => setManualFormData({ ...manualFormData, paymentReceiptUrl: e.target.value })}
              className="field font-mono text-xs"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
