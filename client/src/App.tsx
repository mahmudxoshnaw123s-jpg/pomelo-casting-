import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import SectionRail from './components/SectionRail'
import WhatsappFab from './components/WhatsappFab'
import About from './sections/About'
import Contact from './sections/Contact'
import Faq from './sections/Faq'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Insights from './sections/Insights'
import Services from './sections/Services'
import Work from './sections/Work'
import { marquee } from './data/content'

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <SectionRail />
      <WhatsappFab />
      <main>
        <Hero />
        <Marquee items={marquee} />
        <About />
        <Services />
        <Work />
        <Insights />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
