import { Lightbulb, Award, ShieldCheck, Users, Globe2 } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useParallax, useCountUp } from "@/lib/animations";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap, fetchStats } from "@/lib/api";

const values = [
  { icon: Lightbulb, title: "Innovation & Speed", copy: "We architect scalable solutions that accelerate enterprise time-to-market without compromising resilience." },
  { icon: Award, title: "Engineering Excellence", copy: "Uncompromising software craftsmanship and rigorous code quality for mission-critical IT systems." },
  { icon: ShieldCheck, title: "Zero-Trust Integrity", copy: "Transparent IT governance, automated regulatory compliance, and predictable delivery milestones." },
  { icon: Users, title: "Embedded Collaboration", copy: "Seamlessly integrating alongside your core engineering team as a dedicated high-velocity agile pod." },
  { icon: Globe2, title: "Measurable Business Impact", copy: "Strategic technology programs governed by tangible operational KPIs and bottom-line growth." },
];

function StatItem({ stat }: { stat: { value: string; label: string } }) {
  const numericVal = parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 100;
  const suffix = stat.value.includes("%") ? "%" : stat.value.includes("+") ? "+" : "";

  const ref = useCountUp(numericVal, { suffix }) as any;

  return (
    <div className="bg-white rounded-xl px-4 py-4 border border-slate-200 shadow-2xs hover:border-slate-400 transition-colors">
      <dt ref={ref} className="text-2xl sm:text-3xl font-bold text-slate-900">
        0{suffix}
      </dt>
      <dd className="mt-1 text-[11px] font-medium leading-snug text-slate-500">{stat.label}</dd>
    </div>
  );
}

export function About() {
  const textRevealRef = useScrollReveal({ direction: "up", distance: 30 }) as any;
  const staggerRef = useStaggerReveal({ staggerChildren: 0.08 }) as any;
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
    <section id="about" className="bg-[#F8FAFC] py-20 sm:py-28 relative text-slate-900 border-t border-slate-200/80">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div ref={textRevealRef}>
            <SectionHeading
              align="left"
              eyebrow="About STALCI"
              title={aboutTitle}
              subtitle={aboutSubtitle}
              tone="light"
            />
            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-slate-600">
              {aboutBody}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {dynamicStats.map((s) => (
                <StatItem key={s.label} stat={s} />
              ))}
            </dl>
          </div>

          <div ref={parallaxRef}>
            <div ref={staggerRef} className="grid gap-3.5 sm:grid-cols-2">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className={
                    "rounded-xl bg-white p-5 border border-slate-200 shadow-2xs hover:border-slate-400 transition-colors " +
                    (i === 0 || i === 3 || i === 4 ? "sm:col-span-2" : "sm:col-span-1")
                  }
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
                    <v.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{v.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
