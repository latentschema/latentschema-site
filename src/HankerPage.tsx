import Header from './components/layout/Header'
import LogoMark from './components/ui/LogoMark'
import Hanker from './components/sections/Hanker'
import Footer from './components/sections/Footer'

function HankerPage() {
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
        <Hanker nextHref="#waitlist" />
      </main>
      <Footer />
    </div>
  )
}

export default HankerPage
