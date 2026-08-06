import { createFileRoute } from '@tanstack/react-router';
import { SectionHeading } from '@/components/site/Brand';
import { useScrollReveal } from '@/lib/animations';

export const Route = createFileRoute('/terms')({
  component: Terms,
});

function Terms() {
  const contentRef = useScrollReveal();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Legal"
            title="Terms & Conditions"
            subtitle="Last updated: August 2026. Please read these terms and conditions carefully before using our services."
          />
        </div>

        <div ref={contentRef} className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none text-ink-soft">
          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">1. Acceptance of Terms</h3>
          <p className="mb-6">
            By accessing or utilizing the digital platforms, IT services, and consulting solutions provided by STALCI, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">2. Professional Services</h3>
          <p className="mb-6">
            STALCI provides bespoke software engineering, cloud architecture, cybersecurity, and digital transformation consulting. The specific scope, deliverables, timelines, and costs of any engagement will be outlined in a separate Master Services Agreement (MSA) or Statement of Work (SOW) mutually agreed upon prior to project commencement.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">3. Intellectual Property Rights</h3>
          <p className="mb-6">
            Unless otherwise stipulated in an MSA or SOW, STALCI operates on a "work-for-hire" basis. Upon full payment of all undisputed fees, the intellectual property rights to the custom source code and specific deliverables created exclusively for the client shall transfer to the client. STALCI retains all rights to its pre-existing tools, libraries, methodologies, and frameworks used during the engagement.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">4. Confidentiality and NDAs</h3>
          <p className="mb-6">
            We understand the critical nature of enterprise data. Both parties agree to hold all proprietary and confidential information shared during discovery and execution in strict confidence. A formal Non-Disclosure Agreement (NDA) will supersede this clause once executed.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">5. Limitation of Liability</h3>
          <p className="mb-6">
            To the maximum extent permitted by applicable law, in no event shall STALCI, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our services or any third-party systems we integrate.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">6. Governing Law</h3>
          <p className="mb-6">
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the contracting STALCI entity is registered, without regard to its conflict of law provisions. Any disputes arising out of or related to these Terms will be subject to the exclusive jurisdiction of the competent courts in that region.
          </p>
        </div>
      </div>
    </div>
  );
}
