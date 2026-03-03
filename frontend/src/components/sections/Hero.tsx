import { Link } from 'react-router-dom'

export default function Hero() {
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
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/#contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-8 py-4 text-base font-semibold text-dark transition-colors hover:bg-gold-hover sm:w-auto"
          >
            Get a Free Estimate
          </Link>
          <Link
            to="/#about"
            className="inline-flex w-full items-center justify-center rounded-lg border-2 border-gold px-8 py-4 text-base font-semibold text-gold transition-colors hover:bg-gold/10 sm:w-auto"
          >
            Meet Raffy
          </Link>
        </div>
      </div>
    </section>
  )
}
