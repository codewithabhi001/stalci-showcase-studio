import { Linkedin, Twitter, Github, Globe, Instagram, Youtube, MessageCircle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Wordmark } from "./Brand";
import { Link } from '@tanstack/react-router';
import { useScrollReveal, useStaggerReveal, useParallax } from "@/lib/animations";

const columns = [
  {
    title: "Capabilities",
    links: [
      { name: "Custom Software", href: "/#services" },
      { name: "Mobile Applications", href: "/#services" },
      { name: "Cloud & Multi-Region", href: "/#services" },
      { name: "Sovereign AI Systems", href: "/#services" },
      { name: "Zero-Trust Security", href: "/#services" },
      { name: "High-Volume Data", href: "/#services" },
    ],
  },
  {
    title: "Domain Depth",
    links: [
      { name: "Fintech & Banking", href: "/#industries" },
      { name: "Healthcare & HIPAA", href: "/#industries" },
      { name: "B2B E-Commerce & Retail", href: "/#industries" },
      { name: "Maritime & Logistics", href: "/#industries" },
      { name: "Manufacturing Systems", href: "/#industries" },
      { name: "Public Sector & Civic", href: "/#industries" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { name: "About STALCI", href: "/#about" },
      { name: "Engineering Process", href: "/#process" },
      { name: "Proprietary Products", href: "/#products" },
      { name: "Technical Blog", href: "/blog" },
      { name: "Careers & Squads", href: "/careers" },
      { name: "Executive Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  const containerReveal = useScrollReveal();
  const staggerColumnsRef = useStaggerReveal({ childSelector: "> div" });
  const parallaxRef = useParallax(0.08);

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
    <footer className="bg-[#000000] text-white relative isolate overflow-hidden border-t border-white/10">
      
      {/* Top Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[15rem] bg-white/[0.02] blur-[120px] pointer-events-none -z-10" />

      <div ref={containerReveal} className="mx-auto max-w-6xl px-5 py-16 lg:px-8 relative z-10">
        
        {/* Main Footer Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_auto]">
          
          {/* Left Column: Brand & Mission */}
          <div className="space-y-5">
            <div className="text-white inline-block">
              <Wordmark />
            </div>
            
            <p className="max-w-sm text-xs leading-relaxed text-neutral-400 font-normal">
              STALCI is a global engineering studio delivering mission-critical custom software, sovereign AI systems, multi-cloud platforms, and cybersecurity resilience.
            </p>

            {/* Status & Compliance Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-neutral-300">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>Global Uptime 99.99%</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-neutral-400">
                <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
                <span>ISO 27001 / SOC 2 Ready</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialsList.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`STALCI ${item.label} channel`}
                  title={item.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-all hover:border-white/30 hover:text-white hover:bg-white/10 bg-white/[0.03]"
                >
                  <item.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns: Structured Navigation */}
          <div ref={staggerColumnsRef} className="grid gap-8 sm:grid-cols-3 lg:gap-14">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
                  {c.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        className="text-xs text-neutral-400 transition-colors hover:text-white inline-block"
                      >
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-14 relative flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-[11px] text-neutral-500 font-mono">
            © {new Date().getFullYear()} STALCI Global Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-neutral-400 font-mono">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & SLA
            </Link>
            <a href="/#contact" className="hover:text-white transition-colors flex items-center gap-1">
              Contact <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Subtle Background Watermark Typography */}
      <div className="relative select-none overflow-hidden px-5 pb-3 pointer-events-none opacity-[0.06]">
        <div ref={parallaxRef}>
          <p
            aria-hidden
            className="text-white text-center font-display text-[15vw] font-bold leading-[0.75] tracking-[0.05em]"
          >
            STALCI
          </p>
        </div>
      </div>
    </footer>
  );
}
