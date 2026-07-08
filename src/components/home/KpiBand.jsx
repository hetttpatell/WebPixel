/**
 * KpiBand — Full-width stats band with counters
 */
import SpecLine from '../ui/SpecLine'
import GridTexture from '../ui/GridTexture'

const kpis = [
  { value: '50+', label: 'Projects Delivered', detail: 'across three continents' },
  { value: '98%', label: 'Client Satisfaction', detail: 'based on exit surveys' },
  { value: '<2s', label: 'Average LCP', detail: 'Core Web Vitals compliant' },
  { value: '4.9★', label: 'Avg. Review Score', detail: 'on Clutch & Google' },
]

export default function KpiBand() {
  return (
    <section className="bg-canvas-dark py-20 md:py-28 relative">
      <GridTexture />

      <div className="section-container relative z-10">
        <SpecLine text="BY THE NUMBERS" className="mb-8 text-center" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="text-center">
              <p className="font-mono text-3xl md:text-4xl font-bold text-ink-dark mb-1">
                {kpi.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-cobalt mb-1">
                {kpi.label}
              </p>
              <p className="font-mono text-[10px] text-fog/50">{kpi.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
