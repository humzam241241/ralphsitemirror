import { WebGLShader } from "../components/ui/web-gl-shader"
import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import CalendarEmbed from '../components/sections/CalendarEmbed'

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

export default function ContactPage() {
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
    <div className="relative min-h-screen">
      <WebGLShader />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Get a <span className="text-gold">Free Estimate</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          {/* Quick Contact Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+19055551234"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-dark shadow-lg transition-all hover:scale-105 hover:bg-gold/90 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Call Now: (905) 555-1234
            </a>
            <a
              href="mailto:info@ryansroofing.ca"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gold bg-black/30 px-8 py-4 text-lg font-bold text-gold backdrop-blur-sm transition-all hover:scale-105 hover:bg-gold/10 sm:w-auto"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>

        {/* Book Online */}
        <div className="mb-12 text-center">
          <CalendarEmbed />
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-xl border border-gold/30 bg-gold/10 p-8 text-center backdrop-blur-sm">
                <p className="text-xl font-semibold text-gold">
                  Thank you for your message!
                </p>
                <p className="mt-2 text-white/70">
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-gold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200 backdrop-blur-sm">
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
                  className="space-y-6 rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm sm:p-8"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-white">
                        Service Type
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      >
                        {serviceTypes.map((type) => (
                          <option key={type} value={type} className="bg-dark">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-white">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Street, City, Postal Code"
                      className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gold px-6 py-4 font-semibold text-dark transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <h3 className="mb-6 text-xl font-semibold text-gold">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gold/10 p-2">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <a href="tel:+19055551234" className="text-lg font-medium text-white hover:text-gold">
                      (905) 555-1234
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gold/10 p-2">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <a href="mailto:info@ryansroofing.ca" className="text-lg font-medium text-white hover:text-gold break-all">
                      info@ryansroofing.ca
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gold/10 p-2">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Service Area</p>
                    <p className="text-white">
                      Durham Region, Ontario
                      <br />
                      <span className="text-sm text-white/60">
                        Oshawa, Whitby, Ajax, Pickering & surrounding areas
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gold/10 p-2">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Hours</p>
                    <p className="text-white">
                      Mon-Fri: 7am - 7pm
                      <br />
                      Sat: 8am - 5pm
                      <br />
                      Sun: Emergency Only
                      <br />
                      <span className="text-sm text-gold">24/7 Emergency Service</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
