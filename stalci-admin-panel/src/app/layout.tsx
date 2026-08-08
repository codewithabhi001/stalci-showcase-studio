import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stalci Admin Panel",
  description: "Manage portfolio content",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex bg-[var(--ink)] text-[var(--foreground)]">
        {/* Sidebar */}
        <aside className="w-64 glass-dark border-r border-white/5 flex flex-col py-8 px-4 space-y-6">
          <div className="px-4 mb-4">
            <h1 className="text-2xl font-display font-bold text-copper-gradient">Stalci Studio</h1>
          </div>
          <nav className="flex flex-col space-y-1">
            <a href="/" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors font-medium">Dashboard</a>
            
            <div className="pt-6 pb-2">
              <p className="eyebrow text-white/40 px-4">Content Management</p>
            </div>
            <a href="/pages" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Pages</a>
            <a href="/blogs" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Blogs</a>
            <a href="/services" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Services</a>
            <a href="/industries" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Industries</a>
            <a href="/products" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Products</a>
            <a href="/testimonials" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Testimonials</a>

            <div className="pt-6 pb-2">
              <p className="eyebrow text-white/40 px-4">CRM & Careers</p>
            </div>
            <a href="/inquiries" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Client Inquiries</a>
            <a href="/jobs" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Jobs & Applicants</a>
            
            <div className="pt-6 pb-2">
              <p className="eyebrow text-white/40 px-4">Finance</p>
            </div>
            <a href="/invoices" className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-colors">Invoices</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b border-white/5 flex items-center px-8 glass-dark z-10 sticky top-0 backdrop-blur-3xl">
            <h2 className="text-sm font-medium text-white/40 tracking-wide uppercase font-display">Stalci Showcase Studio Admin</h2>
          </header>
          <div className="p-10 flex-1 overflow-auto mesh-gradient-dark">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
