import { Linkedin, Twitter, Github, Globe } from "lucide-react";
import { Wordmark } from "./Brand";

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
  return (
    <footer className="surface-ink relative isolate overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="text-on-ink">
              <Wordmark />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-ink-muted">
              A global technology company delivering IT services, digital solutions and engineered
              products. Create · Innovate · Empower.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="STALCI social link"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-on-ink-muted transition-colors hover:border-copper hover:text-copper"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-sm text-on-ink-muted transition-colors hover:text-copper">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-white/10 pt-6 sm:flex sm:justify-between">
          <p className="min-w-0 text-xs text-on-ink-muted">
            © {new Date().getFullYear()} STALCI. All rights reserved.
          </p>
          <div className="flex shrink-0 gap-5 text-xs text-on-ink-muted">
            <a href="#top" className="hover:text-copper">
              Privacy
            </a>
            <a href="#top" className="hover:text-copper">
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="relative select-none overflow-hidden px-5 pb-6">
        <p
          aria-hidden
          className="text-copper-gradient text-center font-display text-[16vw] font-bold leading-[0.85] tracking-[0.06em]"
        >
          STALCI
        </p>
      </div>
    </footer>
  );
}
