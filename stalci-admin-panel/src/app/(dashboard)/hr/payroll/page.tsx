"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPayroll, runMonthlyPayroll } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  DollarSign,
  Printer,
  Play,
  Calendar,
  CheckCircle2,
  Building,
  FileText,
} from "lucide-react";

export default function PayrollPage() {
  const qc = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedYear, setSelectedYear] = useState(2026);

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
            <div class="emp-item"><strong>Bank Account</strong>${pay.employee?.bankAccount || "••••••••4892"} (${pay.employee?.bankName || "Chase"})</div>
            <div class="emp-item"><strong>Disbursal Mode</strong>Direct Corporate Wire Transfer</div>
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
                <td style="text-align: right;">$${(pay.basicSalary + pay.hra + pay.allowances + pay.bonus)?.toLocaleString()}</td>
                <td>Total Deductions</td>
                <td style="text-align: right;">$${(pay.taxDeductions + pay.deductions)?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="net-box">
            <span>NET DISBURSED SALARY:</span>
            <span style="color: #059669; font-size: 20px;">$${pay.netSalary?.toLocaleString()} USD</span>
          </div>

          <div class="footer-sig">
            <div>
              <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #1E293B;">Abhishek Kumar</div>
              <div style="border-top: 1px solid #94A3B8; width: 180px; margin-top: 4px; font-size: 11px; padding-top: 4px;">
                <strong>Abhishek Kumar</strong><br>Managing Director, STALCI
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
            Payroll Runner & Payslip Generation
          </h1>
          <p className="text-xs text-muted mt-1">
            Automated monthly salary calculation, gross-to-net tax withholdings, and printable official payslips.
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
                    <td className="px-5 py-4 font-mono text-[10px] text-muted">{pay.referenceNumber}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handlePrintPayslip(pay)}
                        className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold text-xs text-copper"
                        title="Print Official Payslip"
                      >
                        <Printer className="h-3.5 w-3.5" /> Payslip
                      </button>
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
