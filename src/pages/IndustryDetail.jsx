import { useState } from 'react'
import { useParams, Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import industriesData from '../content/industries.json'
import { getAllCaseStudies } from '../lib/caseStudies'

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b-4 border-black">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer font-sans font-black text-lg uppercase tracking-tight text-ink hover:text-hot-red"
      >
        <span className="pr-4">{question}</span>
        <span className={`font-sans font-black text-2xl transition-transform duration-200 shrink-0 ${open ? 'rotate-45 text-hot-red' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 bg-soft-violet/10 border-t-4 border-black p-4 mt-2">
          <p className="text-ink font-bold text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function IndustryDetail() {
  const { slug } = useParams()
  const industry = industriesData[slug]

  if (!industry) {
    return (
      <section className="bg-canvas min-h-screen flex items-center justify-center border-b-4 border-black">
        <div className="text-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
          <h1 className="font-sans text-4xl font-black text-ink mb-4 uppercase">Industry not found</h1>
          <SpecLine text="ERROR — 404" className="mb-6" />
          <Button href="/industries" variant="outline">
            View All Industries
          </Button>
        </div>
      </section>
    )
  }

  // Filter case studies to show relevant items (e.g. if slug is real-estate, show websites tag)
  const tagMap = {
    'healthcare': 'saas',
    'real-estate': 'websites',
    'restaurants': 'applications',
    'education': 'saas',
    'startups': 'saas'
  }
  const filterTag = tagMap[slug] || 'all'
  const relatedProjects = getAllCaseStudies()
    .filter((p) => filterTag === 'all' || p.tags.includes(filterTag))
    .slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink hover:text-hot-red transition-colors duration-150 mb-8"
          >
            <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            All Industries
          </Link>

          <SpecLine text={industry.specLine} className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-2 uppercase tracking-tight">
            {industry.title}
          </h1>
          <p className="font-mono text-xs font-bold text-hot-red uppercase tracking-[0.15em] mb-6">
            [{industry.subtitle}]
          </p>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed">{industry.description}</p>
        </div>
      </section>

      {/* Solutions We Build */}
      <section className="bg-canvas pb-16 md:pb-24 border-b-4 border-black pt-12">
        <div className="section-container">
          <SpecLine text="WHAT WE BUILD — SOLUTIONS" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.solutions.map((item, i) => (
              <HairlineCard key={item.title} className="p-6 h-full" hover={true}>
                <span className="font-sans font-black text-sm text-hot-red">
                  [SOL-{String(i + 1).padStart(2, '0')}]
                </span>
                <h3 className="font-sans text-xl font-black text-ink uppercase mt-2 mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-ink font-bold text-sm leading-relaxed">{item.description}</p>
              </HairlineCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <SpecLine text="METHODOLOGY — IMPLEMENTATION STEPS" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.process.map((step, i) => (
              <div key={i} className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl font-black text-hot-red">0{i + 1}</span>
                  <div className="h-0.5 bg-black/20 flex-grow" />
                </div>
                <h4 className="font-sans font-black text-lg uppercase tracking-tight mb-2">{step.title}</h4>
                <p className="text-xs font-bold text-ink/75 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
          <div className="section-container">
            <SpecLine text="RELEVANT CASE STUDIES" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((project, i) => (
                <Link to={`/work/${project.slug}`} key={project.slug}>
                  <HairlineCard className="p-6 hover:shadow-[14px_14px_0px_0px_#000]">
                    <div className="flex justify-between items-start">
                      <h3 className="font-sans text-2xl font-black text-ink uppercase tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <Badge bg="bg-vivid-yellow">
                        {String(i + 1).padStart(2, '0')}
                      </Badge>
                    </div>
                    <SpecLine text={`${project.client} — ${project.year}`} />
                  </HairlineCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-3xl">
          <SpecLine text="FREQUENTLY ASKED QUESTIONS" className="mb-8" />
          <div className="space-y-4">
            {industry.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canvas py-16 md:py-24 relative overflow-hidden border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10 text-center border-4 border-black bg-white p-12 shadow-[8px_8px_0px_0px_#000] max-w-3xl mx-auto rounded-none">
          <SpecLine text="LAUNCH YOUR SOLUTION" className="mb-4 justify-center" />
          <h2 className="font-sans text-3xl md:text-5xl font-black text-ink mb-6 uppercase tracking-tight">
            Build your {industry.ctaSubject}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary">Get in Touch</Button>
            <Button href="/work" variant="outline">See Our Work</Button>
          </div>
        </div>
      </section>
    </>
  )
}
