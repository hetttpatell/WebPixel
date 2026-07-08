import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { saveContact } from '../lib/supabase'

const steps = [
  { id: 1, title: 'Project Type' },
  { id: 2, title: 'Required Features' },
  { id: 3, title: 'Timeline' },
  { id: 4, title: 'Estimate & Details' }
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
  { id: 'ASAP', label: 'ASAP', desc: 'Highly prioritized sprint speed.' },
  { id: '1 Month', label: 'Under 1 Month', desc: 'Standard rapid delivery.' },
  { id: '3 Months', label: '1 - 3 Months', desc: 'Recommended feature build window.' },
  { id: 'Flexible', label: 'Flexible / Not Sure', desc: 'Aligned with custom scoping.' }
]

export default function ProjectEstimator() {
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [features, setFeatures] = useState([])
  const [timeline, setTimeline] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [pricing, setPricing] = useState({ low: 0, high: 0 })

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

  const getCalculatedEstimate = () => {
    const basePrices = {
      'Website': 8000,
      'Mobile App': 25000,
      'SaaS': 40000,
      'Custom Software': 30000,
      'Automation': 15000
    }
    const featurePrices = {
      'Authentication': 3000,
      'Admin Dashboard': 8000,
      'Payments': 5000,
      'AI Integration': 10000,
      'Notifications': 2000,
      'Analytics': 4000
    }
    const timelineMultipliers = {
      'ASAP': 1.25,
      '1 Month': 1.1,
      '3 Months': 1.0,
      'Flexible': 0.9
    }

    const base = basePrices[projectType] || 0
    const featuresSum = features.reduce((sum, f) => sum + (featurePrices[f] || 0), 0)
    const mult = timelineMultipliers[timeline] || 1.0

    const total = (base + featuresSum) * mult
    const low = Math.round((total * 0.9) / 1000) * 1000
    const high = Math.round((total * 1.15) / 1000) * 1000

    return { low, high }
  }

  const handleNextStep = () => {
    if (step === 1 && !projectType) return
    if (step === 3 && !timeline) return
    
    if (step === 3) {
      // Calculate pricing estimate before showing the final form step
      const calculated = getCalculatedEstimate()
      setPricing(calculated)
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')

    const budgetString = `$${pricing.low.toLocaleString()} – $${pricing.high.toLocaleString()}`
    const result = await saveContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      projectType,
      budget: budgetString,
      timeline,
      features
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('idle')
      alert('Error saving your details. Please try again.')
    }
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
          <SpecLine text="CALIBRATION — ESTIMATION PROCESS" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Estimate Project
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Get an instant pricing ballpark. Walk through our checklist and discover our build scoping ranges.
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
                  <h2 className="font-sans text-2xl font-black uppercase mb-6">Select Required Features</h2>
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

              {/* STEP 3: Timeline */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-sans text-2xl font-black uppercase mb-6">Select Project Timeline</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timelines.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimeline(t.id)}
                        className={`text-left p-6 border-4 border-black cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                          timeline === t.id ? 'bg-accent-mint/45' : 'bg-canvas'
                        }`}
                      >
                        <h3 className="font-sans font-black text-lg uppercase mb-1">{t.label}</h3>
                        <p className="text-xs font-bold text-ink/75 leading-relaxed">{t.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 border-t-4 border-black flex justify-between">
                    <Button onClick={handlePrevStep} variant="outline">
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!timeline}
                      variant="primary"
                    >
                      Calculate Estimate
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Estimate & Lead Capture */}
              {step === 4 && status !== 'success' && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Ballpark range banner */}
                  <div className="bg-canvas border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000] text-center">
                    <SpecLine text="CALIBRATED Ballpark Estimate" className="justify-center mb-2" />
                    <p className="font-sans font-black text-4xl md:text-5xl text-hot-red leading-none mb-3">
                      ${pricing.low.toLocaleString()} – ${pricing.high.toLocaleString()}
                    </p>
                    <p className="text-xs font-bold text-ink/60">
                      Based on standard market rates for a {projectType} build with {features.length || '0'} feature modules.
                    </p>
                  </div>

                  <h3 className="font-sans text-2xl font-black uppercase text-center border-b-4 border-black pb-4">
                    Submit Details to Lock in Scoping
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="est-name" className={labelClasses}>Name</label>
                        <input
                          id="est-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleFormChange}
                          placeholder="Your Name"
                          className={inputClasses}
                        />
                        {errors.name && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="est-email" className={labelClasses}>Email</label>
                        <input
                          id="est-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder="you@company.com"
                          className={inputClasses}
                        />
                        {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="est-company" className={labelClasses}>Company Name</label>
                        <input
                          id="est-company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleFormChange}
                          placeholder="Company Ltd"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="est-phone" className={labelClasses}>Phone Number</label>
                        <input
                          id="est-phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputClasses}
                        />
                        {errors.phone && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.phone}</p>}
                      </div>
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
                        {status === 'submitting' ? 'Saving Lead...' : 'Submit Lead details'}
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
                  <h2 className="font-sans font-black text-3xl uppercase tracking-tight"> ballparks locked!</h2>
                  <p className="text-base font-bold text-ink max-w-md mx-auto leading-relaxed">
                    Thank you. We have saved your lead details in our Supabase contact table. Our core engineering team will contact you at <span className="underline">{form.email}</span> within 12 hours.
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
