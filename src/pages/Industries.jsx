import { Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import RefCodeTag from '../components/ui/RefCodeTag'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CtaBand from '../components/home/CtaBand'
import industriesData from '../content/industries.json'

const industryKeys = [
  { key: 'healthcare', code: '01', color: 'bg-soft-violet' },
  { key: 'real-estate', code: '02', color: 'bg-vivid-yellow' },
  { key: 'restaurants', code: '03', color: 'bg-hot-red' },
  { key: 'education', code: '04', color: 'bg-white' },
  { key: 'startups', code: '05', color: 'bg-accent-mint/35' }
]

export default function Industries() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="INDUSTRIES — SECTOR SPECIALIZATIONS" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Industry solutions
          </h1>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed">
            Tailor-made software architectures engineered for specific business domains. We combine deep process design with advanced cloud and database technology.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryKeys.map((item) => {
              const industry = industriesData[item.key]
              return (
                <HairlineCard
                  key={item.key}
                  className="p-8 flex flex-col hover:shadow-[14px_14px_0px_0px_#000] h-full"
                >
                  <RefCodeTag code={`IND-${item.code}`} />

                  <SpecLine text={`SECTOR — ${item.code}`} className="mb-2" />
                  <h2 className="font-sans text-2xl font-black text-ink mb-2 uppercase tracking-tight">
                    {industry.title}
                  </h2>
                  <p className="font-mono text-[10px] text-hot-red font-bold uppercase tracking-wider mb-4">
                    {industry.subtitle}
                  </p>
                  <p className="text-ink font-bold text-sm leading-relaxed mb-6 flex-grow">
                    {industry.description}
                  </p>

                  <div className="border-t-4 border-black pt-4 mb-6">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ink/60 mb-2 font-bold">Key Solutions:</p>
                    <ul className="space-y-2">
                      {industry.solutions.map((s) => (
                        <li key={s.title} className="text-xs font-bold text-ink flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-black" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/industries/${industry.slug}`} className="block">
                    <Button variant="outline" className="w-full py-3 border-2 shadow-[2px_2px_0px_0px_#000] bg-white">
                      Explore Solutions
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
