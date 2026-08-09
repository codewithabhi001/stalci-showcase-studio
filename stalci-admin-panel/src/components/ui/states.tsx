"use client";
import React from "react";
import { Inbox } from "lucide-react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton block ${className}`} />;
}

export function TableSkeleton({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-line">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid items-center gap-4 px-5 py-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr)) 80px` }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-3.5" />
          ))}
          <Skeleton className="ml-auto h-3.5 w-16" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  action,
  icon: Icon = Inbox,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas text-faint">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold text-danger">Something went wrong</p>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-5 text-[13px] font-semibold text-copper hover:text-copper-deep">
          Try again
        </button>
      )}
    </div>
  );
}
