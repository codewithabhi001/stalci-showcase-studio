"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Drawer({
  open,
  onClose,
  title,
  description,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <div className="animate-fade-in absolute inset-0 bg-ink/35 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-pop relative flex w-full max-w-[560px] max-h-[95vh] flex-col rounded-[14px] border border-line bg-surface overflow-hidden"
        style={{ boxShadow: "var(--shadow-modal)" }}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {description && <p className="mt-1 text-[13px] text-muted">{description}</p>}
          </div>
          <button onClick={onClose} aria-label="Close panel" className="rounded-lg p-1.5 text-faint hover:bg-canvas hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <footer className="border-t border-line bg-surface-2 px-6 py-4 shrink-0">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
}
