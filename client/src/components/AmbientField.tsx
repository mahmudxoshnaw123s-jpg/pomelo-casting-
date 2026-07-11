import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

const particles = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 23 + 7) % 100,
  size: 2 + (i % 3),
  duration: 10 + (i % 5) * 2,
  delay: (i % 6) * 0.8,
}))

interface AmbientFieldProps {
  variantA?: string
  variantB?: string
}

export default function AmbientField({ variantA = 'bg-pomelo-purple/25', variantB = 'bg-pomelo-blue/15' }: AmbientFieldProps) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobY = useTransform(sy, [-0.5, 0.5], [-18, 18])

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div onMouseMove={handleMove} className="pointer-events-auto absolute inset-0 -z-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className={`pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full ${variantA} blur-[130px]`}
      />
      <motion.div
        style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
        className={`pointer-events-none absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full ${variantB} blur-[130px]`}
      />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>
    </div>
  )
}
