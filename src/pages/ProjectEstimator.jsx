import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { saveContact } from '../lib/supabase'
import { sendResendEmail, buildLeadEmailHtml } from '../lib/resend'

const steps = [
  { id: 1, title: 'Project Type' },
  { id: 2, title: 'Required Features' },
  { id: 3, title: 'Timeline & Budget' },
  { id: 4, title: 'Client Details' }
]

const projectTypes = [
  { id: 'Website', label: 'Website Development', desc: 'Marketing sites, e-commerce, and corporate web portals.' },
  { id: 'Mobile App', label: 'Mobile Application', desc: 'Native or cross-platform iOS & Android apps.' },
  { id: 'SaaS', label: 'SaaS Product', desc: 'Multi-tenant subscription systems and dashboards.' },
  { id: 'Custom Software', label: 'Custom Software', desc: 'Bespoke operational systems and database backends.' },
  { id: 'Automation', label: 'AI Automation', desc: 'AI chatbots, calling agents, and CRM sync integrations.' }
]

const featuresList = [
  { id: 'Authentication', label: 'User Auth & Profiles', desc: 'Signups, logins, roles, and SSO.' },
  { id: 'Admin Dashboard', label: 'Admin Panel & Analytics', desc: 'Content and user management dashboards.' },
  { id: 'Payments', label: 'Payments & Billing', desc: 'Stripe subscription plans and invoice downloads.' },
  { id: 'AI Integration', label: 'AI LLM Chatbots', desc: 'Generative assistants trained on your knowledge base.' },
  { id: 'Notifications', label: 'In-App & Email/SMS alerts', desc: 'Twilio integration or push alerts.' },
  { id: 'Analytics', label: 'Operational Analytics', desc: 'Interactive charts, KPI reports, and logs.' }
]

const timelines = [
  { id: 'ASAP', label: 'ASAP (< 4 Weeks)', desc: 'Prioritized rapid sprint execution.' },
  { id: '1-2 Months', label: '1 - 2 Months', desc: 'Standard full-stack delivery timeframe.' },
  { id: '3-6 Months', label: '3 - 6 Months', desc: 'Enterprise product engineering roadmap.' },
  { id: 'Flexible', label: 'Flexible / Open', desc: 'Aligned with dynamic milestones.' }
]



