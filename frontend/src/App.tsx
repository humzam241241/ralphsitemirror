import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import RaffyWidget from './components/raffy/RaffyWidget'
import Schema from './components/SEO/Schema'

export default function App() {
  return (
    <BrowserRouter>
      <Schema />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <RaffyWidget />
      </div>
    </BrowserRouter>
  )
}
