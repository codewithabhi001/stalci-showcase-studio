import { Lightbulb, Award, ShieldCheck, Users, Globe2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useParallax } from "@/lib/animations";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const values = [
  { 
    icon: Lightbulb, 
    title: "Continuous Innovation & Speed", 
    tag: "High Velocity",
    copy: "We architect scalable distributed systems that accelerate enterprise time-to-market without compromising resilience.",
    metricLabel: "Cadence",
    metricValue: "Bi-weekly Sprints",
  },
  { 
    icon: Award, 
    title: "100% Type-Safe Craftsmanship", 
    tag: "Zero Regressions",
    copy: "Uncompromising code quality with strict static typing, automated integration suites, and principal code reviews.",
    metricLabel: "Test Coverage",
    metricValue: "> 95% Automated",
  },
  { 
    icon: ShieldCheck, 
    title: "Zero-Trust Security & Compliance", 
    tag: "ISO 27001 / SOC 2",
    copy: "Transparent IT governance, automated regulatory compliance, dynamic IAM pruning, and cryptographic safety.",
    metricLabel: "Standard",
    metricValue: "FIDO2 & Enclaves",
  },
  { 
    icon: Users, 
    title: "Embedded Agile Squads", 
    tag: "Dedicated Pod",
    copy: "Seamlessly integrating alongside your core engineering leadership as a dedicated high-velocity agile pod.",
    metricLabel: "Team Model",
    metricValue: "100% Senior Staff",
  },
];

export function About() {
  const textRevealRef = useScrollReveal({ direction: "up", distance: 30 }) as any;
  const staggerRef = useStaggerReveal({ staggerChildren: 0.06 }) as any;
  const parallaxRef = useParallax(0.02) as any;

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
    { value: config.stat_shipped || `${statsData?.totalProjectsCount || 140}+`, label: "Deployments" },
    { value: config.stat_markets || "18", label: "Global Markets" },
    { value: config.stat_engineers || "60+", label: "IT Engineers" },
    { value: config.stat_uptime || "99.9%", label: "Availability" },
  ];

  return (
    <section id="about" className="border-t border-zinc-200/90 bg-white py-20 sm:py-28 text-black">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        <div className="grid items-start gap-10 lg:grid-cols-12">
          
          {/* Left Column: Heading, Body & Metric Counters */}
          <div ref={textRevealRef} className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              eyebrow="About STALCI"
              title={aboutTitle}
              subtitle={aboutSubtitle}
              tone="light"
            />
            
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
              {aboutBody}
            </p>

            {/* Metric Counters Grid */}
            <div className="pt-3">
              <dl className="grid grid-cols-2 gap-3 sm:gap-4">
                {dynamicStats.map((stat, i) => (
                  <div 
                    key={i}
                    className="rounded-2xl bg-zinc-50/70 p-4 border border-zinc-200/90 shadow-2xs hover:border-zinc-400 transition-all"
                  >
                    <dt className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight font-display">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-[11px] font-mono text-zinc-500 font-medium leading-snug">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Column: Clean Value Cards */}
          <div ref={parallaxRef} className="lg:col-span-6">
            <div ref={staggerRef} className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 transition-all duration-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Top Row: Icon + Tag */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/90 text-zinc-950 shadow-2xs">
                          <Icon className="h-5 w-5 text-zinc-950" strokeWidth={1.8} />
                        </div>
                        
                        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 border border-zinc-200">
                          {v.tag}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h3 className="mt-3.5 text-sm sm:text-base font-bold text-zinc-950 tracking-tight">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal">
                        {v.copy}
                      </p>
                    </div>

                    {/* Bottom Metric */}
                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-[11px] font-mono">
                      <span className="text-zinc-400 font-bold uppercase text-[9.5px]">
                        {v.metricLabel}
                      </span>
                      <span className="font-bold text-zinc-950">
                        {v.metricValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
