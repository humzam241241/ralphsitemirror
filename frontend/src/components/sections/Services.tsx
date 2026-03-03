const services = [
  {
    icon: '🔍',
    title: 'Roof Inspections (AI-Powered)',
    description:
      'Our AI technology analyzes your roof for damage, wear, and potential issues—delivering detailed reports and accurate estimates.',
  },
  {
    icon: '🔧',
    title: 'Roof Repairs',
    description:
      'From minor leaks to storm damage, we fix it right. Quick turnaround with quality materials and lasting results.',
  },
  {
    icon: '🏠',
    title: 'Full Roof Replacements',
    description:
      "When it's time for a new roof, we handle everything—tear-off, disposal, and installation with premium materials.",
  },
  {
    icon: '⚡',
    title: 'Emergency Tarping',
    description:
      'Storm damage? We respond fast to secure your roof and prevent further water damage until repairs can be completed.',
  },
  {
    icon: '📐',
    title: 'Flat Roofing',
    description:
      'Specialized flat roof systems for commercial and residential properties. Built-up, modified bitumen, and membrane options.',
  },
  {
    icon: '🔄',
    title: 'Gutter Services',
    description:
      'Gutter cleaning, repair, and replacement. Keep water flowing away from your foundation and protect your investment.',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          Our Services
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-dark-3">
          From AI-powered inspections to full replacements, we've got your roof
          covered across Durham Region.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-dark-2/10 bg-light-bg p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 text-3xl">{service.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-dark">
                {service.title}
              </h3>
              <p className="text-dark-3">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
