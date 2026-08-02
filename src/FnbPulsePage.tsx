import Header from './components/layout/Header'
import LogoMark from './components/ui/LogoMark'
import FnbPulse from './components/sections/FnbPulse'
import Footer from './components/sections/Footer'

function FnbPulsePage() {
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
        <FnbPulse nextHref="#waitlist" />
      </main>
      <Footer />
    </div>
  )
}

export default FnbPulsePage
