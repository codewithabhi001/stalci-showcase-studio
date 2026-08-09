"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Providers from "../providers";
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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const current = allLinks.find((l) => l.href === pathname);

  const handleSignOut = () => {
    document.cookie = "stalci_admin=; path=/; max-age=0";
    window.location.href = "/login";
  };

  const Sidebar = (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-copper text-[13px] font-bold text-white">S</span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            Stalci <span className="font-normal text-muted">Console</span>
          </span>
        </Link>
        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 text-faint hover:bg-canvas lg:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navSections.map((s) => (
          <div key={s.title}>
            <p className="eyebrow px-3 pb-2">{s.title}</p>
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
                      active ? "bg-copper-wash text-copper-deep" : "text-ink-2 hover:bg-canvas hover:text-ink"
                    }`}
                  >
                    <Icon className={`h-[17px] w-[17px] ${active ? "text-copper" : "text-faint group-hover:text-ink-2"}`} strokeWidth={1.9} />
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-[10px] px-3 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-canvas text-[12px] font-bold text-copper-deep">AD</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-ink">Admin</p>
            <p className="truncate text-[11.5px] text-faint">admin@stalci.com</p>
          </div>
          <button onClick={handleSignOut} aria-label="Sign out" title="Sign out" className="rounded-lg p-1.5 text-faint hover:bg-danger-wash hover:text-danger">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Providers>
      <div className="flex min-h-screen bg-canvas">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r border-line lg:block">{Sidebar}</aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <div className="animate-fade-in absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />
            <div className="animate-fade-in absolute left-0 top-0 h-full w-[270px] border-r border-line shadow-2xl">{Sidebar}</div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-surface/85 px-4 backdrop-blur-md sm:px-6">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="rounded-lg p-2 text-ink-2 hover:bg-canvas lg:hidden">
              <Menu className="h-5 w-5" />
            </button>

            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[13px]">
              <Link href="/" className="text-muted hover:text-ink">
                Console
              </Link>
              {current && current.href !== "/" && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-faint" />
                  <span className="truncate font-semibold text-ink">{current.label}</span>
                </>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input placeholder="Quick search…" aria-label="Quick search" className="field h-9 w-[220px] pl-9 text-[13px]" />
              </div>
              <button aria-label="Notifications" className="relative rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-copper" />
              </button>
              <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-muted sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </span>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 py-7 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
