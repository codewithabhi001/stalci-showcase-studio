import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/Brand";
import { jobs, departments, benefits } from "@/lib/careers-data";
import { MapPin, Clock, Briefcase } from "lucide-react";

const title = "Careers at STALCI — Engineering, AI, Cloud, SEO & Sales Roles";
const description =
  "Join STALCI. Open roles across software engineering, AI and data, cloud and DevOps, cyber security, design, SEO and digital marketing, business development and delivery.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(null);

  const visible = filter === "All" ? jobs : jobs.filter((j) => j.department === filter);

  return (
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Careers"
            title="Build technology that enterprises depend on"
            subtitle="We hire senior thinkers across engineering, AI, cloud, security, design, marketing and sales — and give them real ownership."
            align="left"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-2">
            {["All", ...departments].map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-colors " +
                  (filter === d
                    ? "border-copper bg-copper/10 text-copper"
                    : "border-border text-muted-foreground hover:border-copper/50 hover:text-copper")
                }
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {visible.map((j) => {
              const expanded = open === j.slug;
              return (
                <div key={j.slug} className="rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpen(expanded ? null : j.slug)}
                    className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
                    aria-expanded={expanded}
                  >
                    <div className="min-w-0">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-copper">
                        {j.department}
                      </span>
                      <h3 className="mt-1.5 text-base font-semibold text-ink">{j.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{j.summary}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-copper" /> {j.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-copper" /> {j.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-copper" /> {j.experience}
                      </span>
                    </div>
                  </button>

                  {expanded ? (
                    <div className="grid gap-6 border-t border-border p-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                          What you will do
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {j.responsibilities.map((r) => (
                            <li key={r} className="text-sm leading-relaxed text-ink-soft">
                              — {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                          What we look for
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {j.requirements.map((r) => (
                            <li key={r} className="text-sm leading-relaxed text-ink-soft">
                              — {r}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`mailto:careers@stalci.com?subject=Application: ${encodeURIComponent(j.title)}`}
                          className="mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-ink"
                          style={{ background: "var(--gradient-copper)" }}
                        >
                          Apply for this role
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-card p-7 sm:p-10">
            <h2 className="text-lg font-semibold text-ink">Nothing matching your skills?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Send an open application with your CV and portfolio. We review every submission and
              keep strong profiles on file for upcoming roles.
            </p>
            <a
              href="mailto:careers@stalci.com?subject=Open application"
              className="mt-5 inline-flex rounded-full border border-copper/50 px-5 py-2.5 text-sm font-semibold text-copper transition-colors hover:bg-copper hover:text-ink"
            >
              careers@stalci.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
