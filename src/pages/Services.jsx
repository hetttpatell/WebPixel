import { Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import RefCodeTag from '../components/ui/RefCodeTag'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CtaBand from '../components/home/CtaBand'
import servicesData from '../content/services.json'

const serviceKeys = [
  { key: 'websites', code: '01', href: '/services/websites' },
  { key: 'mobile-app-development', code: '02', href: '/services/mobile-app-development', featured: true },
  { key: 'saas-development', code: '03', href: '/services/saas-development' },
  { key: 'ai-automation', code: '04', href: '/services/ai-automation' },
  { key: 'api-development', code: '05', href: '/services/api-development' },
  { key: 'custom-software', code: '06', href: '/services/custom-software' }
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="SERVICES — SIX DISCIPLINES" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Our capabilities
          </h1>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed">
            Six specialized disciplines, one unwavering standard. Every engagement
            follows the same rigorous process from kickoff to post-launch optimization.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((item) => {
              const service = servicesData[item.key]
              return (
                <HairlineCard
                  key={item.code}
                  className={`p-8 flex flex-col hover:shadow-[14px_14px_0px_0px_#000] ${
                    item.featured ? 'bg-soft-violet/10 border-4' : ''
                  }`}
                >
                  <RefCodeTag code={`${item.code}A`} />

                  {item.featured && (
                    <Badge bg="bg-hot-red" rotate="-rotate-2" className="w-fit mb-6">
                      Most Popular
                    </Badge>
                  )}

                  <SpecLine text={`SERVICE — ${item.code}`} className="mb-2" />
                  <h2 className="font-sans text-2xl font-black text-ink mb-3 uppercase tracking-tight">{service.title}</h2>
                  <p className="text-ink font-bold text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.includes.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex items-start gap-2">
                        <span className="font-sans font-black text-xs text-hot-red mt-0.5">✓</span>
                        <span className="text-ink font-bold text-sm">{f.title}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meta */}
                  <div className="flex justify-between items-center border-t-4 border-black pt-4 mb-6">
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60">Timeline</p>
                      <p className="text-ink text-sm font-black">{service.timeline.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60">Starting</p>
                      <p className="text-ink text-sm font-black">{service.pricing.title}</p>
                    </div>
                  </div>

                  <Link to={item.href} className="block">
                    <Button variant={item.featured ? 'primary' : 'outline'} className="w-full py-3.5 border-2 shadow-[2px_2px_0px_0px_#000]">
                      Learn More
                    </Button>
                  </Link>
                </HairlineCard>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
