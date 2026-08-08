"use client";
import Providers from "../providers";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const handleSignOut = () => {
    document.cookie = "stalci_admin=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <Providers>
      <div className="flex min-h-screen bg-cream-canvas text-ink-black font-sans antialiased">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col py-8 px-5 bg-paper-white border-r border-mist-gray shadow-sm">
          <div className="px-3 mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold tracking-tight text-ink-black hover:opacity-80 transition-opacity">
                Stalci <span className="text-copper">Studio</span>
              </h1>
            </Link>
          </div>

          <Link
            href="/"
            className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              pathname === "/"
                ? "bg-cream-canvas text-copper"
                : "text-warm-stone hover:bg-cream-canvas hover:text-ink-black"
            }`}
          >
            Dashboard
          </Link>

          <nav className="flex flex-col space-y-1 overflow-y-auto flex-1 mt-4">
            {navSections.map((s) => (
              <div key={s.title} className="space-y-1">
                <div className="pt-5 pb-1">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] px-3 text-driftwood">{s.title}</p>
                </div>
                {s.links.map((l) => {
                  const isActive = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-cream-canvas text-copper font-semibold border-l-2 border-copper pl-2.5"
                          : "text-warm-stone hover:bg-cream-canvas hover:text-ink-black"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="px-3 pt-4 border-t border-mist-gray mt-auto">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-warm-stone hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 flex items-center justify-between px-8 bg-paper-white border-b border-mist-gray sticky top-0 z-10 shadow-sm">
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-driftwood">
              Stalci Showcase Studio — Admin Console
            </h2>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-ironwood">Live Environment</span>
            </div>
          </header>
          
          <div className="p-8 sm:p-10 flex-1 overflow-auto max-w-[1200px] w-full mx-auto">
            <div className="animate-fade-up">
              {children}
            </div>
          </div>
        </main>
      </div>
    </Providers>
  );
}
