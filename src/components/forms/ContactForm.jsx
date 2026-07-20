import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { saveContact } from '../../lib/supabase'
import { sendResendEmail, buildLeadEmailHtml } from '../../lib/resend'

const projectTypes = [
  'Website',
  'App',
  'Software',
  'SaaS',
  'Automation'
]

const budgetRanges = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet'
]

const timelines = [
  'ASAP',
  '1 Month',
  '3 Months',
  'Flexible'
]

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    websiteUrl: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  })
  
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    if (!form.projectType) errs.projectType = 'Project type is required'
    if (!form.budget) errs.budget = 'Budget range is required'
    if (!form.timeline) errs.timeline = 'Timeline is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    try {
      // 1. Save to database
      const dbPromise = saveContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        service: form.projectType,
        budget: form.budget,
        message: `Website URL: ${form.websiteUrl || 'None'}. Timeline: ${form.timeline}. Message: ${form.message}`
      })

      // 2. Dispatch email via Resend
      const emailHtml = buildLeadEmailHtml({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        projectType: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
        formType: 'CONTACT FORM INQUIRY'
      })

      const emailPromise = sendResendEmail({
        subject: `[Lead] New Contact Form Inquiry from ${form.name}`,
        html: emailHtml,
        replyTo: form.email,
      })

      await Promise.allSettled([dbPromise, emailPromise])

      setStatus('success')
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        websiteUrl: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
      })
    } catch (err) {
      setStatus('error')
    }
  }

  const inputClasses =
    'w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold'
  const labelClasses =
    'font-sans font-black text-xs uppercase tracking-widest text-black mb-2 block'

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="border-4 border-black bg-accent-mint/20 shadow-[6px_6px_0px_0px_#000] p-8 text-center rounded-none"
      >
        <div className="w-16 h-16 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000] mb-6">
          <span className="text-3xl text-white font-black">✓</span>
        </div>
        <p className="font-sans font-black text-lg uppercase tracking-widest text-black mb-2">
          Message Dispatched
        </p>
        <p className="text-black font-bold text-sm max-w-sm mx-auto leading-relaxed">
          Thanks for reaching out. We have saved your lead details in the Supabase contacts registry. We will contact you within 12 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="font-mono text-xs uppercase tracking-widest text-black mt-8 cursor-pointer hover:underline font-bold"
        >
          [Send another message]
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
          {errors.name && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputClasses}
          />
          {errors.email && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>Phone Number *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClasses}
          />
          {errors.phone && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClasses}>Company Name</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-website" className={labelClasses}>Website URL</label>
          <input
            id="contact-website"
            name="websiteUrl"
            type="url"
            value={form.websiteUrl}
            onChange={handleChange}
            placeholder="https://acme.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="contact-type" className={labelClasses}>Project Type *</label>
          <select
            id="contact-type"
            name="projectType"
            required
            value={form.projectType}
            onChange={handleChange}
            className={`${inputClasses} cursor-pointer appearance-none`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="" disabled>Select type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.projectType && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.projectType}</p>}
        </div>
        
        <div>
          <label htmlFor="contact-budget" className={labelClasses}>Budget Range *</label>
          <select
            id="contact-budget"
            name="budget"
            required
            value={form.budget}
            onChange={handleChange}
            className={`${inputClasses} cursor-pointer appearance-none`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="" disabled>Select range</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.budget}</p>}
        </div>

        <div>
          <label htmlFor="contact-timeline" className={labelClasses}>Timeline *</label>
          <select
            id="contact-timeline"
            name="timeline"
            required
            value={form.timeline}
            onChange={handleChange}
            className={`${inputClasses} cursor-pointer appearance-none`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA0A6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="" disabled>Select timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.timeline && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.timeline}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>Message *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project, goals, and timeline..."
          className={`${inputClasses} resize-none`}
        />
        {errors.message && <p className="text-xs text-hot-red font-bold mt-1 uppercase">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-sans font-black text-xs uppercase tracking-widest text-hot-red">
          ERROR — SOMETHING WENT WRONG. PLEASE TRY AGAIN.
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'sending'} className="shadow-[4px_4px_0px_0px_#000] border-2">
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
