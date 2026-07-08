import { useState } from 'react'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { FileText, CreditCard, MessageSquare, Folder, CheckSquare, LogOut, Lock } from 'lucide-react'

const mockTracker = [
  { step: 'Discovery', status: 'completed', desc: 'Completed on Week 2' },
  { step: 'Design', status: 'completed', desc: 'Completed on Week 4' },
  { step: 'Development', status: 'current', desc: 'In Progress — Sprints 3/5' },
  { step: 'Testing', status: 'pending', desc: 'Scheduled for Week 10' },
  { step: 'Launch', status: 'pending', desc: 'Scheduled for Week 12' }
]

const mockDocuments = [
  { name: 'Statement of Work (SOW)', date: '2026-06-01', size: '1.2 MB' },
  { name: 'Technical Architecture Plan', date: '2026-06-15', size: '2.4 MB' },
  { name: 'Product Requirements Document (PRD)', date: '2026-06-10', size: '890 KB' }
]

const mockInvoices = [
  { id: '#INV-2026-001', amount: '$15,000.00', status: 'Paid', date: '2026-06-01' },
  { id: '#INV-2026-002', amount: '$15,000.00', status: 'Pending', date: '2026-07-01' }
]

const mockMessages = [
  { sender: 'Alex (Lead Engineer)', content: 'Sprint 3 has been deployed to the staging server. We have implemented the map markers and customized the search inputs. Please review.', time: '2 hours ago' },
  { sender: 'Sophia (Designer)', content: 'I uploaded the brand assets and updated the SVG icons on the dashboard.', time: 'Yesterday' }
]

