import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import Button from '../components/ui/Button'

export default function Legal({ type }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service'
  const specText = isPrivacy ? 'LEGAL — DATA PROTECTION' : 'LEGAL — CONTRACT AGREEMENT'
  
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
            Last Updated: July 7, 2026
          </p>
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-3xl">
          <div className="space-y-8 font-sans text-sm md:text-base font-bold text-ink leading-relaxed">
            {isPrivacy ? (
              <>
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">1. Data We Collect</h3>
                <p>
                  We collect information you provide directly to us when submitting a contact lead, using the project cost estimator, or booking a strategy consultation. This includes your name, email, phone number, company name, and project description inputs.
                </p>
                
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">2. How We Use Data</h3>
                <p>
                  We utilize your contact information strictly to coordinate project consultations and estimate scopes. Leads are stored within our secure Supabase database and are never shared, rented, or sold to third-party marketing entities.
                </p>
                
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">3. Storage & Compliance</h3>
                <p>
                  If you are a client in healthcare or financial sectors, our backend databases comply with HIPAA and bank-grade SSL data encryption standards to ensure client information remains fully isolated.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">1. Scope of Engagement</h3>
                <p>
                  Caliber Studio operates on fixed-price software deliverables or SLA monthly retainer agreements. The exact sprint schedule, technical specifications, and milestones are governed by individual Statements of Work (SOW).
                </p>
                
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">2. Intellectual Property</h3>
                <p>
                  Upon final payment of all milestones outlined in the SOW, 100% ownership of the repository code, database designs, graphics, and server architecture transfers to the Client.
                </p>
                
                <h3 className="font-sans font-black text-xl uppercase mt-6 border-b-2 border-black pb-2">3. Code Warranties</h3>
                <p>
                  We supply a 30-day post-launch warranty period on all custom builds, during which any system bugs, security patches, or hosting crashes are resolved at zero cost.
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
