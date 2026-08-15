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
    <div className="flex h-screen max-h-screen flex-col bg-surface/95 backdrop-blur-xl text-ink border-r border-line select-none overflow-hidden">
      {/* Top Fixed Brand Header */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-line bg-surface/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8.5 w-8.5 rounded-xl bg-copper/15 border border-copper/35 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(216,155,91,0.2)] group-hover:border-copper transition-all">
            <img src="/stalci-mark.png" alt="STALCI mark" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="text-[13px] font-bold tracking-tight text-ink block leading-tight font-display">
              STALCI STUDIO
            </span>
            <span className="text-[8.5px] text-copper-deep tracking-widest uppercase font-mono font-bold">
              Executive OS v3.0
            </span>
          </div>
        </Link>
        <span className="rounded-full bg-copper/10 px-2 py-0.5 text-[9.5px] font-bold text-copper-deep border border-copper/30 font-mono shadow-2xs">
          PRO
        </span>
      </div>

      {/* Quick Search Button */}
      <div className="px-3 pt-3 pb-2 shrink-0 bg-canvas/40">
        <button
          onClick={() => setCommandOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-line bg-surface-2/60 px-3 py-1.5 text-[11.5px] text-muted transition-all hover:border-copper/40 hover:text-ink hover:bg-surface-2 shadow-2xs cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-copper transition-transform group-hover:scale-110" />
            Quick jump...
          </span>
          <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 text-[9px] font-mono text-faint font-semibold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Links List */}
      <nav
        ref={sidebarNavRef as any}
        onWheel={(e) => {
          if (e.currentTarget) {
            e.currentTarget.scrollTop += e.deltaY;
          }
        }}
        className="flex-1 min-h-0 h-[calc(100vh-140px)] overflow-y-scroll overflow-x-hidden scrollable-y px-2.5 py-2 space-y-4 overscroll-contain pb-16 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {navSections.map((sec) => {
          const visibleLinks = sec.links.filter((l) => canAccessRoute(l.href));
          if (visibleLinks.length === 0) return null;

          return (
            <div key={sec.title} className="space-y-1">
              <p className="px-2.5 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-faint mb-1.5">
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
                      className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[12px] transition-all duration-150 ${
                        active
                          ? "bg-copper/15 text-copper-deep font-bold border border-copper/35 shadow-[0_2px_12px_rgba(216,155,91,0.15)]"
                          : "text-muted hover:bg-surface-2/80 hover:text-ink font-medium border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-copper" : "text-faint"}`} />
                        <span className="truncate">{link.label}</span>
                      </div>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_8px_#D89B5B]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Pinned Footer */}
      <div className="p-3 shrink-0 border-t border-line bg-surface/90 backdrop-blur-md space-y-1.5">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors border border-line"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-copper" />
            Live Portfolio
          </span>
          <span className="text-[9.5px] font-mono font-bold text-copper-deep bg-copper/10 px-1.5 py-0.5 rounded border border-copper/30">
            :8080 ↗
          </span>
        </a>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11.5px] font-semibold text-red-600 hover:bg-red-500/10 hover:text-red-700 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink relative selection:bg-copper/20 selection:text-copper-deep">
      {/* Background ambient lighting orb */}
      <div
        className="pointer-events-none fixed -right-32 -top-32 h-[450px] w-[450px] rounded-full opacity-10 blur-[130px] z-0"
        style={{ background: "#6366F1" }}
      />

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        {Sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            {Sidebar}
          </div>
        </div>
      )}

      {/* Main content wrapper */}
      <div className="lg:pl-64 flex min-h-screen flex-col relative z-10">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/85 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-ink cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-ink transition-colors font-medium">
                Studio
              </Link>
              <ChevronRight className="h-3 w-3 text-faint" />
              <span className="font-semibold text-ink">{current?.label || "Dashboard"}</span>
            </div>

            {/* Live Operational Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-500/25 ml-2 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Create Dropdown */}
            <CreateDropdown />

            {/* Search trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-1.5 text-xs text-muted hover:border-copper/40 hover:text-ink transition-all cursor-pointer shadow-2xs"
            >
              <Search className="h-3.5 w-3.5 text-copper" />
              <span>Search...</span>
              <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 text-[9.5px] font-mono text-faint">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Popover */}
            <NotificationsPopover />

            {/* User Profile & Role Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Providers>{children}</Providers>
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
    </div>
  );
}
