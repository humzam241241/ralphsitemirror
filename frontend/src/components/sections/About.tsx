export default function About() {
  return (
    <section
      id="about"
      className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              About Ryan's Roofing
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-dark-3">
              Ryan's Roofing blends old-school craftsmanship with cutting-edge
              AI technology. We've been protecting homes across Durham Region for
              years—and now we're doing it smarter.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-dark-3">
              Our AI-powered assistant Raffy helps us deliver faster, more
              accurate inspections and estimates. You get the precision of
              technology with the trust of experienced roofers who know every
              shingle, every seam, and every storm that hits Ontario.
            </p>
            <p className="text-lg leading-relaxed text-dark-3">
              Proudly serving Oshawa, Whitby, Ajax, Pickering, and the greater
              Durham Region. When you need a roof you can count on, we're here.
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-dark p-8 text-white lg:p-10">
            <h3 className="mb-4 text-xl font-semibold text-gold">
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">✓</span>
                AI-powered inspections for accuracy
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">✓</span>
                Local expertise in Durham Region
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">✓</span>
                Transparent pricing and honest estimates
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">✓</span>
                Licensed, insured, and trusted
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
