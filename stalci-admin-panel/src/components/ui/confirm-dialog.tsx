"use client";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

export function ConfirmDialog({
  open,
  title,
  message,
  description,
  confirmLabel,
  confirmText = "Delete",
  loading = false,
  danger = false,
  onConfirm,
  onCancel,
  onClose,
}: {
  open: boolean;
  title: string;
  message?: string;
  description?: string;
  confirmLabel?: string;
  confirmText?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}) {
  const handleClose = onCancel || onClose || (() => {});
  const displayMessage = message || description || "Are you sure you want to proceed?";
  const displayLabel = confirmLabel || confirmText;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 no-print">
      <div className="animate-fade-in absolute inset-0 bg-black/75 backdrop-blur-md" onClick={handleClose} />
      <div
        role="alertdialog"
        aria-modal="true"
        className="animate-pop relative w-full max-w-[420px] rounded-2xl border border-line bg-surface p-6"
        style={{ boxShadow: "var(--shadow-modal)" }}
      >
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400 border border-red-500/30">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h3 className="text-base font-bold text-white font-display">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{displayMessage}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {displayLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
