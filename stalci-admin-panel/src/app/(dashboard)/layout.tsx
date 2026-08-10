"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Providers from "../providers";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { CommandPalette } from "@/components/CommandPalette";
import { CreateDropdown } from "@/components/CreateDropdown";
import { useRbac, ROLE_DEFINITIONS, RoleType } from "@/lib/rbac-context";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Newspaper,
  Boxes,
  Code2,
  Quote,
  MessageSquare,
  Briefcase,
  Star,
  Receipt,
  FileCode,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  ChevronRight,
  ExternalLink,
  Clock,
  GraduationCap,
  TrendingUp,
  Laptop,
  ShieldCheck,
  Award,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    links: [{ href: "/", label: "Studio Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "People & HR Operations",
    links: [
      { href: "/hr/dashboard", label: "HR Command Center", icon: LayoutDashboard },
      { href: "/hr/employees", label: "Workforce Directory", icon: Users },
      { href: "/hr/recruitment", label: "Hiring & Candidates", icon: Briefcase },
      { href: "/hr/offers", label: "Offer Letters", icon: FileText },
      { href: "/hr/onboarding", label: "Onboarding Tracker", icon: Award },
      { href: "/hr/attendance-leave", label: "Attendance & Leaves", icon: Clock },
      { href: "/hr/payroll", label: "Payroll & Payslips", icon: Receipt },
      { href: "/hr/internships", label: "Internships", icon: GraduationCap },
      { href: "/hr/performance-training", label: "Performance & Training", icon: TrendingUp },
      { href: "/hr/assets", label: "Assets Inventory", icon: Laptop },
      { href: "/hr/letters", label: "HR Letter Templates", icon: FileCode },
      { href: "/hr/exits", label: "Exits & F&F Settlement", icon: LogOut },
      { href: "/hr/rbac", label: "Roles & Permissions", icon: ShieldCheck },
    ],
  },
  {
    title: "Business & CRM",
    links: [
      { href: "/clients", label: "Clients Directory", icon: Users },
      { href: "/projects", label: "Projects Pipeline", icon: FolderKanban },
      { href: "/inquiries", label: "Client Inquiries", icon: MessageSquare },
      { href: "/jobs", label: "Job Postings", icon: Briefcase },
      { href: "/feedback", label: "Client Feedback", icon: Star },
    ],
  },
  {
    title: "Billing & Invoices",
    links: [
      { href: "/invoices", label: "Invoices & Billing", icon: Receipt },
      { href: "/invoice-templates", label: "Invoice Templates", icon: FileCode },
    ],
  },
  {
    title: "Portfolio CMS",
    links: [
      { href: "/services", label: "Services CMS", icon: Boxes },
      { href: "/technologies", label: "Tech Stack & Skills", icon: Code2 },
      { href: "/testimonials", label: "Testimonials", icon: Quote },
      { href: "/blogs", label: "Blogs & Articles", icon: Newspaper },
      { href: "/pages", label: "Site Pages", icon: FileText },
    ],
  },
  {
    title: "System",
    links: [{ href: "/settings", label: "Site Configuration", icon: Settings }],
  },
];