const mockFiles = [
  { name: 'high-fidelity-wireframes.pdf', type: 'PDF Document', size: '14.5 MB' },
  { name: 'logo-brand-assets-vector.zip', type: 'ZIP Archive', size: '3.2 MB' }
]

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }
    // Simple mock authentication
    setIsLoggedIn(true)
    setError('')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  const inputClasses =
    'w-full bg-white border-4 border-black rounded-none px-4 py-3 text-black text-sm placeholder:text-black/40 focus:outline-none focus:bg-vivid-yellow focus:shadow-[4px_4px_0px_0px_#000] transition-all duration-100 font-bold'
  const labelClasses =
    'font-sans font-black text-xs uppercase tracking-widest text-black mb-2 block'

  return (
    <>
      <section className="bg-canvas pt-20 md:pt-32 pb-16 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SpecLine text="PORTAL — WORKSPACE ACCESS" className="mb-3" />
            <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
              Client Portal
            </h1>
            <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
              Track project progression, download design assets, manage invoicing, and communicate with our core engineers.
            </p>
          </div>
          {isLoggedIn && (
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 border-2 shadow-[2px_2px_0px_0px_#000] py-3.5">
              <LogOut size={16} /> Logout
            </Button>
          )}
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black min-h-[50vh]">
        <div className="section-container">
          {!isLoggedIn ? (
            /* LOGIN SCREEN */
            <div className="max-w-md mx-auto">
              <HairlineCard className="p-8 md:p-12 bg-white" hover={false}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-vivid-yellow border-4 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#000] mb-4">
                    <Lock size={20} />
                  </div>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tight">Client Access</h2>
                  <p className="text-xs font-bold text-ink/60 mt-1">Enter credentials supplied in your kickoff document</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="portal-email" className={labelClasses}>Client Email</label>
                    <input
                      id="portal-email"
                      type="email"
                      required
                      placeholder="client@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="portal-pass" className={labelClasses}>Access Password</label>
                    <input
                      id="portal-pass"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-black text-hot-red uppercase tracking-wider">{error}</p>
                  )}

                  <Button type="submit" variant="primary" className="w-full border-2 py-4 shadow-[4px_4px_0px_0px_#000]">
                    Verify Credentials
                  </Button>
                </form>
              </HairlineCard>
            </div>
          ) : (
            /* DASHBOARD SCREEN */
            <div className="space-y-12">
              
              {/* Tracker */}
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
                <SpecLine text="PROJECT TRACKER — STAGE 3 IN PROGRESS" className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
                  {mockTracker.map((t, idx) => (
                    <div
                      key={t.step}
                      className={`p-5 border-4 border-black relative ${
                        t.status === 'completed'
                          ? 'bg-accent-mint/10 border-accent-mint'
                          : t.status === 'current'
                          ? 'bg-vivid-yellow/20 border-vivid-yellow border-dashed'
                          : 'bg-canvas opacity-65'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-xs text-fog font-black">STAGE 0{idx + 1}</span>
                        {t.status === 'completed' && (
                          <span className="text-xs font-black text-accent-mint">✓</span>
                        )}
                        {t.status === 'current' && (
                          <span className="text-[9px] font-black uppercase bg-vivid-yellow px-1.5 py-0.5 border border-black animate-pulse">ACTIVE</span>
                        )}
                      </div>
                      <h3 className="font-sans font-black text-lg uppercase tracking-tight mb-1">{t.step}</h3>
                      <p className="font-mono text-[10px] text-ink/65">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side: Documents & Invoices */}
                <div className="lg:col-span-6 space-y-8">
                  {/* Documents */}
                  <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-6">
                      <FileText size={24} className="text-hot-red" />
                      <h2 className="font-sans font-black text-xl uppercase tracking-tight">Project Documents</h2>
                    </div>
                    <div className="space-y-4">
                      {mockDocuments.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-canvas border-2 border-black">
                          <div>
                            <p className="font-sans font-black text-sm uppercase text-black">{doc.name}</p>
                            <p className="font-mono text-[10px] text-fog/90">Uploaded: {doc.date} | Size: {doc.size}</p>
                          </div>
                          <button type="button" className="font-mono text-xs uppercase font-bold border-2 border-black bg-white px-3 py-1.5 hover:bg-vivid-yellow cursor-pointer">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invoices */}
                  <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard size={24} className="text-vivid-yellow" />
                      <h2 className="font-sans font-black text-xl uppercase tracking-tight">Billing & Invoices</h2>
                    </div>
                    <div className="space-y-4">
                      {mockInvoices.map((inv, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-canvas border-2 border-black">
                          <div>
                            <p className="font-sans font-black text-sm uppercase text-black">{inv.id}</p>
                            <p className="font-mono text-[10px] text-fog/90">Due: {inv.date} | Sum: {inv.amount}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge bg={inv.status === 'Paid' ? 'bg-accent-mint/30' : 'bg-hot-red/20'} className="border text-[10px]">
                              {inv.status}
                            </Badge>
                            <button type="button" className="font-mono text-xs uppercase font-bold border-2 border-black bg-white px-3 py-1.5 hover:bg-vivid-yellow cursor-pointer">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Messages & Files */}
                <div className="lg:col-span-6 space-y-8">
                  {/* Messages */}
                  <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare size={24} className="text-accent-cobalt" />
                      <h2 className="font-sans font-black text-xl uppercase tracking-tight">Studio Messages</h2>
                    </div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {mockMessages.map((msg, idx) => (
                        <div key={idx} className="p-4 bg-canvas border-2 border-black space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-sans font-black text-xs text-accent-cobalt uppercase">{msg.sender}</span>
                            <span className="font-mono text-[9px] text-fog font-bold">{msg.time}</span>
                          </div>
                          <p className="text-xs font-bold text-ink leading-relaxed">{msg.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t-2 border-black/10">
                      <input
                        type="text"
                        placeholder="Write a message to your engineers..."
                        className="w-full bg-canvas border-2 border-black px-3 py-2 text-xs font-bold focus:outline-none focus:bg-vivid-yellow"
                      />
                    </div>
                  </div>

                  {/* Files */}
                  <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0px_0px_#000]">
                    <div className="flex items-center gap-3 mb-6">
                      <Folder size={24} className="text-accent-mint" />
                      <h2 className="font-sans font-black text-xl uppercase tracking-tight">Shared Assets & Files</h2>
                    </div>
                    <div className="space-y-4">
                      {mockFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-canvas border-2 border-black">
                          <div>
                            <p className="font-sans font-black text-sm uppercase text-black">{file.name}</p>
                            <p className="font-mono text-[10px] text-fog/90">{file.type} | Size: {file.size}</p>
                          </div>
                          <button type="button" className="font-mono text-xs uppercase font-bold border-2 border-black bg-white px-3 py-1.5 hover:bg-vivid-yellow cursor-pointer">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}
