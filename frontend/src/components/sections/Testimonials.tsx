const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Whitby, ON',
    rating: 5,
    text: "Ryan's Roofing did an amazing job on our roof replacement. The AI estimate was spot-on, and the crew was professional and efficient. Highly recommend!",
  },
  {
    name: 'James K.',
    location: 'Oshawa, ON',
    rating: 5,
    text: "Had an emergency leak after a storm. They came out same day for tarping and had the full repair done within a week. Great communication throughout.",
  },
  {
    name: 'Linda P.',
    location: 'Ajax, ON',
    rating: 5,
    text: "The AI-powered inspection was impressive—they caught issues I didn't even know about. Fair pricing and quality work. Will use again for sure.",
  },
  {
    name: 'David R.',
    location: 'Pickering, ON',
    rating: 5,
    text: "Best roofing experience we've had. Raffy made the estimate process quick and transparent. The team was courteous and left our property clean.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          What Our Customers Say
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-dark-3">
          Trusted by homeowners across Durham Region for quality roofing and
          honest service.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-dark-2/10 bg-light-bg p-6"
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 flex-1 text-dark-3">{t.text}</p>
              <div className="mt-4 border-t border-dark-2/10 pt-4">
                <p className="font-semibold text-dark">{t.name}</p>
                <p className="text-sm text-dark-3">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
