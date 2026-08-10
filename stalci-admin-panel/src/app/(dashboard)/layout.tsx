"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Providers from "../providers";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { CommandPalette } from "@/components/CommandPalette";
import { CreateDropdown } from "@/components/CreateDropdown";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Boxes,
  Factory,
  Package,
  Quote,
  MessageSquare,
  Briefcase,
  Star,
  Receipt,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Plus,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    links: [{ href: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    links: [
      { href: "/pages", label: "Pages", icon: FileText },
      { href: "/blogs", label: "Blogs", icon: Newspaper },
      { href: "/services", label: "Services", icon: Boxes },
      { href: "/industries", label: "Industries", icon: Factory },
      { href: "/products", label: "Products", icon: Package },
      { href: "/testimonials", label: "Testimonials", icon: Quote },
    ],
  },
  {
    title: "CRM & Careers",
    links: [
      { href: "/inquiries", label: "Client Inquiries", icon: MessageSquare },
      { href: "/jobs", label: "Jobs & Applicants", icon: Briefcase },
      { href: "/feedback", label: "Feedback", icon: Star },
    ],
  },
  {
    title: "Finance",
    links: [{ href: "/invoices", label: "Invoices", icon: Receipt }],
  },
  {
    title: "System",
    links: [{ href: "/settings", label: "Site Config", icon: Settings }],
  },
];

const allLinks = navSections.flatMap((s) => s.links);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

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
    <div className="flex h-full flex-col bg-ink text-white">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/stalci-mark.png" alt="Stalci Logo" className="h-8 w-8 rounded-[9px]" />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Stalci <span className="font-normal text-white/60">Console</span>
          </span>
        </Link>
        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 lg:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" data-lenis-prevent="true">
        {navSections.map((s) => (
          <div key={s.title}>
            <p className="eyebrow px-3 pb-2 text-white/50">{s.title}</p>
            <div className="space-y-0.5">
              {s.links.map((l) => {
                const Icon = l.icon;
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-colors ${
                      active ? "bg-copper/20 text-copper-soft" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-[17px] w-[17px] ${active ? "text-copper-soft" : "text-white/40 group-hover:text-white/70"}`} strokeWidth={1.9} />
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <ProfileDropdown />
      </div>
    </div>
  );

  return (
    <Providers>
      <div className="flex min-h-screen bg-canvas">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 z-40 hidden h-screen w-[248px] shrink-0 bg-ink lg:block">{Sidebar}</aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <div className="animate-fade-in absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />
            <div className="animate-fade-in absolute left-0 top-0 h-full w-[270px] border-r border-line shadow-2xl">{Sidebar}</div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col relative z-0">
          {/* Global Pattern Background for all pages */}
          <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden bg-canvas">
            <div 
              className="absolute inset-0 opacity-[0.4]" 
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h40v40H0V0zm39 39V1H1v38h38z%22 fill=%22%23e5e7eb%22 fill-opacity=%221%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E")' }}
            />
            {/* Top ambient glows bleeding into header */}
            <div className="absolute left-[20%] top-[-100px] h-[300px] w-[500px] rounded-full bg-copper/10 blur-[100px]" />
            <div className="absolute right-[10%] top-[-50px] h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[80px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-canvas/40 to-canvas" />
          </div>

          <header className="sticky top-0 z-40 border-b border-line bg-canvas/60 backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
              
              {/* Left Side: Mobile Menu & Breadcrumbs */}
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="rounded-lg p-1.5 text-ink-2 hover:bg-black/5 lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <nav aria-label="Breadcrumb" className="hidden lg:flex min-w-0 items-center gap-2 text-[13.5px]">
                  <span className="font-medium text-muted">Workspace</span>
                  <ChevronRight className="h-3.5 w-3.5 text-faint" />
                  <span className="font-semibold text-ink">{current?.label || "Console"}</span>
                </nav>
              </div>

              {/* Center Side: expansive Command Palette & Actions to fill the empty space */}
              <div className="hidden md:flex flex-1 items-center justify-center px-6 lg:px-12 max-w-2xl">
                <div className="flex w-full items-center gap-2">
                  <div className="relative flex-1 group">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint group-hover:text-copper transition-colors" />
                    <input 
                      onFocus={(e) => { e.target.blur(); setCommandOpen(true); }}
                      readOnly
                      placeholder="Search pages, invoices, or type a command..." 
                      aria-label="Command palette" 
                      className="field h-9 w-full pl-9 pr-14 text-[13px] bg-surface/50 hover:bg-surface focus:bg-surface transition-all shadow-sm cursor-text" 
                    />
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded border border-line bg-canvas text-[10px] font-medium text-muted shadow-sm">⌘</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded border border-line bg-canvas text-[10px] font-medium text-muted shadow-sm">K</span>
                    </div>
                  </div>
                  <CreateDropdown />
                </div>
              </div>

              {/* Right Side: Date, Notification, Live Status */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="hidden sm:block text-[12px] font-medium text-muted">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
                
                <NotificationsPopover />
                
                <span className="hidden items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold tracking-wide text-muted sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  LIVE
                </span>
              </div>
            </div>
          </header>

          <CommandPalette open={commandOpen} setOpen={setCommandOpen} />

          <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
