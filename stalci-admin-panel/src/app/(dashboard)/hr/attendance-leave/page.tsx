"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAttendance,
  logAttendance,
  fetchLeaves,
  createLeaveRequest,
  approveLeave,
  rejectLeave,
  fetchEmployees,
} from "@/lib/api";
import { useRbac } from "@/lib/rbac-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Plus,
  User,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

export default function AttendanceLeavePage() {
  const qc = useQueryClient();
  const { currentRole } = useRbac();
  const [activeTab, setActiveTab] = useState<"attendance" | "leaves">("attendance");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [leaveStatusFilter, setLeaveStatusFilter] = useState("ALL");

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const [logData, setLogData] = useState({
    employeeId: "",
    date: selectedDate,
    status: "PRESENT",
    checkIn: "",
    checkOut: "",
    notes: "",
  });

  const [leaveData, setLeaveData] = useState({
    employeeId: "",
    leaveType: "CASUAL",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    daysCount: 1,
    reason: "",
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: attendanceList = [], isLoading: attLoading } = useQuery({
    queryKey: ["attendance", selectedDate],
    queryFn: () => fetchAttendance(selectedDate),
  });

  const { data: leaveList = [], isLoading: leaveLoading } = useQuery({
    queryKey: ["leaves", leaveStatusFilter],
    queryFn: () => fetchLeaves(leaveStatusFilter),
  });

  const logMut = useMutation({
    mutationFn: logAttendance,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Attendance logged successfully");
      setIsLogOpen(false);
    },
  });

  const leaveMut = useMutation({
    mutationFn: createLeaveRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leaves"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Leave request submitted");
      setIsLeaveOpen(false);
    },
  });

  const approveMut = useMutation({
    mutationFn: (id: number) => approveLeave(id, "Manager / HR Admin"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leaves"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Leave request approved");
    },
  });

  const rejectMut = useMutation({
    mutationFn: (id: number) => rejectLeave(id, "Manager / HR Admin"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leaves"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Leave request rejected");
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Time & Attendance</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Attendance Logs & Leave Management
          </h1>
          <p className="text-xs text-muted mt-1">
            Track daily work check-ins, remote WFH logs, paid leave requests, and manager approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "attendance" ? (
            <Button onClick={() => setIsLogOpen(true)} className="bg-copper text-[#080A0F] font-bold text-xs gap-1.5 shadow-sm">
              <Clock className="h-4 w-4" /> Log Attendance
            </Button>
          ) : (
            <Button onClick={() => setIsLeaveOpen(true)} className="bg-copper text-[#080A0F] font-bold text-xs gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Apply for Leave
            </Button>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "attendance"
              ? "bg-copper text-[#080A0F] shadow-sm"
              : "bg-surface border border-line text-muted hover:text-ink"
          }`}
        >
          <CalendarCheck className="h-4 w-4" /> Daily Attendance Logs
        </button>
        <button
          onClick={() => setActiveTab("leaves")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "leaves"
              ? "bg-copper text-[#080A0F] shadow-sm"
              : "bg-surface border border-line text-muted hover:text-ink"
          }`}
        >
          <Calendar className="h-4 w-4" /> Leave Requests & Approvals
        </button>
      </div>

      {/* VIEW: 1. ATTENDANCE */}
      {activeTab === "attendance" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-ink">Select Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="field font-mono text-xs w-auto"
            />
          </div>

          <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollable-y">
              {attLoading ? (
                <div className="p-12 text-center text-xs text-muted">Loading attendance logs...</div>
              ) : attendanceList.length === 0 ? (
                <div className="p-12 text-center text-xs text-muted">No attendance records logged for {selectedDate}.</div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                      <th className="px-5 py-3.5">Employee</th>
                      <th className="px-5 py-3.5">Department</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Check In</th>
                      <th className="px-5 py-3.5">Check Out</th>
                      <th className="px-5 py-3.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {attendanceList.map((att: any) => (
                      <tr key={att.id} className="hover:bg-surface-2/60 transition-colors">
                        <td className="px-5 py-4 font-bold text-ink">
                          <div>{att.employee?.name}</div>
                          <div className="text-[10px] font-mono text-muted">{att.employee?.employeeCode}</div>
                        </td>
                        <td className="px-5 py-4 text-muted">{att.employee?.department?.name || "General"}</td>
                        <td className="px-5 py-4">
                          <Badge
                            tone={
                              att.status === "PRESENT"
                                ? "success"
                                : att.status === "WFH"
                                ? "info"
                                : att.status === "HALF_DAY"
                                ? "warning"
                                : "neutral"
                            }
                          >
                            {att.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 font-mono text-muted">{att.checkIn || "09:00 AM"}</td>
                        <td className="px-5 py-4 font-mono text-muted">{att.checkOut || "06:00 PM"}</td>
                        <td className="px-5 py-4 text-muted">{att.notes || "Standard Shift"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 2. LEAVE REQUESTS */}
      {activeTab === "leaves" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setLeaveStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  leaveStatusFilter === st
                    ? "bg-copper text-[#080A0F]"
                    : "bg-surface border border-line text-muted"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollable-y">
              {leaveLoading ? (
                <div className="p-12 text-center text-xs text-muted">Loading leave requests...</div>
              ) : leaveList.length === 0 ? (
                <div className="p-12 text-center text-xs text-muted">No leave requests found.</div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                      <th className="px-5 py-3.5">Employee</th>
                      <th className="px-5 py-3.5">Leave Type</th>
                      <th className="px-5 py-3.5">Duration</th>
                      <th className="px-5 py-3.5">Reason</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Approvals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {leaveList.map((leave: any) => (
                      <tr key={leave.id} className="hover:bg-surface-2/60 transition-colors">
                        <td className="px-5 py-4 font-bold text-ink">
                          <div>{leave.employee?.name}</div>
                          <div className="text-[10px] text-muted">{leave.employee?.department?.name}</div>
                        </td>
                        <td className="px-5 py-4 font-semibold text-ink">{leave.leaveType}</td>
                        <td className="px-5 py-4 font-mono text-muted text-xs">
                          {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()} ({leave.daysCount}d)
                        </td>
                        <td className="px-5 py-4 text-muted max-w-xs">{leave.reason}</td>
                        <td className="px-5 py-4">
                          <Badge
                            tone={
                              leave.status === "APPROVED"
                                ? "success"
                                : leave.status === "REJECTED"
                                ? "danger"
                                : "warning"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-right">
                          {leave.status === "PENDING" && currentRole !== "RECRUITER" ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => approveMut.mutate(leave.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle2 className="h-3 w-3" /> Approve
                              </button>
                              <button
                                onClick={() => rejectMut.mutate(leave.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                              >
                                <XCircle className="h-3 w-3" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] font-mono text-muted">{leave.approvedBy || "Processed"}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Log Attendance Drawer */}
      <Drawer
        open={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        title="Log Employee Attendance"
        description="Record check-in time, shift status, and notes."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsLogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                logMut.mutate(logData);
              }}
              disabled={logMut.isPending || !logData.employeeId}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Save Attendance
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Employee *</label>
            <select
              value={logData.employeeId}
              onChange={(e) => setLogData({ ...logData, employeeId: e.target.value })}
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
              <label className="text-xs font-bold text-ink block mb-1">Date</label>
              <input
                type="date"
                value={logData.date}
                onChange={(e) => setLogData({ ...logData, date: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Status</label>
              <select
                value={logData.status}
                onChange={(e) => setLogData({ ...logData, status: e.target.value })}
                className="field"
              >
                <option value="PRESENT">PRESENT</option>
                <option value="WFH">WFH (Remote)</option>
                <option value="HALF_DAY">HALF DAY</option>
                <option value="ABSENT">ABSENT</option>
              </select>
            </div>
          </div>
        </form>
      </Drawer>

      {/* Apply Leave Drawer */}
      <Drawer
        open={isLeaveOpen}
        onClose={() => setIsLeaveOpen(false)}
        title="Submit Leave Request"
        description="Apply for casual, sick, or earned annual time off."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsLeaveOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                leaveMut.mutate(leaveData);
              }}
              disabled={leaveMut.isPending || !leaveData.employeeId || !leaveData.reason}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Submit Request
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Employee *</label>
            <select
              value={leaveData.employeeId}
              onChange={(e) => setLeaveData({ ...leaveData, employeeId: e.target.value })}
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
              <label className="text-xs font-bold text-ink block mb-1">Start Date</label>
              <input
                type="date"
                value={leaveData.startDate}
                onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                className="field font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">End Date</label>
              <input
                type="date"
                value={leaveData.endDate}
                onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Reason for Leave *</label>
            <textarea
              rows={3}
              required
              value={leaveData.reason}
              onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
              className="field text-xs"
              placeholder="e.g. Attending academic conference, medical checkup..."
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
