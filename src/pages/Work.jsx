import { useState } from 'react'
import { getAllCaseStudies, filterByTag } from '../lib/caseStudies'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import ProjectFilterBar from '../components/work/ProjectFilterBar'
import ProjectCard from '../components/work/ProjectCard'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')
  const projects = activeFilter === 'all' ? getAllCaseStudies() : filterByTag(activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-8 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="PORTFOLIO — ALL PROJECTS" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Our work
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            A curated selection of projects across web, mobile, and SaaS — each built with
            the same standard of precision.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container">
          <ProjectFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-4 border-black bg-white p-8 shadow-[4px_4px_0px_0px_#000]">
              <p className="font-sans font-black text-sm text-ink uppercase tracking-widest">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
