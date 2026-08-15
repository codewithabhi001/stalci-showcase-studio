"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployees,
  fetchDepartments,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/lib/api";
import { useRbac } from "@/lib/rbac-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building,
  DollarSign,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function EmployeesPage() {
  const qc = useQueryClient();
  const { currentRole } = useRbac();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState<number | undefined>();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    personalEmail: "",
    phone: "",
    designation: "",
    departmentId: "",
    employmentType: "Full-time",
    workLocation: "San Francisco, CA / Remote",
    salaryCtc: 150000,
    status: "ACTIVE",
    bankName: "",
    bankAccount: "",
    accountHolderName: "",
    bankBranch: "",
    accountType: "Salary Account",
    ifscSwift: "",
    taxIdPanSsn: "",
    pfUanNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    skills: "",
    notes: "",
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees", deptFilter, statusFilter, typeFilter, search],
    queryFn: () =>
      fetchEmployees({
        departmentId: deptFilter,
        status: statusFilter,
        type: typeFilter,
        search: search || undefined,
      }),
  });

  const createMut = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Employee created and onboarding initialized");
      setIsDrawerOpen(false);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateEmployee(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Employee record updated");
      setIsDrawerOpen(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Employee archived");
      setDeletingId(null);
    },
  });

  const handleOpenCreate = () => {
    setEditingEmp(null);
    setFormData({
      name: "",
      email: "",
      personalEmail: "",
      phone: "",
      designation: "",
      departmentId: departments[0]?.id ? String(departments[0].id) : "",
      employmentType: "Full-time",
      workLocation: "",
      salaryCtc: 0,
      status: "ACTIVE",
      bankName: "",
      bankAccount: "",
      accountHolderName: "",
      bankBranch: "",
      accountType: "Salary Account",
      ifscSwift: "",
      taxIdPanSsn: "",
      pfUanNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      skills: "",
      notes: "",
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (emp: any) => {
    setEditingEmp(emp);
    setFormData({
      name: emp.name || "",
      email: emp.email || "",
      personalEmail: emp.personalEmail || "",
      phone: emp.phone || "",
      designation: emp.designation || "",
      departmentId: emp.departmentId ? String(emp.departmentId) : "",
      employmentType: emp.employmentType || "Full-time",
      workLocation: emp.workLocation || "San Francisco, CA / Remote",
      salaryCtc: emp.salaryCtc || 0,
      status: emp.status || "ACTIVE",
      bankName: emp.bankName || "",
      bankAccount: emp.bankAccount || "",
      accountHolderName: emp.accountHolderName || "",
      bankBranch: emp.bankBranch || "",
      accountType: emp.accountType || "Salary Account",
      ifscSwift: emp.ifscSwift || "",
      taxIdPanSsn: emp.taxIdPanSsn || "",
      pfUanNumber: emp.pfUanNumber || "",
      emergencyContactName: emp.emergencyContactName || "",
      emergencyContactPhone: emp.emergencyContactPhone || "",
      skills: emp.skills ? (typeof emp.skills === "string" ? emp.skills : JSON.stringify(emp.skills)) : "",
      notes: emp.notes || "",
    });
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      departmentId: formData.departmentId ? Number(formData.departmentId) : undefined,
      salaryCtc: Number(formData.salaryCtc),
    };
    if (editingEmp) {
      updateMut.mutate({ id: editingEmp.id, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Workforce Directory</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Employee Directory & 360° Profiles
          </h1>
          <p className="text-xs text-muted mt-1">
            Complete organizational personnel roster, department allocations, compensation, and career timelines.
          </p>
        </div>

        {currentRole !== "RECRUITER" && (
          <Button onClick={handleOpenCreate} className="bg-copper text-[#080A0F] font-bold text-xs gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Add New Employee
          </Button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code, work email, or title..."
            className="field pl-9"
          />
        </div>

        <div>
          <select
            value={deptFilter || ""}
            onChange={(e) => setDeptFilter(e.target.value ? Number(e.target.value) : undefined)}
            className="field"
          >
            <option value="">All Departments</option>
            {departments.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="field"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ONBOARDING">Onboarding</option>
            <option value="PROBATION">Probation</option>
            <option value="NOTICE_PERIOD">Notice Period</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollable-y">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-muted">Loading employee roster...</div>
          ) : employees.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted">No employees found matching criteria.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-5 py-3.5">Code</th>
                  <th className="px-5 py-3.5">Department</th>
                  <th className="px-5 py-3.5">Type & Location</th>
                  <th className="px-5 py-3.5">Status</th>
                  {currentRole !== "RECRUITER" && <th className="px-5 py-3.5">Annual CTC</th>}
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {employees.map((emp: any) => (
                  <tr key={emp.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-copper/20 border border-copper/30 text-copper flex items-center justify-center font-bold text-xs shrink-0">
                          {emp.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/hr/employees/${emp.id}`}
                            className="font-bold text-ink hover:text-copper flex items-center gap-1 group text-sm"
                          >
                            <span>{emp.name}</span>
                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <p className="text-[11px] font-normal text-muted">{emp.designation}</p>
                          <p className="text-[10px] font-mono text-muted">{emp.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-muted text-xs">
                      <code className="rounded-md bg-canvas px-2 py-1 border border-line">
                        {emp.employeeCode}
                      </code>
                    </td>

                    <td className="px-5 py-4 font-semibold text-ink">
                      <span className="inline-flex items-center gap-1.5">
                        <Building className="h-3 w-3 text-muted" />
                        {emp.department?.name || "Unassigned"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted text-xs">
                      <div>{emp.employmentType}</div>
                      <div className="text-[10px] text-muted truncate max-w-[140px]">{emp.workLocation}</div>
                    </td>

                    <td className="px-5 py-4">
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
                    </td>

                    {currentRole !== "RECRUITER" && (
                      <td className="px-5 py-4 font-mono font-bold text-ink">
                        ${emp.salaryCtc?.toLocaleString()}
                      </td>
                    )}

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/hr/employees/${emp.id}`}
                          className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors"
                          title="View 360° Profile"
                        >
                          <Eye className="h-3.5 w-3.5 text-copper" />
                        </Link>
                        {currentRole !== "RECRUITER" && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="p-1.5 rounded-lg border border-line text-ink hover:bg-canvas transition-colors cursor-pointer"
                              title="Edit Employee"
                            >
                              <Edit2 className="h-3.5 w-3.5 text-muted" />
                            </button>
                            <button
                              onClick={() => setDeletingId(emp.id)}
                              className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Archive Employee"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
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

      {/* Employee Edit / Create Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingEmp ? `Edit Profile: ${editingEmp.name}` : "Add New Employee"}
        description="Fill complete corporate credentials, compensation, and department allocations."
        width="max-w-3xl"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMut.isPending || updateMut.isPending || !formData.name}
              className="bg-copper text-[#080A0F] font-bold"
            >
              {editingEmp ? "Save Employee Changes" : "Create Employee Record"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="field"
                placeholder="e.g. Dr. Alexander Wright"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Corporate Work Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="field font-mono"
                placeholder="e.g. alex.wright@stalci.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Job Designation *</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="field"
                placeholder="e.g. Staff Distributed Systems Engineer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Department *</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="field"
              >
                {departments.map((d: any) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="field"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Work Location</label>
              <input
                type="text"
                value={formData.workLocation}
                onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                className="field"
                placeholder="San Francisco, CA / Remote"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="field"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="ONBOARDING">ONBOARDING</option>
                <option value="PROBATION">PROBATION</option>
                <option value="NOTICE_PERIOD">NOTICE_PERIOD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="field"
                placeholder="+1 (415) 555-0199"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Personal Email</label>
              <input
                type="email"
                value={formData.personalEmail}
                onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                className="field font-mono"
                placeholder="personal@gmail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Banking Institution Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="field"
                placeholder="JPMorgan Chase & Co."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Account Number / IBAN</label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                className="field font-mono"
                placeholder="94820194820194"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">IFSC / SWIFT Code</label>
              <input
                type="text"
                value={formData.ifscSwift}
                onChange={(e) => setFormData({ ...formData, ifscSwift: e.target.value })}
                className="field font-mono text-xs"
                placeholder="CHASUS33"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">PAN / SSN / Tax ID</label>
              <input
                type="text"
                value={formData.taxIdPanSsn}
                onChange={(e) => setFormData({ ...formData, taxIdPanSsn: e.target.value })}
                className="field font-mono text-xs"
                placeholder="TAX-9481029"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">PF / UAN Number</label>
              <input
                type="text"
                value={formData.pfUanNumber}
                onChange={(e) => setFormData({ ...formData, pfUanNumber: e.target.value })}
                className="field font-mono text-xs"
                placeholder="PF-10098234"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink block mb-1">Core Technical Skills</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="field"
              placeholder="e.g. Go, Rust, Kubernetes, Raft, Distributed Storage"
            />
          </div>
        </form>
      </Drawer>

      {/* Confirm Deletion */}
      <ConfirmDialog
        open={!!deletingId}
        title="Archive Employee?"
        message="This action will mark the employee status as ARCHIVED and preserve their historical records."
        loading={deleteMut.isPending}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMut.mutate(deletingId)}
      />
    </div>
  );
}
