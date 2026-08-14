import { Lightbulb, Award, ShieldCheck, Users, Globe2, ArrowUpRight, Server, Radio, Cpu, Network } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useParallax, useCountUp } from "@/lib/animations";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const values = [
  { 
    icon: Lightbulb, 
    title: "Innovation & Speed", 
    copy: "We architect scalable solutions that accelerate enterprise time-to-market without compromising resilience or security perimeters." 
  },
  { 
    icon: Award, 
    title: "Engineering Excellence", 
    copy: "Uncompromising software craftsmanship, 100% strict type safety, and rigorous automated testing for mission-critical IT systems." 
  },
  { 
    icon: ShieldCheck, 
    title: "Zero-Trust Integrity", 
    copy: "Transparent IT governance, automated regulatory compliance (SOC 2 / ISO 27001), and predictable milestone-driven sprint delivery." 
  },
  { 
    icon: Users, 
    title: "Embedded Pod Collaboration", 
    copy: "Seamlessly integrating alongside your core leadership as a dedicated high-velocity agile pod with singular accountability." 
  },
  { 
    icon: Globe2, 
    title: "Measurable Business Impact", 
    copy: "Strategic technology programs governed by tangible operational KPIs, reduced infrastructure TCO, and bottom-line expansion." 
  },
];

function StatItem({ stat }: { stat: { value: string; label: string } }) {
  const numericVal = parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 100;
  const suffix = stat.value.includes("%") ? "%" : stat.value.includes("+") ? "+" : "";

  const ref = useCountUp(numericVal, { suffix }) as any;

  return (
    <div className="group relative rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 border-t-2 border-t-[#D89B5B] shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#D89B5B]/80">
      <dt ref={ref} className="font-display text-2xl sm:text-3xl font-black text-[#9E6229] tracking-tight">
        0{suffix}
      </dt>
      <dd className="mt-2 text-xs font-bold leading-snug text-slate-600 uppercase tracking-wider font-mono">
        {stat.label}
      </dd>
    </div>
  );
}

export function About() {
  const textRevealRef = useScrollReveal({ direction: "up", distance: 40 }) as any;
  const staggerRef = useStaggerReveal({ staggerChildren: 0.1 }) as any;
  const parallaxRef = useParallax(0.03) as any;

  const { data: config = {} } = useQuery({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
  });

  const { data: statsData } = useQuery({
    queryKey: ["site-stats"],
    queryFn: fetchStats,
  });

  const aboutTitle =
    config.aboutTitle || "Architecting the technological foundation for modern enterprise agility.";
  const aboutSubtitle =
    config.aboutSubtitle ||
    "We synergize enterprise architecture, elite software engineering, and strategic IT consulting to deliver mission-critical solutions—from initial blueprinting to global deployment.";
  const aboutBody =
    config.aboutBody ||
    "Our cross-functional practices specialize in sovereign enterprise platforms, multi-cloud orchestration, advanced AI model integration, and distributed zero-trust cybersecurity. Every engagement is executed by elite engineers utilizing agile delivery and enterprise-grade quality assurance.";

  const dynamicStats = [
    { value: config.stat_shipped || `${statsData?.totalProjectsCount || 140}+`, label: "Enterprise Deployments" },
    { value: config.stat_markets || "18", label: "Global Markets" },
    { value: config.stat_engineers || "60+", label: "Elite IT Engineers" },
    { value: config.stat_uptime || "99.9%", label: "Availability SLA" },
  ];

  return (
    <section id="about" className="relative bg-[#F8FAFC] py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          
          {/* Left Column: Story & KPI Stats */}
          <div ref={textRevealRef}>
            <SectionHeading
              align="left"
              eyebrow="About STALCI"
              title={aboutTitle}
              subtitle={aboutSubtitle}
              tone="light"
            />
            
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
              {aboutBody}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {dynamicStats.map((s) => (
                <StatItem key={s.label} stat={s} />
              ))}
            </dl>
          </div>

          {/* Right Column: Values Bento Grid */}
          <div ref={parallaxRef}>
            <div ref={staggerRef} className="grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className={
                    "group relative rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl " +
                    (i === 0 || i === 3 || i === 4 ? "sm:col-span-2" : "sm:col-span-1")
                  }
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] shadow-2xs group-hover:bg-[#9E6229] group-hover:text-white transition-colors">
                    <v.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-950 group-hover:text-[#9E6229] transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {v.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Global Multi-Region Topology Visual Diagram */}
        <div className="mt-16 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229] text-[10.5px] font-mono font-bold uppercase tracking-wider mb-2">
                <Network className="h-3.5 w-3.5" />
                Global Architecture Topology
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Multi-Region Sovereign Edge & Low-Latency Infrastructure
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-slate-600 bg-[#F8FAFC] p-3 rounded-2xl border border-slate-200 shrink-0">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-bold text-slate-900">Active Global Mesh</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#9E6229] font-extrabold">&lt; 14ms Global P99</span>
            </div>
          </div>

          {/* Topology Interactive SVG Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { region: "US-West (San Francisco)", latency: "1.2 ms", role: "Primary Hub & Edge CDN", status: "Nominal" },
              { region: "EU-West (London / Frankfurt)", latency: "14.8 ms", role: "GDPR Compliant Data Lake", status: "Nominal" },
              { region: "AP-East (Tokyo / Singapore)", latency: "22.4 ms", role: "High-Throughput Gateway", status: "Nominal" },
              { region: "Global Zero-Trust Mesh", latency: "Sub-10ms", role: "eBPF Automated Defense", status: "Shielded" },
            ].map((node, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs hover:border-[#D89B5B]/70 hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                  <span className="font-bold text-[#9E6229]">NODE 0{i + 1}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                    {node.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-950">{node.region}</h4>
                <p className="text-xs text-slate-600 mt-1">{node.role}</p>
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-medium">Latency</span>
                  <span className="font-extrabold text-[#9E6229]">{node.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
