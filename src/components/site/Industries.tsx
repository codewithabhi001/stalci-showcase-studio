import {
  Banknote,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Truck,
  Building2,
  Plane,
  Radio,
  Gamepad2,
  Zap,
  Landmark,
} from "lucide-react";
import { SectionHeading } from "./Brand";

const industries = [
  { icon: Banknote, name: "Fintech & Banking", copy: "Payments, lending platforms, KYC and risk engines." },
  { icon: HeartPulse, name: "Healthcare", copy: "HIPAA-ready portals, telehealth and clinical data systems." },
  { icon: ShoppingBag, name: "Retail & E-commerce", copy: "Headless storefronts, OMS and personalisation." },
  { icon: GraduationCap, name: "Education", copy: "LMS platforms, assessment engines and student apps." },
  { icon: Factory, name: "Manufacturing", copy: "IIoT dashboards, MES integration and predictive upkeep." },
  { icon: Truck, name: "Logistics & Supply Chain", copy: "Fleet tracking, routing and warehouse automation." },
  { icon: Building2, name: "Real Estate & PropTech", copy: "Listing platforms, CRM and property analytics." },
  { icon: Plane, name: "Travel & Hospitality", copy: "Booking engines, PMS integration and loyalty." },
  { icon: Radio, name: "Media & Telecom", copy: "Streaming backends, OSS/BSS and subscriber portals." },
  { icon: Gamepad2, name: "Gaming & Entertainment", copy: "Realtime backends, matchmaking and live ops." },
  { icon: Zap, name: "Energy & Utilities", copy: "Grid monitoring, metering and sustainability reporting." },
  { icon: Landmark, name: "Government & Public", copy: "Citizen services, secure portals and e-governance." },
];

export function Industries() {
  return (
    <section id="industries" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Domain depth across twelve sectors"
          subtitle="We bring pattern knowledge, compliance awareness and reference architectures from every industry we serve."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.name} className="group bg-card p-7 transition-colors hover:bg-secondary">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-copper/60">
                  <i.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{i.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{i.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
