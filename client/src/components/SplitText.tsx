import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export default function SplitText({ text, className = '', delay = 0, once = true }: SplitTextProps) {
  const words = text.split(' ')
  let charIndex = 0

  const wordNodes = words.map((word, wi) => {
    const letters = Array.from(word).map((char) => {
      const i = charIndex++
      return (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.5em', rotateZ: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
          viewport={{ once, amount: 0.6 }}
          transition={{ duration: 0.7, delay: delay + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {char}
        </motion.span>
      )
    })

    return (
      <span key={wi} className="inline-block whitespace-nowrap">
        {letters}
      </span>
    )
  })

  const spaced = wordNodes.reduce<ReactNode[]>((acc, node, i) => (i === 0 ? [node] : [...acc, ' ', node]), [])

  return (
    <span className={className} role="text" aria-label={text}>
      {spaced}
    </span>
  )
}
