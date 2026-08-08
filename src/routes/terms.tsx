import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { SectionHeading } from '@/components/site/Brand';
import { useScrollReveal } from '@/lib/animations';

const title = 'Terms & Conditions — STALCI';
const description =
  'The terms governing use of the STALCI website and our software engineering, cloud, AI, data and cyber security services, including IP, warranties and liability.';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Terms,
});

const sections: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: '1. Acceptance of Terms',
    p: [
      'By accessing the STALCI website or engaging STALCI for professional services, you agree to these Terms & Conditions. If you are entering into these terms on behalf of an organisation, you confirm you have authority to bind that organisation. If you do not agree, you must not use our website or services.',
    ],
  },
  {
    h: '2. Services and Contracting Structure',
    p: [
      'STALCI provides software engineering, mobile development, cloud and platform engineering, data and analytics, artificial intelligence, quality assurance, managed support and cyber security services.',
      'The specific scope, deliverables, acceptance criteria, milestones, fees and service levels of any engagement are governed by a Master Services Agreement (MSA) and one or more Statements of Work (SOW). Where an MSA or SOW conflicts with these Terms, the MSA or SOW prevails for that engagement.',
    ],
  },
  {
    h: '3. Client Responsibilities',
    p: ['To deliver on time we rely on timely client cooperation. You agree to:'],
    list: [
      'Provide accurate requirements, access to stakeholders and decision-makers within agreed timelines.',
      'Supply necessary systems access, credentials, environments and third-party licences.',
      'Review and respond to deliverables within the acceptance window defined in the SOW.',
      'Ensure you hold all rights to any materials, data or code supplied to STALCI.',
    ],
  },
  {
    h: '4. Fees, Invoicing and Taxes',
    p: [
      'Unless the SOW states otherwise, fees are invoiced monthly in arrears for time-and-materials engagements and against milestones for fixed-scope engagements. Invoices are payable within 30 days of issue. Late amounts may accrue interest at the maximum rate permitted by law. All fees are exclusive of VAT, GST, withholding and other applicable taxes, which are payable by the client. Pre-approved travel and third-party costs are recharged at cost.',
    ],
  },
  {
    h: '5. Change Control',
    p: [
      'Either party may request a change to scope, timeline or resourcing. Changes take effect only when documented in a written change order signed by both parties, including any impact on fees and delivery dates. Work continues under the existing SOW until a change order is agreed.',
    ],
  },
  {
    h: '6. Intellectual Property Rights',
    p: [
      'Unless otherwise agreed in an MSA or SOW, engagements operate on a work-for-hire basis. Upon payment in full of all undisputed fees, ownership of custom source code, designs and documentation created exclusively for the client transfers to the client.',
      'STALCI retains all rights in its pre-existing materials, internal frameworks, libraries, tooling, methodologies and know-how, and grants the client a perpetual, non-exclusive, royalty-free licence to use those materials to the extent embedded in the deliverables. Open-source components remain governed by their respective licences, which are disclosed in the delivery documentation.',
    ],
  },
  {
    h: '7. Confidentiality',
    p: [
      'Each party will hold the other party\u2019s confidential information in strict confidence, use it only for the purpose of the engagement, and protect it with no less than reasonable care. Obligations survive termination for five years, or indefinitely for trade secrets. A separately executed Non-Disclosure Agreement supersedes this clause to the extent of any conflict.',
    ],
  },
  {
    h: '8. Data Protection and Security',
    p: [
      'Where STALCI processes personal data on the client\u2019s behalf, it acts as a data processor under a Data Processing Agreement incorporating the applicable statutory clauses. STALCI maintains technical and organisational measures aligned to ISO 27001 and SOC 2 control objectives, including encryption, least-privilege access, logging and incident response. Please also read our Privacy Policy.',
    ],
  },
  {
    h: '9. Warranties and Disclaimers',
    p: [
      'STALCI warrants that services will be performed with reasonable skill and care by suitably qualified personnel, and that deliverables will materially conform to the specifications in the SOW for 30 days following acceptance. Our sole obligation for a valid warranty claim is to re-perform or correct the affected deliverable.',
      'Except as expressly stated, the website and services are provided "as is" without further warranties of any kind, including implied warranties of merchantability, fitness for a particular purpose or non-infringement. STALCI does not warrant uninterrupted or error-free operation of third-party platforms.',
    ],
  },
  {
    h: '10. Limitation of Liability',
    p: [
      'To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential or punitive damages, or for loss of profit, revenue, goodwill, anticipated savings or data. Each party\u2019s aggregate liability arising out of an engagement is limited to the total fees paid under the relevant SOW in the 12 months preceding the event giving rise to the claim. Nothing limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot lawfully be excluded.',
    ],
  },
  {
    h: '11. Non-Solicitation',
    p: [
      'During an engagement and for 12 months after its conclusion, neither party will knowingly solicit for employment any personnel of the other party who were directly involved in the engagement, except through general public advertising.',
    ],
  },
  {
    h: '12. Term, Suspension and Termination',
    p: [
      'Either party may terminate an SOW for convenience on 30 days\u2019 written notice, or immediately for material breach that remains uncured 15 days after written notice, or upon insolvency. On termination the client pays for services performed and non-cancellable commitments incurred to the termination date. STALCI may suspend services for undisputed invoices overdue by more than 30 days.',
    ],
  },
  {
    h: '13. Force Majeure',
    p: [
      'Neither party is liable for delay or failure caused by events beyond its reasonable control, including natural disasters, war, terrorism, epidemics, labour disputes, governmental action, or failures of internet or cloud infrastructure. Affected obligations are suspended for the duration of the event.',
    ],
  },
  {
    h: '14. Website Use and Acceptable Conduct',
    p: [
      'You may not attempt to gain unauthorised access to our systems, probe or scan our infrastructure, scrape content at scale, introduce malicious code, or use our content for machine-learning training without written permission. All site content, trademarks and the STALCI brand assets are owned by STALCI and may not be reproduced without consent.',
    ],
  },
  {
    h: '15. Governing Law and Disputes',
    p: [
      'These Terms are governed by the laws of the jurisdiction in which the contracting STALCI entity is registered, without regard to conflict-of-law rules. The parties will first attempt good-faith resolution through senior representatives; failing that, disputes are subject to the exclusive jurisdiction of the competent courts of that jurisdiction.',
    ],
  },
  {
    h: '16. General and Contact',
    p: [
      'These Terms, together with the MSA, SOW and any DPA, constitute the entire agreement between the parties. If any provision is held unenforceable, the remainder continues in effect. Failure to enforce a right is not a waiver of it. Neither party may assign the agreement without the other\u2019s consent, except to an affiliate or successor in interest.',
      'Questions about these Terms: legal@stalci.com.',
    ],
  },
];

function Terms() {
  const contentRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Legal"
              title="Terms & Conditions"
              subtitle="Last updated: August 2026. Please read these terms carefully before using our website or services."
              align="left"
            />
          </div>

          <div ref={contentRef} className="max-w-none text-ink-soft">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="mb-3 mt-9 text-lg font-semibold text-ink">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="mb-4 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mb-4 space-y-2">
                    {s.list.map((li) => (
                      <li key={li} className="text-sm leading-relaxed">
                        — {li}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
