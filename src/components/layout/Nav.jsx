import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import Button from '../ui/Button'

const navLinks = [
  { label: 'WORK', href: '/work' },
  { label: 'SERVICES', href: '/services' },
  { label: 'INDUSTRIES', href: '/industries' },
  { label: 'INSIGHTS', href: '/insights' },
  { label: 'CONTACT', href: '/contact' }
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas border-b-4 border-black font-sans text-ink">
      <nav className="section-container flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          to="/"
          className="hover:-rotate-2 transition-transform duration-100 shrink-0 flex items-center"
        >
          <img
            src="/Webpixel-Logo-full.png"
            alt="WebPixel Studio"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            className="block"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`font-sans font-black text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer p-1.5 border-2 border-transparent hover:border-black hover:bg-vivid-yellow hover:-rotate-1 ${
                  location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href))
                    ? 'bg-hot-red text-ink border-2 border-black animate-pulse'
                    : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/estimate-project" variant="secondary" className="px-4 py-2 border-2 text-xs shadow-[2px_2px_0px_0px_#000]">
              ESTIMATE PROJECT
            </Button>
          </div>

          <div className="hidden md:block">
            <Link
              to="/client-login"
              className="font-sans font-black text-xs uppercase tracking-wider hover:underline"
            >
              Client Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer border-4 border-black bg-vivid-yellow active:translate-x-[2px] active:translate-y-[2px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-1 bg-black transition-transform duration-200 ${
                mobileOpen ? 'rotate-45 translate-y-[10px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-1 bg-black transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-1 bg-black transition-transform duration-200 ${
                mobileOpen ? '-rotate-45 -translate-y-[10px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-canvas border-b-4 border-black">
          <ul className="flex flex-col px-6 py-6 gap-4 border-t-4 border-black">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`block p-3 font-sans font-black text-sm uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_#000] ${
                    location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href))
                      ? 'bg-hot-red text-ink'
                      : 'bg-canvas text-ink hover:bg-vivid-yellow'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-4">
              <Button
                href="/estimate-project"
                variant="secondary"
                className="w-full text-xs border-4 py-3"
                onClick={() => setMobileOpen(false)}
              >
                ESTIMATE PROJECT
              </Button>
              <Link
                to="/client-login"
                className="text-center font-sans font-black text-sm uppercase tracking-wider py-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]"
                onClick={() => setMobileOpen(false)}
              >
                Client Portal
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
