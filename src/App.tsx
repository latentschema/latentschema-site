import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import FnbPulse from './components/sections/FnbPulse'
import Architecture from './components/sections/Architecture'
import Founder from './components/sections/Founder'
import Footer from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-base-950">
      <Header />
      <main>
        <Hero />
        <FnbPulse />
        <Architecture />
        <Founder />
      </main>
      <Footer />
    </div>
  )
}

export default App
