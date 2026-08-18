"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Providers from "../providers";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { CommandPalette } from "@/components/CommandPalette";
import { CreateDropdown } from "@/components/CreateDropdown";
import { useRbac } from "@/lib/rbac-context";
import { handleLogout, isAuthenticated, clearAuthSession } from "@/lib/auth";
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
  Sparkles,
} from "lucide-react";
import { StalciLogoIcon } from "@/components/BrandLogo";

const navSections = [
  {
    title: "Spaces & Overview",
    links: [{ href: "/", label: "Studio Dashboard", icon: LayoutDashboard, color: "text-[#7B2BF9]" }],
  },
  {
    title: "People & HR Operations",
    links: [
      { href: "/hr/dashboard", label: "HR Command Center", icon: LayoutDashboard, color: "text-[#7B2BF9]" },
      { href: "/hr/employees", label: "Workforce Directory", icon: Users, color: "text-[#0091FF]" },
      { href: "/hr/recruitment", label: "Hiring & Candidates", icon: Briefcase, color: "text-[#6366F1]" },
      { href: "/hr/offers", label: "Offer Letters", icon: FileText, color: "text-[#06B6D4]" },
      { href: "/hr/onboarding", label: "Onboarding Tracker", icon: Award, color: "text-[#0D9488]" },
      { href: "/hr/attendance-leave", label: "Attendance & Leaves", icon: Clock, color: "text-[#F59E0B]" },
      { href: "/hr/payroll", label: "Payroll & Payslips", icon: Receipt, color: "text-[#10B981]" },
      { href: "/hr/internships", label: "Internships", icon: GraduationCap, color: "text-[#F43F5E]" },
      { href: "/hr/performance-training", label: "Performance & Training", icon: TrendingUp, color: "text-[#8B5CF6]" },
      { href: "/hr/assets", label: "Assets Inventory", icon: Laptop, color: "text-[#0284C7]" },
      { href: "/hr/letters", label: "HR Letter Templates", icon: FileCode, color: "text-[#64748B]" },
      { href: "/hr/exits", label: "Exits & F&F Settlement", icon: LogOut, color: "text-[#EA580C]" },
      { href: "/hr/rbac", label: "Roles & Permissions", icon: ShieldCheck, color: "text-[#EC4899]" },
    ],
  },
  {
    title: "Business & CRM",
    links: [
      { href: "/clients", label: "Clients Directory", icon: Users, color: "text-[#2563EB]" },
      { href: "/projects", label: "Projects Pipeline", icon: FolderKanban, color: "text-[#7C3AED]" },
      { href: "/inquiries", label: "Client Inquiries", icon: MessageSquare, color: "text-[#059669]" },
      { href: "/jobs", label: "Job Postings", icon: Briefcase, color: "text-[#4F46E5]" },
      { href: "/feedback", label: "Client Feedback", icon: Star, color: "text-[#D97706]" },
    ],
  },
  {
    title: "Billing & Invoices",
    links: [
      { href: "/invoices", label: "Invoices & Billing", icon: Receipt, color: "text-[#10B981]" },
      { href: "/invoice-templates", label: "Invoice Templates", icon: FileCode, color: "text-[#7B2BF9]" },
    ],
  },
  {
    title: "Portfolio CMS",
    links: [
      { href: "/services", label: "Services CMS", icon: Boxes, color: "text-[#9333EA]" },
      { href: "/technologies", label: "Tech Stack & Skills", icon: Code2, color: "text-[#0891B2]" },
      { href: "/testimonials", label: "Testimonials", icon: Quote, color: "text-[#D97706]" },
      { href: "/blogs", label: "Blogs & Articles", icon: Newspaper, color: "text-[#3B82F6]" },
      { href: "/pages", label: "Site Pages", icon: FileText, color: "text-[#0D9488]" },
    ],
  },
  {
    title: "System",
    links: [{ href: "/settings", label: "Site Configuration", icon: Settings, color: "text-[#64748B]" }],
  },
];

