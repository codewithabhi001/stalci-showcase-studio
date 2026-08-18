"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User, Settings, LogOut } from "lucide-react";
import { fetchProfile } from "@/lib/api";
import { handleLogout } from "@/lib/auth";

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

  const handleSignOut = async () => {
    setOpen(false);
    await handleLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-surface-2 transition-colors group cursor-pointer border border-transparent hover:border-line"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-[12px] font-bold text-white shadow-xs font-display">
          {isLoading ? "?" : (profile?.name || "A").charAt(0).toUpperCase()}
        </span>
        <div className="hidden sm:flex flex-col items-start truncate max-w-[120px]">
          <span className="text-[12.5px] font-semibold text-ink group-hover:text-black transition-colors truncate w-full text-left font-display">
            {isLoading ? "Loading..." : (profile?.name || "Admin")}
          </span>
          <span className="text-[9.5px] text-muted truncate w-full text-left font-mono font-semibold">
            {isLoading ? "..." : (profile?.role || "SUPER_ADMIN")}
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface shadow-pop z-50 animate-fade-up origin-top-right">
          <div className="px-4 py-3 border-b border-line bg-surface-2/60">
            <p className="text-[13px] font-bold text-ink truncate font-display">{profile?.name || "Admin User"}</p>
            <p className="text-[11px] text-muted truncate font-mono">{profile?.email || "admin@stalci.com"}</p>
          </div>
          
          <div className="p-1.5 space-y-0.5">
            <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
              <User className="h-4 w-4 text-faint" /> Profile
            </Link>
            <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
              <Settings className="h-4 w-4 text-faint" /> Settings
            </Link>
          </div>
          
          <div className="border-t border-line p-1.5">
            <button 
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
