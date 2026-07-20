import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import Button from '../components/ui/Button'

export default function Legal({ type }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service'
  const specText = isPrivacy ? 'LEGAL — DATA PROTECTION DRAFT' : 'LEGAL — TERMS OF SERVICE DRAFT'

  return (
    <>
      <section className="bg-canvas pt-20 md:pt-32 pb-12 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text={specText} className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-ink font-bold text-xs font-mono text-fog/90">
            Last Updated: July 2026 — WebPixel Studio
          </p>
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-3xl">
          {/* Legal Advisory Disclaimer */}
          <div className="border-4 border-black bg-vivid-yellow p-4 mb-8 shadow-[4px_4px_0px_0px_#000]">
            <p className="font-mono text-xs font-black uppercase text-ink">
              ⚠️ DRAFT DOCUMENTATION — Subject to legal review before formal contract execution. Contact hetpatel140505@gmail.com for specific policy questions.
            </p>
          </div>

          <div className="space-y-8 font-sans text-sm md:text-base font-bold text-ink leading-relaxed">
            {isPrivacy ? (
              <>
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">1. Information We Collect</h3>
                <p>
                  WebPixel collects information provided directly by you through our contact forms, project cost estimator, and strategy call booking tools. This includes your name, email address, company name, budget estimates, and project scope details.
                </p>
                <p>
                  We also collect standard technical analytics, including page views, referrer URLs, device types, and general location data via IP address, alongside functional cookies necessary for website performance.
                </p>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">2. How Information Is Used</h3>
                <p>
                  We use your information strictly to respond to project inquiries, provide accurate engineering estimates, coordinate consultation calls, and improve website usability. We do not sell, rent, or trade your personal data to third-party marketing entities.
                </p>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">3. Third-Party Integration & Service Providers</h3>
                <p>
                  We utilize third-party tools to facilitate communications and scheduling:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><span className="font-black">Cal.com:</span> Used for direct consultation scheduling and calendar event management.</li>
                  <li><span className="font-black">Supabase / Database Providers:</span> Used for secure lead storage and backend API processing.</li>
                  <li><span className="font-black">Vercel & Analytics:</span> Used for cloud hosting, CDN distribution, and performance monitoring.</li>
                </ul>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">4. Data Retention & Inquiries</h3>
                <p>
                  We retain inquiry and scoping data for as long as necessary to maintain client communications. To request data deletion or update your information, contact us at <a href="mailto:hetpatel140505@gmail.com" className="underline font-mono text-hot-red">hetpatel140505@gmail.com</a>.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">1. Scope of Site Use</h3>
                <p>
                  By accessing the WebPixel website, project cost estimator, or client workspace portals, you agree to these Terms of Service. These terms govern your use of our digital platforms and interactive scoping calculators.
                </p>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">2. Intellectual Property Rights</h3>
                <p>
                  All content, branding, UI designs, graphics, and code templates contained on this website are the intellectual property of WebPixel Studio.
                </p>
                <p>
                  Deliverable ownership terms for paid client projects are governed separately by individual Statements of Work (SOW) and engineering contracts, under which 100% of custom code ownership transfers to the client upon final payment.
                </p>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">3. Limitation of Liability</h3>
                <p>
                  This website and its automated estimation tools are provided on an "as-is" basis for informational and preliminary scoping purposes. WebPixel is not liable for indirect damages or misinterpretations resulting from automated ballpark estimations.
                </p>

                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">4. Governing Law</h3>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India, with primary jurisdiction in Ahmedabad, Gujarat, India.
                </p>
              </>
            )}
          </div>

          <div className="pt-12 mt-12 border-t-4 border-black">
            <Button href="/" variant="outline" className="border-2 shadow-[2px_2px_0px_0px_#000] px-6 text-xs">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
