"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Plus, FileText, Briefcase, Receipt, Newspaper } from "lucide-react";

export function CreateDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ACTIONS = [
    { label: "New Blog Post", href: "/blogs?new=true", icon: FileText },
    { label: "New Page", href: "/pages?new=true", icon: Newspaper },
    { label: "New Invoice", href: "/invoices?new=true", icon: Receipt },
    { label: "New Job Posting", href: "/jobs?new=true", icon: Briefcase },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-ink px-3.5 text-[13px] font-medium text-white hover:bg-ink-2 hover:-translate-y-[1px] transition-all shadow-sm focus:outline-none"
      >
        <Plus className="h-4 w-4 text-copper-soft" />
        Create
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line bg-canvas shadow-xl z-50 animate-fade-up origin-top-right">
          <div className="px-3 py-2 border-b border-line bg-surface/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Quick Actions</p>
          </div>
          
          <div className="p-1.5">
            {ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link 
                  key={i}
                  href={action.href} 
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors group"
                >
                  <Icon className="h-4 w-4 text-muted group-hover:text-copper transition-colors" />
                  {action.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
