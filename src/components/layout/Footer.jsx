import { Link } from 'react-router'
import SpecLine from '../ui/SpecLine'

export default function Footer() {
  return (
    <footer className="bg-canvas border-t-4 border-black py-16 md:py-24 font-sans text-ink">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Logo & Pitch */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              className="hover:-rotate-2 inline-block transition-transform mb-2"
            >
              <img
                src="/Webpixel-Logo-full.png"
                alt="WebPixel Studio"
                style={{ height: '150px', marginBottom: '10px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p className="text-base font-bold max-w-sm leading-relaxed">
              Full-stack design and engineering studio crafting custom web, SaaS, and mobile applications.
            </p>
            <p className="font-mono text-xs text-ink/75 font-bold">
              Based in Ahmedabad, India. <br />
              Working remotely with clients across India and beyond.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-4">
            <SpecLine text="NAVIGATION" />
            <ul className="space-y-2 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link to="/work" className="hover:underline hover:text-hot-red">
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline hover:text-hot-red">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline hover:text-hot-red">
                  About Studio
                </Link>
              </li>
              <li>
                <Link to="/estimate-project" className="hover:underline hover:text-hot-red text-hot-red">
                  Project Cost Estimator
                </Link>
              </li>
              <li>
                <Link to="/book-call" className="hover:underline hover:text-hot-red text-hot-red">
                  Book Strategy Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <SpecLine text="STUDIO & LEGAL" />
            <ul className="space-y-2 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link to="/process" className="hover:underline hover:text-hot-red">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/retainer" className="hover:underline hover:text-hot-red">
                  Retainer SLA
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline hover:text-hot-red">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline hover:text-hot-red">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-4">
            <SpecLine text="GET IN TOUCH" />
            <ul className="space-y-2 text-sm font-bold tracking-wider">
              <li>
                <a href="mailto:hello@webpixel.io" className="font-mono text-sm font-black text-hot-red hover:underline block">
                  hetpatel140505@gmail.com
                </a>
              </li>
              <li>
                <Link to="/book-call" className="inline-block mt-2 font-mono text-[11px] font-black uppercase bg-vivid-yellow border-2 border-black px-3 py-1 hover:bg-hot-red hover:!text-black !text-black transition-colors shadow-[2px_2px_0px_0px_#000]">
                  Booking →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono font-bold">
          <p>© 2026 WebPixel Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@webpixel.io" className="hover:underline hover:text-hot-red">
              hello@webpixel.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
