"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Drawer({
  open,
  onClose,
  title,
  description,
  width = "max-w-2xl",
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  width?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 no-print">
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-ink/60 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onWheel={(e) => {
          const target = e.target as HTMLElement;
          if (target && target.tagName === "TEXTAREA") {
            const isAtTop = target.scrollTop === 0 && e.deltaY < 0;
            const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 2 && e.deltaY > 0;
            if (!isAtTop && !isAtBottom) {
              return; // Let textarea scroll internally
            }
          }
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop += e.deltaY;
          }
        }}
        className={`animate-pop relative flex w-full ${width} h-auto max-h-[92vh] max-h-[92dvh] flex-col rounded-2xl border border-line bg-surface shadow-2xl overflow-hidden`}
        style={{ boxShadow: "var(--shadow-modal)" }}
      >
        {/* Sticky Header */}
        <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-4.5 shrink-0 bg-surface">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-ink tracking-tight">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-muted leading-relaxed">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted hover:bg-canvas hover:text-ink transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Scrollable Body Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto px-6 py-5 scrollable-y [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-line-strong [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {children}
        </div>

        {/* Optional Sticky Footer */}
        {footer && (
          <footer className="border-t border-line bg-surface-2 px-6 py-3.5 shrink-0">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
