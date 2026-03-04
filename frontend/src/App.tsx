import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ServicesPage from './pages/Services'
import FAQPage from './pages/FAQ'
import TestimonialsPage from './pages/Testimonials'
import ContactPage from './pages/Contact'
import DesignShowcase from './pages/DesignShowcase'
import RaffyWidget from './components/raffy/RaffyWidget'
import FloatingContactBar from './components/ui/FloatingContactBar'
import Schema from './components/SEO/Schema'
import { RaffyProvider } from './contexts/RaffyContext'

export default function App() {
  return (
    <BrowserRouter>
      <RaffyProvider>
        <Schema />
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/showcase" element={<DesignShowcase />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContactBar />
          <RaffyWidget />
        </div>
      </RaffyProvider>
    </BrowserRouter>
  )
}
