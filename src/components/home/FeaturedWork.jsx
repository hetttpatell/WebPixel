/**
 * FeaturedWork — 2-3 featured case study cards from content layer
 */
import { Link } from 'react-router'
import { getFeaturedCaseStudies } from '../../lib/caseStudies'
import SpecLine from '../ui/SpecLine'
import HairlineCard from '../ui/HairlineCard'
import RefCodeTag from '../ui/RefCodeTag'

export default function FeaturedWork() {
  const projects = getFeaturedCaseStudies(3)

  return (
    <section className="bg-canvas-dark py-24 md:py-32 relative">
      {/* Grid breach element */}
      <div
        className="absolute left-0 top-20 font-mono text-[16rem] md:text-[24rem] font-bold leading-none text-fog/[0.02] select-none pointer-events-none"
        aria-hidden="true"
      >
        W
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <SpecLine text="SELECTED WORK — 2023–2024" className="mb-3" />
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-ink-dark">
              Featured projects
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-cobalt hover:text-accent-cobalt/80 transition-colors duration-150 shrink-0"
          >
            View all work
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <Link to={`/work/${project.slug}`} key={project.slug} className="block">
              <HairlineCard className="overflow-hidden h-full">
                <RefCodeTag code={`${String(i + 1).padStart(2, '0')}A`} />

                {/* Image area */}
                <div className="aspect-[16/10] bg-canvas-dark/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cobalt/10 to-accent-copper/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-6xl font-bold text-fog/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-cobalt bg-accent-cobalt/10 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="font-mono text-[10px] text-fog">{project.year}</span>
                  </div>
                  <h3 className="font-sans text-lg font-semibold text-ink-dark mb-2">
                    {project.title}
                  </h3>
                  <SpecLine text={`${project.client} — ${project.year}`} />
                </div>
              </HairlineCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
