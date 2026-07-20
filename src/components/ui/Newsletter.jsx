import { useState } from 'react'
import Button from './Button'
import SpecLine from './SpecLine'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address')
      return
    }

    setStatus('sending')
    setError('')

    // Simulate subscription API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <div className="border-4 border-black p-8 bg-vivid-yellow shadow-[6px_6px_0px_0px_#000] relative rounded-none text-ink">
      {status === 'success' ? (
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 bg-accent-mint border-4 border-black rounded-none mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
            <span className="text-white font-black text-xl">✓</span>
          </div>
          <h4 className="font-sans font-black text-xl uppercase">Subscription locked!</h4>
          <p className="text-xs font-bold leading-relaxed max-w-xs mx-auto">
            You have successfully joined the WebPixel Studio newsletter. We send tech scoping resources fortnightly.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="font-mono text-[10px] uppercase font-bold hover:underline"
          >
            [Subscribe another email]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <SpecLine text="NEWSLETTER — WEEKLY SCOPING GUIDES" className="mb-2" />
          <h3 className="font-sans font-black text-2xl uppercase tracking-tight leading-none">
            Get developer-led insights.
          </h3>
          <p className="text-xs font-bold leading-relaxed max-w-md">
            No spam. Just hard-scoping software blueprints, API guides, and system templates sent straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex-grow">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-4 border-black px-4 py-3 text-xs placeholder:text-black/40 focus:outline-none focus:bg-white font-bold"
              />
              {error && <p className="text-[10px] text-hot-red font-bold mt-1 uppercase">{error}</p>}
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'sending'}
              className="px-6 py-3 text-xs border-4 shadow-none bg-black text-white hover:bg-hot-red hover:text-black shrink-0"
            >
              {status === 'sending' ? 'Joining...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
