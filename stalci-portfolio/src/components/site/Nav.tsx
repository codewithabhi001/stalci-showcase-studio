import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Code2,
  Boxes,
  Database,
  CloudLightning,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Brand";

const navLinks = [
  {
    label: "Sovereign AI",
    href: "/services/ai-solutions",
    isFeatured: true,
    tag: "Neural",
    dropdown: [
      {
        name: "Private LLM Deployments",
        desc: "Air-gapped enterprise models with zero data leakage",
        href: "/services/ai-solutions",
        icon: Cpu,
      },
      {
        name: "Autonomous Workflow Agents",
        desc: "Self-orchestrating multi-agent business automation",
        href: "/products/ai-automation-engine",
        icon: Workflow,
      },
      {
        name: "RAG & Vector Pipelines",
        desc: "Sub-50ms semantic search over petabyte databases",
        href: "/services/ai-solutions",
        icon: Database,
      },
    ],
  },
  {
    label: "Engineering",
    href: "/#services",
    dropdown: [
      {
        name: "Enterprise Software Systems",
        desc: "High-concurrency microservices & resilient APIs",
        href: "/services/custom-software-development",
        icon: Code2,
      },
      {
        name: "Web & Mobile Platforms",
        desc: "Sub-second React, Next.js & native iOS/Android apps",
        href: "/services/web-development",
        icon: Layers,
      },
      {
        name: "Cloud & DevOps Infrastructure",
        desc: "Zero-downtime multi-region Kubernetes clusters",
        href: "/services/cloud-devops",
        icon: CloudLightning,
      },
    ],
  },
  {
    label: "Case Studies",
    href: "/#projects",
  },
  {
    label: "Platforms",
    href: "/#products",
  },
  {
    label: "Industries",
    href: "/#industries",
  },
  {
    label: "Studio",
    href: "/#about",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

export function Nav({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)]" 
          : "bg-white border-b border-zinc-200/80 shadow-2xs"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: STALCI Brand Logo + Distinctive Enterprise AI Studio Badge */}
          <div className="flex items-center gap-3">
            <a href="/#top" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <Wordmark tone="light" />
            </a>
            
            {/* Unique Studio Pill (Original, Not "We're hiring") */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/90 px-2.5 py-0.5 text-[10.5px] font-sans font-bold text-blue-700 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
              <span>AI &amp; Cloud Studio</span>
            </div>
          </div>

          {/* Center: Distinctive STALCI Navigation Menu with Custom Flyout Boards */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                    item.isFeatured
                      ? "bg-blue-50 text-[#0052FF] hover:bg-blue-100/80 font-bold border border-blue-200/60"
                      : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80"
                  }`}
                >
                  {item.isFeatured && <Sparkles className="h-3.5 w-3.5 text-[#0052FF]" />}
                  <span>{item.label}</span>
                  {item.tag && (
                    <span className="rounded-md bg-[#0052FF] text-white px-1 py-0.2 text-[9px] font-mono font-extrabold uppercase">
                      {item.tag}
                    </span>
                  )}
                  {item.dropdown && (
                    <ChevronDown className={`h-3 w-3 opacity-50 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 text-zinc-950 opacity-100" : ""
                    }`} />
                  )}
                </a>

                {/* Custom Flyout Board */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-2 w-84 rounded-3xl bg-white p-3 border border-zinc-200/90 shadow-2xl z-50"
                      >
                        <div className="flex flex-col gap-1">
                          {item.dropdown.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="group flex items-start gap-3 rounded-2xl p-2.5 hover:bg-zinc-50 transition-all"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-950 shrink-0 group-hover:bg-[#0052FF] group-hover:text-white group-hover:border-[#0052FF] transition-all">
                                  <SubIcon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-bold text-zinc-900 group-hover:text-[#0052FF] transition-colors flex items-center justify-between">
                                    {sub.name}
                                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0052FF]" />
                                  </span>
                                  <p className="text-[11px] text-zinc-500 font-normal leading-relaxed mt-0.5">
                                    {sub.desc}
                                  </p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Distinctive CTA Action */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="relative group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-white hover:bg-zinc-900 border border-zinc-800 hover:border-[#0052FF]/60 transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Initiate Architecture</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-zinc-300" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-xl border border-zinc-200 text-zinc-900 bg-zinc-50 lg:hidden cursor-pointer hover:bg-zinc-100 transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-zinc-200 bg-white px-5 py-4 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {item.isFeatured && <Sparkles className="h-3.5 w-3.5 text-[#0052FF]" />}
                    {item.label}
                    {item.tag && (
                      <span className="rounded-md bg-[#0052FF] text-white px-1 py-0.2 text-[9px] font-mono font-extrabold uppercase">
                        {item.tag}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl bg-zinc-950 py-2.5 text-center text-xs font-bold text-white hover:bg-zinc-900 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Initiate Architecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
