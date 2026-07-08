import { useRef } from 'react'
import { ArrowUpRight, Star, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, Quote } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import TechStack from '../components/ui/TechStack'
import TrustMarquee from '../components/home/TrustMarquee'
import Hero from '../components/home/Hero'

const problems = [
  {
    title: 'Outdated Websites',
    description: 'Slow loading, poor mobile UX, and weak copy that drives prospective high-ticket clients away.',
    badge: 'LOSS OF REVENUE',
  },
  {
    title: 'Manual Operations',
    description: 'Wasting hours daily copying data between sheets and sending repetitive client updates.',
    badge: 'OPERATIONAL DRAIN',
  },
  {
    title: 'Disconnected Tools',
    description: 'SaaS platforms that do not sync, leading to data silos, duplicate entry, and human errors.',
    badge: 'SYSTEM FRICTION',
  },
  {
    title: 'Slow Processes',
    description: 'Bottlenecks in sales, support, and fulfillment that restrict your capacity to scale.',
    badge: 'GROWTH CAP',
  },
]

const solutions = [
  {
    title: 'Modern Platforms',
    description: 'Custom React & Next.js websites built from the ground up for speed, SEO, and conversion.',
  },
  {
    title: 'AI & Automation',
    description: 'Custom workflow automations connecting your CRM, communication tools, and databases.',
  },
  {
    title: 'Tailored SaaS & Systems',
    description: 'Custom business software and multi-tenant portals designed specifically for your workflows.',
  },
]

const stats = [
  { value: '50+', label: 'Projects Delivered', detail: 'On-time and on-spec' },
  { value: '20+', label: 'Businesses Helped', detail: 'From startups to enterprise' },
  { value: '5+', label: 'Industries Served', detail: 'Fintech, Health, Property & more' },
  { value: '99%', label: 'Performance Score', detail: 'Average Lighthouse Core Web Vitals' },
]

const testimonials = [
  {
    quote: "Caliber completely transformed our clinical operations. Their custom system cut our scheduling manual hours by 70% and eliminated booking errors. The investment paid for itself in less than two months.",
    author: "Dr. Sarah Vance",
    role: "COO, Aether Health",
    project: "Clinical Operations Engine",
  },
  {
    quote: "Unlike agencies that deliver templates, Caliber wrote clean, custom code that handles $10M+ luxury property transactions with Mapbox. Our speed metrics are perfect and inquiries are up 340%.",
    author: "Marcus Brody",
    role: "Founder, Meridian Properties",
    project: "Luxury Real Estate Platform",
  },
]

