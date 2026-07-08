/**
 * ServicesOverview — Three HairlineCards with service summaries
 */
import { Link } from 'react-router'
import SpecLine from '../ui/SpecLine'
import HairlineCard from '../ui/HairlineCard'
import RefCodeTag from '../ui/RefCodeTag'

const services = [
  {
    code: '01A',
    title: 'Web Design & Development',
    description:
      'Bespoke websites engineered for performance, accessibility, and conversion. From marketing sites to complex web applications.',
    href: '/services/websites',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="26" height="18" rx="2" />
        <line x1="3" y1="11" x2="29" y2="11" />
        <circle cx="7" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="10.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <line x1="10" y1="28" x2="22" y2="28" />
        <line x1="16" y1="24" x2="16" y2="28" />
      </svg>
    ),
  },
  {
    code: '02A',
    title: 'App Development',
    description:
      'Native and cross-platform mobile applications. Real-time data, offline-first architecture, and silky 60fps interactions.',
    href: '/services/applications',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="9" y="3" width="14" height="26" rx="3" />
        <line x1="9" y1="8" x2="23" y2="8" />
        <line x1="9" y1="24" x2="23" y2="24" />
        <circle cx="16" cy="26.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    code: '03A',
    title: 'Custom Software & SaaS',
    description:
      'End-to-end SaaS platforms, internal tools, and enterprise systems. Multi-tenant, scalable, and built to compound.',
    href: '/services/custom-software',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="2" />
        <line x1="4" y1="12" x2="28" y2="12" />
        <line x1="12" y1="12" x2="12" y2="28" />
        <rect x="15" y="15" width="10" height="5" rx="1" />
        <rect x="15" y="23" width="6" height="3" rx="1" />
      </svg>
    ),
  },
]

export default function ServicesOverview() {
  return (
    <section className="bg-canvas-dark py-24 md:py-32">
      <div className="section-container">
        <SpecLine text="SERVICES — CORE OFFERINGS" className="mb-3" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-ink-dark mb-4">
          What we do best
        </h2>
        <p className="text-fog max-w-xl mb-12 leading-relaxed">
          Three disciplines, one standard. Every project is engineered with the same
          precision regardless of scope.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link to={service.href} key={service.code} className="block">
              <HairlineCard className="p-8 h-full">
                <RefCodeTag code={service.code} />
                <div className="text-accent-cobalt mb-6">{service.icon}</div>
                <h3 className="font-sans text-xl font-semibold text-ink-dark mb-3">
                  {service.title}
                </h3>
                <SpecLine text={service.code} className="mb-3" />
                <p className="text-fog text-sm leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-cobalt mt-6 cursor-pointer">
                  Learn more
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </HairlineCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
