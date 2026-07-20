/**
 * KpiBand — Full-width stats band with accurate metrics
 */
import SpecLine from '../ui/SpecLine'
import GridTexture from '../ui/GridTexture'

const kpis = [
  { value: '5', label: 'Projects Shipped', detail: 'Live client & studio builds' },
  { value: '5', label: 'Businesses Served', detail: 'Films, Culinary, NGO, Agency & Insurance' },
  { value: '100%', label: 'Live Production', detail: 'Deploys on Vercel & custom domains' },
  { value: '4.9★', label: 'Client Satisfaction', detail: 'Verified delivery quality' },
]

export default function KpiBand() {
  return (
    <section className="bg-canvas-dark py-20 md:py-28 relative">
      <GridTexture />

      <div className="section-container relative z-10">
        <SpecLine text="BY THE NUMBERS — VERIFIED METRICS" className="mb-8 text-center" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="text-center border border-fog/10 bg-black/40 p-6 shadow-[4px_4px_0px_0px_#000]">
              <p className="font-mono text-3xl md:text-5xl font-black text-vivid-yellow mb-1">
                {kpi.value}
              </p>
              <p className="font-mono text-xs font-black uppercase tracking-[0.15em] text-white mb-1">
                {kpi.label}
              </p>
              <p className="font-mono text-[10px] text-fog/70 font-bold">{kpi.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
