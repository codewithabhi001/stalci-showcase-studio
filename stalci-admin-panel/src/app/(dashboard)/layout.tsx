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
  const { canAccessRoute } = useRbac();
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
    localStorage.removeItem("stalci_access_token");
    localStorage.removeItem("stalci_refresh_token");
    localStorage.removeItem("stalci_user");
    document.cookie = "stalci_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  const Sidebar = (
    <div className="flex h-screen max-h-screen flex-col bg-white text-zinc-950 border-r border-zinc-200/90 select-none overflow-hidden">
      {/* Top Brand Header */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-zinc-200/80 bg-white">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8.5 w-8.5 rounded-xl bg-indigo-600 text-white flex items-center justify-center p-1.5 shadow-xs group-hover:bg-indigo-700 transition-colors">
            <span className="font-display font-extrabold text-sm tracking-tight text-white">S</span>
          </div>
          <div>
            <span className="text-[13px] font-bold tracking-tight text-zinc-950 block leading-tight font-display">
              STALCI STUDIO
            </span>
            <span className="text-[9px] text-indigo-600 tracking-wider uppercase font-mono font-bold">
              Admin OS v3.0
            </span>
          </div>
        </Link>
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9.5px] font-bold text-indigo-700 border border-indigo-200 font-mono">
          PRO
        </span>
      </div>

      {/* Quick Search Button */}
      <div className="px-3 pt-3 pb-2 shrink-0 bg-white">
        <button
          onClick={() => setCommandOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-1.5 text-[11.5px] text-zinc-500 transition-all hover:border-zinc-400 hover:text-zinc-950 hover:bg-white shadow-2xs cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
            Quick jump...
          </span>
          <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 font-semibold">
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
        className="flex-1 min-h-0 h-[calc(100vh-140px)] overflow-y-scroll overflow-x-hidden scrollable-y px-2.5 py-2 space-y-4 overscroll-contain pb-16 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {navSections.map((sec) => {
          const visibleLinks = sec.links.filter((l) => canAccessRoute(l.href));
          if (visibleLinks.length === 0) return null;

          return (
            <div key={sec.title} className="space-y-1">
              <p className="px-2.5 text-[9.5px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
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
                          ? "bg-zinc-100 text-zinc-950 font-bold border border-zinc-200/90 shadow-2xs"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 font-medium border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-indigo-600" : "text-zinc-400"}`} />
                        <span className="truncate">{link.label}</span>
                      </div>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Pinned Footer */}
      <div className="p-3 shrink-0 border-t border-zinc-200/80 bg-white space-y-1.5">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[11.5px] font-semibold text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 transition-colors border border-zinc-200 shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            Live Portfolio
          </span>
          <span className="text-[9.5px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
            :8080 ↗
          </span>
        </a>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11.5px] font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-zinc-950 relative selection:bg-indigo-100 selection:text-indigo-900">
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
