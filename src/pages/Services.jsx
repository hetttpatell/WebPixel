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
  { key: 'fullstack-web-engineering', code: '01', href: '/services/websites' },
  { key: 'custom-saas-development', code: '02', href: '/services/saas-development', featured: true },
  { key: 'uiux-product-design', code: '03', href: '/services/applications' },
  { key: 'performance-cloud-systems', code: '04', href: '/services/custom-software' }
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="SERVICES — FOUR CORE DISCIPLINES" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Our capabilities
          </h1>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed">
            Four specialized engineering disciplines, one technical standard. Designed to scale your software architecture with speed and precision.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceKeys.map((item) => {
              const service = servicesData[item.key]
              if (!service) return null

              return (
                <HairlineCard
                  key={item.code}
                  className={`p-8 flex flex-col justify-between hover:shadow-[14px_14px_0px_0px_#000] ${
                    item.featured ? 'bg-vivid-yellow/10 border-4' : 'bg-white'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <RefCodeTag code={`SPEC ${item.code}`} />
                      {item.featured && (
                        <Badge bg="bg-hot-red text-white" rotate="-rotate-2" className="text-[10px]">
                          PROOF-OF-WORK HIGHLIGHT
                        </Badge>
                      )}
                    </div>

                    <SpecLine text={`DISCIPLINE ${item.code}`} className="mb-2" />
                    <h2 className="font-sans text-3xl font-black text-ink mb-3 uppercase tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-ink font-bold text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Proof of work callout if available */}
                    {service.proofOfWork && (
                      <div className="mb-6 border-2 border-black bg-vivid-yellow p-4 shadow-[3px_3px_0px_0px_#000]">
                        <p className="font-mono text-[10px] font-black uppercase tracking-wider text-black mb-2">
                          IN-HOUSE PROOF OF WORK
                        </p>
                        <div className="space-y-1 text-xs font-bold text-black">
                          {service.proofOfWork.map((pow) => (
                            <p key={pow.name}>
                              <span className="underline">{pow.name}</span> — {pow.desc}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {service.includes.map((f) => (
                        <li key={f.title} className="flex items-start gap-2">
                          <span className="font-sans font-black text-xs text-hot-red mt-0.5">✓</span>
                          <div>
                            <span className="text-ink font-black text-xs uppercase">{f.title}: </span>
                            <span className="text-ink/80 font-bold text-xs">{f.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Footer */}
                  <div className="border-t-4 border-black pt-4 mt-auto flex justify-between items-center">
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60">Sprint Length</p>
                      <p className="text-ink text-sm font-black">{service.timeline.title}</p>
                    </div>
                    <Link to="/book-call">
                      <Button variant={item.featured ? 'primary' : 'outline'} className="py-2.5 px-4 text-xs border-2 shadow-[2px_2px_0px_0px_#000]">
                        Book Scope Call
                      </Button>
                    </Link>
                  </div>
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
