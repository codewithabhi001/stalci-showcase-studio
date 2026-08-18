"use client";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Check, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { fetchNotifications, markNotificationsRead } from "@/lib/api";
import { Button } from "./ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  INFO: Info,
  SUCCESS: CheckCircle,
  WARNING: AlertTriangle,
  ERROR: XCircle,
};

const COLOR_MAP: Record<string, string> = {
  INFO: "text-blue-500 bg-blue-500/10",
  SUCCESS: "text-success bg-success/10",
  WARNING: "text-amber-500 bg-amber-500/10",
  ERROR: "text-danger bg-danger/10",
};

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const qc = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 4000,
  });

  const markReadMut = useMutation({
    mutationFn: markNotificationsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n: unknown) => !(n as any).isRead).length;

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setOpen(!open)}
        aria-label="Notifications" 
        className={`relative rounded-xl p-2 transition-colors cursor-pointer border border-transparent ${open ? 'bg-purple-50 text-purple-950 border-purple-200/80' : 'text-muted hover:bg-surface-2 hover:text-ink'}`}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-[#7B2BF9] to-[#FA12E3] ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-line bg-surface shadow-pop z-50 animate-fade-up origin-top-right">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface-2/60">
            <h3 className="text-[13px] font-bold text-ink font-display">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markReadMut.mutate()}
                className="flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800 transition-colors disabled:opacity-50 cursor-pointer font-mono"
                disabled={markReadMut.isPending}
              >
                <Check className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {isLoading ? (
              <div className="p-6 text-center text-[13px] text-muted">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="mx-auto h-6 w-6 text-faint mb-2" />
                <p className="text-[13px] text-muted">No notifications yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {notifications.map((notif: any) => {
                  const Icon = ICON_MAP[notif.type] || Info;
                  const color = COLOR_MAP[notif.type] || COLOR_MAP.INFO;
                  return (
                    <div key={notif.id} className={`flex gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2 ${!notif.isRead ? 'bg-zinc-50' : ''}`}>
                      <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-[12.5px] font-semibold text-ink">{notif.title}</p>
                          <span className="text-[10px] text-faint whitespace-nowrap font-mono">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11.5px] text-muted leading-snug">{notif.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="border-t border-line bg-surface-2/60 p-2">
            <Button variant="secondary" className="w-full justify-center h-8 text-[12px]">
              View all activity
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
