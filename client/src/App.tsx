import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import WhatsappFab from './components/WhatsappFab'
import Footer from './sections/Footer'
import AdminPage from './pages/AdminPage'
import ApplyPage from './pages/ApplyPage'
import Home from './pages/Home'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TalentPage from './pages/TalentPage'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [showPreloader, setShowPreloader] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem('pomelo-visited'),
  )

  useEffect(() => {
    if (!showPreloader) return
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('pomelo-visited', '1')
      setShowPreloader(false)
      document.body.style.overflow = ''
    }, 1400)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [showPreloader])

  if (isAdmin) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    )
  }

  return (
    <>
      <AnimatePresence>{showPreloader && <Preloader key="preloader" />}</AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <WhatsappFab />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <PageTransition>
                  <ServiceDetailPage />
                </PageTransition>
              }
            />
            <Route
              path="/talent"
              element={
                <PageTransition>
                  <TalentPage />
                </PageTransition>
              }
            />
            <Route
              path="/apply"
              element={
                <PageTransition>
                  <ApplyPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
