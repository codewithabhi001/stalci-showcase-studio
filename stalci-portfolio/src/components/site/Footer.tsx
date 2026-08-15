import { Linkedin, Twitter, Github, Globe, Instagram, Youtube, MessageCircle, ArrowUpRight, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";
import { Wordmark } from "./Brand";
import { Link } from '@tanstack/react-router';

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
    <footer className="bg-[#000000] text-white relative isolate overflow-hidden border-t border-white/10 pt-16 sm:pt-20 pb-10">
      
      {/* Top Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55rem] h-[18rem] bg-white/[0.03] blur-[140px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        
        {/* ─── Top Section: Brand, Contacts & Multi-Column Links ─── */}
        <div className="grid gap-12 lg:grid-cols-12 pb-14 border-b border-white/10">
          
          {/* Left Column: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <Wordmark tone="dark" markSize={28} />
            </Link>
            
            <p className="max-w-sm text-xs leading-relaxed text-neutral-400 font-normal">
              Transforming businesses with Sovereign AI, Multi-Cloud architectures, and mission-critical software engineering excellence.
            </p>

            {/* Contact details */}
            <div className="space-y-2.5 text-xs text-neutral-300">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">Contact</p>
              <div className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <a href="mailto:contact@stalci.com" className="font-sans">contact@stalci.com</a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <a href="tel:+14158903200" className="font-mono">USA +1 (415) 890-3200</a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <a href="tel:+442079460912" className="font-mono">UK +44 20 7946 0912</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialsList.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="h-8 w-8 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/20 transition-all shadow-inner"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns: 4 Nav Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Col 1: AI & Future Tech */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
                AI & Future Tech
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><a href="/#services" className="hover:text-white transition-colors">Sovereign AI Systems</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Custom LLM Pipelines</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Private RAG Vector Mesh</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Autonomous AI Agents</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Computer Vision</a></li>
              </ul>
            </div>

            {/* Col 2: Core Services */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Core Services
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><a href="/#services" className="hover:text-white transition-colors">Web App Engineering</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Mobile Applications</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Multi-Cloud & DevOps</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Cybersecurity & Trust</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">High-Volume Data</a></li>
              </ul>
            </div>

            {/* Col 3: Featured Work */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Featured Work
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><a href="/#projects" className="hover:text-white transition-colors">HouzQuest Platform</a></li>
                <li><a href="/#projects" className="hover:text-white transition-colors">AEC Mind AI</a></li>
                <li><a href="/#projects" className="hover:text-white transition-colors">Konvo Shoes Headless</a></li>
                <li><a href="/#projects" className="hover:text-white transition-colors">Dentaway Cloud</a></li>
                <li><a href="/#projects" className="hover:text-white transition-colors">FinTech Wallet</a></li>
              </ul>
            </div>

            {/* Col 4: Company & Legal */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Company & Legal
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/#testimonials" className="hover:text-white transition-colors">Client Testimonials</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">HIRING</span></a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog & Insights</a></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ─── Middle Registration & Copyright Bar ─── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} STALCI Global Technologies LLC. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>D-U-N-S Number: 860386955</span>
            <span>•</span>
            <span className="text-emerald-400">SOC 2 Type II / ISO 27001 Certified</span>
          </div>
        </div>

        {/* ─── Giant Stylized Watermark Typography Across Bottom (Image 1 Match) ─── */}
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
