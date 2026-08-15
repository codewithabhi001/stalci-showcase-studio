"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRoles,
  fetchPermissions,
  fetchEmployees,
  assignRoleToEmployee,
  updateRolePermissions,
} from "@/lib/api";
import { useRbac, ROLE_DEFINITIONS, RoleType } from "@/lib/rbac-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  ShieldCheck,
  Key,
  Users,
  CheckCircle2,
  Lock,
  UserCheck,
  Edit2,
  Plus,
  Search,
  UserPlus,
} from "lucide-react";

export default function RbacPage() {
  const { currentRole, setRole } = useRbac();
  const qc = useQueryClient();

  const [assigningRole, setAssigningRole] = useState<any | null>(null);
  const [editingPermissionsRole, setEditingPermissionsRole] = useState<any | null>(null);
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [selectedPermIds, setSelectedPermIds] = useState<number[]>([]);
  const [permSearch, setPermSearch] = useState("");

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["rbac-roles"],
    queryFn: fetchRoles,
  });

  const { data: permissions = [], isLoading: permLoading } = useQuery({
    queryKey: ["rbac-permissions"],
    queryFn: fetchPermissions,
  });

  const assignMut = useMutation({
    mutationFn: ({ employeeId, roleId }: { employeeId: number; roleId: number }) =>
      assignRoleToEmployee(employeeId, roleId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rbac-roles"] });
      toast.success("Employee role updated successfully");
      setAssigningRole(null);
      setSelectedEmpId("");
    },
  });

  const permMut = useMutation({
    mutationFn: ({ roleId, permissionIds }: { roleId: number; permissionIds: number[] }) =>
      updateRolePermissions(roleId, permissionIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rbac-roles"] });
      toast.success("Role permissions updated successfully");
      setEditingPermissionsRole(null);
    },
  });

  const handleSimulate = (roleName: RoleType) => {
    setRole(roleName);
    toast.success(`Active role switched to ${ROLE_DEFINITIONS[roleName]?.label || roleName}`);
  };

  const handleOpenAssign = (role: any) => {
    setAssigningRole(role);
    setSelectedEmpId("");
  };

  const handleOpenEditPerms = (role: any) => {
    setEditingPermissionsRole(role);
    setSelectedPermIds(role.permissions?.map((p: any) => p.id) || []);
  };

  const togglePerm = (id: number) => {
    if (selectedPermIds.includes(id)) {
      setSelectedPermIds(selectedPermIds.filter((pId) => pId !== id));
    } else {
      setSelectedPermIds([...selectedPermIds, id]);
    }
  };

  const filteredPermissions = permissions.filter(
    (p: any) =>
      p.name.toLowerCase().includes(permSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(permSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(permSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Security & Governance</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Role-Based Access Control (RBAC) & Permission Engine
          </h1>
          <p className="text-xs text-muted mt-1">
            Super Admin control center to assign employee roles, toggle granular operational scopes, and test multi-role experiences.
          </p>
        </div>
      </div>

      {/* Live Role Switcher Simulator Banner */}
      <div className="rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-copper" />
            <h3 className="text-sm font-bold text-ink">Active Role Simulator</h3>
          </div>
          <Badge tone="copper" className="font-mono text-xs">
            Current: {ROLE_DEFINITIONS[currentRole]?.label || currentRole}
          </Badge>
        </div>
        <p className="text-xs text-muted">
          Click any role below to instantly simulate the system experience, navigation visibility, and permission boundaries:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(Object.keys(ROLE_DEFINITIONS) as RoleType[]).map((r) => {
            const def = ROLE_DEFINITIONS[r];
            const isSelected = currentRole === r;
            return (
              <button
                key={r}
                onClick={() => handleSimulate(r)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-copper bg-copper text-white font-bold shadow-md"
                    : "border-line bg-surface-2/60 hover:bg-surface hover:border-copper/40 text-ink"
                }`}
              >
                <div className="text-xs font-bold">{def.label}</div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-white/80" : "text-muted"}`}>
                  {def.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rolesLoading ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">Loading roles...</div>
        ) : (
          roles.map((r: any) => {
            const roleDef = ROLE_DEFINITIONS[r.name as RoleType] || {};
            const assignedEmps = r.userRoles?.map((ur: any) => ur.employee).filter(Boolean) || [];

            return (
              <div key={r.id} className="rounded-2xl border border-line bg-surface p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-copper" />
                      <h4 className="text-sm font-bold text-ink">{r.name}</h4>
                    </div>
                    <Badge tone="copper" className="font-mono text-[10px]">
                      {assignedEmps.length} Assigned {assignedEmps.length === 1 ? "User" : "Users"}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted leading-relaxed">
                    {r.description || roleDef.description || "Operational security scope"}
                  </p>

                  {/* Assigned Employees Chips */}
                  {assignedEmps.length > 0 && (
                    <div className="pt-2 border-t border-line space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase">Assigned Employees:</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {assignedEmps.map((emp: any) => (
                          <span
                            key={emp.id}
                            className="px-2 py-0.5 rounded-lg bg-surface-2 border border-line text-[11px] text-ink font-semibold flex items-center gap-1"
                          >
                            <Users className="h-3 w-3 text-copper" /> {emp.name} ({emp.employeeCode})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Granted Permissions Tags */}
                  <div className="pt-2 border-t border-line space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase">
                      Permissions Granted ({r.permissions?.length || 0}):
                    </span>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {r.permissions?.length === 0 ? (
                        <span className="text-[11px] text-muted italic">No granular permissions attached yet.</span>
                      ) : (
                        r.permissions?.slice(0, 6).map((p: any) => (
                          <span
                            key={p.id}
                            className="px-2 py-0.5 rounded-md bg-canvas text-[10px] font-mono text-slate-700"
                          >
                            {p.slug}
                          </span>
                        ))
                      )}
                      {r.permissions?.length > 6 && (
                        <span className="text-[10px] font-mono text-copper font-bold self-center">
                          +{r.permissions.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-line flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    {currentRole === "SUPER_ADMIN" && (
                      <>
                        <button
                          onClick={() => handleOpenAssign(r)}
                          className="px-2.5 py-1 rounded-lg border border-line bg-surface hover:bg-canvas text-xs font-bold text-ink flex items-center gap-1 cursor-pointer"
                        >
                          <UserPlus className="h-3.5 w-3.5 text-copper" /> Assign User
                        </button>
                        <button
                          onClick={() => handleOpenEditPerms(r)}
                          className="px-2.5 py-1 rounded-lg border border-line bg-surface hover:bg-canvas text-xs font-bold text-ink flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-copper" /> Edit Perms
                        </button>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => handleSimulate(r.name as RoleType)}
                    className="h-7 text-xs font-bold bg-copper text-white hover:bg-copper-deep"
                  >
                    Simulate Role ↗
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            <Lock className="h-4 w-4 text-copper" />
            System Permission Registry
          </h3>

          <div className="relative">
            <Search className="h-3.5 w-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search permissions..."
              value={permSearch}
              onChange={(e) => setPermSearch(e.target.value)}
              className="field pl-8 text-xs py-1 h-8 w-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredPermissions.map((p: any) => (
            <div key={p.id} className="p-3 rounded-xl border border-line bg-surface-2/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">{p.name}</span>
                <Badge tone="copper" className="text-[9px] font-mono">{p.category}</Badge>
              </div>
              <code className="text-[10px] text-muted block font-mono">{p.slug}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Assign User/Employee Role Drawer */}
      <Drawer
        open={!!assigningRole}
        onClose={() => setAssigningRole(null)}
        title={`Assign Role: ${assigningRole?.name}`}
        description="Select an employee to assign this operational security role."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setAssigningRole(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                assigningRole &&
                assignMut.mutate({ employeeId: Number(selectedEmpId), roleId: assigningRole.id })
              }
              disabled={assignMut.isPending || !selectedEmpId}
              className="bg-copper text-white font-bold"
            >
              Confirm Role Assignment
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <label className="text-xs font-bold text-ink block mb-1">Select Employee *</label>
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="field"
          >
            <option value="">-- Select Employee --</option>
            {employees.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.employeeCode} - {e.designation})
              </option>
            ))}
          </select>
        </div>
      </Drawer>

      {/* Edit Role Permissions Drawer */}
      <Drawer
        open={!!editingPermissionsRole}
        onClose={() => setEditingPermissionsRole(null)}
        title={`Edit Permissions: ${editingPermissionsRole?.name}`}
        description="Check/uncheck permissions granted to this operational role."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingPermissionsRole(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                editingPermissionsRole &&
                permMut.mutate({
                  roleId: editingPermissionsRole.id,
                  permissionIds: selectedPermIds,
                })
              }
              disabled={permMut.isPending}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Save Permission Matrix
            </Button>
          </div>
        }
      >
        <div className="space-y-3 divide-y divide-line max-h-[60vh] overflow-y-auto pr-2">
          {permissions.map((p: any) => (
            <div key={p.id} className="pt-2 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-ink">{p.name}</h5>
                <code className="text-[10px] text-muted font-mono">{p.slug} • {p.category}</code>
              </div>
              <input
                type="checkbox"
                checked={selectedPermIds.includes(p.id)}
                onChange={() => togglePerm(p.id)}
                className="h-4 w-4 accent-copper cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
