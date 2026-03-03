import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import FAQ from '../components/sections/FAQ'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Testimonials />
      <Contact />
    </div>
  )
}
