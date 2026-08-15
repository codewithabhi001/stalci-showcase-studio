"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  Receipt,
  FileCode,
  Boxes,
  Code2,
  Quote,
  Newspaper,
  FileText,
  Settings,
  ArrowRight,
  User,
  Plus,
} from "lucide-react";

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const ITEMS = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Clients Directory", href: "/clients", icon: Users },
    { label: "Projects Pipeline", href: "/projects", icon: FolderKanban },
    { label: "Invoices & Billing", href: "/invoices", icon: Receipt },
    { label: "Invoice Templates", href: "/invoice-templates", icon: FileCode },
    { label: "Services CMS", href: "/services", icon: Boxes },
    { label: "Tech Stack & Skills", href: "/technologies", icon: Code2 },
    { label: "Client Testimonials", href: "/testimonials", icon: Quote },
    { label: "Blogs & Articles", href: "/blogs", icon: Newspaper },
    { label: "Site Pages", href: "/pages", icon: FileText },
    { label: "Site Configuration", href: "/settings", icon: Settings },
    { label: "My Profile", href: "/profile", icon: User },
  ];

  const filtered = ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setOpen(false)}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl border border-line animate-fade-up">
        <div className="flex items-center border-b border-line px-4 bg-surface-2/60">
          <Search className="h-[18px] w-[18px] text-copper shrink-0" />
          <input
            ref={inputRef}
            className="flex h-16 w-full bg-transparent px-4 text-[16px] border-none text-white placeholder:text-muted font-sans"
            style={{ outline: "none", boxShadow: "none" }}
            placeholder="Search pages, clients, invoices, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />
          <span className="hidden sm:inline-flex h-6 items-center rounded border border-line bg-surface-2 px-2 text-[10px] font-bold text-faint shadow-xs font-mono">
            ESC
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filtered.length > 0 ? (
            <div className="space-y-0.5">
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleNavigate(item.href)}
                    className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left transition-all hover:bg-surface-2 group focus:bg-surface-2 focus:outline-none cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 group-hover:bg-copper/15 transition-colors border border-line group-hover:border-copper/40">
                      <Icon className="h-4 w-4 text-faint group-hover:text-copper transition-colors" />
                    </div>
                    <span className="flex-1 text-[14px] font-medium text-ink-2 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-faint opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-copper" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-faint mb-3" />
              <p className="text-[14px] text-muted">
                No results found for <span className="font-semibold text-white">"{query}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
