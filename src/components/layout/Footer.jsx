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
              className="font-sans font-black text-2xl uppercase tracking-widest text-ink hover:-rotate-2 inline-block transition-transform"
            >
              CALIBER
            </Link>
            <p className="text-base font-bold max-w-sm leading-relaxed">
              A full-stack design and engineering studio crafting premium digital products with technical precision and design intention.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-4">
            <SpecLine text="NAVIGATION" />
            <ul className="space-y-2 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link to="/work" className="hover:underline hover:text-hot-red">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline hover:text-hot-red">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:underline hover:text-hot-red">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:underline hover:text-hot-red">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/estimate-project" className="hover:underline hover:text-hot-red text-hot-red">
                  Cost Estimator
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <SpecLine text="STUDIO" />
            <ul className="space-y-2 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link to="/process" className="hover:underline hover:text-hot-red">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:underline hover:text-hot-red">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/retainer" className="hover:underline hover:text-hot-red">
                  Retainers
                </Link>
              </li>
              <li>
                <Link to="/client-login" className="hover:underline hover:text-hot-red">
                  Client Workspace
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline hover:text-hot-red">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline hover:text-hot-red">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-4">
            <SpecLine text="GET IN TOUCH" />
            <ul className="space-y-2 text-sm font-bold uppercase tracking-wider">
              <li>
                <a href="mailto:hello@caliber.studio" className="hover:underline hover:text-hot-red">
                  hello@caliber.studio
                </a>
              </li>
              <li>
                <span className="block text-ink">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono font-bold">
          <p>© {new Date().getFullYear()} Caliber Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-hot-red">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-hot-red">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-hot-red">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
