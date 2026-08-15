import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Brand";

const links = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#projects" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Industries", href: "/#industries" },
  { label: "Products", href: "/#products" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        
        {/* Floating Frosted Glass Capsule Bar */}
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border border-zinc-200/90 shadow-md text-zinc-950"
              : "bg-white/85 backdrop-blur-xl border border-zinc-200/70 shadow-xs text-zinc-950"
          }`}
        >
          {/* Left: Wordmark Logo */}
          <a href="/#top" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Wordmark markSize={24} tone="light" />
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA & Status */}
          <div className="flex items-center gap-3">
            
            {/* Live Pods Availability Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-700">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Squads Ready</span>
            </div>

            {/* Start a Project CTA Button */}
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-all shadow-xs hover:scale-[1.02] active:scale-98"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="p-1.5 rounded-full border border-zinc-200 text-zinc-950 bg-zinc-100 lg:hidden cursor-pointer hover:bg-zinc-200 transition-colors"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-3xl border border-zinc-200 bg-white/98 backdrop-blur-2xl p-4 shadow-xl lg:hidden text-zinc-950"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-2xl bg-black px-4 py-3 text-center text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
                >
                  Get in Touch →
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
