"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees, fetchOnboarding, toggleOnboardingTask, addOnboardingTask, deleteOnboardingTask } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  CheckCircle2,
  Circle,
  Plus,
  User,
  Shield,
  Laptop,
  FileText,
  Users,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const qc = useQueryClient();
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [taskData, setTaskData] = useState({
    taskName: "",
    category: "DOCUMENTATION",
    dueDate: "",
  });

  const { data: employees = [], isLoading: empLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees({ status: "ONBOARDING" }),
  });

  // Also fetch all employees for the full view
  const { data: allEmployees = [] } = useQuery({
    queryKey: ["employees-all"],
    queryFn: () => fetchEmployees(),
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["onboarding", selectedEmpId],
    queryFn: () => (selectedEmpId ? fetchOnboarding(selectedEmpId) : Promise.resolve([])),
    enabled: !!selectedEmpId,
  });

  const toggleMut = useMutation({
    mutationFn: ({ taskId, isCompleted }: { taskId: number; isCompleted: boolean }) =>
      toggleOnboardingTask(taskId, isCompleted),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["onboarding", selectedEmpId] });
      toast.success("Task status updated");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (taskId: number) => deleteOnboardingTask(taskId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["onboarding", selectedEmpId] });
      toast.success("Onboarding task deleted");
    },
  });

  const addMut = useMutation({
    mutationFn: (data: any) => addOnboardingTask(selectedEmpId!, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["onboarding", selectedEmpId] });
      toast.success("Onboarding task added");
      setIsAddOpen(false);
      setTaskData({ taskName: "", category: "DOCUMENTATION", dueDate: "" });
    },
  });

  const getCategoryIcon = (cat: string) => {
    if (cat === "DOCUMENTATION" || cat === "LEGAL") return FileText;
    if (cat === "IT_SETUP" || cat === "HARDWARE") return Laptop;
    if (cat === "SECURITY" || cat === "ACCESS") return Shield;
    if (cat === "TEAM" || cat === "INTRODUCTION") return Users;
    return Circle;
  };

  const completedCount = tasks.filter((t: any) => t.isCompleted).length;
  const totalCount = tasks.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Onboarding Operations</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Employee Onboarding Tracker
          </h1>
          <p className="text-xs text-muted mt-1">
            Track document verification, IT provisioning, security access, and team introductions for every new hire.
          </p>
        </div>
      </div>

      {/* Two-Column Layout: Employee Selector + Task Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Employee Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider px-1">Select Employee</h3>

          {empLoading ? (
            <div className="p-8 text-center text-xs text-muted">Loading employees...</div>
          ) : employees.length === 0 ? (
            <div className="space-y-3">
              <div className="p-6 rounded-2xl border border-line bg-surface text-center text-xs text-muted">
                No employees currently in ONBOARDING status. Showing all employees below.
              </div>
              {allEmployees.slice(0, 10).map((emp: any) => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedEmpId(emp.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    selectedEmpId === emp.id
                      ? "border-copper bg-copper/10 shadow-md"
                      : "border-line bg-surface hover:border-copper/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-copper text-[#080A0F] flex items-center justify-center font-bold text-sm shrink-0">
                      {emp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">{emp.name}</h4>
                      <p className="text-[10px] text-muted font-mono">{emp.employeeCode} • {emp.designation}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            employees.map((emp: any) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmpId(emp.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  selectedEmpId === emp.id
                    ? "border-copper bg-copper/10 shadow-md"
                    : "border-line bg-surface hover:border-copper/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-copper text-[#080A0F] flex items-center justify-center font-bold text-sm shrink-0">
                    {emp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{emp.name}</h4>
                    <p className="text-[10px] text-muted font-mono">{emp.employeeCode} • {emp.designation}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Right: Task Checklist */}
        <div className="lg:col-span-2">
          {!selectedEmpId ? (
            <div className="rounded-2xl border border-dashed border-line bg-surface p-16 text-center">
              <User className="h-8 w-8 text-muted mx-auto mb-3" />
              <h3 className="text-sm font-bold text-ink">Select an Employee</h3>
              <p className="text-xs text-muted mt-1">Choose a new hire from the left panel to view and manage their onboarding progress.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
              {/* Progress Bar */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <h3 className="text-sm font-bold text-ink">Onboarding Checklist</h3>
                  <p className="text-xs text-muted">{completedCount} of {totalCount} milestones completed</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-ink">{pct}%</span>
                  </div>
                  <div className="h-3 w-32 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100 ? "#059669" : "linear-gradient(90deg, #D89B5B, #F5C082)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Add Task Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsAddOpen(true)}
                  className="bg-copper text-[#080A0F] font-bold text-xs gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Custom Task
                </Button>
              </div>

              {/* Tasks List */}
              {tasksLoading ? (
                <div className="p-8 text-center text-xs text-muted">Loading tasks...</div>
              ) : totalCount === 0 ? (
                <div className="p-8 text-center text-xs text-muted">No onboarding tasks found for this employee.</div>
              ) : (
                <div className="divide-y divide-line">
                  {tasks.map((task: any) => {
                    const Icon = getCategoryIcon(task.category);
                    return (
                      <div key={task.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={(e) =>
                              toggleMut.mutate({ taskId: task.id, isCompleted: e.target.checked })
                            }
                            className="h-4.5 w-4.5 accent-copper cursor-pointer rounded"
                          />
                          <div className="p-1.5 rounded-lg bg-surface-2">
                            <Icon className="h-3.5 w-3.5 text-copper" />
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold ${task.isCompleted ? "line-through text-muted" : "text-ink"}`}>
                              {task.taskName}
                            </h4>
                            <span className="text-[10px] text-muted font-mono">{task.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge tone={task.isCompleted ? "success" : "neutral"}>
                            {task.isCompleted ? "Done" : "Pending"}
                          </Badge>
                          <button
                            onClick={() => deleteMut.mutate(task.id)}
                            className="p-1 text-muted hover:text-red-400 cursor-pointer"
                            title="Delete Task"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Task Drawer */}
      <Drawer
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Custom Onboarding Task"
        description="Create a new milestone for this employee's onboarding journey."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                addMut.mutate(taskData);
              }}
              disabled={addMut.isPending || !taskData.taskName}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Add Task
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Task Name *</label>
            <input
              type="text"
              required
              value={taskData.taskName}
              onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
              className="field"
              placeholder="e.g. Complete HIPAA compliance training"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Category</label>
            <select
              value={taskData.category}
              onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
              className="field"
            >
              <option value="DOCUMENTATION">Documentation & Legal</option>
              <option value="IT_SETUP">IT Setup & Provisioning</option>
              <option value="SECURITY">Security & Access Control</option>
              <option value="TEAM">Team Introduction</option>
              <option value="HARDWARE">Hardware Distribution</option>
              <option value="TRAINING">Mandatory Training</option>
            </select>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
