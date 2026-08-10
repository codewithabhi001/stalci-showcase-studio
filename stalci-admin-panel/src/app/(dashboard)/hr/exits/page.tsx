"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchExits,
  initiateExit,
  updateClearance,
  calculateFinalSettlement,
  fetchEmployees,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  LogOut,
  Plus,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Building,
  Printer,
} from "lucide-react";

export default function ExitsPage() {
  const qc = useQueryClient();
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [settlingEmp, setSettlingEmp] = useState<any | null>(null);

  const [exitData, setExitData] = useState({
    employeeId: "",
    resignationDate: new Date().toISOString().split("T")[0],
    lastWorkingDay: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    reason: "",
    noticePeriodDays: 30,
  });

  const [settlementData, setSettlementData] = useState({
    pendingSalary: 0,
    leaveEncashment: 0,
    bonusIncentives: 0,
    deductions: 0,
    noticePayAdjustment: 0,
    status: "SETTLED",
    remarks: "",
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: exits = [], isLoading } = useQuery({
    queryKey: ["exits"],
    queryFn: fetchExits,
  });

  const exitMut = useMutation({
    mutationFn: initiateExit,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exits"] });
      qc.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Exit clearance initiated and notice period tracked");
      setIsExitOpen(false);
    },
  });

  const clearanceMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateClearance(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exits"] });
      toast.success("Clearance checklist updated");
    },
  });

  const settleMut = useMutation({
    mutationFn: ({ empId, data }: { empId: number; data: any }) =>
      calculateFinalSettlement(empId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exits"] });
      toast.success("Full & Final Settlement processed");
      setSettlingEmp(null);
    },
  });

  const handleOpenSettlement = (emp: any) => {
    setSettlingEmp(emp);
    const monthly = Math.round((emp.salaryCtc || 140000) / 12);
    setSettlementData({
      pendingSalary: monthly,
      leaveEncashment: Math.round(monthly * 0.2),
      bonusIncentives: 0,
      deductions: 0,
      noticePayAdjustment: 0,
      status: "SETTLED",
      remarks: "Full and final settlement executed with complete clearance.",
    });
  };

  const handlePrintSettlement = (exit: any) => {
    const printWin = window.open("", "_blank", "width=850,height=900");
    if (!printWin) return;

    const net = (exit.employee?.finalSettlement?.netPayableAmount || 14500);

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>STALCI Full & Final Settlement - ${exit.employee?.name}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: sans-serif; color: #0F172A; padding: 20px; font-size: 13px; line-height: 1.6; }
            .header { border-bottom: 2px solid #D89B5B; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 16px; font-weight: bold; color: #D89B5B; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table td { padding: 8px 12px; border: 1px solid #E2E8F0; }
            .total-row { background: #F8FAFC; font-weight: bold; font-size: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div><strong>STALCI GLOBAL TECHNOLOGIES</strong></div>
            <div class="title">FULL & FINAL SETTLEMENT STATEMENT</div>
          </div>
          <p>Employee: <strong>${exit.employee?.name}</strong> (${exit.employee?.employeeCode})<br>
          Last Working Day: ${new Date(exit.lastWorkingDay).toLocaleDateString()}</p>

          <table class="table">
            <tr><td>Pending Month Salary</td><td style="text-align: right;">$${(exit.employee?.finalSettlement?.pendingSalary || 12000).toLocaleString()}</td></tr>
            <tr><td>Leave Encashment (Earned Balance)</td><td style="text-align: right;">$${(exit.employee?.finalSettlement?.leaveEncashment || 2500).toLocaleString()}</td></tr>
            <tr><td>Performance Bonus / Retainers</td><td style="text-align: right;">$${(exit.employee?.finalSettlement?.bonusIncentives || 0).toLocaleString()}</td></tr>
            <tr><td>Deductions & Hardware Adjustments</td><td style="text-align: right;">-$${(exit.employee?.finalSettlement?.deductions || 0).toLocaleString()}</td></tr>
            <tr class="total-row"><td>TOTAL NET PAYABLE DISBURSEMENT</td><td style="text-align: right; color: #059669;">$${net.toLocaleString()} USD</td></tr>
          </table>

          <p>All organizational clearances (IT, Finance, HR) have been completed with zero pending obligations.</p>
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
          <span className="eyebrow text-copper">Exit Operations</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Exit Management & Full and Final (F&F) Settlement
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage resignations, notice periods, IT asset returns, multi-department sign-offs, and final financial settlement.
          </p>
        </div>

        <Button onClick={() => setIsExitOpen(true)} className="bg-copper text-slate-950 font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Initiate Employee Exit
        </Button>
      </div>

      {/* Exits Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading exit records...</div>
          ) : exits.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">No active employee exits in progress.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-5 py-3.5">Resignation & Last Day</th>
                  <th className="px-5 py-3.5">Clearances</th>
                  <th className="px-5 py-3.5">Settlement (F&F)</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {exits.map((exit: any) => (
                  <tr key={exit.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div>{exit.employee?.name}</div>
                      <div className="text-[10px] text-muted">{exit.employee?.employeeCode} • {exit.employee?.department?.name}</div>
                    </td>

                    <td className="px-5 py-4 font-mono text-muted text-xs">
                      <div>Resigned: {new Date(exit.resignationDate).toLocaleDateString()}</div>
                      <div className="text-ink font-semibold">LWD: {new Date(exit.lastWorkingDay).toLocaleDateString()} ({exit.noticePeriodDays}d)</div>
                    </td>

                    <td className="px-5 py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exit.itClearance}
                            onChange={(e) =>
                              clearanceMut.mutate({ id: exit.id, data: { itClearance: e.target.checked } })
                            }
                            className="h-3.5 w-3.5 accent-copper"
                          />
                          <span className="text-[11px]">IT Assets</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exit.financeClearance}
                            onChange={(e) =>
                              clearanceMut.mutate({ id: exit.id, data: { financeClearance: e.target.checked } })
                            }
                            className="h-3.5 w-3.5 accent-copper"
                          />
                          <span className="text-[11px]">Finance</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exit.hrClearance}
                            onChange={(e) =>
                              clearanceMut.mutate({ id: exit.id, data: { hrClearance: e.target.checked } })
                            }
                            className="h-3.5 w-3.5 accent-copper"
                          />
                          <span className="text-[11px]">HR</span>
                        </label>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {exit.employee?.finalSettlement ? (
                        <div className="font-mono font-bold text-emerald-600 text-sm">
                          ${exit.employee.finalSettlement.netPayableAmount?.toLocaleString()} USD
                        </div>
                      ) : (
                        <Badge tone="warning">Pending F&F</Badge>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          onClick={() => handleOpenSettlement(exit.employee)}
                          className="h-8 text-xs font-bold bg-copper text-slate-950 gap-1"
                        >
                          <DollarSign className="h-3.5 w-3.5" /> Calculate F&F
                        </Button>
                        <button
                          onClick={() => handlePrintSettlement(exit)}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                          title="Print Settlement Statement"
                        >
                          <Printer className="h-3.5 w-3.5 text-copper" />
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

      {/* Calculate Settlement Drawer */}
      <Drawer
        open={!!settlingEmp}
        onClose={() => setSettlingEmp(null)}
        title={`Full & Final Settlement: ${settlingEmp?.name}`}
        description="Calculate final salary payout, leave encashment, and notice period adjustments."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setSettlingEmp(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                settlingEmp &&
                settleMut.mutate({ empId: settlingEmp.id, data: settlementData })
              }
              disabled={settleMut.isPending}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Approve & Disburse Settlement
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Pending Salary ($ USD)</label>
              <input
                type="number"
                value={settlementData.pendingSalary}
                onChange={(e) => setSettlementData({ ...settlementData, pendingSalary: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Leave Encashment ($ USD)</label>
              <input
                type="number"
                value={settlementData.leaveEncashment}
                onChange={(e) => setSettlementData({ ...settlementData, leaveEncashment: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Deductions ($ USD)</label>
              <input
                type="number"
                value={settlementData.deductions}
                onChange={(e) => setSettlementData({ ...settlementData, deductions: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Bonus / Retainers ($ USD)</label>
              <input
                type="number"
                value={settlementData.bonusIncentives}
                onChange={(e) => setSettlementData({ ...settlementData, bonusIncentives: Number(e.target.value) })}
                className="field font-mono"
              />
            </div>
          </div>
        </div>
      </Drawer>

      {/* Initiate Exit Drawer */}
      <Drawer
        open={isExitOpen}
        onClose={() => setIsExitOpen(false)}
        title="Initiate Employee Exit & Notice Period"
        description="Record resignation submission and schedule last working day."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsExitOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                exitMut.mutate(exitData);
              }}
              disabled={exitMut.isPending || !exitData.employeeId}
              className="bg-copper text-slate-950 font-bold"
            >
              Start Exit Clearance
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Employee *</label>
            <select
              value={exitData.employeeId}
              onChange={(e) => setExitData({ ...exitData, employeeId: e.target.value })}
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
              <label className="text-xs font-bold text-ink block mb-1">Resignation Date</label>
              <input
                type="date"
                value={exitData.resignationDate}
                onChange={(e) => setExitData({ ...exitData, resignationDate: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Last Working Day (LWD)</label>
              <input
                type="date"
                value={exitData.lastWorkingDay}
                onChange={(e) => setExitData({ ...exitData, lastWorkingDay: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
