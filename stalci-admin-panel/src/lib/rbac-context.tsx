"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type RoleType =
  | "SUPER_ADMIN"
  | "HR_ADMIN"
  | "RECRUITER"
  | "HR_OPS"
  | "PAYROLL_FINANCE"
  | "MANAGER"
  | "EMPLOYEE"
  | "INTERN";

export interface UserRoleInfo {
  role: RoleType;
  label: string;
  badgeTone: "copper" | "success" | "warning" | "info" | "neutral";
  description: string;
  allowedRoutes: string[];
}

export const ROLE_DEFINITIONS: Record<RoleType, UserRoleInfo> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Admin (Root)",
    badgeTone: "copper",
    description: "Complete unconstrained access to all operations, security, RBAC, billing, and executive data.",
    allowedRoutes: ["*"],
  },
  HR_ADMIN: {
    role: "HR_ADMIN",
    label: "HR Manager / Admin",
    badgeTone: "copper",
    description: "Full operational access to employee lifecycle, recruitment, letters, leaves, and analytics.",
    allowedRoutes: [
      "/",
      "/hr/dashboard",
      "/hr/employees",
      "/hr/recruitment",
      "/hr/offers",
      "/hr/onboarding",
      "/hr/attendance-leave",
      "/hr/internships",
      "/hr/performance-training",
      "/hr/assets",
      "/hr/letters",
      "/hr/exits",
      "/jobs",
      "/feedback",
    ],
  },
  RECRUITER: {
    role: "RECRUITER",
    label: "Talent Recruiter",
    badgeTone: "info",
    description: "Dedicated to job postings, applicant screening, interview scheduling, and offer tracking.",
    allowedRoutes: [
      "/",
      "/hr/recruitment",
      "/hr/offers",
      "/jobs",
    ],
  },
  HR_OPS: {
    role: "HR_OPS",
    label: "HR Operations",
    badgeTone: "success",
    description: "Manages employee records, onboarding checklists, attendance logs, leaves, and IT assets.",
    allowedRoutes: [
      "/",
      "/hr/dashboard",
      "/hr/employees",
      "/hr/onboarding",
      "/hr/attendance-leave",
      "/hr/internships",
      "/hr/assets",
      "/hr/letters",
      "/hr/exits",
    ],
  },
  PAYROLL_FINANCE: {
    role: "PAYROLL_FINANCE",
    label: "Payroll & Finance",
    badgeTone: "warning",
    description: "Manages salary structures, monthly payroll runs, payslips, and final settlement financial calculations.",
    allowedRoutes: [
      "/",
      "/hr/dashboard",
      "/hr/employees",
      "/hr/payroll",
      "/hr/exits",
      "/invoices",
      "/invoice-templates",
    ],
  },
  MANAGER: {
    role: "MANAGER",
    label: "Engineering / Team Manager",
    badgeTone: "info",
    description: "Supervises assigned department pods, reviews team attendance, approves leaves, and submits KPI reviews.",
    allowedRoutes: [
      "/",
      "/hr/dashboard",
      "/hr/employees",
      "/hr/attendance-leave",
      "/hr/performance-training",
      "/projects",
    ],
  },
  EMPLOYEE: {
    role: "EMPLOYEE",
    label: "Staff Employee (Self-Service)",
    badgeTone: "neutral",
    description: "Self-service access to personal profile, attendance logging, leave requests, and payslips.",
    allowedRoutes: [
      "/",
      "/hr/employees",
      "/hr/attendance-leave",
      "/hr/payroll",
      "/hr/performance-training",
      "/hr/assets",
    ],
  },
  INTERN: {
    role: "INTERN",
    label: "Research Intern",
    badgeTone: "neutral",
    description: "Self-service access to internship project milestones, attendance, mentor feedback, and certificate.",
    allowedRoutes: [
      "/",
      "/hr/attendance-leave",
      "/hr/internships",
      "/hr/performance-training",
    ],
  },
};

interface RbacContextValue {
  currentRole: RoleType;
  setRole: (role: RoleType) => void;
  roleInfo: UserRoleInfo;
  canAccessRoute: (pathname: string) => boolean;
}

const RbacContext = createContext<RbacContextValue | null>(null);

export function RbacProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleType>("SUPER_ADMIN");

  useEffect(() => {
    const saved = localStorage.getItem("stalci_simulated_role") as RoleType;
    if (saved && ROLE_DEFINITIONS[saved]) {
      setCurrentRole(saved);
    }
  }, []);

  const handleSetRole = (role: RoleType) => {
    setCurrentRole(role);
    localStorage.setItem("stalci_simulated_role", role);
  };

  const roleInfo = ROLE_DEFINITIONS[currentRole] || ROLE_DEFINITIONS.SUPER_ADMIN;

  const canAccessRoute = (pathname: string) => {
    if (currentRole === "SUPER_ADMIN") return true;
    if (roleInfo.allowedRoutes.includes("*")) return true;
    return roleInfo.allowedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
  };

  return (
    <RbacContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        roleInfo,
        canAccessRoute,
      }}
    >
      {children}
    </RbacContext.Provider>
  );
}

export function useRbac() {
  const ctx = useContext(RbacContext);
  if (!ctx) {
    return {
      currentRole: "SUPER_ADMIN" as RoleType,
      setRole: () => {},
      roleInfo: ROLE_DEFINITIONS.SUPER_ADMIN,
      canAccessRoute: () => true,
    };
  }
  return ctx;
}
