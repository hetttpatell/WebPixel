import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import CtaBand from '../components/home/CtaBand'

const values = [
  {
    title: 'Code Craft & Precision',
    description: 'We write clean, modular React and Next.js code tailored to your exact business requirements, avoiding heavy templates or slow page builders.',
  },
  {
    title: 'Direct Engineering Ownership',
    description: 'When you partner with WebPixel, you work directly with full-stack engineers who build and deploy your system from end to end.',
  },
  {
    title: 'Transparent Production Sprints',
    description: 'Continuous code deliveries pushed to live staging and GitHub environments. No communication gaps, no hidden dependencies.',
  },
  {
    title: 'Measurable Business Impact',
    description: 'Whether it is streamlining hospital OPD queues or accelerating brand sales, every line of code serves a clear business objective.',
  },
]

const techStack = [
  'React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Supabase', 'Express', 'AWS', 'Vercel',
  'Stripe', 'Twilio', 'Figma', 'Framer Motion', 'React Native', 'Cal.com'
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />

        {/* Grid breach background text */}
        <div
          className="absolute left-0 top-20 font-sans font-black text-[18rem] md:text-[28rem] leading-none text-black/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          WP
        </div>

        <div className="section-container relative z-10">
          <SpecLine text="ABOUT — THE STUDIO" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-6 leading-[0.95] uppercase">
            Full-stack engineering studio <br />
            focused on <span className="bg-vivid-yellow text-black px-4 inline-block -rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_#000]">real deliverables.</span>
          </h1>
          <p className="text-ink font-bold text-xl max-w-3xl leading-relaxed mt-8">
            WebPixel is a modern web development and software engineering studio. Based in Ahmedabad, India, we work remotely with ambitious clients across India and globally to build high-performance web applications, custom SaaS platforms, and digital products.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-canvas pb-16 md:pb-24 border-b-4 border-black">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <SpecLine text="OUR APPROACH" className="mb-3" />
              <h2 className="font-sans text-3xl font-black text-ink mb-6 uppercase tracking-tight">
                Built for performance & transparency
              </h2>
              <div className="space-y-4 text-ink font-bold leading-relaxed">
                <p>
                  At WebPixel, we believe high-quality digital products are built on strong technical foundations. We do not cut corners with bloated website templates or opaque agency overhead.
                </p>
                <p>
                  From cinematic media portfolios like Khushi Films and restaurant platforms like House of Biryani & Rolls to insurance advisory platforms like Growth Edge, we engineer every build to run fast, remain maintainable, and convert users.
                </p>
                <p>
                  We operate as dedicated engineering partners to your team — listening closely, scoping accurately, and delivering production code on schedule.
                </p>
              </div>
            </div>
            <div>
              <SpecLine text="OUR OPERATING MODEL" className="mb-3" />
              <h2 className="font-sans text-3xl font-black text-ink mb-6 uppercase tracking-tight">
                Engineering excellence in action
              </h2>
              <div className="space-y-4 text-ink font-bold leading-relaxed">
                <p>
                  Our work spans four core disciplines: Full-Stack Web Engineering, Custom SaaS Development, UI/UX Product Design, and Cloud Performance Systems.
                </p>
                <p>
                  We also build in-house products — such as LeadFlow (a multi-tenant WhatsApp automation SaaS) and ClientOS (a dual-mode booking CRM) — which continuously sharpen our architectural expertise and production standards.
                </p>
                <p>
                  Every engagement follows clear sprint phases: Discover & Scope, Design & Wireframe, Code & Integrate, Test & Deploy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <SpecLine text="CORE PRINCIPLES" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <HairlineCard key={value.title} className="p-8 bg-white" hover={true}>
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
          <SpecLine text="ENGINEERING STACK & TOOLS" className="mb-8" />
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
