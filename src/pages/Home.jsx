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
  { value: '5', label: 'Projects Shipped', detail: 'Real live production client builds' },
  { value: '5', label: 'Businesses Served', detail: 'Films, Food, NGO, Agency & Insurance' },
  { value: '100%', label: 'Live Production', detail: 'Canonical & Vercel production domains' },
  { value: '4.9★', label: 'Client Satisfaction', detail: 'Verified exit surveys & high retention' },
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
            <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink mt-2 leading-[1.08] sm:leading-[0.98]">
              Businesses don't need more software. <br className="hidden sm:inline" />
              <span className="bg-hot-red text-white px-3 py-0.5 inline-block rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_#000] mt-3 sm:mt-2">
                They need better systems.
              </span>
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
        <div className="section-container relative z-10 max-w-4xl mx-auto">
          <div className="border-4 border-black bg-vivid-yellow p-8 md:p-12 shadow-[8px_8px_0px_0px_#000] text-center">
            <Badge rotate="-rotate-1" bg="bg-black text-white" className="mb-4">
              VERIFIED WORK & REFERENCES
            </Badge>
            <h2 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight text-black mb-4 leading-tight">
              Real code. Real live sites. <br />
              No fabricated claims.
            </h2>
            <p className="font-sans font-bold text-base text-black/85 max-w-2xl mx-auto leading-relaxed mb-8">
              Every project in our portfolio is a live production deployment — from film studios and culinary brand portals to NGO platforms and insurance advisory hubs. Direct client references are available upon request during initial strategy calls.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/work" variant="primary" className="border-2 text-xs py-3 px-6 shadow-[2px_2px_0px_0px_#000]">
                Explore Case Studies
              </Button>
              <Button href="/book-call" variant="outline" className="border-2 bg-white text-xs py-3 px-6 shadow-[2px_2px_0px_0px_#000]">
                Schedule Scoping Call
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
