import { AnimatePresence, motion } from 'framer-motion'
import { cloneElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
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
  const errorId = `${htmlFor}-error`
  const field = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-invalid'?: boolean; 'aria-describedby'?: string }>, {
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })
    : children

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label} {optional && <span className="normal-case text-white/55">(optional)</span>}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              id={errorId}
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
        {field}
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
