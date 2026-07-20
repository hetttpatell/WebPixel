/**
 * TrustMarquee — Infinite scrolling trust badges/client logos
 * Pure CSS animation, pauses on prefers-reduced-motion
 */
import SpecLine from '../ui/SpecLine'

const brands = [
  'Khushi Films',
  'House of Biryani & Rolls',
  'Aura Pixel',
  'Nakshatraloka',
  'Shree Sneh Foundation',
  'Growth Edge Advisory',
]

export default function TrustMarquee() {
  return (
    <section className="bg-canvas-dark py-16 border-y border-fog/10 overflow-hidden">
      <div className="section-container mb-6">
        <SpecLine text="TRUSTED BY INDUSTRY LEADERS" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-canvas-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-canvas-dark to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center px-10 py-4 shrink-0"
            >
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-fog/40 whitespace-nowrap select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
