import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CtaBand from '../components/home/CtaBand'

const processPhases = [
  {
    phase: '01',
    title: 'Discovery & Audit',
    deliverable: 'Operational Friction Report',
    desc: 'We shadow your operations, interview stakeholders, and audit your existing codebases. We identify database bottlenecks, manual pipelines, and conversion drop-offs.'
  },
  {
    phase: '02',
    title: 'Planning & Architecture',
    deliverable: 'Technical PRD & Schema Plan',
    desc: 'Before writing any UI code, we map database schemas, design API integrations (Stripe, Plaid, CRMs), and write a Product Requirements Document (PRD).'
  },
  {
    phase: '03',
    title: 'UX/UI Design System',
    deliverable: 'Figma System & Interactive Prototype',
    desc: 'We design high-fidelity layouts based on a rigorous component system. No stock layouts — everything is customized to fit your brand identity.'
  },
  {
    phase: '04',
    title: 'Full-Stack Development',
    deliverable: 'Clean Code in GitHub',
    desc: 'Our engineers build using Next.js/Vite, Node.js/Django, and PostgreSQL. We deliver working software every fortnight and manage code transfers at each milestone.'
  },
  {
    phase: '05',
    title: 'Testing & Security QA',
    deliverable: 'QA Sign-off & Audit Log',
    desc: 'We run unit testing, end-to-end integration audits, load tests for concurrent database requests, and check roles permissions for HIPAA or security compliance.'
  },
  {
    phase: '06',
    title: 'Launch & CDN Deployment',
    deliverable: 'Live Production System',
    desc: 'We configure DNS, set up secure serverless environments on AWS/Vercel, and optimize image/asset streaming for global loading speeds.'
  },
  {
    phase: '07',
    title: 'Support & Optimization',
    deliverable: 'SLA Retainer Support',
    desc: 'Post-launch, we monitor Lighthouse speed metrics, patch security updates, and establish ongoing SLA retainers for continuous feature iterations.'
  }
]

export default function Process() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="METHODOLOGY — SYSTEMATIC DELIVERY" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            How We Build
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            A precise, seven-phase engineering process designed to eliminate project delays, guarantee security compliance, and ensure technical scalability.
          </p>
        </div>
      </section>

      {/* Phases timeline */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container max-w-4xl">
          <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-black">
            
            {processPhases.map((p, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={p.phase} className="relative flex flex-col md:flex-row items-stretch gap-8">
                  {/* Phase badge center tracker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[14px] md:-translate-x-[20px] top-4 w-8 md:w-10 h-8 md:h-10 bg-vivid-yellow border-4 border-black rounded-none flex items-center justify-center font-sans font-black text-xs md:text-sm z-10">
                    {p.phase}
                  </div>

                  {/* Left Spacer / Card Column */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:order-2'}`}>
                    <HairlineCard className="p-6 md:p-8 bg-white hover:shadow-[10px_10px_0px_0px_#000] w-full max-w-md" hover={true}>
                      <SpecLine text={`PHASE ${p.phase} — METHODOLOGY`} className="mb-2" />
                      <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-2">{p.title}</h3>
                      <div className="inline-flex mb-4">
                        <Badge bg="bg-soft-violet" className="text-[9px] border px-2 py-0.5">
                          Deliverable: {p.deliverable}
                        </Badge>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-ink/75 leading-relaxed">{p.desc}</p>
                    </HairlineCard>
                  </div>

                  {/* Right Spacer Column */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}

          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
