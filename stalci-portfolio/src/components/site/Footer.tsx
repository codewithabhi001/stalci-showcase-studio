import { Linkedin, Twitter, Github, Globe, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Wordmark } from "./Brand";
import { motion } from "framer-motion";
import { Link } from '@tanstack/react-router';
import { useScrollReveal, useStaggerReveal, useParallax } from "@/lib/animations";

const columns = [
  {
    title: "Services",
    links: [
      "Custom Software",
      "Mobile Apps",
      "Cloud & DevOps",
      "AI & Machine Learning",
      "Cyber Security",
      "Data & Analytics",
    ],
  },
  {
    title: "Industries",
    links: ["Fintech", "Healthcare", "Retail", "Logistics", "Manufacturing", "Public Sector"],
  },
  {
    title: "Company",
    links: ["About", "Process", "Products", "Blog", "Careers", "Contact"],
  },
];

const linkHref: Record<string, string> = {
  Blog: "/blog",
  Careers: "/careers",
  About: "/#about",
  Process: "/#process",
  Products: "/#products",
  Contact: "/#contact",
  FAQ: "/#faq",
};

export function Footer() {
  const containerReveal = useScrollReveal();
  const staggerColumnsRef = useStaggerReveal({ childSelector: "> div" });
  const parallaxRef = useParallax(0.12);

  const { data: config = {} } = useQuery({
    queryKey: ["config"],
    queryFn: fetchSiteConfigMap,
  });

  const socialsList = [
    { icon: Linkedin, url: config.social_linkedin || "https://linkedin.com/company/stalci", label: "LinkedIn" },
    { icon: Twitter, url: config.social_twitter || "https://twitter.com/stalciglobal", label: "Twitter" },
    { icon: Github, url: config.social_github || "https://github.com/stalci", label: "GitHub" },
    { icon: Instagram, url: config.social_instagram || "https://instagram.com/stalciglobal", label: "Instagram" },
    { icon: Youtube, url: config.social_youtube || "https://youtube.com/@stalciglobal", label: "YouTube" },
    { icon: MessageCircle, url: config.social_discord || "https://discord.gg/stalci", label: "Discord" },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#05070B] text-white border-t border-white/[0.12]">
      {/* Top metallic copper/gold line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C082]/70 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D89B5B] opacity-[0.07] blur-[180px] pointer-events-none mix-blend-screen animate-float-orb" />

      <div ref={containerReveal} className="mx-auto max-w-7xl px-5 py-20 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_auto]">
          <div>
            <div className="text-white inline-block">
              <Wordmark markSize={32} theme="dark" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300 font-normal">
              A global technology company delivering sovereign AI systems, cloud architecture, and engineered products. Create · Innovate · Empower.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {socialsList.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`STALCI ${item.label} social link`}
                  title={item.label}
                  whileHover={{ scale: 1.12 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-slate-300 transition-colors hover:border-[#F5C082] hover:text-[#F5C082] hover:bg-[#D89B5B]/15 cursor-pointer shadow-sm"
                >
                  <item.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div ref={staggerColumnsRef} className="grid gap-12 sm:grid-cols-3 lg:gap-16">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#F5C082]">
                  {c.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href={linkHref[l] ?? "/#services"}
                        className="text-xs sm:text-sm text-slate-300 transition-colors hover:text-[#F5C082] inline-block font-medium"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pt-6 sm:flex sm:justify-between border-t border-white/[0.1]">
          <p className="min-w-0 text-xs text-slate-300 font-mono">
            © {new Date().getFullYear()} STALCI. All rights reserved. Global Enterprise Studio.
          </p>
          <div className="flex shrink-0 gap-6 text-xs text-slate-300 font-mono">
            <Link to="/privacy-policy" className="hover:text-[#F5C082] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F5C082] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Monumental Watermark with Continuous Metallic Shine */}
      <div className="relative select-none overflow-hidden px-5 pb-6 pointer-events-none opacity-40">
        <div ref={parallaxRef}>
          <p
            aria-hidden
            className="animate-text-shine text-center font-display text-[16vw] font-black leading-[0.8] tracking-[0.08em] select-none drop-shadow-[0_0_35px_rgba(216,155,91,0.25)]"
          >
            STALCI
          </p>
        </div>
      </div>
    </footer>
  );
}
