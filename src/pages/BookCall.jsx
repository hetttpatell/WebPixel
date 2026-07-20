import { useState } from 'react'
import { Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Clock, Send, CheckCircle, ShieldCheck, Mail } from 'lucide-react'
import { saveContact } from '../lib/supabase'
import { sendResendEmail, buildLeadEmailHtml } from '../lib/resend'

export default function BookCall() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full-Stack Web Engineering',
    budgetRange: '₹1,50,000 – ₹3,00,000',
    timeline: '4 – 8 Weeks',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

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

    // 1. Save contact in database
    const dbPromise = saveContact({
      name: form.name,
      email: form.email,
      phone: form.phone || 'N/A',
      company: form.projectType,
      projectType: form.projectType,
      budget: form.budgetRange,
      message: `Timeline: ${form.timeline}. Scoping Notes: ${form.notes || 'N/A'}`
    })

    // 2. Dispatch email directly via Resend to hetpatel140505@gmail.com
    const emailHtml = buildLeadEmailHtml({
      name: form.name,
      email: form.email,
      phone: form.phone,
      projectType: form.projectType,
      budget: form.budgetRange,
      timeline: form.timeline,
      message: form.notes,
      formType: 'STRATEGY SCOPING INQUIRY'
    })

    const emailPromise = sendResendEmail({
      subject: `[Lead] Strategy Call Inquiry from ${form.name}`,
      html: emailHtml,
      replyTo: form.email,
    })

    await Promise.allSettled([dbPromise, emailPromise])
    setStatus('success')
  }

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      projectType: 'Full-Stack Web Engineering',
      budgetRange: '₹1,50,000 – ₹3,00,000',
      timeline: '4 – 8 Weeks',
      notes: ''
    })
    setStatus('idle')
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
          <SpecLine text="STRATEGY CALL & SCOPING" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Book Strategy Call
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Fill out your technical scope below. Your parameters will be dispatched directly to WebPixel's engineering team via Resend for instant evaluation.
          </p>
        </div>
      </section>

      {/* Main Scoping Section */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Left: Engineering Commitment & Resend Info */}
            <div className="lg:col-span-5 space-y-8">
              <SpecLine text="DIRECT RESEND DISPATCH" />
              
              <div className="border-4 border-black p-6 bg-vivid-yellow shadow-[6px_6px_0px_0px_#000] space-y-4">
                <Badge bg="bg-black text-white" className="text-[10px]">
                  INSTANT INBOX NOTIFICATION
                </Badge>
                <h3 className="font-sans font-black text-xl uppercase">Direct Lead Dispatch</h3>
                <p className="text-xs font-bold leading-relaxed text-black/90">
                  Submitting this form routes your project requirements straight to our inbox via Resend. No middleman, no lost tickets.
                </p>
                <div className="pt-2 flex items-center gap-2 font-mono text-xs font-black uppercase text-black border-t-2 border-black/20">
                  <Mail size={16} className="text-hot-red shrink-0" />
                  <span>hetpatel140505@gmail.com</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-base uppercase">30 Minute Technical Scoping</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      We analyze software architecture, database needs, and timeline expectations without high-pressure sales pitches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-soft-violet flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-base uppercase">Proposal Within 24 Hours</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      Every submission receives a tailored project scope breakdown and milestone cost estimate delivered directly to your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pre-Call Scoping Form */}
            <div className="lg:col-span-7">
              <HairlineCard className="p-8 md:p-10 bg-white" hover={false}>
                <SpecLine text="PROJECT SCOPING FORM" className="mb-6" />

                {status === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                      <CheckCircle className="text-black" size={32} />
                    </div>
                    <h3 className="font-sans font-black text-2xl uppercase">Scope Dispatched Successfully!</h3>
                    <p className="text-sm font-bold text-ink max-w-sm mx-auto leading-relaxed">
                      Thank you! Your project requirements have been sent to WebPixel Studio via Resend. We will review your scope and send a custom response to <span className="underline font-mono font-black">{form.email}</span> within 24 hours.
                    </p>
                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button href="/" variant="primary" className="border-4 shadow-[4px_4px_0px_0px_#000] text-xs py-3">
                        Back to Homepage
                      </Button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="font-mono text-xs font-black uppercase bg-white text-black border-4 border-black py-3 px-6 shadow-[4px_4px_0px_0px_#000] hover:bg-vivid-yellow transition-colors cursor-pointer"
                      >
                        Submit Another Scope
                      </button>
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
                          placeholder="Vikram Mehta"
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
                          placeholder="vikram@company.in"
                          className={inputClasses}
                        />
                        {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="book-phone" className={labelClasses}>Phone / WhatsApp</label>
                        <input
                          id="book-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputClasses}
                        />
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
                          <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
                          <option value="Custom SaaS Development">Custom SaaS Development</option>
                          <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                          <option value="AI Automation & Workflows">AI Automation & Workflows</option>
                        </select>
                      </div>
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
                          <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                          <option value="₹1,50,000 – ₹3,00,000">₹1,50,000 – ₹3,00,000</option>
                          <option value="₹3,00,000 – ₹6,00,000">₹3,00,000 – ₹6,00,000</option>
                          <option value="₹6,00,000+ Custom Scope">₹6,00,000+ Custom Scope</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="book-timeline" className={labelClasses}>Timeline Expectation</label>
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
                          <option value="ASAP (< 4 Weeks)">ASAP (&lt; 4 Weeks)</option>
                          <option value="4 – 8 Weeks">4 – 8 Weeks</option>
                          <option value="2 – 3 Months">2 – 3 Months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="book-notes" className={labelClasses}>Project Overview & Requirements</label>
                      <textarea
                        id="book-notes"
                        name="notes"
                        rows={4}
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Briefly describe what you're building, key feature requirements, or current operational pain points..."
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full font-sans font-black text-sm uppercase tracking-widest bg-hot-red text-ink border-4 border-black px-8 py-4 cursor-pointer select-none shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <span>DISPATCHING VIA RESEND...</span>
                      ) : (
                        <>
                          <span>DISPATCH SCOPE VIA RESEND</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
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
