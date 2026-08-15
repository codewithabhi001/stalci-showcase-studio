import { Linkedin, Twitter, Github, Globe, Instagram, Youtube, MessageCircle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Wordmark } from "./Brand";
import { Link } from '@tanstack/react-router';

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
    title: "Platforms & Products",
    links: [
      { name: "StalciOps (FinOps)", href: "/products/stalci-ops" },
      { name: "Stalci AI Studio", href: "/products/stalci-ai-studio" },
      { name: "Stalci Insight", href: "/products/stalci-insight" },
      { name: "Stalci Shield", href: "/products/stalci-shield" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { name: "About STALCI", href: "/#about" },
      { name: "Engineering Process", href: "/#process" },
      { name: "Technical Blog", href: "/blog" },
      { name: "Careers & Squads", href: "/careers" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
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
    <footer className="bg-[#FAFAFC] text-black border-t border-zinc-200/90 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        {/* Main Footer Multi-Column Grid */}
        <div className="grid gap-10 lg:grid-cols-12 pb-14 border-b border-zinc-200/80">
          
          {/* Left Column: Brand, Mission & Status */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <Wordmark tone="light" markSize={26} />
            </Link>
            
            <p className="max-w-sm text-xs leading-relaxed text-zinc-600 font-normal">
              STALCI is a global engineering studio delivering mission-critical custom software, sovereign AI systems, multi-cloud platforms, and cybersecurity resilience.
            </p>

            {/* Status & Compliance Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-mono text-zinc-800 shadow-2xs">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>Global SLA 99.99%</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-mono text-zinc-700 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-600" />
                <span>ISO 27001 / SOC 2</span>
              </div>
            </div>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-mono">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-xs text-zinc-600 hover:text-zinc-950 transition-colors font-medium"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar: Wordmark, Socials & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <div className="flex items-center gap-4">
            <span className="font-mono font-bold text-zinc-950">STALCI GLOBAL</span>
            <div className="flex items-center gap-2">
              {socialsList.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="h-7 w-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-2xs"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} STALCI Technologies LLC. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
