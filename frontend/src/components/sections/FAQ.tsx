import { useState } from 'react'

const faqs = [
  {
    question: 'What areas do you serve?',
    answer:
      "We serve the entire Durham Region including Oshawa, Whitby, Ajax, Pickering, Clarington, and surrounding areas. If you're in the GTA or Durham, we can help.",
  },
  {
    question: 'How does your AI technology work?',
    answer:
      "Our AI assistant Raffy helps analyze roof imagery and inspection data to provide faster, more accurate estimates. It doesn't replace our experienced roofers—it augments their expertise so you get precise assessments and transparent pricing.",
  },
  {
    question: 'How much does a roof replacement cost?',
    answer:
      "Costs vary based on roof size, materials, and complexity. We offer free estimates—contact us for a no-obligation quote. Our AI-powered process helps us give you accurate numbers quickly.",
  },
  {
    question: 'Do you offer emergency services?',
    answer:
      "Yes. For storm damage or sudden leaks, we offer emergency tarping to secure your roof and prevent further damage. Call us and we'll prioritize your situation.",
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      "Absolutely. Ryan's Roofing is fully licensed and insured. We carry liability and workers' compensation coverage for your peace of mind.",
  },
  {
    question: 'How long does a typical roof replacement take?',
    answer:
      "Most residential roof replacements are completed in 1–2 days, depending on size and weather. We'll give you a clear timeline during your estimate.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="bg-light-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-dark-3">
          Common questions about our roofing services and AI technology.
        </p>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-dark-2/10 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-dark transition-colors hover:bg-light-bg"
              >
                {faq.question}
                <span
                  className={`ml-2 shrink-0 text-gold transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-dark-2/10 px-6 py-4 text-dark-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
