import { Zap } from "lucide-react";
import { BadgePill } from "@/components/brand/Brand";
import { ServiceCard } from "./ServiceCard";
import { useServicesQuery } from "@/hooks/queries/useServicesQuery";

export function Services() {
  const { data: services = [] } = useServicesQuery();

  return (
    <section id="services" className="bg-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <Zap className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
              <span className="font-semibold text-slate-900">Engineered for Precision &amp; Performance</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            Our Core <span className="font-extrabold text-slate-900">Development Practices</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Most projects don't fit one box. We pull from AI/ML, web, mobile, UI/UX, QA, DevOps, and cybersecurity, and combine what your project actually needs. Nothing more.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
