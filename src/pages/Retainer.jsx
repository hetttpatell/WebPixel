import { useState } from 'react'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Send, CheckCircle2, ShieldCheck, Zap, Clock } from 'lucide-react'
import { saveContact } from '../lib/supabase'
import { sendResendEmail, buildLeadEmailHtml } from '../lib/resend'

export default function Retainer() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    expectedHours: '15-30 hrs/month',
    expectedBudget: '',
    servicesNeeded: [],
    details: '',
  })

  const handleCheckboxChange = (service) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(service)
      if (exists) {
        return { ...prev, servicesNeeded: prev.servicesNeeded.filter((s) => s !== service) }
      }
      return { ...prev, servicesNeeded: [...prev.servicesNeeded, service] }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const dbPromise = saveContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      company: formData.company || 'N/A',
      projectType: 'Retainer Scope',
      budget: formData.expectedBudget ? `₹${Number(formData.expectedBudget).toLocaleString('en-IN')}` : 'Unspecified',
      timeline: formData.expectedHours,
      features: formData.servicesNeeded,
      message: formData.details
    })

    const emailHtml = buildLeadEmailHtml({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: `Retainer (${formData.expectedHours})`,
      budget: formData.expectedBudget ? `₹${Number(formData.expectedBudget).toLocaleString('en-IN')}` : 'N/A',
      timeline: formData.expectedHours,
      features: formData.servicesNeeded,
      message: formData.details,
      formType: 'CUSTOM RETAINER QUERY'
    })

    const emailPromise = sendResendEmail({
      subject: `[Lead] New Custom Retainer Query from ${formData.name}`,
      html: emailHtml,
      replyTo: formData.email,
    })

    await Promise.allSettled([dbPromise, emailPromise])
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClasses =
    'w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold'
  const labelClasses =
    'font-sans font-black text-xs uppercase tracking-widest text-black mb-2 block'

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="RETAINER — CUSTOM DYNAMIC PRICING" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Tailored <span className="bg-vivid-yellow text-ink px-4 inline-block -rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_#000]">Retainers</span>
          </h1>
          <p className="text-ink font-bold text-lg max-w-2xl leading-relaxed mt-8">
            We don't sell rigid one-size-fits-all packages. Every product has unique maintenance and engineering demands. Submit your retainer query below, and our lead architects will construct a personalized dynamic pricing proposal tailored precisely to your scope.
          </p>
        </div>
      </section>

      {/* Query Form Section */}
      <section className="bg-canvas pb-24 md:pb-32 border-b-4 border-black pt-12">
        <div className="section-container max-w-4xl">
          {submitted ? (
            <HairlineCard className="p-8 md:p-12 bg-white text-center shadow-[10px_10px_0px_0px_#000]" hover={false}>
              <div className="w-16 h-16 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000] mb-6">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <Badge bg="bg-vivid-yellow" className="mb-4">QUERY RECEIVED</Badge>
              <h2 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight mb-4">
                Dynamic Retainer Proposal En Route!
              </h2>
              <p className="text-ink font-bold text-base max-w-xl mx-auto leading-relaxed mb-6">
                Thank you, <span className="text-hot-red font-black">{formData.name || 'Client'}</span>. We have logged your retainer query. Our senior team is crafting a custom proposal matching your scope and expected budget (<span className="font-mono text-hot-red font-black">₹{formData.expectedBudget ? Number(formData.expectedBudget).toLocaleString('en-IN') : 'N/A'}</span>). A dynamic scope quote will be sent directly to <span className="underline font-black">{formData.email}</span> within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="primary" className="border-4 shadow-[4px_4px_0px_0px_#000]">
                Submit Another Query
              </Button>
            </HairlineCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Values */}
              <div className="lg:col-span-4 space-y-6">
                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
                  <Zap className="w-8 h-8 text-hot-red mb-2" />
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight mb-2">Dynamic Scoping</h3>
                  <p className="text-xs font-bold text-ink/80 leading-relaxed">
                    Pay only for the exact bandwidth and technical skill sets your application demands each quarter.
                  </p>
                </div>

                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
                  <ShieldCheck className="w-8 h-8 text-accent-cobalt mb-2" />
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight mb-2">SLA Guaranteed</h3>
                  <p className="text-xs font-bold text-ink/80 leading-relaxed">
                    Dedicated Slack channel, rapid bug response SLAs, and direct access to core engineering leads.
                  </p>
                </div>

                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
                  <Clock className="w-8 h-8 text-vivid-yellow mb-2" />
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight mb-2">No Lock-in Contracts</h3>
                  <p className="text-xs font-bold text-ink/80 leading-relaxed">
                    Flexible monthly terms with rolling hours rollover and 30-day notice adjustments.
                  </p>
                </div>
              </div>

              {/* Right Column: Query Form */}
              <div className="lg:col-span-8">
                <HairlineCard className="p-8 md:p-10 bg-white" hover={false}>
                  <SpecLine text="RETAINER QUERY FORM" className="mb-4" />
                  <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight mb-6">
                    Request Custom Retainer Quote
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ret-name" className={labelClasses}>Your Name *</label>
                        <input
                          id="ret-name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="ret-email" className={labelClasses}>Work Email *</label>
                        <input
                          id="ret-email"
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ret-phone" className={labelClasses}>Phone / WhatsApp</label>
                        <input
                          id="ret-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="ret-company" className={labelClasses}>Company / Product Name</label>
                        <input
                          id="ret-company"
                          type="text"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ret-hours" className={labelClasses}>Expected Monthly Bandwidth</label>
                        <select
                          id="ret-hours"
                          value={formData.expectedHours}
                          onChange={(e) => setFormData({ ...formData, expectedHours: e.target.value })}
                          className={inputClasses}
                        >
                          <option value="10-15 hrs/month">10 - 15 hrs/month (Light Maintenance)</option>
                          <option value="15-30 hrs/month">15 - 30 hrs/month (Standard Growth)</option>
                          <option value="30-50 hrs/month">30 - 50 hrs/month (Active Feature Dev)</option>
                          <option value="50+ hrs/month">50+ hrs/month (Embedded Dedicated Team)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ret-budget" className={labelClasses}>Expected Target Budget (₹ INR) *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-black text-base text-black select-none">
                            ₹
                          </span>
                          <input
                            id="ret-budget"
                            type="text"
                            inputMode="numeric"
                            required
                            placeholder="e.g. 50,000"
                            value={formData.expectedBudget ? Number(formData.expectedBudget).toLocaleString('en-IN') : ''}
                            onChange={(e) => {
                              const digitsOnly = e.target.value.replace(/[^0-9]/g, '')
                              setFormData({ ...formData, expectedBudget: digitsOnly })
                            }}
                            className="w-full bg-white border-4 border-black rounded-none pl-9 pr-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-black tracking-wide"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Services Required (Select all that apply)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {[
                          'Bug Fixes & Security Audits',
                          'New Feature Engineering',
                          'Performance & Speed Optimization',
                          'Cloud & Server Management',
                          'API & Webhook Integrations',
                          'UI/UX Iterations & Design'
                        ].map((service) => (
                          <label
                            key={service}
                            className={`flex items-center gap-3 p-3 border-2 border-black cursor-pointer font-sans text-xs font-bold transition-all ${
                              formData.servicesNeeded.includes(service)
                                ? 'bg-vivid-yellow shadow-[2px_2px_0px_0px_#000]'
                                : 'bg-canvas hover:bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.servicesNeeded.includes(service)}
                              onChange={() => handleCheckboxChange(service)}
                              className="w-4 h-4 accent-black cursor-pointer"
                            />
                            <span>{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ret-details" className={labelClasses}>Project Context & Pain Points</label>
                      <textarea
                        id="ret-details"
                        rows={4}
                        placeholder="Tell us about your codebase, current tech stack, and primary technical priorities..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full font-sans font-black text-sm uppercase tracking-widest bg-hot-red text-ink border-4 border-black px-8 py-4 cursor-pointer select-none shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>DISPATCHING VIA RESEND...</span>
                      ) : (
                        <>
                          <span>DISPATCH RETAINER QUERY VIA RESEND</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </HairlineCard>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
