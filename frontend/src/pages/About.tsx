import { WebGLShader } from "../components/ui/web-gl-shader"
import { Award, Users, Target, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <WebGLShader />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            About <span className="text-gold">Ryan's Roofing</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Where traditional craftsmanship meets cutting-edge AI technology
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Story Section */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold text-gold">Our Story</h2>
            <div className="space-y-4 text-white/80">
              <p>
                For over 15 years, Ryan's Roofing has been protecting homes across Durham Region. 
                What started as a small family business in Oshawa has grown into one of the most 
                trusted roofing companies in the Greater Toronto Area.
              </p>
              <p>
                Founded by Ryan McKenzie, a third-generation roofer, our company was built on 
                a simple philosophy: combine old-school craftsmanship with new-school technology 
                to deliver the best possible service to our customers.
              </p>
              <p>
                In 2023, we revolutionized our approach by integrating AI-powered inspection 
                technology. This allows us to provide faster, more accurate quotes while 
                maintaining the personal touch and quality workmanship that made us successful.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold text-gold">Our Mission</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-gold/10 p-3">
                  <Target className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Precision & Quality</h3>
                  <p className="text-white/70">
                    Every roof we install or repair is done with meticulous attention to detail 
                    and the highest quality materials available.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-gold/10 p-3">
                  <Sparkles className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Innovation</h3>
                  <p className="text-white/70">
                    We leverage AI and modern technology to provide faster service and more 
                    accurate assessments without sacrificing the human touch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-gold/10 p-3">
                  <Users className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Customer First</h3>
                  <p className="text-white/70">
                    Your satisfaction is our priority. We don't just fix roofs—we build 
                    lasting relationships with our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 rounded-xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
          <h2 className="mb-8 text-center text-3xl font-bold text-gold">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h3 className="mb-2 font-semibold text-white">Licensed & Insured</h3>
              <p className="text-sm text-white/60">
                Fully licensed with comprehensive liability and workers' comp coverage
              </p>
            </div>
            <div className="text-center">
              <Target className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h3 className="mb-2 font-semibold text-white">AI-Powered</h3>
              <p className="text-sm text-white/60">
                Advanced technology for accurate inspections and instant quotes
              </p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h3 className="mb-2 font-semibold text-white">Local Experts</h3>
              <p className="text-sm text-white/60">
                Born and raised in Durham Region, we know Ontario weather
              </p>
            </div>
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-gold" />
              <h3 className="mb-2 font-semibold text-white">24/7 Emergency</h3>
              <p className="text-sm text-white/60">
                Storm damage? We respond immediately to protect your home
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12 rounded-xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm">
          <h2 className="mb-8 text-center text-3xl font-bold text-gold">Meet the Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-gold to-gold/50" />
              <h3 className="mb-1 text-lg font-semibold text-white">Ryan McKenzie</h3>
              <p className="mb-2 text-sm text-gold">Founder & Lead Roofer</p>
              <p className="text-sm text-white/60">
                15+ years experience, third-generation roofer
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-gold to-gold/50" />
              <h3 className="mb-1 text-lg font-semibold text-white">Sarah Chen</h3>
              <p className="mb-2 text-sm text-gold">Operations Manager</p>
              <p className="text-sm text-white/60">
                Ensuring every project runs smoothly
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-gold to-gold/50" />
              <h3 className="mb-1 text-lg font-semibold text-white">Marcus Williams</h3>
              <p className="mb-2 text-sm text-gold">Senior Technician</p>
              <p className="text-sm text-white/60">
                Expert in emergency repairs and restoration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
