"use client";
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

type ToastFunction = {
  (options: { title: string; description?: string; variant?: ToastVariant }): void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
};

// Global event bus for standalone toast calls
let globalToastEmitter: ((toast: { title: string; description?: string; variant?: ToastVariant }) => void) | null = null;

export const toast: ToastFunction = Object.assign(
  (options: { title: string; description?: string; variant?: ToastVariant }) => {
    if (globalToastEmitter) {
      globalToastEmitter(options);
    }
  },
  {
    success: (title: string, description?: string) => {
      if (globalToastEmitter) globalToastEmitter({ title, description, variant: "success" });
    },
    error: (title: string, description?: string) => {
      if (globalToastEmitter) globalToastEmitter({ title, description, variant: "error" });
    },
    info: (title: string, description?: string) => {
      if (globalToastEmitter) globalToastEmitter({ title, description, variant: "info" });
    },
    warning: (title: string, description?: string) => {
      if (globalToastEmitter) globalToastEmitter({ title, description, variant: "warning" });
    },
  }
);

interface ToastContextValue {
  toast: ToastFunction;
}

const ToastContext = createContext<ToastContextValue>({ toast });

export const useToast = () => useContext(ToastContext);

const styles: Record<ToastVariant, { icon: typeof Info; color: string; wash: string }> = {
  success: { icon: CheckCircle2, color: "var(--color-success)", wash: "var(--color-success-wash)" },
  error: { icon: XCircle, color: "var(--color-danger)", wash: "var(--color-danger-wash)" },
  warning: { icon: AlertTriangle, color: "var(--color-warn)", wash: "var(--color-warn-wash)" },
  info: { icon: Info, color: "var(--color-info)", wash: "var(--color-info-wash)" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, variant = "success" }: { title: string; description?: string; variant?: ToastVariant }) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  useEffect(() => {
    globalToastEmitter = addToast;
    return () => {
      globalToastEmitter = null;
    };
  }, [addToast]);

  const value = useMemo(() => ({ toast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-2.5 no-print">
        {toasts.map((t) => {
          const s = styles[t.variant];
          const Icon = s.icon;
          return (
            <div
              key={t.id}
              role="status"
              className="animate-slide-in-right flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5"
              style={{ boxShadow: "var(--shadow-pop)" }}
            >
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: s.wash, color: s.color }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-[13px] leading-snug text-muted">{t.description}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="rounded-md p-1 text-faint hover:bg-canvas hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
