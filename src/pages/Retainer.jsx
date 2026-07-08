import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const tiers = [
  {
    code: 'R1',
    title: 'Maintenance',
    hours: '10 hrs/mo',
    price: '$2,500/mo',
    features: [
      'Bug fixes & updates',
      'Performance monitoring',
      'Security patches',
      'Content updates',
      'Email support (24h response)',
    ],
  },
  {
    code: 'R2',
    title: 'Growth',
    hours: '25 hrs/mo',
    price: '$5,500/mo',
    featured: true,
    features: [
      'Everything in Maintenance',
      'Feature development',
      'A/B testing',
      'Analytics & reporting',
      'Priority Slack support',
      'Weekly standup call',
    ],
  },
  {
    code: 'R3',
    title: 'Embedded',
    hours: '50 hrs/mo',
    price: '$10,000/mo',
    features: [
      'Everything in Growth',
      'Dedicated senior engineer',
      'Strategic product consulting',
      'Design iterations',
      'Same-day response SLA',
      'Daily async updates',
    ],
  },
]

export default function Retainer() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="RETAINER — ONGOING PARTNERSHIP" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Continuous <span className="bg-vivid-yellow text-ink px-4 inline-block -rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_#000]">improvement</span>
          </h1>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed mt-8">
            Your product doesn't stop evolving after launch. Our retainer packages give
            you predictable access to senior design and engineering talent — no hiring,
            no overhead, no surprises.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <HairlineCard
                key={tier.code}
                className={`p-8 flex flex-col hover:shadow-[14px_14px_0px_0px_#000] ${
                  tier.featured ? 'bg-soft-violet/10 border-4' : ''
                }`}
              >
                {tier.featured && (
                  <Badge bg="bg-hot-red" rotate="-rotate-2" className="w-fit mb-6">
                    Most Popular
                  </Badge>
                )}

                <SpecLine text={`TIER — ${tier.code}`} className="mb-2" />
                <h2 className="font-sans text-3xl font-black text-ink mb-1 uppercase tracking-tight">{tier.title}</h2>
                <p className="font-mono text-xs font-bold text-ink/60 mb-4">{tier.hours}</p>

                <p className="font-sans text-4xl font-black text-ink mb-6">{tier.price}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="font-sans font-black text-xs text-hot-red mt-0.5">✓</span>
                      <span className="text-ink font-bold text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={tier.featured ? 'primary' : 'outline'}
                  className="w-full py-3.5 border-2 shadow-[2px_2px_0px_0px_#000]"
                >
                  Get Started
                </Button>
              </HairlineCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-3xl">
          <SpecLine text="RETAINER FAQ" className="mb-8" />
          {[
            {
              q: 'Can I change my plan?',
              a: 'Yes. You can upgrade, downgrade, or pause at any time with 30 days notice. No lock-in contracts.',
            },
            {
              q: 'Do unused hours roll over?',
              a: 'Up to 25% of unused hours roll over to the next month. This gives you flexibility for lighter and heavier months.',
            },
            {
              q: 'What if I need more hours?',
              a: 'Additional hours are billed at the retainer rate (no premium). We\'ll always flag if a project is trending over.',
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b-4 border-black py-6">
              <h3 className="text-ink font-black text-lg uppercase tracking-tight mb-2">{faq.q}</h3>
              <p className="text-ink font-bold text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
