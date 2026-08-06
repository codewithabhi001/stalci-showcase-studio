import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./Brand";

const faqs = [
  {
    q: "What engagement models do you offer?",
    a: "Fixed-scope projects, dedicated engineering pods and staff augmentation. Most clients start with a discovery sprint and then scale into a dedicated pod.",
  },
  {
    q: "How quickly can a team start?",
    a: "A standard pod of 3–5 specialists is typically staffed within two weeks. Discovery sprints can begin in a matter of days.",
  },
  {
    q: "Do you sign NDAs and handle IP transfer?",
    a: "Yes. NDAs are signed before discovery and all intellectual property, source code and infrastructure ownership transfers to you.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Security reviews, dependency scanning and secrets management are built into delivery. We support SOC 2, ISO 27001, HIPAA and GDPR programmes.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Regularly. We start with a technical audit covering architecture, test coverage, security and cost, then present a prioritised remediation roadmap.",
  },
  {
    q: "What happens after launch?",
    a: "SLA-backed managed support with 24/7 monitoring, incident response, continuous delivery and a quarterly optimisation roadmap.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything teams usually ask before the first call."
        />

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold hover:text-copper-deep hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
