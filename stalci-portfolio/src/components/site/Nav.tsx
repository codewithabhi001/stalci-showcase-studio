import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Brand";

const links = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#projects" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Industries", href: "/#industries" },
  { label: "Products", href: "/#products" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const isLightNav = scrolled || solid;

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (isLightNav
          ? "border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs py-3.5"
          : "border-b border-transparent bg-transparent py-5")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Official Brand Wordmark */}
        <a href="/#top" className="flex min-w-0 items-center group cursor-pointer">
          <Wordmark markSize={28} theme={isLightNav ? "light" : "dark"} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs font-semibold tracking-wide transition-colors duration-200 ${
                isLightNav
                  ? "text-slate-700 hover:text-[#9E6229]"
                  : "text-slate-300 hover:text-[#F2CFAB]"
              }`}
            >
              {l.label}
            </a>
          ))}
          
          <a
            href="/#contact"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
              isLightNav
                ? "bg-slate-900 text-white hover:bg-[#9E6229] shadow-sm"
                : "bg-gradient-to-r from-[#F2CFAB] via-[#D89B5B] to-[#9E6229] text-slate-950 hover:opacity-95 shadow-md shadow-[#D89B5B]/25"
            }`}
          >
            <span>Start a Project</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          aria-label="Toggle mobile navigation menu"
          onClick={() => setOpen((v) => !v)}
          className={`shrink-0 rounded-xl p-2 transition-colors lg:hidden cursor-pointer ${
            isLightNav
              ? "border border-slate-200 bg-white text-slate-900 shadow-2xs hover:bg-slate-50"
              : "border border-white/15 bg-white/[0.06] text-white hover:bg-white/10"
          }`}
        >
          {open ? <X className="h-5 w-5 text-[#9E6229]" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`overflow-hidden border-t px-5 backdrop-blur-2xl lg:hidden shadow-xl ${
              isLightNav
                ? "border-slate-200 bg-white/95 text-slate-900"
                : "border-white/10 bg-[#07090E]/95 text-white"
            }`}
          >
            <div className="flex flex-col gap-1 py-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isLightNav
                      ? "text-slate-800 hover:bg-slate-100 hover:text-[#9E6229]"
                      : "text-slate-200 hover:bg-white/[0.06] hover:text-[#F2CFAB]"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-200/50">
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-md transition-colors ${
                    isLightNav
                      ? "bg-slate-900 text-white hover:bg-[#9E6229]"
                      : "bg-gradient-to-r from-[#F2CFAB] via-[#D89B5B] to-[#9E6229] text-slate-950"
                  }`}
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
