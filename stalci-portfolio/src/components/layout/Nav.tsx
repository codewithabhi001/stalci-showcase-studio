import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Code2,
  Database,
  CloudLightning,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/brand/Brand";
import { useUIStore } from "@/store/useUIStore";

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
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useUIStore((state) => state.setMobileNavOpen);
  const toggleMobileNav = useUIStore((state) => state.toggleMobileNav);

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
        scrolled || solid
          ? "bg-[#090B0E]/95 backdrop-blur-md border-b border-white/10 shadow-lg" 
          : "bg-[#090B0E] border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: STALCI Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="/#top" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <Wordmark tone="dark" />
            </a>
            
            {/* Unique Studio Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/15 px-2.5 py-0.5 text-[10.5px] font-sans font-bold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>AI &amp; Cloud Studio</span>
            </div>
          </div>

          {/* Center Navigation Menu */}
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
                      ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-bold border border-blue-500/40"
                      : "text-neutral-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.isFeatured && <Sparkles className="h-3.5 w-3.5 text-blue-400" />}
                  <span>{item.label}</span>
                  {item.tag && (
                    <span className="rounded-md bg-blue-600 text-white px-1 py-0.2 text-[9px] font-mono font-extrabold uppercase">
                      {item.tag}
                    </span>
                  )}
                  {item.dropdown && (
                    <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 text-white opacity-100" : ""
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
                        className="absolute left-0 top-full mt-2 w-84 rounded-3xl bg-[#0D0D0D] p-3 border border-white/15 shadow-2xl z-50 text-white"
                      >
                        <div className="flex flex-col gap-1">
                          {item.dropdown.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="group flex items-start gap-3 rounded-2xl p-2.5 hover:bg-white/5 transition-all"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                  <SubIcon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                                    {sub.name}
                                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                                  </span>
                                  <p className="text-[11px] text-neutral-400 font-normal leading-relaxed mt-0.5">
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

          {/* Right CTA Action */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="relative group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-900 hover:bg-neutral-200 transition-all shadow-xs hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Initiate Architecture</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-slate-700" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              aria-label="Toggle navigation menu"
              onClick={toggleMobileNav}
              className="p-2 rounded-xl border border-white/15 text-white bg-white/5 lg:hidden cursor-pointer hover:bg-white/10 transition-colors"
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/15 bg-[#090B0E] px-5 py-4 shadow-xl lg:hidden text-white"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {item.isFeatured && <Sparkles className="h-3.5 w-3.5 text-blue-400" />}
                    {item.label}
                    {item.tag && (
                      <span className="rounded-md bg-blue-600 text-white px-1 py-0.2 text-[9px] font-mono font-extrabold uppercase">
                        {item.tag}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileNavOpen(false)}
                className="mt-3 rounded-xl bg-white py-2.5 text-center text-xs font-bold text-slate-900 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
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
