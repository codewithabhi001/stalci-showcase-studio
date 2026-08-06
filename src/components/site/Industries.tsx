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
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const industries = [
  { icon: Banknote, name: "Fintech & Banking", copy: "High-throughput payment gateways, core lending architectures, KYC automation, and AI-driven risk engines." },
  { icon: HeartPulse, name: "Healthcare & Life Sciences", copy: "HIPAA-compliant data fabrics, scalable telehealth infrastructures, and clinical informatics systems." },
  { icon: ShoppingBag, name: "Retail & Consumer Goods", copy: "Omnichannel headless commerce, intelligent OMS, and real-time hyper-personalization engines." },
  { icon: GraduationCap, name: "EdTech & Education", copy: "Enterprise LMS architectures, adaptive assessment engines, and scalable student success platforms." },
  { icon: Factory, name: "Manufacturing & Industry 4.0", copy: "IIoT telemetry dashboards, legacy MES integrations, and predictive maintenance via machine learning." },
  { icon: Truck, name: "Logistics & Supply Chain", copy: "Global fleet telematics, algorithmic routing optimization, and automated warehouse ecosystems." },
  { icon: Building2, name: "Real Estate & PropTech", copy: "High-availability listing syndication, enterprise CRM integrations, and predictive property analytics." },
  { icon: Plane, name: "Travel & Hospitality", copy: "High-concurrency booking engines, seamless PMS integrations, and scalable loyalty management platforms." },
  { icon: Radio, name: "Media & Telecommunications", copy: "Ultra-low latency streaming architectures, modern OSS/BSS layers, and highly resilient subscriber portals." },
  { icon: Gamepad2, name: "Gaming & Interactive", copy: "Scalable real-time backend services, low-latency matchmaking algorithms, and robust live ops infrastructure." },
  { icon: Zap, name: "Energy & Utilities", copy: "Smart grid telemetry, automated metering infrastructures, and compliant sustainability reporting fabrics." },
  { icon: Landmark, name: "Government & Public Sector", copy: "Secure citizen service portals, highly available e-governance solutions, and compliant data enclaves." },
];

export function Industries() {
  const headingRef = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerChildren: 0.1 });

  return (
    <section id="industries" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Industry Expertise"
            title="Enterprise Domain Depth Across Core Sectors"
            subtitle="We leverage cross-industry design patterns, stringent compliance frameworks, and robust reference architectures to accelerate your digital transformation."
          />
        </div>

        {/* Animated Gradient Border Outer Container */}
        <div className="mt-14 p-[1px] rounded-3xl bg-gradient-to-br from-copper/40 via-border to-copper/40 animate-gradient-shift background-animate">
          <div
            ref={gridRef}
            className="grid gap-px overflow-hidden rounded-3xl bg-border/50 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industries.map((i) => (
              <motion.div
                key={i.name}
                className="group relative bg-card p-7 transition-colors duration-500 hover:bg-secondary"
                whileHover="hover"
              >
                {/* Subtle hover glow background effect */}
                <div className="absolute inset-0 bg-copper/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <motion.span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-colors group-hover:border-copper/60 shadow-sm"
                    variants={{
                      hover: {
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(216, 155, 91, 0.4)",
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }
                    }}
                  >
                    <i.icon className="h-5 w-5 text-copper transition-colors duration-300 group-hover:text-copper-deep" strokeWidth={1.5} />
                  </motion.span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold group-hover:text-copper transition-colors duration-300">{i.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{i.copy}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
