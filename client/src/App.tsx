import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import WhatsappFab from './components/WhatsappFab'
import Footer from './sections/Footer'
import Home from './pages/Home'
import { IconSpinner } from './components/icons'

const AdminPage = lazy(() => import('./pages/AdminPage'))
const ApplyPage = lazy(() => import('./pages/ApplyPage'))
const TalentPage = lazy(() => import('./pages/TalentPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0f1a]">
      <IconSpinner className="h-6 w-6 animate-spin text-pomelo-blue" />
    </div>
  )
}

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
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#0a0f1a] focus:shadow-lg"
      >
        Skip to content
      </a>

      <AnimatePresence>{showPreloader && <Preloader key="preloader" />}</AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <WhatsappFab />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
