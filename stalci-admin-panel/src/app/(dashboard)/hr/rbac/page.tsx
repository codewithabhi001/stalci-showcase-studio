"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchRoles, fetchPermissions } from "@/lib/api";
import { useRbac, ROLE_DEFINITIONS, RoleType } from "@/lib/rbac-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  ShieldCheck,
  Key,
  Users,
  CheckCircle2,
  Lock,
  UserCheck,
} from "lucide-react";

export default function RbacPage() {
  const { currentRole, setRole } = useRbac();

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["rbac-roles"],
    queryFn: fetchRoles,
  });

  const { data: permissions = [], isLoading: permLoading } = useQuery({
    queryKey: ["rbac-permissions"],
    queryFn: fetchPermissions,
  });

  const handleSimulate = (roleName: RoleType) => {
    setRole(roleName);
    toast.success(`Active simulation switched to ${ROLE_DEFINITIONS[roleName]?.label || roleName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Security & Governance</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Role-Based Access Control (RBAC) & Permissions
          </h1>
          <p className="text-xs text-muted mt-1">
            Configure system roles, granular operational scopes, and test multi-role experiences with the live simulator.
          </p>
        </div>
      </div>

      {/* Live Role Switcher Simulator Banner */}
      <div className="rounded-2xl border border-copper/40 bg-gradient-to-r from-copper/10 via-surface to-canvas p-6 space-y-4 shadow-sm">
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
                    ? "border-copper bg-copper text-slate-950 font-bold shadow-md"
                    : "border-line bg-surface hover:border-copper/60 text-ink"
                }`}
              >
                <div className="text-xs font-bold">{def.label}</div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-slate-900" : "text-muted"}`}>
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
          roles.map((r: any) => (
            <div key={r.id} className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-copper" />
                  <h4 className="text-sm font-bold text-ink">{r.name}</h4>
                </div>
                <Badge tone="neutral" className="font-mono text-[10px]">
                  {r._count?.userRoles || 0} Assigned Users
                </Badge>
              </div>

              <p className="text-xs text-muted leading-relaxed">{r.description || "Operational role"}</p>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted">{r.permissions?.length || 0} Permissions</span>
                <Button
                  onClick={() => handleSimulate(r.name as RoleType)}
                  className="h-7 text-xs font-bold bg-surface-2 hover:bg-canvas text-ink border border-line"
                >
                  Simulate Role ↗
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <Lock className="h-4 w-4 text-copper" />
          System Permission Matrix
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {permissions.map((p: any) => (
            <div key={p.id} className="p-3 rounded-xl border border-line bg-canvas space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">{p.name}</span>
                <Badge tone="copper" className="text-[9px] font-mono">{p.category}</Badge>
              </div>
              <code className="text-[10px] text-muted block font-mono">{p.slug}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
