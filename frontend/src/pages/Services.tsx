import { WebGLShader } from "../components/ui/web-gl-shader"
import { Link } from "react-router-dom"
import { Search, Wrench, Home, Zap, Layout, RotateCcw, ArrowRight } from "lucide-react"

const services = [
  {
    id: "inspection",
    icon: Search,
    title: "AI-Powered Roof Inspections",
    description: "Advanced technology analyzes your roof for damage, wear, and potential issues—delivering detailed reports fast.",
    features: [
      "Drone-assisted aerial photography",
      "AI damage detection algorithm",
      "Comprehensive digital reports",
      "Instant quote generation"
    ],
    price: "Starting at $199"
  },
  {
    id: "repairs",
    icon: Wrench,
    title: "Roof Repairs",
    description: "From minor leaks to storm damage, we fix it right. Quick turnaround with quality materials and lasting results.",
    features: [
      "Leak detection and sealing",
      "Shingle replacement",
      "Flashing and ventilation repairs",
      "Same-day emergency service"
    ],
    price: "From $299"
  },
  {
    id: "replacement",
    icon: Home,
    title: "Full Roof Replacements",
    description: "When it's time for a new roof, we handle everything—tear-off, disposal, and installation with premium materials.",
    features: [
      "Complete tear-off and disposal",
      "Premium shingle selection",
      "Structural inspection",
      "10-year workmanship warranty"
    ],
    price: "Custom Quote"
  },
  {
    id: "emergency",
    icon: Zap,
    title: "Emergency Tarping",
    description: "Storm damage? We respond fast to secure your roof and prevent further water damage until repairs can be completed.",
    features: [
      "24/7 availability",
      "Rapid response time",
      "Temporary waterproofing",
      "Insurance documentation"
    ],
    price: "From $399"
  },
  {
    id: "flat-roofing",
    icon: Layout,
    title: "Flat Roofing",
    description: "Specialized flat roof systems for commercial and residential properties. Built-up, modified bitumen, and membrane options.",
    features: [
      "TPO and EPDM membrane systems",
      "Built-up roofing (BUR)",
      "Modified bitumen installation",
      "Commercial-grade materials"
    ],
    price: "Custom Quote"
  },
  {
    id: "gutters",
    icon: RotateCcw,
    title: "Gutter Services",
    description: "Gutter cleaning, repair, and replacement. Keep water flowing away from your foundation and protect your investment.",
    features: [
      "Gutter cleaning and maintenance",
      "Seamless gutter installation",
      "Downspout repairs",
      "Leaf guard systems"
    ],
    price: "From $149"
  }
]

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      <WebGLShader />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Our <span className="text-gold">Services</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            From AI-powered inspections to full replacements, we've got your roof covered across Durham Region
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-black/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-gold/10 p-3">
                    <Icon className="h-8 w-8 text-gold" />
                  </div>
                  <span className="text-sm font-semibold text-gold">{service.price}</span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                
                <p className="mb-4 text-white/70">
                  {service.description}
                </p>

                <ul className="mb-4 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1 text-gold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-4 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 to-gold/5 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Not Sure Which Service You Need?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-white/70">
            Our AI assistant Raffy can help analyze your needs and recommend the best solution. 
            Or give us a call and we'll walk you through it.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-8 py-4 font-bold text-dark transition-all hover:bg-gold/90"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:+19055551234"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gold px-8 py-4 font-bold text-gold transition-all hover:bg-gold/10"
            >
              Call (905) 555-1234
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
