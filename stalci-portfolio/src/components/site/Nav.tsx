import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Code2, 
  Boxes, 
  Database, 
  CloudLightning, 
  Workflow, 
  Smartphone,
  Building2,
  FolderGit2,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Brand";
import { Link } from "@tanstack/react-router";

const navLinks = [
  {
    label: "Explore AI",
    href: "/services/ai-services",
    icon: Sparkles,
    dropdown: [
      {
        name: "Sovereign AI & ML Engineering",
        desc: "Air-gapped private models & custom fine-tuning",
        href: "/services/ai-services",
        icon: Cpu,
      },
      {
        name: "Stalci AI Studio",
        desc: "Private LLM orchestrator & RAG retrieval engine",
        href: "/products/stalci-ai-studio",
        icon: Workflow,
      },
      {
        name: "Enterprise Data Intelligence",
        desc: "Semantic search & real-time vector pipelines",
        href: "/services/data-intelligence",
        icon: Database,
      },
    ],
  },
  {
    label: "Our Work",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    label: "Services",
    href: "/services",
    icon: Code2,
    dropdown: [
      {
        name: "Enterprise Software Engineering",
        desc: "High-concurrency microservices & resilient APIs",
        href: "/services/software-engineering",
        icon: Code2,
      },
      {
        name: "High-Performance Mobile Platforms",
        desc: "Native iOS & Android apps with 120 FPS fluid UI",
        href: "/services/mobility",
        icon: Smartphone,
      },
      {
        name: "Multi-Cloud & DevOps Architecture",
        desc: "Zero-downtime multi-region Kubernetes clusters",
        href: "/services/cloud-devops",
        icon: CloudLightning,
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    icon: Boxes,
    dropdown: [
      {
        name: "Stalci AI Studio Accelerator",
        desc: "Production-ready sovereign LLM & agent framework",
        href: "/products/stalci-ai-studio",
        icon: Workflow,
      },
      {
        name: "StalciOps Cloud Fabric",
        desc: "Automated Kubernetes scaling & FinOps optimization",
        href: "/products/stalciops",
        icon: Boxes,
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    icon: Building2,
    dropdown: [
      {
        name: "FinTech & Banking",
        desc: "PCI-DSS engines & ledger architectures",
        href: "/industries/fintech",
        icon: Building2,
      },
      {
        name: "HealthTech & Life Sciences",
        desc: "HIPAA-compliant telemetry & FHIR pipelines",
        href: "/industries/healthcare",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "About Us",
    href: "/about",
    icon: Info,
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
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled || solid
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" 
          : "bg-white border-b border-zinc-200/80"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          
          {/* Left: STALCI Brand Logo + Clean "We're hiring" Tag */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <Wordmark tone="light" markSize={36} />
            </Link>
            
            <Link 
              to="/careers" 
              className="hidden md:inline-flex items-center gap-1 rounded-full bg-zinc-100 border border-zinc-200/80 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>We're hiring</span>
            </Link>
          </div>

          {/* Center: Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href as any}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-[13.5px] font-medium transition-colors duration-150 cursor-pointer ${
                    activeDropdown === item.label
                      ? "text-zinc-950 bg-zinc-100/80"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  {item.icon && <item.icon className="h-3.5 w-3.5 text-blue-600" />}
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 text-zinc-950" : "text-zinc-400"
                    }`} />
                  )}
                </Link>

                {/* Clean Flyout Board */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2 w-80 z-50"
                      >
                        <div className="rounded-2xl border border-zinc-200/90 bg-white p-2.5 shadow-xl text-black">
                          <div className="space-y-1">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href as any}
                                className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-50 cursor-pointer"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200/80 text-zinc-800 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                                  <sub.icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-zinc-950 group-hover:text-black block">
                                    {sub.name}
                                  </span>
                                  <span className="text-[11px] text-zinc-500 line-clamp-1 block mt-0.5">
                                    {sub.desc}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Solid Black CTA Pill Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-xs sm:text-[13px] font-semibold text-white hover:bg-black transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <span>Consult an Architect</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 hover:text-black cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-zinc-200 bg-white px-4 py-6 shadow-lg lg:hidden"
          >
            <div className="space-y-3">
              {navLinks.map((item) => (
                <div key={item.label} className="border-b border-zinc-100 pb-2">
                  <Link
                    to={item.href as any}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold text-zinc-900 py-1"
                  >
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDown className="h-4 w-4 text-zinc-400" />}
                  </Link>
                  {item.dropdown && (
                    <div className="mt-2 pl-3 space-y-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href as any}
                          onClick={() => setOpen(false)}
                          className="block text-xs text-zinc-600 hover:text-black py-0.5"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-xs font-bold text-white shadow-sm"
                >
                  <span>Consult an Architect</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
