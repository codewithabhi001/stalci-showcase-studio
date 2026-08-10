"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPayroll, runMonthlyPayroll, updatePayrollRecord, disbursePayroll } from "@/lib/api";
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
} from "lucide-react";

export default function PayrollPage() {
  const qc = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [editingPay, setEditingPay] = useState<any | null>(null);

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
    mutationFn: (id: number) => disbursePayroll(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payroll"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Salary disbursed and marked as PAID");
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
            Automated monthly salary calculation from employee base CTC, gross-to-net tax withholdings, and printable payslips.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
          <span className="font-bold text-ink block">How Payroll Calculation Works:</span>
          <p>
            Employee monthly salaries are automatically calculated from their official annual compensation (<strong>CTC</strong>) set in the 
            Workforce Directory. Clicking <strong>"Run Payroll"</strong> creates records for all active employees. HR & Payroll Finance can click 
            <strong>"Edit Salary"</strong> on any row to adjust bonuses, allowances, or tax withholdings before disbursing.
          </p>
        </div>
      </div>

      {/* Month / Year Selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-ink">Payroll Cycle:</span>
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

      {/* Payroll Records Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading payroll records...</div>
          ) : payrollList.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">
              No payroll processed yet for {selectedMonth} {selectedYear}. Click "Run Payroll" to disburse.
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
                  <th className="px-5 py-3.5">Reference</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payrollList.map((pay: any) => (
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
                    <td className="px-5 py-4 font-mono text-[10px] text-muted">{pay.referenceNumber || "Pending Wire"}</td>
                    <td className="px-5 py-4">
                      <Badge tone={pay.status === "PAID" ? "success" : "warning"}>
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
                        {pay.status !== "PAID" && (
                          <button
                            onClick={() => disburseMut.mutate(pay.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                            title="Disburse Funds Now"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
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
        description="Adjust monthly salary breakdown, bonuses, deductions, and payment reference."
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
              className="bg-copper text-slate-950 font-bold"
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
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Wire / Reference Code</label>
              <input
                type="text"
                value={editFormData.referenceNumber}
                onChange={(e) => setEditFormData({ ...editFormData, referenceNumber: e.target.value })}
                className="field font-mono text-xs"
                placeholder="e.g. WIRE-CHASE-2026-9812"
              />
            </div>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
