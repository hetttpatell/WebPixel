import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import ContactForm from '../components/forms/ContactForm'

export default function Contact() {
  return (
    <>
      <section className="bg-canvas pt-20 md:pt-32 pb-24 md:pb-32 relative min-h-screen border-b-4 border-black">
        <GridTexture />

        <div className="section-container relative z-10">
          <SpecLine text="CONTACT — GET IN TOUCH" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Let's talk
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed mb-12">
            Ready to start a project? Tell us what you're building and we'll get back
            to you within 24 hours with a tailored proposal.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-6 rounded-none">
                <SpecLine text="RESPONSE TIME" className="mb-3" />
                <p className="text-ink font-black mb-1 uppercase text-sm">Within 24 hours</p>
                <p className="text-ink font-bold text-sm leading-relaxed">
                  We review every inquiry personally. No auto-responders, no bots.
                </p>
              </div>

              <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-6 rounded-none">
                <SpecLine text="PREFER EMAIL?" className="mb-3" />
                <a
                  href="mailto:hello@webpixel.io"
                  className="text-hot-red font-black text-sm uppercase tracking-widest hover:underline cursor-pointer"
                >
                  hello@webpixel.io
                </a>
              </div>

              <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-6 rounded-none">
                <SpecLine text="BOOK A CALL" className="mb-3" />
                <p className="text-ink font-bold text-sm leading-relaxed mb-3">
                  Skip the form. Book a 30-minute discovery call directly on our calendar.
                </p>
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-hot-red hover:underline font-bold cursor-pointer"
                >
                  Schedule now
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
