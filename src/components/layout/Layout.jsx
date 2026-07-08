/**
 * Layout — Wraps Nav + page content + Footer
 */
import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import ChatWidget from '../ui/ChatWidget'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-hot-red selection:text-ink">
      <Nav />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

