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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
              ? "bg-[#000000]/90 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-white"
              : "bg-[#000000]/75 backdrop-blur-xl border border-white/10 shadow-lg text-white"
          }`}
        >
          {/* Left: Wordmark Logo */}
          <a href="/#top" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Wordmark markSize={24} tone="dark" />
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA & Status */}
          <div className="flex items-center gap-3">
            
            {/* Live Pods Availability Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-neutral-300">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Squads Ready</span>
            </div>

            {/* Start a Project CTA Button */}
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold text-zinc-950 hover:bg-neutral-200 transition-all shadow-xs hover:scale-[1.02] active:scale-98"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="p-1.5 rounded-full border border-white/15 text-white bg-white/10 lg:hidden cursor-pointer hover:bg-white/20 transition-colors"
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
              className="mt-2 rounded-3xl border border-white/15 bg-black/98 backdrop-blur-2xl p-4 shadow-2xl lg:hidden text-white"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-2xl bg-white px-4 py-3 text-center text-xs font-bold text-zinc-950 hover:bg-neutral-200 transition-colors"
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
