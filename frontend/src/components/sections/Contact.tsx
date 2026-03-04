import { useState, type FormEvent } from 'react'
import CalendarEmbed from './CalendarEmbed'

const serviceTypes = [
  'Roof Inspection',
  'Roof Repair',
  'Full Replacement',
  'Emergency Tarping',
  'Flat Roofing',
  'Gutter Services',
  'Other',
]

const API_URL = import.meta.env.VITE_API_URL || 'https://ralphsitemirror.onrender.com'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: `${formData.get('message')}\n\nAddress: ${formData.get('address') || 'Not provided'}`,
    }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Contact form error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Prominent Header with Contact Options */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Get a Free Estimate
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-dark-3">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
          
          {/* Quick Contact Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+19055551234"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-blue/90 hover:shadow-xl sm:w-auto"
            >
              📞 Call Now: (905) 555-1234
            </a>
            <a
              href="mailto:info@ryansroofing.ca"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-blue bg-white px-8 py-4 text-lg font-bold text-brand-blue shadow-lg transition-all hover:scale-105 hover:bg-brand-blue/5 hover:shadow-xl sm:w-auto"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
        
        <div className="mb-12 text-center">
          <CalendarEmbed />
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-xl bg-brand-blue/10 p-8 text-center">
                <p className="text-xl font-semibold text-brand-blue">
                  Thank you for your message!
                </p>
                <p className="mt-2 text-dark-3">
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-brand-blue hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                    <p className="font-medium">Error: {error}</p>
                    <p className="mt-1 text-sm">
                      You can also call us directly at{' '}
                      <a href="tel:+19055551234" className="font-semibold underline">
                        (905) 555-1234
                      </a>
                    </p>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 rounded-xl bg-white p-6 shadow-sm sm:p-8"
                >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-dark"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-dark"
                    >
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-dark"
                    >
                      Service Type
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-dark"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Street, City, Postal Code"
                    className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-dark"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 w-full rounded-lg border border-dark-2/20 px-4 py-3 text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gold px-6 py-4 font-semibold text-dark transition-colors hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              </>
            )}
          </div>
          <div className="rounded-xl bg-dark p-6 text-white lg:p-8">
            <h3 className="mb-6 text-xl font-semibold text-gold">
              Contact Info
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/70">Phone</p>
                <a
                  href="tel:+19055551234"
                  className="text-lg font-medium hover:text-gold"
                >
                  (905) 555-1234
                </a>
              </div>
              <div>
                <p className="text-sm text-white/70">Email</p>
                <a
                  href="mailto:info@ryansroofing.ca"
                  className="text-lg font-medium hover:text-gold"
                >
                  info@ryansroofing.ca
                </a>
              </div>
              <div>
                <p className="text-sm text-white/70">Service Area</p>
                <p className="text-lg">
                  Durham Region, Ontario
                  <br />
                  <span className="text-sm text-white/80">
                    Oshawa, Whitby, Ajax, Pickering & surrounding areas
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
