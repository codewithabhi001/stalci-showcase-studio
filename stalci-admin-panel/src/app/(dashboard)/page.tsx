"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";
import Link from "next/link";
import { Users, Briefcase, FileText, Layout, Heart, Layers } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  const cards = [
    { label: "Total Inquiries", value: stats?.totalInquiries ?? "—", href: "/inquiries", icon: Users },
    { label: "Active Jobs", value: stats?.activeJobs ?? "—", href: "/jobs", icon: Briefcase },
    { label: "Pending Revenue", value: stats?.pendingAmount ? `$${stats.pendingAmount.toLocaleString()}` : "—", href: "/invoices", icon: FileText },
    { label: "Total Blogs", value: stats?.totalBlogs ?? "—", href: "/blogs", icon: Layout },
    { label: "Total Pages", value: stats?.totalPages ?? "—", href: "/pages", icon: Layers },
    { label: "Total Services", value: stats?.totalServices ?? "—", href: "/services", icon: Heart },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold leading-tight text-ink-black" style={{ fontFamily: "var(--font-display)" }}>
          Golden Hour Workbench
        </h1>
        <p className="mt-2 text-warm-stone max-w-xl">
          Warm cream canvas, white floating panels, and copper flame accents. Here is your Stalci Showcase Studio status at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              href={c.href}
              key={c.label}
              className="group block p-8 bg-paper-white rounded-[20px] shadow-card border border-mist-gray hover:border-copper/40 transition-all duration-300 relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Marigold Glow highlights on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cream-canvas to-transparent pointer-events-none" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">{c.label}</p>
                  <p className="text-4xl font-semibold text-ink-black leading-none">
                    {isLoading ? (
                      <span className="inline-block w-16 h-8 rounded animate-pulse bg-cream-canvas" />
                    ) : (
                      c.value
                    )}
                  </p>
                </div>
                <span className="p-3.5 rounded-2xl bg-cream-canvas text-copper-deep group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Decorative Warm Banner */}
      <div className="p-8 rounded-[20px] bg-paper-white border border-mist-gray flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-copper), transparent 70%)" }} />
        
        <div className="space-y-2 relative z-10 max-w-xl">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-copper">Site Settings</span>
          <h3 className="text-xl font-semibold text-ink-black">Looking to update global settings, headers, or social profiles?</h3>
          <p className="text-sm text-warm-stone leading-relaxed">
            Configure contact info, office locations, Twitter and LinkedIn handles. Your changes will sync automatically to the portfolio.
          </p>
        </div>
        <Link href="/settings" className="px-6 py-3 rounded-2xl font-semibold text-sm text-white shrink-0 hover:brightness-110 transition-all hover:scale-[1.02]" style={{ background: "var(--color-copper)" }}>
          Configure Site
        </Link>
      </div>
    </div>
  );
}
