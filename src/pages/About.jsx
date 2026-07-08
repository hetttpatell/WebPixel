import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import CtaBand from '../components/home/CtaBand'

const values = [
  {
    title: 'Precision Over Speed',
    description: 'We don\'t rush to ship. Every decision — from architecture to animation timing — is deliberate and measured.',
  },
  {
    title: 'Ownership Mentality',
    description: 'We treat your product like our own. That means saying no to shortcuts and yes to doing things right.',
  },
  {
    title: 'Transparent Process',
    description: 'You see working software every two weeks. No black boxes, no surprises, no "it\'ll be ready soon."',
  },
  {
    title: 'Performance is Non-Negotiable',
    description: 'Sub-2s load times, 60fps animations, and accessible by default. These aren\'t stretch goals — they\'re baseline.',
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'AWS', 'Vercel',
  'Docker', 'Redis', 'GraphQL', 'Stripe', 'Figma', 'GSAP',
  'React Native', 'Swift', 'Kotlin', 'D3.js',
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />

        {/* Grid breach */}
        <div
          className="absolute left-0 top-20 font-sans font-black text-[18rem] md:text-[28rem] leading-none text-black/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          CB
        </div>

        <div className="section-container relative z-10">
          <SpecLine text="ABOUT — THE STUDIO" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-6 leading-[0.95] uppercase">
            We're a small team that
            <br />
            builds <span className="bg-hot-red text-canvas px-4 inline-block -rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_#000]">big things.</span>
          </h1>
          <p className="text-ink font-bold text-xl max-w-2xl leading-relaxed mt-8">
            Caliber is a full-stack design and engineering studio. We partner with ambitious
            companies to build digital products that perform — websites, apps, and SaaS
            platforms crafted with technical precision and design intention.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-canvas pb-16 md:pb-24 border-b-4 border-black">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <SpecLine text="OUR STORY" className="mb-3" />
              <h2 className="font-sans text-3xl font-black text-ink mb-6 uppercase tracking-tight">
                Founded on a simple premise
              </h2>
              <div className="space-y-4 text-ink font-bold leading-relaxed">
                <p>
                  Most agencies optimize for volume. More clients, more projects, more
                  revenue. We optimize for quality. Fewer clients, deeper partnerships,
                  better outcomes.
                </p>
                <p>
                  We started Caliber in 2023 because we were tired of seeing talented
                  designers and engineers spread too thin across too many projects. The
                  result? Mediocre work that nobody was proud of.
                </p>
                <p>
                  Our model is different. We take on 3–4 projects at a time, max. Every
                  project gets our full attention — senior-level design and engineering
                  from day one to launch day.
                </p>
              </div>
            </div>
            <div>
              <SpecLine text="HOW WE WORK" className="mb-3" />
              <h2 className="font-sans text-3xl font-black text-ink mb-6 uppercase tracking-tight">
                Process over inspiration
              </h2>
              <div className="space-y-4 text-ink font-bold leading-relaxed">
                <p>
                  We don't believe in "creative genius" — we believe in rigorous process.
                  Every project follows the same four phases: Discover, Design, Build, Ship.
                </p>
                <p>
                  Discovery means we actually understand your business before opening
                  Figma. Design means testing ideas with real users, not just making things
                  pretty. Build means clean, tested, maintainable code. Ship means monitoring,
                  iterating, and proving results.
                </p>
                <p>
                  This process isn't sexy, but it works. Every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <SpecLine text="PRINCIPLES" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <HairlineCard key={value.title} className="p-8" hover={true}>
                <span className="font-sans font-black text-sm text-hot-red">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <h3 className="font-sans text-2xl font-black text-ink uppercase mt-2 mb-2 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-ink font-bold text-sm leading-relaxed">{value.description}</p>
              </HairlineCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <SpecLine text="TECH STACK — TOOLS WE USE" className="mb-8" />
          <div className="flex flex-wrap gap-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-sans font-black text-xs uppercase tracking-widest text-ink border-2 border-black bg-white hover:bg-vivid-yellow hover:-rotate-2 px-3.5 py-2 transition-all duration-100 select-none shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
