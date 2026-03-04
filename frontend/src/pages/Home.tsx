import { WebGLShader } from "../components/ui/web-gl-shader"
import { LiquidButton } from "../components/ui/liquid-glass-button"
import { Hammer, Shield, Zap, Phone, Mail } from "lucide-react"
import { useRaffy } from '../contexts/RaffyContext'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { openRaffy } = useRaffy()

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-screen">
      <WebGLShader />
      
      <div className="relative border border-[#27272a] p-2 w-full mx-auto max-w-5xl z-10">
        <main className="relative border border-[#27272a] py-16 px-6 overflow-hidden bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <Hammer className="text-gold h-8 w-8 mr-2 animate-pulse" />
            <h1 className="text-white text-center text-5xl md:text-7xl font-extrabold tracking-tighter">
              Ryan's Roofing
            </h1>
            <Shield className="text-gold h-8 w-8 ml-2 animate-pulse" />
          </div>
          
          <h2 className="mb-6 text-white text-center text-3xl md:text-5xl font-extrabold tracking-tighter">
            Precision Roofing. <span className="text-gold">Smart Technology.</span>
          </h2>
          
          <p className="text-white/70 px-6 text-center text-sm md:text-base lg:text-lg mb-4">
            Protecting Durham Region homes with decades of craftsmanship and AI-powered precision
          </p>
          
          <p className="text-white/60 px-6 text-center text-xs md:text-sm max-w-2xl mx-auto mb-8">
            Experience next-generation roofing services with cutting-edge AI technology. 
            From instant quotes to 24/7 emergency support - we're revolutionizing the roofing industry one shingle at a time.
          </p>
          
          <div className="my-8 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-sm text-green-500 font-semibold">Available for Emergency Repairs</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-8">
            <Link to="/contact">
              <LiquidButton 
                className="text-white border rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow" 
                size="xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote
              </LiquidButton>
            </Link>
            
            <button 
              onClick={openRaffy}
              className="h-12 px-8 rounded-full border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Meet Raffy AI
            </button>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-white/80">
            <a href="tel:+19055551234" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="h-4 w-4" />
              <span>(905) 555-1234</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:info@ryansroofing.ca" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@ryansroofing.ca</span>
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-gold/30 transition-all">
              <div className="text-gold text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-sm">Emergency Service</div>
              <div className="text-white/50 text-xs mt-1">Available Anytime</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-gold/30 transition-all">
              <div className="text-gold text-3xl font-bold mb-2">AI</div>
              <div className="text-white/80 text-sm">Powered Inspections</div>
              <div className="text-white/50 text-xs mt-1">Instant Accuracy</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-gold/30 transition-all">
              <div className="text-gold text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
              <div className="text-white/50 text-xs mt-1">Trusted Locally</div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm mb-2">Proudly Serving</p>
            <p className="text-white/70 text-sm">
              Oshawa • Whitby • Ajax • Pickering • Durham Region
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
