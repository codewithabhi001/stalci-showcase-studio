import { Linkedin, Twitter, Github, Instagram, Youtube, MessageCircle, Mail, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Wordmark } from "./Brand";
import { Link } from "@tanstack/react-router";

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
    <footer className="bg-[#000000] text-white relative isolate overflow-hidden border-t border-white/10 pt-20 sm:pt-24 pb-12 font-sans">
      
      {/* Top Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[18rem] bg-white/[0.02] blur-[140px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Top Section: Brand, Contacts & Multi-Column Links ─── */}
        <div className="grid gap-12 lg:grid-cols-12 pb-16 border-b border-white/10">
          
          {/* Left Column: Brand, Status & Contacts */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <Wordmark markSize={42} tone="dark" />
            </Link>
            
            <p className="max-w-sm text-xs leading-relaxed text-zinc-400 font-normal">
              Transforming enterprise platforms with Sovereign AI models, Multi-Cloud architectures, and mission-critical software engineering excellence.
            </p>

            {/* Live System Status Pill */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10.5px] font-mono text-zinc-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational &bull; 99.99% Uptime
              </span>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-2.5 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <a href="mailto:contact@stalci.com" className="hover:text-white transition-colors">
                  contact@stalci.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>San Francisco &bull; London &bull; Singapore</span>
              </div>
            </div>

            {/* Social Icons Stack */}
            <div className="flex items-center gap-2 pt-2">
              {socialsList.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.label}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.12] transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Columns: Structured Navigation */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Col 1: Core Practices */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Practices
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><Link to="/services/$slug" params={{ slug: "ai-services" }} className="hover:text-white transition-colors">Sovereign AI &amp; ML</Link></li>
                <li><Link to="/services/$slug" params={{ slug: "software-engineering" }} className="hover:text-white transition-colors">Enterprise Software</Link></li>
                <li><Link to="/services/$slug" params={{ slug: "web-development" }} className="hover:text-white transition-colors">Web &amp; WebGL</Link></li>
                <li><Link to="/services/$slug" params={{ slug: "mobility" }} className="hover:text-white transition-colors">Mobile Platforms</Link></li>
                <li><Link to="/services/$slug" params={{ slug: "cloud-devops" }} className="hover:text-white transition-colors">Cloud &amp; DevOps</Link></li>
                <li><Link to="/services/$slug" params={{ slug: "cybersecurity" }} className="hover:text-white transition-colors">Zero-Trust Security</Link></li>
              </ul>
            </div>

            {/* Col 2: Solutions */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Solutions &amp; Work
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><Link to="/products/$slug" params={{ slug: "stalci-ai-studio" }} className="hover:text-white transition-colors">Stalci AI Studio</Link></li>
                <li><Link to="/products/$slug" params={{ slug: "stalciops" }} className="hover:text-white transition-colors">StalciOps Cloud Fabric</Link></li>
                <li><Link to="/products/$slug" params={{ slug: "enterprise-design-studio" }} className="hover:text-white transition-colors">Design Studio</Link></li>
                <li><Link to="/products/$slug" params={{ slug: "security-compliance-suite" }} className="hover:text-white transition-colors">Stalci Shield</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Case Studies</Link></li>
              </ul>
            </div>

            {/* Col 3: Domains */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Industries
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><Link to="/industries/$slug" params={{ slug: "fintech" }} className="hover:text-white transition-colors">FinTech &amp; Banking</Link></li>
                <li><Link to="/industries/$slug" params={{ slug: "healthcare" }} className="hover:text-white transition-colors">HealthTech &amp; Life Sciences</Link></li>
                <li><Link to="/industries/$slug" params={{ slug: "ecommerce" }} className="hover:text-white transition-colors">E-Commerce &amp; Retail</Link></li>
                <li><Link to="/industries/$slug" params={{ slug: "logistics" }} className="hover:text-white transition-colors">Logistics &amp; Fleet</Link></li>
                <li><Link to="/industries/$slug" params={{ slug: "energy-sustainability" }} className="hover:text-white transition-colors">Energy &amp; CleanTech</Link></li>
              </ul>
            </div>

            {/* Col 4: Company & Legal */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Company &amp; Legal
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/testimonials" className="hover:text-white transition-colors">Client Testimonials</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers <span className="text-[9px] font-mono text-zinc-300 font-bold bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/10">HIRING</span></Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog &amp; Insights</Link></li>
                <li><Link to="/brand" className="hover:text-white transition-colors">Brand Identity</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ─── Middle Registration & Copyright Bar ─── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} STALCI Global Technologies LLC. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>D-U-N-S Number: 860386955</span>
            <span>&bull;</span>
            <span className="text-zinc-400">SOC 2 Type II / ISO 27001 Certified</span>
          </div>
        </div>

        {/* ─── Giant Stylized Watermark Typography ─── */}
        <div className="pt-12 pb-2 overflow-hidden select-none pointer-events-none text-center">
          <span 
            className="font-display font-black text-[13vw] leading-none tracking-tight block text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
            }}
          >
            STALCI.
          </span>
        </div>

      </div>
    </footer>
  );
}
