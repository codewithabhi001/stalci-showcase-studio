import Providers from "../providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stalci Admin Panel",
  description: "Manage your Stalci Showcase Studio portfolio",
};

const navSections = [
  {
    title: "Content Management",
    links: [
      { href: "/pages", label: "Pages" },
      { href: "/blogs", label: "Blogs" },
      { href: "/services", label: "Services" },
      { href: "/industries", label: "Industries" },
      { href: "/products", label: "Products" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "CRM & Careers",
    links: [
      { href: "/inquiries", label: "Client Inquiries" },
      { href: "/jobs", label: "Jobs & Applicants" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
  {
    title: "Finance",
    links: [{ href: "/invoices", label: "Invoices" }],
  },
  {
    title: "Settings",
    links: [{ href: "/settings", label: "Site Config" }],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen" style={{ background: "var(--gradient-ink)", color: "white" }}>
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col py-8 px-4 space-y-6" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <a href="/" className="px-4 mb-4 block">
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", background: "var(--gradient-copper)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Stalci Studio
            </h1>
          </a>
          <a href="/" className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.7)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
            Dashboard
          </a>
          <nav className="flex flex-col space-y-1 overflow-y-auto flex-1">
            {navSections.map((s) => (
              <div key={s.title}>
                <div className="pt-6 pb-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] px-4" style={{ color: "rgba(255,255,255,0.25)" }}>{s.title}</p>
                </div>
                {s.links.map((l) => (
                  <a key={l.href} href={l.href} className="block px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <div className="px-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={() => { document.cookie = "stalci_admin=; path=/; max-age=0"; window.location.href = "/login"; }} className="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 flex items-center px-8 sticky top-0 z-10" style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(40px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>Stalci Showcase Studio — Admin</h2>
          </header>
          <div className="p-10 flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}
