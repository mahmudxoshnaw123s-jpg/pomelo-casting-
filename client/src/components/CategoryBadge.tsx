import type { ReactNode } from 'react'

interface CategoryBadgeProps {
  children: ReactNode
  className?: string
}

export default function CategoryBadge({ children, className = '' }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-pomelo-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-on-accent)] ${className}`}
    >
      {children}
    </span>
  )
}
