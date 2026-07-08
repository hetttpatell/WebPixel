import { useState } from 'react'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { Calendar, Clock, Video } from 'lucide-react'
import { saveContact } from '../lib/supabase'

export default function BookCall() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    purpose: '',
    preferredDate: '',
    preferredTime: ''
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
      errs.email = 'Invalid email'
    }
    if (!form.purpose) errs.purpose = 'Please select a meeting purpose'
    if (!form.preferredDate) errs.preferredDate = 'Date is required'
    if (!form.preferredTime) errs.preferredTime = 'Time slot is required'
    
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    const dateString = `${form.preferredDate} at ${form.preferredTime}`
    const result = await saveContact({
      name: form.name,
      email: form.email,
      phone: 'Strategy Call Booking',
      company: 'Consultation Booking',
      projectType: 'Strategy Session',
      budget: form.purpose,
      message: `Preferred Date/Time: ${dateString}. Purpose details: Call requested for sector scope.`
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('idle')
      alert('Error booking consultation. Please try again.')
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
          <SpecLine text="CALENDAR — DIRECT BOOKINGS" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Book Strategy Call
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Schedule a 30-minute scoping call directly with our engineering leads. No sales pitches, just technical alignment.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Info details */}
            <div className="lg:col-span-5 space-y-8">
              <SpecLine text="SESSION OVERVIEW" />
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-vivid-yellow flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-lg uppercase">30 Minute Scoping</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      We will review your requirements, outline potential database schemas, and discuss timelines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border-4 border-black bg-soft-violet flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <Video size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-lg uppercase">Google Meet Call</h3>
                    <p className="text-xs font-bold text-ink/75 leading-relaxed">
                      Meetings are conducted over Google Meet. You will receive an email containing calendar invites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_#000]">
                <h4 className="font-sans font-black text-sm uppercase mb-2">Need a faster estimate?</h4>
                <p className="text-xs font-bold leading-relaxed mb-4">Run our Project Cost Estimator to get pricing ballpark ranges immediately.</p>
                <Button href="/estimate-project" variant="outline" className="w-full border-2 text-xs py-2">
                  Launch Estimator
                </Button>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-7">
              <HairlineCard className="p-8 md:p-10 bg-white" hover={false}>
                {status === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                      <span className="text-3xl text-white font-black">✓</span>
                    </div>
                    <h3 className="font-sans font-black text-2xl uppercase">Session Scheduled!</h3>
                    <p className="text-sm font-bold text-ink max-w-sm mx-auto leading-relaxed">
                      Thank you. We have logged your request in our Supabase registry. We will send a calendar invitation to <span className="underline">{form.email}</span> shortly.
                    </p>
                    <div className="pt-6">
                      <Button href="/" variant="outline" className="border-2 shadow-[2px_2px_0px_0px_#000] px-6 text-xs">
                        Back to Home
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="book-name" className={labelClasses}>Your Name *</label>
                      <input
                        id="book-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
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
                        placeholder="john@company.com"
                        className={inputClasses}
                      />
                      {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="book-purpose" className={labelClasses}>Meeting Purpose *</label>
                      <select
                        id="book-purpose"
                        name="purpose"
                        required
                        value={form.purpose}
                        onChange={handleChange}
                        className={`${inputClasses} cursor-pointer appearance-none`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        <option value="" disabled>Select purpose</option>
                        <option value="Website Scoping">Website Development Scoping</option>
                        <option value="Mobile App Scoping">Mobile App Development Scoping</option>
                        <option value="SaaS Architecture">SaaS Product Architecture</option>
                        <option value="Workflow Automation">AI Workflow Automation Audit</option>
                        <option value="Custom API / Backend">Custom API Development & Integrations</option>
                      </select>
                      {errors.purpose && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.purpose}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="book-date" className={labelClasses}>Preferred Date *</label>
                        <input
                          id="book-date"
                          name="preferredDate"
                          type="date"
                          required
                          value={form.preferredDate}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                        {errors.preferredDate && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.preferredDate}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="book-time" className={labelClasses}>Preferred Time Slot *</label>
                        <select
                          id="book-time"
                          name="preferredTime"
                          required
                          value={form.preferredTime}
                          onChange={handleChange}
                          className={`${inputClasses} cursor-pointer appearance-none`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                          }}
                        >
                          <option value="" disabled>Select time</option>
                          <option value="09:00 AM PST">09:00 AM PST / 12:00 PM EST</option>
                          <option value="11:00 AM PST">11:00 AM PST / 02:00 PM EST</option>
                          <option value="01:00 PM PST">01:00 PM PST / 04:00 PM EST</option>
                          <option value="03:00 PM PST">03:00 PM PST / 06:00 PM EST</option>
                        </select>
                        {errors.preferredTime && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.preferredTime}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'submitting'}
                      className="w-full border-2 py-4 shadow-[4px_4px_0px_0px_#000]"
                    >
                      {status === 'submitting' ? 'Confirming booking...' : 'Schedule Scoping Session'}
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
