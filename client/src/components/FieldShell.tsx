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
        <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label} {optional && <span className="normal-case text-white/35">(optional)</span>}
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
      <div className="group relative isolate rounded-xl">
        <div
          className="pointer-events-none absolute -inset-px -z-10 animate-spin rounded-xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
          style={{
            background: 'conic-gradient(from 0deg, #00b2e2, transparent 30%, transparent 60%, #895193, transparent 90%)',
            padding: 1,
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />
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
