import { useState } from 'react'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Calendar, Clock, Video, ExternalLink, CheckCircle } from 'lucide-react'
import { saveContact } from '../lib/supabase'

export default function BookCall() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Engineering',
    budgetRange: '₹1L - ₹3L',
    timeline: '4-8 Weeks',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Invalid email address'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    const result = await saveContact({
      name: form.name,
      email: form.email,
      phone: 'Cal.com Pre-Call Form',
      company: form.projectType,
      projectType: form.projectType,
      budget: form.budgetRange,
      message: `Timeline: ${form.timeline}. Scoping Notes: ${form.notes || 'N/A'}`
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('idle')
      alert('Error submitting scoping form. Please try again.')
    }
  }

  const inputClasses =
    'w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold'
  const labelClasses =
    'font-sans font-black text-xs uppercase tracking-widest text-black mb-2 block'

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="CALENDAR — CAL.COM INTEGRATION" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Book 30-Min Strategy Call
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Schedule a scoping session directly via Cal.com or fill out our pre-call project details form below.
          </p>
        </div>
      </section>

      {/* Main Scoping Section */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Left: Cal.com Overview & Direct Link */}
            <div className="lg:col-span-5 space-y-8">
              <SpecLine text="CAL.COM DIRECT SCHEDULE" />
              
              <div className="border-4 border-black p-6 bg-vivid-yellow shadow-[6px_6px_0px_0px_#000] space-y-4">
                <Badge bg="bg-black text-white" className="text-[10px]">
                  FASTEST BOOKING
                </Badge>
                <h3 className="font-sans font-black text-xl uppercase">Direct Cal.com Calendar</h3>
                <p className="text-xs font-bold leading-relaxed text-black/90">
                  Prefer to pick a live calendar slot directly? Use our Cal.com engine to lock in a Google Meet consultation immediately.
                </p>
                <a
                  href="https://cal.com/nityam-dixit-opchjp/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-4 py-3 hover:bg-hot-red border-2 border-black transition-colors"
                >
                  <span>Open Booking Calendar</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-base uppercase">30 Minute Technical Scoping</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      We discuss software architecture, database needs, and timeline expectations without high-pressure sales pitches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-soft-violet flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <Video size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-base uppercase">Google Meet Invites</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      Instant calendar invitations with video link generated automatically via Cal.com.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pre-Call Scoping Form */}
            <div className="lg:col-span-7">
              <HairlineCard className="p-8 md:p-10 bg-white" hover={false}>
                <SpecLine text="PRE-CALL SCOPING FORM" className="mb-6" />

                {status === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                      <CheckCircle className="text-black" size={32} />
                    </div>
                    <h3 className="font-sans font-black text-2xl uppercase">Details Submitted!</h3>
                    <p className="text-sm font-bold text-ink max-w-sm mx-auto leading-relaxed">
                      Thank you. We have saved your project scope. You can now select a live slot on Cal.com or wait for our email response at <span className="underline font-mono">{form.email}</span>.
                    </p>
                    <div className="pt-4 flex flex-col gap-3">
                      <a
                        href="https://cal.com/nityam-dixit-opchjp/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-black uppercase bg-vivid-yellow border-2 border-black py-3 px-6 shadow-[2px_2px_0px_0px_#000]"
                      >
                        Proceed to Cal.com Calendar Slot →
                      </a>
                      <Button href="/" variant="outline" className="border-2 shadow-[2px_2px_0px_0px_#000] text-xs py-2">
                        Back to Home
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="book-name" className={labelClasses}>Your Name *</label>
                        <input
                          id="book-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className={inputClasses}
                        />
                        {errors.name && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="book-email" className={labelClasses}>Email Address *</label>
                        <input
                          id="book-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className={inputClasses}
                        />
                        {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="book-projectType" className={labelClasses}>Project Discipline *</label>
                      <select
                        id="book-projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className={`${inputClasses} cursor-pointer appearance-none`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="Full-Stack Web Engineering">Full-Stack Web Engineering (4–8 weeks)</option>
                        <option value="Custom SaaS Development">Custom SaaS Development (8–12 weeks)</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design (2–4 weeks)</option>
                        <option value="Performance & Cloud Systems">Performance & Cloud Systems (1–3 weeks)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="book-budget" className={labelClasses}>Target Budget Range</label>
                        <select
                          id="book-budget"
                          name="budgetRange"
                          value={form.budgetRange}
                          onChange={handleChange}
                          className={`${inputClasses} cursor-pointer appearance-none`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 14px center',
                          }}
                        >
                          <option value="₹50K - ₹1.5L">₹50,000 – ₹1,50,000</option>
                          <option value="₹1.5L - ₹3L">₹1,50,000 – ₹3,00,000</option>
                          <option value="₹3L - ₹6L">₹3,00,000 – ₹6,00,000</option>
                          <option value="₹6L+">₹6,00,000+ Custom Scope</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="book-timeline" className={labelClasses}>Timeline Goal</label>
                        <select
                          id="book-timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          className={`${inputClasses} cursor-pointer appearance-none`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 14px center',
                          }}
                        >
                          <option value="Urgent (1-2 Weeks)">Urgent (1–2 Weeks)</option>
                          <option value="Standard (4-8 Weeks)">Standard Sprint (4–8 Weeks)</option>
                          <option value="Extended (8-12 Weeks)">Extended Build (8–12 Weeks)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="book-notes" className={labelClasses}>Project Notes & Links (Optional)</label>
                      <textarea
                        id="book-notes"
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Brief overview of features, target audience, or current website URL..."
                        className={inputClasses}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'submitting'}
                      className="w-full border-2 py-4 shadow-[4px_4px_0px_0px_#000]"
                    >
                      {status === 'submitting' ? 'Logging Pre-Call Scope...' : 'Submit Pre-Call Form'}
                    </Button>
                  </form>
                )}
              </HairlineCard>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
