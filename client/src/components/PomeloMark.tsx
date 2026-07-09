interface PomeloMarkProps {
  className?: string
}

// Vertices measured directly from the source mark (client/src/assets/pomelo-logo-dark.png)
// via per-pixel canvas sampling, not approximated by eye.
export default function PomeloMark({ className = '' }: PomeloMarkProps) {
  return (
    <svg viewBox="0 0 2313 2280" className={className} aria-hidden="true">
      <path d="M1132,0 L0,1140 L1132,1140 Z" fill="#895193" />
      <path d="M0,1140 L1132,2280 L1132,1140 Z" fill="#895193" />
      <path d="M1132,0 L2158,0 L1132,972 Z" fill="#00b2e2" />
      <path d="M1718,548 L1132,1140 L2313,1142 Z" fill="#895193" />
      <path d="M1132,1140 L2313,1142 L1132,2280 Z" fill="#895193" />
    </svg>
  )
}