export default function Home() {
  const containerRef = useRef(null)


  return (
    <div ref={containerRef} className="overflow-hidden bg-canvas text-ink">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Problem/Solution Section */}
      <section className="bg-canvas py-24 border-b-4 border-black relative">
        <GridTexture className="opacity-40" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl mb-16">
            <Badge rotate="-rotate-2" bg="bg-hot-red" className="mb-4">
              THE REALITY
            </Badge>
            <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-ink mt-2 leading-[0.95]">
              Businesses don't need more software. <br />
              <span className="text-stroke-3">They need better systems.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: The Problems */}
            <div className="lg:col-span-6 space-y-6">
              <SpecLine text="THE PROBLEMS — OUTDATED AND MANUAL" className="mb-2" />
              <div className="prob-grid space-y-6">
                {problems.map((p, idx) => (
                  <HairlineCard key={idx} className="p-6 border-l-8 border-l-hot-red bg-white prob-card hover:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-sans font-black text-lg uppercase tracking-tight">{p.title}</h4>
                      <span className="font-mono text-[9px] uppercase tracking-widest bg-hot-red/10 text-hot-red px-2 py-0.5 border border-hot-red/20 font-bold">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-ink/75 leading-relaxed">{p.description}</p>
                  </HairlineCard>
                ))}
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="lg:col-span-6 space-y-6">
              <SpecLine text="OUR SOLUTIONS — PRECISION ENGINEERED" className="mb-2" />
              <div className="sol-grid space-y-6">
                {solutions.map((s, idx) => (
                  <HairlineCard key={idx} className="p-6 border-l-8 border-l-accent-mint bg-white sol-card hover:shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle size={20} className="text-accent-mint shrink-0" />
                      <h4 className="font-sans font-black text-lg uppercase tracking-tight">{s.title}</h4>
                    </div>
                    <p className="text-sm font-bold text-ink/75 leading-relaxed">{s.description}</p>
                  </HairlineCard>
                ))}

                {/* Micro CTA Box */}
                <div className="border-4 border-black p-8 bg-vivid-yellow shadow-[6px_6px_0px_0px_#000]">
                  <h4 className="font-sans font-black text-xl uppercase mb-2">Ready to patch your system leaks?</h4>
                  <p className="text-sm font-bold mb-6">Stop paying for manual errors and client drop-offs. Let's design a system that scales.</p>
                  <Button href="/estimate-project" variant="outline" className="w-full border-2 bg-white text-sm py-3">
                    RUN SYSTEM ESTIMATOR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="bg-black text-canvas border-b-4 border-black py-20 relative">
        <div className="section-container relative z-10">
          <SpecLine text="METRICS THAT MATTER" className="mb-12 text-center text-canvas" />
          
          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="stat-card border-4 border-white bg-canvas-dark p-6 shadow-[6px_6px_0px_0px_#fff] text-center hover:-translate-y-1 transition-transform">
                <p className="font-sans font-black text-5xl md:text-6xl text-vivid-yellow tracking-tighter mb-2">
                  {s.value}
                </p>
                <p className="font-sans font-black text-xs uppercase tracking-widest text-white mb-1">
                  {s.label}
                </p>
                <p className="font-mono text-[10px] text-fog/60 leading-tight">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technology Stack Section */}
      <section className="bg-canvas py-24 border-b-4 border-black relative">
        <GridTexture className="opacity-30" />
        <div className="section-container relative z-10">
          <div className="max-w-2xl mb-16">
            <Badge rotate="rotate-2" bg="bg-soft-violet" className="mb-4">
              OUR PLAYBOOK
            </Badge>
            <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-ink mt-2 leading-[0.95]">
              Modern tech stack <br />
              <span className="text-stroke-3">built for scale.</span>
            </h2>
            <p className="text-ink font-bold mt-4">
              We do not get vendor-locked. We select optimized, reliable, industry-proven technologies that ensure security, high performance, and long term flexibility.
            </p>
          </div>

          <TechStack />
        </div>
      </section>

      {/* 5. Client Trust & Testimonials Section */}
      <TrustMarquee />

      <section className="bg-canvas py-24 border-b-4 border-black relative">
        <GridTexture className="opacity-30" />
        <div className="section-container relative z-10">
          <div className="max-w-2xl mb-16 mx-auto text-center">
            <Badge rotate="-rotate-1" bg="bg-vivid-yellow" className="mb-4">
              CLIENT TESTIMONIALS
            </Badge>
            <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-ink mt-2 leading-[0.95]">
              What they say <br />
              <span className="text-stroke-3">about Caliber.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <HairlineCard key={idx} className="p-8 bg-white flex flex-col justify-between hover:shadow-[14px_14px_0px_0px_#000]" hover={true}>
                <div>
                  <div className="flex items-center gap-1.5 text-vivid-yellow mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" stroke="black" strokeWidth={2} />
                    ))}
                  </div>
                  <blockquote className="font-sans font-bold text-base md:text-lg leading-relaxed text-black mb-8 relative pl-6">
                    <Quote size={28} className="absolute left-0 top-0 -translate-y-2 text-hot-red/20 rotate-180" />
                    "{t.quote}"
                  </blockquote>
                </div>
                
                <div className="border-t-4 border-black pt-6 flex justify-between items-center mt-auto">
                  <div>
                    <cite className="font-sans font-black text-sm uppercase not-italic text-black block">{t.author}</cite>
                    <span className="font-mono text-[10px] text-fog font-bold">{t.role}</span>
                  </div>
                  <Badge bg="bg-soft-violet" className="text-[10px] border">
                    {t.project}
                  </Badge>
                </div>
              </HairlineCard>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
