"use client";
import React from "react";

export function StalciLogoIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="stalciRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#93C5FD" />
          <stop offset="70%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0052FF" />
        </linearGradient>
      </defs>
      
      {/* Bold, Stylish Sovereign 'S' Monogram Ribbon */}
      <path
        d="M 74 24 L 38 24 C 28 24 22 30 22 40 C 22 50 28 54 38 54 L 62 54 C 72 54 78 58 78 68 C 78 78 72 84 62 84 L 26 84"
        stroke="url(#stalciRibbonGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Metallic Diamond Sparkle */}
      <circle cx="50" cy="54" r="3" fill="#FFFFFF" />
    </svg>
  );
}

export function Wordmark({ className = "", markSize = 36, subtitle = "Workspace OS" }: { className?: string; markSize?: number; subtitle?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 p-1.5 shadow-md border border-zinc-800 shrink-0">
        <StalciLogoIcon size={markSize - 10} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">
          stalci
        </span>
        <span className="text-[10px] font-mono font-bold tracking-wider text-blue-600 uppercase">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
