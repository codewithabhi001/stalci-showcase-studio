import { Linkedin, Twitter, Github, Globe } from "lucide-react";
import { Wordmark } from "./Brand";
import { motion } from "framer-motion";
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
    links: ["About", "Process", "Products", "Brand system", "FAQ", "Contact"],
  },
];

const socials = [Linkedin, Twitter, Github, Globe];

export function Footer() {
  const containerReveal = useScrollReveal();
  const staggerColumnsRef = useStaggerReveal({ childSelector: "> div" });
  const parallaxRef = useParallax(0.15);

  return (
    <footer className="surface-ink relative isolate overflow-hidden">
      {/* Animated gradient divider line at the top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent animate-gradient-shift bg-[length:200%_auto]" />

      {/* Copper glow orb decoration behind the footer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--copper)] opacity-[0.07] blur-[150px] pointer-events-none mix-blend-screen animate-float-orb" />

      <div ref={containerReveal} className="mx-auto max-w-7xl px-5 py-16 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_auto]">
          <div>
            <div className="text-on-ink inline-block drop-shadow-[0_0_12px_rgba(216,155,91,0.4)]">
              <Wordmark />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-ink-muted">
              A global technology company delivering IT services, digital solutions and engineered
              products. Create · Innovate · Empower.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#top"
                  aria-label="STALCI social link"
                  whileHover={{ scale: 1.15 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-on-ink-muted transition-colors hover:border-copper hover:text-copper hover:glow-copper"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div ref={staggerColumnsRef} className="grid gap-12 sm:grid-cols-3 lg:gap-16">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                  {c.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-sm text-on-ink-muted transition-colors hover:text-copper underline-sweep inline-block"
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

        <div className="mt-14 relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pt-6 sm:flex sm:justify-between">
          {/* Inner animated gradient divider line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent animate-gradient-shift bg-[length:200%_auto]" />
          
          <p className="min-w-0 text-xs text-on-ink-muted">
            © {new Date().getFullYear()} STALCI. All rights reserved.
          </p>
          <div className="flex shrink-0 gap-5 text-xs text-on-ink-muted">
            <a href="#top" className="hover:text-copper underline-sweep">
              Privacy
            </a>
            <a href="#top" className="hover:text-copper underline-sweep">
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="relative select-none overflow-hidden px-5 pb-6 pointer-events-none">
        <div ref={parallaxRef}>
          <p
            aria-hidden
            className="text-copper-gradient text-center font-display text-[16vw] font-bold leading-[0.85] tracking-[0.06em]"
          >
            STALCI
          </p>
        </div>
      </div>
    </footer>
  );
}
