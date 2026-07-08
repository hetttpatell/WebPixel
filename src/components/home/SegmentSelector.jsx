/**
 * SegmentSelector — Three mono cards to select Website / App / Custom Software
 * Controls which content renders below via state
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SpecLine from '../ui/SpecLine'

const segments = [
  {
    id: 'websites',
    label: 'Websites',
    code: '01',
    description:
      'High-performance marketing sites, landing pages, and web experiences built for conversion and craft.',
    features: ['Custom Design Systems', 'CMS Integration', 'SEO Optimization', 'Performance Tuning'],
  },
  {
    id: 'applications',
    label: 'Applications',
    code: '02',
    description:
      'Native and cross-platform mobile apps and web applications with real-time data, auth, and complex state.',
    features: ['iOS & Android', 'Real-Time Sync', 'Offline-First', 'Push Notifications'],
  },
  {
    id: 'saas',
    label: 'Custom Software',
    code: '03',
    description:
      'Full SaaS platforms, internal tools, and bespoke software systems — from database to dashboard.',
    features: ['Multi-Tenant Architecture', 'Billing Integration', 'Role-Based Access', 'API Design'],
  },
]

export default function SegmentSelector() {
  const [active, setActive] = useState('websites')
  const current = segments.find((s) => s.id === active)

  return (
    <section className="bg-canvas-dark py-24 md:py-32">
      <div className="section-container">
        <SpecLine text="WHAT WE BUILD" className="mb-3" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-ink-dark mb-12">
          Choose your build type
        </h2>

        {/* Selector tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {segments.map((seg) => (
            <button
              key={seg.id}
              type="button"
              onClick={() => setActive(seg.id)}
              className={`relative rounded border p-6 text-left transition-all duration-150 cursor-pointer ${
                active === seg.id
                  ? 'border-accent-cobalt bg-accent-cobalt/5'
                  : 'border-fog/20 bg-transparent hover:border-fog/40'
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
                [{seg.code}]
              </span>
              <h3
                className={`font-mono text-sm uppercase tracking-[0.15em] mt-2 ${
                  active === seg.id ? 'text-accent-cobalt' : 'text-ink-dark'
                }`}
              >
                {seg.label}
              </h3>
            </button>
          ))}
        </div>

        {/* Active content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-fog/10 rounded p-8 md:p-12"
          >
            <div>
              <SpecLine text={`${current.label.toUpperCase()} — OVERVIEW`} className="mb-3" />
              <p className="text-fog text-lg leading-relaxed">{current.description}</p>
            </div>
            <div>
              <SpecLine text="CAPABILITIES" className="mb-3" />
              <ul className="space-y-3">
                {current.features.map((f, i) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-accent-cobalt">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className="text-ink-dark text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
