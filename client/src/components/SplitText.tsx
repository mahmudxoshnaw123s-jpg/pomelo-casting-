import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

// Arabic and Kurdish (Sorani) letters only join within a single contiguous text run —
// splitting a word's letters into separate sibling elements (as the Latin letter-by-letter
// reveal below does) breaks that joining no matter what font or CSS is applied. So
// cursive-script text animates in whole words instead of individual letters.
function SplitTextWords({ text, className, delay, once }: Required<Omit<SplitTextProps, 'text'>> & { text: string }) {
  const words = text.split(' ')

  const wordNodes = words.map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: '0.5em' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: 0.6 }}
        transition={{ duration: 0.6, delay: delay + wi * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  ))

  const spaced = wordNodes.reduce<ReactNode[]>((acc, node, i) => (i === 0 ? [node] : [...acc, ' ', node]), [])

  return (
    <span className={className} role="text" aria-label={text}>
      {spaced}
    </span>
  )
}

export default function SplitText({ text, className = '', delay = 0, once = true }: SplitTextProps) {
  const { language } = useLanguage()
  if (language === 'ar' || language === 'ku') {
    return <SplitTextWords text={text} className={className} delay={delay} once={once} />
  }

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
