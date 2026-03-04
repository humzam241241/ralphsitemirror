import { useRaffy } from '../../contexts/RaffyContext'

export default function Hero() {
  const { openRaffy } = useRaffy()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-dark px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/80 to-dark"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,184,39,0.08)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Precision Roofing.{' '}
          <span className="text-gold">Smart Technology.</span> Trusted Expertise.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85 sm:text-xl">
          Ryan's Roofing combines decades of roofing craftsmanship with
          AI-powered inspections and estimates. Serving Durham Region with
          accuracy you can trust.
        </p>
        
        {/* Prominent CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={scrollToContact}
            className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-10 py-5 text-lg font-bold text-dark shadow-xl transition-all hover:scale-105 hover:bg-gold-hover hover:shadow-2xl sm:w-auto"
          >
            📞 Get Free Estimate
          </button>
          <button
            onClick={openRaffy}
            className="inline-flex w-full items-center justify-center rounded-lg border-2 border-gold bg-dark/50 px-10 py-5 text-lg font-bold text-gold shadow-xl transition-all hover:scale-105 hover:bg-gold/10 hover:shadow-2xl sm:w-auto"
          >
            💬 Meet Raffy (AI Assistant)
          </button>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="tel:+19055551234"
            className="flex items-center gap-2 text-white/80 transition-colors hover:text-gold"
          >
            <span className="text-xl">📱</span>
            <span className="font-semibold">(905) 555-1234</span>
          </a>
          <span className="hidden text-white/50 sm:inline">•</span>
          <a
            href="mailto:info@ryansroofing.ca"
            className="flex items-center gap-2 text-white/80 transition-colors hover:text-gold"
          >
            <span className="text-xl">✉️</span>
            <span className="font-semibold">info@ryansroofing.ca</span>
          </a>
        </div>
      </div>
    </section>
  )
}
