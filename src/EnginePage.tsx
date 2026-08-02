import Header from './components/layout/Header'
import LogoMark from './components/ui/LogoMark'
import EngineBridge from './components/sections/EngineBridge'
import Architecture from './components/sections/Architecture'
import Footer from './components/sections/Footer'

function EnginePage() {
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
        <EngineBridge nextHref="#architecture" />
        <Architecture nextHref="#waitlist" whitepapersHref="/#resources" />
      </main>
      <Footer />
    </div>
  )
}

export default EnginePage
