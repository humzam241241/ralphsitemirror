import { WebGLShader } from "../components/ui/web-gl-shader"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Whitby, ON',
    rating: 5,
    text: "Ryan's Roofing did an amazing job on our roof replacement. The AI estimate was spot-on, and the crew was professional and efficient. They completed the job in just 2 days and left our property spotless. Highly recommend!",
    service: "Roof Replacement",
    date: "January 2024"
  },
  {
    name: 'James Kim',
    location: 'Oshawa, ON',
    rating: 5,
    text: "Had an emergency leak after a bad storm. They came out the same day for tarping and had the full repair done within a week. Great communication throughout the process. The AI assistant Raffy was actually really helpful too!",
    service: "Emergency Repair",
    date: "December 2023"
  },
  {
    name: 'Linda Patterson',
    location: 'Ajax, ON',
    rating: 5,
    text: "The AI-powered inspection was impressive—they caught issues I didn't even know about. Fair pricing and quality work. The team explained everything clearly and answered all my questions. Will use again for sure.",
    service: "Roof Inspection",
    date: "November 2023"
  },
  {
    name: 'David Rodriguez',
    location: 'Pickering, ON',
    rating: 5,
    text: "Best roofing experience we've had. Raffy made the estimate process quick and transparent. The installation team was courteous, arrived on time, and cleaned up perfectly. Our new roof looks fantastic!",
    service: "Roof Replacement",
    date: "October 2023"
  },
  {
    name: 'Michelle Chen',
    location: 'Whitby, ON',
    rating: 5,
    text: "Professional from start to finish. They repaired our flat roof quickly and it hasn't leaked since. The pricing was very competitive and they stood behind their 10-year warranty. Great local company!",
    service: "Flat Roofing",
    date: "September 2023"
  },
  {
    name: 'Robert Thompson',
    location: 'Oshawa, ON',
    rating: 5,
    text: "I was skeptical about the AI technology at first, but it made getting a quote so easy. The actual work exceeded my expectations. Ryan's crew was knowledgeable and worked efficiently even in challenging weather.",
    service: "Roof Repair",
    date: "August 2023"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-gold' : ''}`} />
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <div className="relative min-h-screen">
      <WebGLShader />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            What Our <span className="text-gold">Customers Say</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Trusted by homeowners across Durham Region for quality roofing and honest service
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group flex flex-col rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all hover:border-gold/30"
            >
              <Quote className="mb-4 h-8 w-8 text-gold/50" />
              
              <div className="mb-4 flex-1">
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-white/80">{testimonial.text}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gold">{testimonial.service}</p>
                    <p className="text-xs text-white/50">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-4xl font-bold text-gold">500+</div>
            <div className="text-white/70">Happy Customers</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-4xl font-bold text-gold">4.9</div>
            <div className="text-white/70">Average Rating</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-4xl font-bold text-gold">98%</div>
            <div className="text-white/70">Satisfaction Rate</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-gold/5 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Join Our Happy Customers
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-white/70">
            Experience the Ryan's Roofing difference. Get your free quote today.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gold px-8 py-4 font-bold text-dark transition-all hover:bg-gold/90"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  )
}
