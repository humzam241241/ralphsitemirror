import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleNavClick = () => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={handleNavClick}
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-gold"
        >
          Ryan's Roofing
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={handleNavClick}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === link.to ? 'text-gold' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 hover:text-gold md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop when mobile menu open - click to close */}
      {mobileMenuOpen && (
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-[57px] z-40 bg-black/50 md:hidden"
          aria-label="Close menu"
        />
      )}

      {/* Mobile slide-in menu panel */}
      <div
        className={`fixed right-0 top-[57px] z-50 w-72 max-w-[85vw] border-l border-white/10 bg-black/95 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={handleNavClick}
              className={`rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-gold ${
                location.pathname === link.to ? 'bg-gold/10 text-gold' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
