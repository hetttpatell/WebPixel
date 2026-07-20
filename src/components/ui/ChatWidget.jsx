import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

const initialSuggestions = [
  { text: 'How much does a website cost?', key: 'cost' },
  { text: 'Can you build custom SaaS?', key: 'saas' },
  { text: 'How do I book a strategy call?', key: 'booking' }
]

const responses = {
  cost: "Our custom websites are dynamically scoped to match your exact budget in Indian Rupees (₹). They are custom-coded, speed-optimized, and integrated with modern CMS tools. Try our online Estimator: [Go to Estimator](/estimate-project)",
  saas: "Yes! We build secure multi-tenant SaaS products, user role dashboards, and payment gateway setups. Our projects are dynamically priced in INR based on your scope. [View our SaaS solution](/services/saas-development)",
  booking: "You can book a direct 30-minute strategy call with our engineering leads! Select a date and outline your purpose on our consultation page. [Book strategy call](/book-call)"
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am WebPixel Bot. Ask me about our custom engineering, scoping prices, or direct bookings.', time: 'Just now' }
  ])
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = (text, key = null) => {
    if (!text.trim()) return

    const newMsgs = [...messages, { sender: 'user', text, time: 'Just now' }]
    setMessages(newMsgs)
    setInput('')
    
    // Clear suggestions if they clicked one
    if (key) {
      setSuggestions([])
    }

    setTimeout(() => {
      let botResponse = "Thanks for reaching out! Our engineering team will review your message. If you want to lock in a timeline, try our Estimator: [Scoping Estimator](/estimate-project) or [Book Call](/book-call)."
      
      if (key && responses[key]) {
        botResponse = responses[key]
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse, time: 'Just now' }
      ])

      // Reset suggestions if it was a custom type, or keep some
      if (!key) {
        setSuggestions(initialSuggestions)
      }
    }, 1000)
  }

  const parseLinks = (text) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          className="text-hot-red underline font-black hover:text-vivid-yellow"
        >
          {match[1]}
        </a>
      )
      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-ink">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[350px] md:w-[380px] h-[480px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col mb-4 overflow-hidden rounded-none"
          >
            {/* Header */}
            <div className="bg-canvas border-b-4 border-black p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/Webpixel-Logo-short.png"
                  alt="WebPixel"
                  className="w-8 h-8 object-contain shrink-0"
                />
                <div>
                  <h3 className="font-sans font-black text-sm uppercase tracking-wider">WebPixel Studio</h3>
                  <span className="font-mono text-[9px] text-accent-mint font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent-mint rounded-full inline-block animate-pulse" />
                    Engineers Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 border-2 border-black hover:bg-hot-red cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-canvas space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 items-start ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 border-2 border-black flex items-center justify-center shrink-0 ${
                      m.sender === 'user' ? 'bg-soft-violet' : 'bg-vivid-yellow'
                    }`}
                  >
                    {m.sender === 'user' ? (
                      <User size={14} />
                    ) : (
                      <img src="/Webpixel-Logo-short.png" alt="WP" className="w-full h-full object-contain bg-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 border-2 border-black text-xs font-bold leading-relaxed max-w-[70%] ${
                      m.sender === 'user' ? 'bg-white shadow-[2px_2px_0px_0px_#000]' : 'bg-white shadow-[2px_2px_0px_0px_#000]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{parseLinks(m.text)}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 bg-canvas/50 border-t-2 border-dashed border-black/15 flex flex-col gap-1.5 shrink-0">
                {suggestions.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => handleSendMessage(s.text, s.key)}
                    className="text-left bg-white hover:bg-vivid-yellow border-2 border-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(input)
              }}
              className="border-t-4 border-black bg-white p-3 flex gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask WebPixel anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-canvas border-2 border-black px-3 py-2 text-xs font-bold focus:outline-none focus:bg-vivid-yellow"
              />
              <button
                type="submit"
                className="p-2.5 bg-hot-red border-2 border-black hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-hot-red border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer rounded-none"
        aria-label="Toggle chat widget"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  )
}
