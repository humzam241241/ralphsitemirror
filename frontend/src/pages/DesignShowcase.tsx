import { WebGLShader } from "../components/ui/web-gl-shader"
import { LiquidButton } from "../components/ui/liquid-glass-button"
import { Sparkles, Zap, Rocket } from "lucide-react"

export default function DesignShowcase() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-screen">
      <WebGLShader />
      
      <div className="relative border border-[#27272a] p-2 w-full mx-auto max-w-4xl z-10">
        <main className="relative border border-[#27272a] py-16 px-6 overflow-hidden bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-gold h-8 w-8 mr-2 animate-pulse" />
            <h1 className="text-white text-center text-5xl md:text-7xl font-extrabold tracking-tighter">
              Ryan's Roofing
            </h1>
            <Zap className="text-gold h-8 w-8 ml-2 animate-pulse" />
          </div>
          
          <h2 className="mb-6 text-white text-center text-4xl md:text-6xl font-extrabold tracking-tighter">
            Design is Everything
          </h2>
          
          <p className="text-white/70 px-6 text-center text-sm md:text-base lg:text-lg mb-4">
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </p>
          
          <p className="text-white/60 px-6 text-center text-xs md:text-sm max-w-2xl mx-auto mb-8">
            Experience AI-powered roofing services with cutting-edge technology. 
            From instant quotes to 24/7 emergency support - we're revolutionizing the roofing industry.
          </p>
          
          <div className="my-8 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-sm text-green-500 font-semibold">Available for New Projects</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <LiquidButton 
              className="text-white border rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow" 
              size="xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Let's Go
            </LiquidButton>
            
            <button className="h-12 px-8 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-semibold">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
              <div className="text-gold text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-sm">Emergency Service</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
              <div className="text-gold text-3xl font-bold mb-2">AI</div>
              <div className="text-white/80 text-sm">Powered Quotes</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
              <div className="text-gold text-3xl font-bold mb-2">100%</div>
              <div className="text-white/80 text-sm">Satisfaction</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
