import Button from '../ui/Button'
import SpecLine from '../ui/SpecLine'
import GridTexture from '../ui/GridTexture'

export default function CtaBand() {
  return (
    <section className="bg-canvas py-24 md:py-32 relative overflow-hidden border-b-4 border-black">
      <GridTexture />

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto border-4 border-black bg-white p-12 shadow-[8px_8px_0px_0px_#000] rounded-none">
        <SpecLine text="LET'S BUILD SOMETHING" className="mb-4 justify-center" />

        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-ink mb-6 leading-[0.95] uppercase tracking-tight">
          Ready to start your
          <br />
          next project?
        </h2>

        <p className="text-ink font-bold text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Whether you need a website, an app, or a complete SaaS platform — we'll
          build it with the precision it deserves.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" variant="primary">
            Get in touch
          </Button>
          <Button href="/work" variant="outline">
            See our work
          </Button>
        </div>
      </div>
    </section>
  )
}
