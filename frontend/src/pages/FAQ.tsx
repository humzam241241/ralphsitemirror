import { WebGLShader } from "../components/ui/web-gl-shader"
import { useState } from "react"

const faqs = [
  {
    question: 'What areas do you serve?',
    answer: "We serve the entire Durham Region including Oshawa, Whitby, Ajax, Pickering, Clarington, and surrounding areas. If you're in the GTA or Durham, we can help."
  },
  {
    question: 'How does your AI technology work?',
    answer: "Our AI assistant Raffy helps analyze roof imagery and inspection data to provide faster, more accurate estimates. It doesn't replace our experienced roofers—it augments their expertise so you get precise assessments and transparent pricing."
  },
  {
    question: 'How much does a roof replacement cost?',
    answer: "Costs vary based on roof size, materials, and complexity. We offer free estimates—contact us for a no-obligation quote. Our AI-powered process helps us give you accurate numbers quickly."
  },
  {
    question: 'Do you offer emergency services?',
    answer: "Yes. For storm damage or sudden leaks, we offer emergency tarping to secure your roof and prevent further damage. Call us and we'll prioritize your situation."
  },
  {
    question: 'Are you licensed and insured?',
    answer: "Absolutely. Ryan's Roofing is fully licensed and insured. We carry liability and workers' compensation coverage for your peace of mind."
  },
  {
    question: 'How long does a typical roof replacement take?',
    answer: "Most residential roof replacements are completed in 1–2 days, depending on size and weather. We'll give you a clear timeline during your estimate."
  },
  {
    question: 'What type of roofing materials do you use?',
    answer: "We work with premium asphalt shingles, metal roofing, flat roofing systems (TPO, EPDM), and more. We'll recommend the best material for your budget and needs."
  },
  {
    question: 'Do you provide warranties?',
    answer: "Yes! We offer a 10-year workmanship warranty on all installations, plus manufacturer warranties on materials (typically 25-50 years depending on the product)."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="relative min-h-screen">
      <WebGLShader />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Common questions about our roofing services and AI technology
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-white transition-colors hover:bg-white/5"
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
                  <div className="border-t border-white/10 px-6 py-4 text-white/70">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-gold/5 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-white/70">
            Our team is here to help. Give us a call or send us a message and we'll be happy to answer any questions you have.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+19055551234"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-8 py-4 font-bold text-dark transition-all hover:bg-gold/90"
            >
              Call (905) 555-1234
            </a>
            <a
              href="mailto:info@ryansroofing.ca"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gold px-8 py-4 font-bold text-gold transition-all hover:bg-gold/10"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
