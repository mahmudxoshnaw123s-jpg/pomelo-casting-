import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconArrowRight } from './icons'

const MotionLink = motion.create(Link)

interface Ripple {
  id: number
  x: number
  y: number
}

interface PremiumButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'solid' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

let rippleId = 0

export default function PremiumButton({ children, onClick, href, variant = 'solid', className = '', type = 'button' }: PremiumButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const location = useLocation()
  const resolvedHref = href && href.startsWith('#') && location.pathname !== '/' ? `/${href}` : href

  const handlePointerDown = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = rippleId++
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 700)
  }

  const baseClass = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 ${
    variant === 'solid'
      ? 'bg-gradient-to-r from-pomelo-blue to-pomelo-purple text-white shadow-lg shadow-pomelo-blue/20 hover:shadow-xl hover:shadow-pomelo-purple/30'
      : 'border border-white/20 bg-white/[0.03] text-white backdrop-blur-xl hover:border-pomelo-blue/60 hover:bg-white/[0.06]'
  } ${className}`

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="relative z-10"
        animate={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <IconArrowRight className="h-4 w-4" />
      </motion.span>

      {variant === 'solid' && (
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pomelo-purple to-pomelo-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ left: ripple.x, top: ripple.y }}
            className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50"
          />
        ))}
      </AnimatePresence>
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    onMouseDown: handlePointerDown,
  }

  if (href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    if (isInternal) {
      return (
        <MotionLink to={href} className={baseClass} {...motionProps}>
          {content}
        </MotionLink>
      )
    }
    return (
      <motion.a href={resolvedHref} className={baseClass} {...motionProps}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} className={baseClass} {...motionProps}>
      {content}
    </motion.button>
  )
}