const allLinks = navSections.flatMap((s) => s.links);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();
  const sidebarNavRef = useRef<HTMLElement>(null);
  const { canAccessRoute } = useRbac();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle client-side instant auth check
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isAuthenticated()) {
        clearAuthSession();
        window.location.replace("/login");
      } else {
        setAuthenticated(true);
      }
    }
  }, []);

  // Keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (authenticated === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FAFAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0052FF] border-t-transparent" />
          <p className="text-xs font-medium text-zinc-500 font-mono tracking-wide">Validating session...</p>
        </div>
      </div>
    );
  }

  const current = allLinks.find((l) => l.href === pathname);

  const handleSignOut = () => {
    handleLogout();
  };

  const Sidebar = (
    <div className="flex h-screen max-h-screen flex-col bg-[#090A0F] text-white border-r border-[#1E2028] overflow-hidden">
      {/* Top Brand Header */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-[#1E2028] bg-[#090A0F]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8.5 w-8.5 rounded-xl bg-zinc-900 text-white flex items-center justify-center p-1.5 shadow-xs border border-zinc-700/80 group-hover:scale-105 transition-transform">
            <StalciLogoIcon size={24} />
          </div>
          <div>
            <span className="text-[13px] font-bold tracking-tight text-white block leading-tight font-display">
              STALCI STUDIO
            </span>
            <span className="text-[9.5px] text-[#3B82F6] tracking-wider uppercase font-mono font-bold">
              Workspace OS
            </span>
          </div>
        </Link>
        <span className="rounded-full bg-[#181B26] px-2 py-0.5 text-[9.5px] font-bold text-zinc-300 border border-zinc-700/80 font-mono">
          PRO
        </span>
      </div>

      {/* Quick Search Button */}
      <div className="px-3 pt-3 pb-2 shrink-0 bg-[#090A0F]">
        <button
          onClick={() => setCommandOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-[#1E2028] bg-[#12141C] px-3 py-1.5 text-[11.5px] text-zinc-400 transition-all hover:border-zinc-700 hover:text-white hover:bg-[#181B26] shadow-2xs cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#3B82F6] transition-colors" />
            Quick jump...
          </span>
          <kbd className="rounded border border-zinc-700 bg-[#181B26] px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 font-semibold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Links List (Flawless Native + Wheel Scrolling) */}
      <nav 
        onWheel={(e) => {
          e.currentTarget.scrollTop += e.deltaY;
        }}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4 pb-20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{ scrollBehavior: "smooth" }}
      >
        {navSections.map((sec) => {
          const visibleLinks = sec.links.filter((l) => canAccessRoute(l.href));
          if (visibleLinks.length === 0) return null;

          return (
            <div key={sec.title} className="space-y-0.5">
              <p className="px-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300/90 mb-1.5">
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
                      className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[12.5px] transition-colors ${
                        active
                          ? "bg-[#0052FF] text-white font-bold shadow-xs"
                          : "text-zinc-300 hover:bg-[#181B26] hover:text-white font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-zinc-300 group-hover:text-white"}`} />
                        <span className="truncate">{link.label}</span>
                      </div>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Pinned Footer */}
      <div className="p-3 shrink-0 border-t border-[#1E2028] bg-[#090A0F] space-y-1.5">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold text-zinc-300 hover:bg-[#181B26] hover:text-white transition-colors border border-[#1E2028] shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            Live Portfolio
          </span>
          <span className="text-[9.5px] font-mono font-bold text-zinc-300 bg-[#181B26] px-1.5 py-0.5 rounded border border-zinc-700">
            :8080 ↗
          </span>
        </a>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-zinc-950 relative selection:bg-zinc-200 selection:text-zinc-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        {Sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl">
            {Sidebar}
          </div>
        </div>
      )}

      {/* Main content wrapper */}
      <div className="lg:pl-64 flex min-h-screen flex-col relative z-10">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200/90 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Link href="/" className="hover:text-zinc-950 transition-colors font-medium">
                Studio
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="font-semibold text-zinc-950">{current?.label || "Dashboard"}</span>
            </div>

            {/* Live Operational Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-200 ml-2 shadow-2xs">
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
              className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-1.5 text-xs text-zinc-500 hover:border-zinc-400 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer shadow-2xs"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span>Search...</span>
              <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[9.5px] font-mono text-zinc-400">
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
