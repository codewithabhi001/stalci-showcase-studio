import { Lightbulb, Award, ShieldCheck, Users, Globe2 } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal, useParallax, useCountUp } from "@/lib/animations";
import { motion } from "framer-motion";

const values = [
  { icon: Lightbulb, title: "Innovation", copy: "We architect scalable solutions that drive enterprise digital transformation." },
  { icon: Award, title: "Excellence", copy: "Uncompromising engineering quality for mission-critical IT systems." },
  { icon: ShieldCheck, title: "Integrity", copy: "Transparent IT governance, strict compliance, and predictable delivery." },
  { icon: Users, title: "Collaboration", copy: "Seamlessly embedding within your enterprise as a dedicated agile unit." },
  { icon: Globe2, title: "Impact", copy: "Strategic technology initiatives measured by tangible business outcomes." },
];

const stats = [
  { value: "120+", label: "Enterprise deployments" },
  { value: "18", label: "Global markets served" },
  { value: "60+", label: "Elite IT consultants" },
  { value: "99.9%", label: "Mission-critical uptime" },
];

function StatItem({ stat }: { stat: { value: string; label: string } }) {
  let end = 0;
  let suffix = "";
  if (stat.value === "120+") {
    end = 120;
    suffix = "+";
  } else if (stat.value === "18") {
    end = 18;
    suffix = "";
  } else if (stat.value === "60+") {
    end = 60;
    suffix = "+";
  } else if (stat.value === "99.9%") {
    end = 99;
    suffix = ".9%";
  }

  const ref = useCountUp(end, { suffix }) as any;

  return (
    <div className="bg-card/55 backdrop-blur-sm border border-border/50 rounded-2xl px-5 py-6 shadow-sm hover:border-copper/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <dt ref={ref} className="text-2xl font-bold text-copper-deep">
        0{suffix}
      </dt>
      <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
    </div>
  );
}

export function About() {
  const textRevealRef = useScrollReveal({ direction: "up", distance: 40 }) as any;
  const staggerRef = useStaggerReveal({ staggerChildren: 0.1 }) as any;
  const parallaxRef = useParallax(0.03) as any;

  return (
    <section id="about" className="bg-background py-20 sm:py-24 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div ref={textRevealRef}>
            <SectionHeading
              align="left"
              eyebrow="About STALCI"
              title="Architecting the technological foundation for modern enterprise agility."
              subtitle="We synergize enterprise architecture, elite engineering, and strategic IT consulting to deliver mission-critical solutions—from initial blueprinting to global deployment and continuous optimization."
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Our cross-functional practices specialize in enterprise software engineering, scalable cloud infrastructures, advanced AI integrations, robust cybersecurity, and scalable data architectures. Every engagement is executed by domain experts utilizing agile methodologies, rigorous governance, and enterprise-grade quality assurance.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <StatItem key={s.label} stat={s} />
              ))}
            </dl>
          </div>

          <div ref={parallaxRef}>
            <div ref={staggerRef} className="grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className={
                    "gradient-border card-lift rounded-2xl bg-card p-6 border border-border/80 shadow-sm " +
                    (i === 0 || i === 3 || i === 4 ? "sm:col-span-2" : "sm:col-span-1")
                  }
                >
                  <motion.span
                    whileHover={{ boxShadow: "0px 0px 16px var(--copper)" }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent transition-colors"
                  >
                    <v.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.6} />
                  </motion.span>
                  <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
