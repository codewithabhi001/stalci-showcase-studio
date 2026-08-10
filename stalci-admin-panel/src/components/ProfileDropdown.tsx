"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User, Settings, LogOut } from "lucide-react";
import { fetchProfile } from "@/lib/api";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    document.cookie = "stalci_admin=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-[10px] p-2 hover:bg-surface-2 transition-colors group"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface border border-line-strong text-[12px] font-bold text-ink group-hover:border-copper transition-colors shadow-sm">
          {isLoading ? "?" : (profile?.name || "A").charAt(0).toUpperCase()}
        </span>
        <div className="flex flex-1 flex-col items-start truncate">
          <span className="text-[13px] font-semibold text-ink group-hover:text-copper transition-colors">
            {isLoading ? "Loading..." : (profile?.name || "Admin User")}
          </span>
          <span className="text-[11.5px] text-muted truncate w-full text-left">
            {isLoading ? "..." : (profile?.email || "admin@stalci.com")}
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-56 overflow-hidden rounded-xl border border-line bg-canvas shadow-xl z-50 animate-fade-up origin-bottom-left">
          <div className="px-4 py-3 border-b border-line bg-surface/50">
            <p className="text-[13px] font-semibold text-ink truncate">{profile?.name || "Admin User"}</p>
            <p className="text-[11.5px] text-muted truncate">{profile?.email || "admin@stalci.com"}</p>
          </div>
          
          <div className="p-1.5">
            <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:bg-surface hover:text-ink">
              <User className="h-4 w-4 text-muted" /> Profile
            </Link>
            <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:bg-surface hover:text-ink">
              <Settings className="h-4 w-4 text-muted" /> Settings
            </Link>
          </div>
          
          <div className="border-t border-line p-1.5">
            <button 
              onClick={() => {
                handleSignOut();
                // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                window.location.href = '/login'
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-danger transition-colors hover:bg-danger-wash"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