const allLinks = navSections.flatMap((s) => s.links);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const { currentRole, setRole, roleInfo, canAccessRoute } = useRbac();
  const sidebarNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const current = allLinks.find((l) => l.href === pathname);

  const handleSignOut = () => {
    document.cookie = "stalci_admin=; path=/; max-age=0";
    window.location.href = "/login";
  };

  const Sidebar = (
    <div className="flex h-screen max-h-screen flex-col bg-[#0B0D13] text-white border-r border-white/10 select-none overflow-hidden">
      {/* Top Fixed Brand Header */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-white/10 bg-[#080A0F]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-copper/50 flex items-center justify-center p-1.5 shadow-md shadow-amber-950/40">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <defs>
                <linearGradient id="sideLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5C082" />
                  <stop offset="50%" stopColor="#D89B5B" />
                  <stop offset="100%" stopColor="#9E6229" />
                </linearGradient>
              </defs>
              <path d="M 60 22 L 88 38 L 74 46 L 46 30 Z" fill="url(#sideLogo)" />
              <path d="M 32 46 L 74 46 L 88 54 L 46 70 L 32 62 Z" fill="url(#sideLogo)" opacity="0.95" />
              <path d="M 46 70 L 74 86 L 60 98 L 32 82 Z" fill="url(#sideLogo)" />
              <polygon points="60,48 70,60 60,72 50,60" fill="#FFFFFF" />
            </svg>
          </div>
          <div>
            <span className="text-[13px] font-extrabold tracking-tight text-white block leading-tight">
              STALCI STUDIO
            </span>
            <span className="text-[9px] text-copper/80 tracking-widest uppercase font-mono font-semibold">
              HR & Enterprise OS
            </span>
          </div>
        </Link>
        <span className="rounded-full bg-copper/15 px-2 py-0.5 text-[9.5px] font-bold text-copper border border-copper/20">
          v3.0 HR
        </span>
      </div>

      {/* Quick search button */}
      <div className="px-3 pt-2.5 pb-1.5 shrink-0 bg-[#0B0D13]">
        <button
          onClick={() => setCommandOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11.5px] text-white/60 transition-colors hover:border-copper/40 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3 w-3 text-copper" />
            Quick jump...
          </span>
          <kbd className="rounded border border-white/10 bg-white/[0.08] px-1 py-0.5 text-[9px] font-mono text-white/50">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Independently Scrollable Navigation List */}
      <nav
        ref={sidebarNavRef as any}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollable-y px-2.5 py-1.5 space-y-3.5 overscroll-contain pb-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
      >
        {navSections.map((sec) => {
          const visibleLinks = sec.links.filter((l) => canAccessRoute(l.href));
          if (visibleLinks.length === 0) return null;

          return (
            <div key={sec.title} className="space-y-0.5">
              <p className="px-2.5 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-white/40 mb-1">
                {sec.title}
              </p>
              <div className="space-y-0.5">
                {visibleLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12px] transition-all ${
                        active
                          ? "bg-copper text-slate-950 font-bold shadow-md shadow-amber-950/30"
                          : "text-white/70 hover:bg-white/[0.06] hover:text-white font-medium"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-slate-950" : "text-copper"}`} />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Pinned Footer */}
      <div className="p-2.5 shrink-0 border-t border-white/10 bg-[#080A0F] space-y-1">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-white/80 hover:bg-white/[0.06] hover:text-white transition-colors border border-white/5"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3 w-3 text-copper" />
            Live Portfolio
          </span>
          <span className="text-[9.5px] font-mono text-copper bg-copper/10 px-1.5 py-0.5 rounded">
            :8080 ↗
          </span>
        </a>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1 text-[11px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-3 w-3" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        {Sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            {Sidebar}
          </div>
        </div>
      )}

      {/* Main content wrapper */}
      <div className="lg:pl-64 flex min-h-screen flex-col">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-ink cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span className="font-medium text-ink hidden sm:inline">STALCI Studio</span>
              <ChevronRight className="h-3 w-3 hidden sm:inline" />
              <span className="font-bold text-copper truncate">
                {current?.label || "Console"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Role Switcher Simulator in Topbar */}
            <div className="flex items-center gap-2 bg-surface-2 px-2.5 py-1 rounded-xl border border-line shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-copper" />
              <span className="text-[10.5px] font-bold text-muted uppercase tracking-wider hidden sm:inline">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => setRole(e.target.value as RoleType)}
                className="bg-transparent text-xs font-bold text-ink cursor-pointer focus:outline-none"
              >
                {(Object.keys(ROLE_DEFINITIONS) as RoleType[]).map((r) => (
                  <option key={r} value={r} className="bg-surface text-ink">
                    {ROLE_DEFINITIONS[r].label}
                  </option>
                ))}
              </select>
            </div>

            <CreateDropdown />
            <NotificationsPopover />
            <ProfileDropdown />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
    </div>
  );
}
