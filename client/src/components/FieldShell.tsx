import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { IconAlert, IconCheck } from './icons'

interface FieldShellProps {
  label: string
  htmlFor: string
  error?: string
  showValid?: boolean
  optional?: boolean
  children: ReactNode
}

export default function FieldShell({ label, htmlFor, error, showValid, optional, children }: FieldShellProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          {label} {optional && <span className="normal-case text-ink-soft/60">(optional)</span>}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-xs font-medium text-red-500"
              role="alert"
            >
              <IconAlert className="h-3.5 w-3.5" />
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        {children}
        <AnimatePresence>
          {showValid && !error && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-pomelo-blue"
            >
              <IconCheck className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
