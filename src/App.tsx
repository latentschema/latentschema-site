import Header from './components/layout/Header'
import LogoMark from './components/ui/LogoMark'
import Hero from './components/sections/Hero'
import FnbPulse from './components/sections/FnbPulse'
import Architecture from './components/sections/Architecture'
import Resources from './components/sections/Resources'
import Founder from './components/sections/Founder'
import Footer from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-base-950">
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-20 -left-20 z-0 opacity-[0.16]"
      >
        <LogoMark size={630} />
      </div>
      <Header />
      <main>
        <Hero />
        <FnbPulse />
        <Architecture />
        <Resources />
        <Founder />
      </main>
      <Footer />
    </div>
  )
}

export default App