export default function ProjectEstimator() {
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [features, setFeatures] = useState([])
  const [timeline, setTimeline] = useState('')
  const [expectedBudget, setExpectedBudget] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const handleFeatureToggle = (fid) => {
    setFeatures((prev) =>
      prev.includes(fid) ? prev.filter((f) => f !== fid) : [...prev, fid]
    )
  }

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateForm = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Invalid email address'
    }
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && !projectType) return
    if (step === 3 && (!timeline || !expectedBudget)) return
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')

    const dbPromise = saveContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      projectType,
      budget: expectedBudget,
      timeline,
      features,
      message: form.notes
    })

    const emailHtml = buildLeadEmailHtml({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      projectType,
      budget: expectedBudget,
      timeline,
      features,
      message: form.notes,
      formType: 'PROJECT ESTIMATOR SCOPE'
    })

    const emailPromise = sendResendEmail({
      subject: `[Lead] New Project Estimate Request from ${form.name}`,
      html: emailHtml,
      replyTo: form.email,
    })

    await Promise.allSettled([dbPromise, emailPromise])
    setStatus('success')
  }

  const inputClasses =
    'w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold'
  const labelClasses =
    'font-sans font-black text-xs uppercase tracking-widest text-black mb-2 block'

  return (
    <>
      <section className="bg-canvas pt-20 md:pt-32 pb-16 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="SCOPING — DYNAMIC PRICING ESTIMATOR" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Estimate Project
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Specify your build parameters and expected budget. We tailor dynamic pricing proposals matching your exact requirements.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-4xl">
          {/* Progress bar */}
          <div className="border-4 border-black bg-white h-8 mb-12 shadow-[4px_4px_0px_0px_#000] flex items-center relative overflow-hidden">
            <div
              className="h-full bg-hot-red transition-all duration-300 border-r-4 border-black"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
            <span className="absolute right-4 font-mono text-xs font-black uppercase text-black">
              Step {step} of {steps.length} — {steps[step - 1].title}
            </span>
          </div>

          <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_#000] relative">
            <AnimatePresence mode="wait">
              {/* STEP 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-sans text-2xl font-black uppercase mb-6">Select Project Type</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTypes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setProjectType(t.id)}
                        className={`text-left p-6 border-4 border-black cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                          projectType === t.id ? 'bg-vivid-yellow' : 'bg-canvas'
                        }`}
                      >
                        <h3 className="font-sans font-black text-lg uppercase mb-1">{t.label}</h3>
                        <p className="text-xs font-bold text-ink/75 leading-relaxed">{t.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 border-t-4 border-black flex justify-end">
                    <Button
                      onClick={handleNextStep}
                      disabled={!projectType}
                      variant="primary"
                    >
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Required Features */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-sans text-2xl font-black uppercase mb-6">Select Required Modules</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuresList.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleFeatureToggle(f.id)}
                        className={`text-left p-6 border-4 border-black cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                          features.includes(f.id) ? 'bg-soft-violet' : 'bg-canvas'
                        }`}
                      >
                        <h3 className="font-sans font-black text-lg uppercase mb-1 flex items-center justify-between">
                          {f.label}
                          {features.includes(f.id) && <span className="text-xs bg-black text-white px-2 py-0.5 border">✓</span>}
                        </h3>
                        <p className="text-xs font-bold text-ink/75 leading-relaxed">{f.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 border-t-4 border-black flex justify-between">
                    <Button onClick={handlePrevStep} variant="outline">
                      Back
                    </Button>
                    <Button onClick={handleNextStep} variant="primary">
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Timeline & Expected Budget */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-sans text-2xl font-black uppercase mb-4">Select Target Timeline</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timelines.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTimeline(t.id)}
                          className={`text-left p-4 border-4 border-black cursor-pointer shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 transition-all ${
                            timeline === t.id ? 'bg-accent-mint/45' : 'bg-canvas'
                          }`}
                        >
                          <h3 className="font-sans font-black text-base uppercase mb-1">{t.label}</h3>
                          <p className="text-xs font-bold text-ink/75">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t-4 border-black">
                    <label htmlFor="est-budget" className="font-sans text-2xl font-black uppercase mb-2 block">
                      Client Expected Budget (₹ INR) *
                    </label>
                    <p className="text-xs font-bold text-ink/70 mb-4">
                      Input your expected target budget in Indian Rupees (₹).
                    </p>
                    <div className="relative max-w-md">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-black text-xl text-black select-none">
                        ₹
                      </span>
                      <input
                        id="est-budget"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="e.g. 1,50,000"
                        value={expectedBudget ? Number(expectedBudget).toLocaleString('en-IN') : ''}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/[^0-9]/g, '')
                          setExpectedBudget(digitsOnly)
                        }}
                        className="w-full bg-white border-4 border-black rounded-none pl-10 pr-4 py-3.5 text-black text-base placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-black tracking-wide"
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t-4 border-black flex justify-between">
                    <Button onClick={handlePrevStep} variant="outline">
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!timeline || !expectedBudget}
                      variant="primary"
                    >
                      Enter Client Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Client Details & Submission */}
              {step === 4 && status !== 'success' && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-canvas border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                    <SpecLine text="SCOPING SUMMARY FOR DYNAMIC PRICING" className="mb-2" />
                    <div className="flex flex-wrap gap-3 font-mono text-xs font-bold text-ink">
                      <span className="bg-vivid-yellow px-2 py-1 border-2 border-black">Type: {projectType}</span>
                      <span className="bg-soft-violet px-2 py-1 border-2 border-black">Modules: {features.length} selected</span>
                      <span className="bg-accent-mint px-2 py-1 border-2 border-black">Timeline: {timeline}</span>
                      <span className="bg-hot-red text-white px-2 py-1 border-2 border-black">Budget: {expectedBudget}</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-2xl font-black uppercase border-b-4 border-black pb-3">
                    Submit Details for Dynamic Pricing Proposal
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="est-name" className={labelClasses}>Your Name *</label>
                        <input
                          id="est-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleFormChange}
                          placeholder="Rajesh Patel"
                          className={inputClasses}
                        />
                        {errors.name && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="est-email" className={labelClasses}>Email Address *</label>
                        <input
                          id="est-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder="rajesh@company.in"
                          className={inputClasses}
                        />
                        {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="est-company" className={labelClasses}>Company / Organization</label>
                        <input
                          id="est-company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleFormChange}
                          placeholder="Infosys Technologies"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="est-phone" className={labelClasses}>Phone Number / WhatsApp *</label>
                        <input
                          id="est-phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="+91 98765 43210"
                          className={inputClasses}
                        />
                        {errors.phone && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="est-notes" className={labelClasses}>Additional Project Notes (Optional)</label>
                      <textarea
                        id="est-notes"
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleFormChange}
                        placeholder="Mention any specific tech stack preferences, API integrations, or launch milestones..."
                        className={inputClasses}
                      />
                    </div>

                    <div className="pt-8 border-t-4 border-black flex justify-between items-center">
                      <Button onClick={handlePrevStep} variant="outline" disabled={status === 'submitting'}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={status === 'submitting'}
                        className="shadow-[4px_4px_0px_0px_#000] border-2"
                      >
                        {status === 'submitting' ? 'Submitting Scope...' : 'Request Dynamic Proposal'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* SUCCESS SCREEN */}
              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-accent-mint border-4 border-black mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                    <span className="text-4xl text-white font-black">✓</span>
                  </div>
                  <Badge bg="bg-vivid-yellow" className="mb-2">PROPOSAL DISPATCHED</Badge>
                  <h2 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight">
                    Scoping Details Received!
                  </h2>
                  <p className="text-base font-bold text-ink max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-black text-hot-red">{form.name}</span>. Your project parameters and expected budget (<span className="font-mono font-black">₹{Number(expectedBudget).toLocaleString('en-IN')}</span>) have been logged. Our core engineering team is crafting a custom dynamic pricing proposal and will email it directly to <span className="underline font-black">{form.email}</span> within 12-24 hours.
                  </p>
                  <div className="pt-6">
                    <Button href="/" variant="outline" className="border-2 shadow-[2px_2px_0px_0px_#000] px-6">
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}

