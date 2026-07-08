import { useParams, Link } from 'react-router'
import { getCaseStudyBySlug, getNextProject } from '../lib/caseStudies'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import TechBadgeList from '../components/work/TechBadgeList'
import Button from '../components/ui/Button'
import HairlineCard from '../components/ui/HairlineCard'
import Badge from '../components/ui/Badge'
import { ArrowLeftRight, Clock, Award, ShieldAlert, CheckCircle } from 'lucide-react'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getCaseStudyBySlug(slug)
  const nextProject = getNextProject(slug)

  if (!project) {
    return (
      <section className="bg-canvas min-h-screen flex items-center justify-center border-b-4 border-black">
        <div className="text-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
          <h1 className="font-sans text-4xl font-black text-ink mb-4 uppercase">Project not found</h1>
          <SpecLine text="ERROR — 404" className="mb-6" />
          <Button href="/work" variant="outline">
            Back to Work
          </Button>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />

        {/* Grid breach */}
        <div
          className="absolute right-0 top-10 font-sans font-black text-[20rem] leading-none text-black/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {project.year}
        </div>

        <div className="section-container relative z-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink hover:text-hot-red transition-colors duration-150 mb-8"
          >
            <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Work
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} bg="bg-hot-red" className="text-[10px] px-2 py-0.5 border">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 leading-[0.95] uppercase tracking-tight">
            {project.title}
          </h1>
          <SpecLine text={`${project.client} — ${project.year}`} className="mb-8" />

          {/* Meta row */}
          <div className="flex flex-wrap gap-8 border-t-4 border-black pt-6">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60 mb-1">Client</p>
              <p className="text-ink text-sm font-bold uppercase">{project.client}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60 mb-1">Year</p>
              <p className="text-ink text-sm font-bold">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-ink/60 mb-1">Stack</p>
              <TechBadgeList stack={project.stack} />
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      {project.beforeAfter && (
        <section className="bg-canvas py-16 border-b-4 border-black relative">
          <div className="section-container">
            <SpecLine text="SYSTEM UPGRADE — BEFORE & AFTER" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="border-4 border-black bg-hot-red/10 p-8 shadow-[6px_6px_0px_0px_#000] relative">
                <div className="absolute top-4 right-4 text-hot-red">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="font-sans font-black text-xl uppercase mb-4 flex items-center gap-2">
                  <span>BEFORE CALIBER</span>
                </h3>
                <p className="text-sm font-bold text-ink leading-relaxed">{project.beforeAfter.before}</p>
              </div>

              {/* After */}
              <div className="border-4 border-black bg-accent-mint/10 p-8 shadow-[6px_6px_0px_0px_#000] relative">
                <div className="absolute top-4 right-4 text-accent-mint">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-sans font-black text-xl uppercase mb-4 flex items-center gap-2">
                  <span>AFTER CALIBER</span>
                </h3>
                <p className="text-sm font-bold text-ink leading-relaxed">{project.beforeAfter.after}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mockup Screens (Desktop, Mobile, Dashboard) */}
      {project.mockups && (
        <section className="bg-canvas py-16 border-b-4 border-black bg-grid-faint/30">
          <div className="section-container">
            <SpecLine text="SYSTEM PREVIEWS — SCREEN INTERFACES" className="mb-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Desktop Mockup Frame */}
              <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] flex flex-col h-80">
                {/* Browser bar */}
                <div className="border-b-4 border-black bg-canvas p-3 flex items-center gap-1.5 shrink-0 select-none">
                  <div className="w-2.5 h-2.5 bg-hot-red rounded-full border border-black" />
                  <div className="w-2.5 h-2.5 bg-vivid-yellow rounded-full border border-black" />
                  <div className="w-2.5 h-2.5 bg-accent-mint rounded-full border border-black" />
                  <span className="font-mono text-[9px] font-bold text-ink/40 ml-4">caliber.studio/preview</span>
                </div>
                <div className="flex-grow bg-canvas-dark p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-faint opacity-10" />
                  <span className="font-mono text-[9px] text-accent-cobalt font-black uppercase">DESKTOP MOCKUP</span>
                  <div className="space-y-2 mt-4 z-10">
                    <div className="h-6 w-32 bg-white/20 border border-white/10" />
                    <div className="h-4 w-48 bg-white/10 border border-white/5" />
                    <div className="h-4 w-40 bg-white/10 border border-white/5" />
                  </div>
                  <h4 className="font-sans font-black text-xl uppercase mt-auto tracking-tight z-10">{project.mockups.desktop}</h4>
                </div>
              </div>

              {/* Mobile Mockup Frame */}
              <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] flex flex-col h-80 max-w-sm mx-auto w-full">
                {/* Phone ear-piece notch */}
                <div className="border-b-4 border-black bg-canvas p-3 flex justify-center shrink-0">
                  <div className="w-16 h-2 bg-black rounded-full" />
                </div>
                <div className="flex-grow bg-canvas-dark p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-faint opacity-10" />
                  <span className="font-mono text-[9px] text-hot-red font-black uppercase">MOBILE CLIENT</span>
                  <div className="w-10 h-10 bg-hot-red rounded-full border border-black mx-auto mt-4 animate-pulse shrink-0" />
                  <h4 className="font-sans font-black text-lg uppercase text-center mt-auto tracking-tight z-10">{project.mockups.mobile}</h4>
                </div>
              </div>

              {/* Dashboard Admin Frame */}
              <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] flex flex-col h-80">
                {/* Control Panel Header */}
                <div className="border-b-4 border-black bg-canvas p-3 flex justify-between items-center shrink-0 select-none">
                  <span className="font-sans font-black text-[9px] uppercase tracking-wider">ADMIN CONTROL</span>
                  <div className="w-2.5 h-2.5 bg-accent-mint rounded-full" />
                </div>
                <div className="flex-grow bg-canvas-dark p-6 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-faint opacity-10" />
                  <span className="font-mono text-[9px] text-vivid-yellow font-black uppercase">DASHBOARD MODULE</span>
                  
                  {/* Grid items representing stats chart */}
                  <div className="grid grid-cols-3 gap-2 mt-4 z-10">
                    <div className="h-10 bg-vivid-yellow/20 border border-vivid-yellow/30 p-1">
                      <div className="h-1.5 w-6 bg-vivid-yellow/50" />
                      <div className="h-3 w-8 bg-vivid-yellow mt-1" />
                    </div>
                    <div className="h-10 bg-soft-violet/20 border border-soft-violet/30 p-1">
                      <div className="h-1.5 w-6 bg-soft-violet/50" />
                      <div className="h-3 w-8 bg-soft-violet mt-1" />
                    </div>
                    <div className="h-10 bg-accent-mint/20 border border-accent-mint/30 p-1">
                      <div className="h-1.5 w-6 bg-accent-mint/50" />
                      <div className="h-3 w-8 bg-accent-mint mt-1" />
                    </div>
                  </div>
                  <h4 className="font-sans font-black text-xl uppercase mt-auto tracking-tight z-10">{project.mockups.dashboard}</h4>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Case study sections */}
      {project.sections.map((section, i) => (
        <section
          key={section.type}
          className="bg-canvas py-16 md:py-24 border-b-4 border-black"
        >
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <SpecLine text={`${String(i + 1).padStart(2, '0')} — ${section.type.toUpperCase()}`} className="mb-2" />
                <h2 className="font-sans text-3xl font-black text-ink uppercase tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-ink font-bold text-lg leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Project Custom Timeline */}
      {project.timeline && (
        <section className="bg-canvas py-16 border-b-4 border-black">
          <div className="section-container">
            <SpecLine text="METHODOLOGY — IMPLEMENTATION TIMELINE" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.timeline.map((step, idx) => (
                <div key={idx} className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_#000]">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-hot-red shrink-0" size={20} />
                    <span className="font-mono text-sm font-black uppercase text-black">{step.phase}</span>
                    <div className="h-0.5 bg-black/20 flex-grow" />
                  </div>
                  <h4 className="font-sans font-black text-lg uppercase tracking-tight mb-2">{step.label}</h4>
                  <p className="text-xs font-bold text-ink/75 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KPIs & Extended Results */}
      {(project.kpis || project.extendedResults) && (
        <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
          <div className="section-container">
            <SpecLine text="RESULTS — KEY PERFORMANCE INDICATORS" className="mb-8" />
            
            {/* Primary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {project.kpis.map((kpi) => (
                <HairlineCard key={kpi.label} className="p-8 text-center bg-white border-4 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200" hover={true}>
                  <p className="font-sans font-black text-4xl md:text-5xl text-hot-red mb-2">
                    {kpi.value}
                  </p>
                  <p className="font-sans font-black text-xs uppercase tracking-widest text-ink mb-1">
                    {kpi.label}
                  </p>
                  <p className="font-mono text-[10px] font-bold text-ink/60">{kpi.detail}</p>
                </HairlineCard>
              ))}
            </div>

            {/* Extended statistics */}
            {project.extendedResults && (
              <div className="bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000] grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.extendedResults.map((item, idx) => (
                  <div key={idx} className="text-center md:border-r border-white/20 last:border-0 py-4">
                    <p className="font-sans font-black text-3xl text-vivid-yellow mb-1">{item.value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-fog/80 font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <SpecLine text="PROJECT GALLERY" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.gallery.map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] relative overflow-hidden flex items-center justify-center rounded-none"
              >
                <div className="absolute inset-0 bg-grid-faint opacity-30" />
                <span className="font-sans font-black text-6xl text-ink/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
          <div className="section-container text-center">
            <SpecLine text="NEXT PROJECT" className="mb-4 justify-center" />
            <h3 className="font-sans text-3xl md:text-5xl font-black text-ink mb-6 uppercase tracking-tight">
              {nextProject.title}
            </h3>
            <Button href={`/work/${nextProject.slug}`} variant="outline">
              View Project
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
