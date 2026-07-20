import { useState } from 'react'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Send, CheckCircle2, ShieldCheck, Zap, Clock } from 'lucide-react'

export default function Retainer() {
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
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
                Thank you, <span className="text-hot-red font-black">{formData.name || 'Client'}</span>. We have logged your retainer query. Our senior team is crafting a custom proposal matching your scope and expected budget (<span className="font-mono text-hot-red">{formData.expectedBudget}</span>). A dynamic scope quote will be sent directly to <span className="underline font-black">{formData.email}</span> within 24 hours.
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
                          placeholder="Alex Morgan"
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
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ret-phone" className={labelClasses}>Phone Number / WhatsApp</label>
                        <input
                          id="ret-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
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
                          placeholder="Aether Health Inc."
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
                            required
                            placeholder=""
                            value={formData.expectedBudget}
                            onChange={(e) => setFormData({ ...formData, expectedBudget: e.target.value })}
                            className="w-full bg-white border-4 border-black rounded-none pl-9 pr-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold"
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
                          'UI/UX Design & Component Iterations',
                          'Database & API Maintenance',
                          'Priority Slack / SLA Support',
                        ].map((srv) => (
                          <label
                            key={srv}
                            className={`flex items-center gap-2 p-3 border-2 border-black cursor-pointer text-xs font-bold transition-all ${
                              formData.servicesNeeded.includes(srv) ? 'bg-vivid-yellow shadow-[2px_2px_0px_0px_#000]' : 'bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.servicesNeeded.includes(srv)}
                              onChange={() => handleCheckboxChange(srv)}
                              className="accent-black w-4 h-4 cursor-pointer"
                            />
                            <span>{srv}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ret-details" className={labelClasses}>Project Requirements & Tech Details</label>
                      <textarea
                        id="ret-details"
                        rows={4}
                        placeholder="Briefly describe your app stack, current pain points, or upcoming roadmap objectives..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className={inputClasses}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-4 border-4 shadow-[4px_4px_0px_0px_#000] text-sm">
                      Submit Retainer Query <Send className="ml-2 w-4 h-4" />
                    </Button>
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

