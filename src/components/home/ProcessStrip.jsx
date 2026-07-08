/**
 * ProcessStrip — 4-step horizontal timeline with measurement ticks
 * Discover → Design → Build → Ship
 */
import SpecLine from '../ui/SpecLine'
import MeasurementTick from '../ui/MeasurementTick'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Deep research into your business, users, and competitive landscape.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes, prototypes, and a complete design system tailored to your brand.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Clean, tested, production-ready code. No shortcuts, no tech debt.',
  },
  {
    number: '04',
    title: 'Ship',
    description: 'Launch, monitor, iterate. We stay on until the metrics prove it works.',
  },
]

export default function ProcessStrip() {
  return (
    <section className="bg-canvas-dark py-24 md:py-32 border-y border-fog/10">
      <div className="section-container">
        <SpecLine text="PROCESS — HOW WE WORK" className="mb-3" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-ink-dark mb-16">
          Measured methodology
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Step content */}
              <div className="px-0 md:px-4 py-6 md:py-0">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl font-bold text-accent-cobalt">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block flex-1">
                      <MeasurementTick direction="horizontal" />
                    </div>
                  )}
                </div>

                <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-ink-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-fog text-sm leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-start py-2 pl-3">
                  <MeasurementTick direction="vertical" length="32px" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
