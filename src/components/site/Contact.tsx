import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const details = [
  { icon: Mail, label: "Email", value: "hello@stalci.com" },
  { icon: Phone, label: "Phone", value: "+1 (415) 555-0134" },
  { icon: MapPin, label: "Offices", value: "Bengaluru · Dubai · London" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="surface-ink relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.73 0.101 62 / 0.25), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow text-copper">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold text-on-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Let's build something worth scaling.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-on-ink-muted">
            Tell us about your product, platform or migration. You'll hear back from a senior engineer
            within one business day — not a sales queue.
          </p>

          <ul className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <d.icon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-on-ink-muted">{d.label}</p>
                  <p className="mt-0.5 truncate text-base font-medium text-on-ink">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-copper" strokeWidth={1.4} />
              <h3 className="text-xl font-semibold text-on-ink">Thanks — message received</h3>
              <p className="max-w-sm text-sm text-on-ink-muted">
                A STALCI engineer will get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Jane Doe" />
                <Field label="Work email" name="email" type="email" placeholder="jane@company.com" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" name="company" placeholder="Company Ltd." />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-on-ink-muted">
                    Service
                  </label>
                  <select
                    name="service"
                    className="mt-2 w-full rounded-xl border border-white/12 bg-ink px-4 py-3 text-sm text-on-ink outline-none transition-colors focus:border-copper"
                    defaultValue="Custom Software"
                  >
                    {[
                      "Custom Software",
                      "Mobile Apps",
                      "Cloud & DevOps",
                      "AI & Machine Learning",
                      "Cyber Security",
                      "Data & Analytics",
                      "Automation",
                      "Managed IT",
                    ].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-on-ink-muted">
                  Project details
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="What are you building?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-on-ink placeholder:text-white/30 outline-none transition-colors focus:border-copper"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.01]"
                style={{ background: "var(--gradient-copper)" }}
              >
                Send enquiry
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-on-ink-muted">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-on-ink placeholder:text-white/30 outline-none transition-colors focus:border-copper"
      />
    </div>
  );
}
