import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 55, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 55, damping: 22, mass: 0.6 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45] hidden h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(0,178,226,0.14),rgba(137,81,147,0.09)_45%,transparent_72%)] blur-2xl" />
    </motion.div>
  )
}
